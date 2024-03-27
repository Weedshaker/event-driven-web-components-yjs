// @ts-check

/* global HTMLElement */
/* global CustomEvent */
/* global Environment */

// https://github.com/yjs
/**
 * Constructor options
 @typedef {{
  namespace?: string
 }} options
*/

/**
 * ingoing event
 @typedef {{
  resolve: any,
  url?: string,
  room?: string
 }} SubscribeNotificationsEventDetail
*/

/**
 * ingoing event
 @typedef {{
  url?: string,
  room?: string
 }} UnsubscribeNotificationsEventDetail
*/

/**
 * ingoing event
 @typedef {{
  resolve: any,
  data?: {
    room: string,
    nickname: string,
    body: string
  },
 }} SendNotificationEventDetail
*/

// Supported attributes:
// Attribute {namespace} string default is yjs-, which gets prepend to each outgoing event string as well as on each listener event string
// Attribute {application-server-key} string https://vapidkeys.com/

/**
 * Notifications is a helper to handle push notifications from websockets
 *
 * @export
 * @function Notifications
 * @param {CustomElementConstructor} [ChosenHTMLElement = HTMLElement]
 * @return {CustomElementConstructor | *}
 */
export const Notifications = (ChosenHTMLElement = HTMLElement) => class Notifications extends ChosenHTMLElement {
  /**
   * Creates an instance of yjs notifications. The constructor will be called for every custom element using this class when initially created.
   *
   * @param {options} [options = {namespace=undefined}]
   * @param {*} args
   */
  constructor (options = { namespace: undefined }, ...args) {
    super(...args)

    // set attribute namespace
    if (options.namespace) this.namespace = options.namespace
    else if (!this.namespace) this.namespace = 'yjs-'

    const freshlyFetchNotificationsAfter = 10000

    /** @type {string} */
    this.importMetaUrl = import.meta.url.replace(/(.*\/)(.*)$/, '$1')

    // subscribe on user interaction
    this.bodyClicked = false

    /** @type {Promise<ServiceWorkerRegistration>} */
    this.serviceWorkerRegistration = navigator.serviceWorker?.register(this.getAttribute('sw-url') || `${this.importMetaUrl}../serviceWorkers/NotificationServiceWorker.js`, { scope: this.getAttribute('sw-scope') || './' })

    // Notification Events
    this.subscribeNotificationsEventListenerOnce = event => {
      if (this.serviceWorkerRegistration) {
        // initially inform the sw about the uid
        this.serviceWorkerRegistration.then(async serviceWorkerRegistration => {
          if (!serviceWorkerRegistration.active) return
          serviceWorkerRegistration.active.postMessage(JSON.stringify({
            key: 'uid',
            value: await this.uid
          }))
        })
        // initially inform the sw about the keepAlive
        this.serviceWorkerRegistration.then(async serviceWorkerRegistration => {
          if (!serviceWorkerRegistration.active) return
          serviceWorkerRegistration.active.postMessage(JSON.stringify({
            key: 'keepAlive',
            // @ts-ignore
            value: self.Environment.keepAlive
          }))
        })
        /** @type {Promise<PushSubscription>} */
        this.pushSubscription = this.serviceWorkerRegistration.then(serviceWorkerRegistration => {
          serviceWorkerRegistration.update()
          return serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            // https://vapidkeys.com/
            applicationServerKey: this.getAttribute('application-server-key') || 'BITPxH2Sa4eoGRCqJtvmOnGFCZibh_ZaUFNmzI_f3q-t2FwA3HkgMqlOqN37L2vwm_RBlwmbcmVSOjPeZCW6YI4'
          })
        })
        this.subscribeNotificationsEventListenerOnce = () => {}
      }
    }

    /**
     * subscribe to notifications
     *
     * @param {any & {detail: SubscribeNotificationsEventDetail}} event
     */
    this.subscribeNotificationsEventListener = async event => {
      const result = await self.Notification.requestPermission()
      if (result === 'granted') {
        this.subscribeNotificationsEventListenerOnce()
        if (event.detail.url) {
          this.setNotification(event.detail.url, 'subscribe', event.detail.room || await (await this.roomPromise).room)
        } else {
          // TODO: Only subscribe to one!
          // @ts-ignore
          (await this.providersPromise).providers.get('websocket').forEach(
            /**
             * @param {import("../EventDrivenYjs.js").ProviderTypes} provider
             */
            async (provider, url) => {
              const origin = (new URL(url)).origin
              const websocketUrl = (await this.providersPromise).websocketUrl
              if (websocketUrl && websocketUrl.includes(origin)) this.setNotification(origin, 'subscribe', event.detail.room || await (await this.roomPromise).room)
            }
          )
        }
        if (typeof event.detail.resolve === 'function') event.detail.resolve(true)
      } else if (typeof event.detail.resolve === 'function')  {
        event.detail.resolve(false)
      }
    }

    /**
     * unsubscribe to notifications
     *
     * @param {any & {detail: UnsubscribeNotificationsEventDetail}} event
     */
    this.unsubscribeNotificationsEventListener = async (event) => {
      if (event.detail.url) {
        this.setNotification(event.detail.url, 'unsubscribe', event.detail.room || await (await this.roomPromise).room)
      } else {
        // @ts-ignore
        (await this.providersPromise).providers.get('websocket').forEach(
          /**
           * @param {import("../EventDrivenYjs.js").ProviderTypes} provider
           */
          async (provider, url) => this.setNotification((new URL(url)).origin, 'unsubscribe', event.detail.room || await (await this.roomPromise).room)
        )
      }
    }

    /**
     * send to notifications
     *
     * @param {any & {detail: SendNotificationEventDetail}} event
     */
    this.sendNotificationEventListener = event => {
      self.Notification.requestPermission(async (result) => {
        if (result === 'granted' && this.serviceWorkerRegistration) {
          this.serviceWorkerRegistration.then(async serviceWorkerRegistration => {
            if (!serviceWorkerRegistration.active) return
            serviceWorkerRegistration.active.postMessage(JSON.stringify({
              room: await (await this.roomPromise).room,
              uid: await this.uid,
              type: 'message',
              location,
              visibilityState: document.visibilityState,
              ...(event.detail.data || {})
            }))
          })
          event.detail.resolve(true)
        } else {
          event.detail.resolve(false)
        }
      })
    }

    /**
     * send to notifications
     *
     * @param {any & {detail: import("../EventDrivenYjs.js").ProvidersUpdateEventDetail}} event
     */
    this.providersUpdateEventListener = event => {
      this.providersPromise = Promise.resolve(event.detail)
      if (this.bodyClicked) this.dispatchEvent(new CustomEvent(`${this.namespace}subscribe-notifications`, {
        detail: {
          resolve: () => {}
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    this.usersEventListener = async event => {
      if (event.detail.selfUser?.uid) {
        this.uidResolve(event.detail.selfUser.uid)
        this.globalEventTarget.removeEventListener(`${this.namespace}users`, this.usersEventListener)
      }
    }

    let lastRequestedNotifications = Date.now()
    this.pushEventMessageListener = async event => {
      const data = JSON.parse(event.data)
      if (data.key === 'notifications') {
        this.dispatchEvent(new CustomEvent(`${this.namespace}notifications`, {
          detail: await this.updateNotifications(data.notifications),
          bubbles: true,
          cancelable: true,
          composed: true
        }))
        lastRequestedNotifications = Date.now()
      } else if(data.key === 'click' && location.origin && data.hostAndPort && data.room) {
        // @ts-ignore
        history.pushState({ ...history.state, pageTitle: (document.title = data.room) }, data.room, `${location.origin}/?page=/chat&websocket-url=${data.hostAndPort}?keep-alive=${self.Environment.keepAlive || 86400000}&room=${data.room}`)
      }
    }

    this.requestNotificationsEventListener = async event => {
      const requestNotifications = lastRequestedNotifications + freshlyFetchNotificationsAfter < Date.now()
      if (event && event.detail && event.detail.resolve) {
        event.detail.resolve(requestNotifications
          ? await this.updateNotifications()
          : await this.notificationsPromise)
      } else {
        this.dispatchEvent(new CustomEvent(`${this.namespace}notifications`, {
          detail: requestNotifications
            ? await this.updateNotifications()
            : await this.notificationsPromise,
          bubbles: true,
          cancelable: true,
          composed: true
        }))
      }
      if (requestNotifications) lastRequestedNotifications = Date.now()
    }

    this.focusEventListener = async event => {
      if ((await this.notificationsPromise).notifications.hasOwnProperty(await (await this.roomPromise).room)) this.serviceWorkerRegistration.then(async serviceWorkerRegistration => {
        if (!serviceWorkerRegistration.active) return
        serviceWorkerRegistration.active.postMessage(JSON.stringify({
          key: 'requestClearNotifications',
          room: await (await this.roomPromise).room,
        }))
      })
    }

    /** @type {(any)=>void} */
    this.uidResolve = map => map
    /** @type {Promise<string>} */
    this.uid = new Promise(resolve => (this.uidResolve = resolve))

    /** @type {(any)=>void} */
    this.roomResolve = map => map
    /** @type {Promise<{ locationHref: string, room: Promise<string> & {done: boolean} }>} */
    this.roomPromise = new Promise(resolve => (this.roomResolve = resolve))

    /** @type {(any)=>void} */
    this.providersResolve = map => map
    /** @type {Promise<import("../EventDrivenYjs.js").ProvidersUpdateEventDetail>} */
    this.providersPromise = new Promise(resolve => (this.providersResolve = resolve))

    /** @type {(any)=>void} */
    this.notificationsResolve = map => map
    /** @type {Promise<{notifications: {}}>} */
    this.notificationsPromise = new Promise(resolve => (this.notificationsResolve = resolve))
  }

  connectedCallback () {
    this.globalEventTarget.addEventListener(`${this.namespace}subscribe-notifications`, this.subscribeNotificationsEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}unsubscribe-notifications`, this.unsubscribeNotificationsEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}send-notification`, this.sendNotificationEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}request-notifications`, this.requestNotificationsEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}providers-update`, this.providersUpdateEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}users`, this.usersEventListener)
    navigator.serviceWorker.addEventListener('message', this.pushEventMessageListener)
    self.addEventListener('focus', this.focusEventListener)
    this.serviceWorkerRegistration.then(async serviceWorkerRegistration => {
      if (!serviceWorkerRegistration.active) return
      serviceWorkerRegistration.active.postMessage(JSON.stringify({
        key: 'requestClearNotifications',
        room: await (await this.roomPromise).room,
      }))
    })
    this.dispatchEvent(new CustomEvent(`${this.namespace}get-room`, {
      detail: {
        resolve: this.roomResolve
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))
    this.dispatchEvent(new CustomEvent(`${this.namespace}get-providers`, {
      detail: {
        resolve: this.providersResolve
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))
    this.connectedCallbackOnce()
  }

  connectedCallbackOnce () {
    document.body.addEventListener('click', event => {
      this.dispatchEvent(new CustomEvent(`${this.namespace}subscribe-notifications`, {
        detail: {
          resolve: () => {}
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
      this.bodyClicked = true
    }, { once: true })
    this.connectedCallbackOnce = () => {}
  }

  disconnectedCallback () {
    this.globalEventTarget.removeEventListener(`${this.namespace}subscribe-notifications`, this.subscribeNotificationsEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}unsubscribe-notifications`, this.unsubscribeNotificationsEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}send-notification`, this.sendNotificationEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}request-notifications`, this.requestNotificationsEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}providers-update`, this.providersUpdateEventListener)
    navigator.serviceWorker.removeEventListener('message', this.pushEventMessageListener)
    self.removeEventListener('focus', this.focusEventListener)
  }

  /**
   * subscribe or unsubscribe to websocket push notifications
   *
   * @param {string} url
   * @param {'subscribe' | 'unsubscribe'} route
   * @param {string} room
   * @return {Promise<void>}
   */
  setNotification (url, route, room) {
    if (!this.pushSubscription) return Promise.resolve()
    // Subscribe for notifications
    return this.pushSubscription.then(pushSubscription => fetch(`${this.urlFixProtocol(url)}/${route}`, {
      method: 'POST',
      body: JSON.stringify(Object.assign(JSON.parse(JSON.stringify(pushSubscription)), { room })),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.text()).then(text => console.info('notification subscription', { this: this, text, url }))
    ).catch(error => console.error(error))
  }

  /**
   * get all notifications from websocket
   *
   * @return {Promise<[{string: [{timestamp: number}]}]>}
   */
  async getNotifications () {
    const fetches = []
    const {providers, websocketUrl} = await this.providersPromise
    const getRoomsResult = await new Promise(resolve => this.dispatchEvent(new CustomEvent('yjs-get-rooms', {
      detail: {
        resolve
      },
      bubbles: true,
      cancelable: true,
      composed: true
    })))
    // @ts-ignore
    providers.get('websocket').forEach(
      /**
       * @param {import("../EventDrivenYjs.js").ProviderTypes} provider
       */
      (provider, url) => {
        const origin = (new URL(url)).origin
        if (websocketUrl && websocketUrl.includes(origin)) {
          fetches.push(fetch(`${this.urlFixProtocol(origin)}/get-notifications`, {
              method: 'POST',
              body: JSON.stringify(Object.keys(getRoomsResult.value)),
              headers: {
                'Content-Type': 'application/json'
              }
              // @ts-ignore
            }).then(resp => resp.json()).catch(error => console.error(error) || {}))
        }
      }
    )
    // @ts-ignore
    return await Promise.all(fetches)
  }

  updateNotifications (pushMessageNotifications = {}) {
    return Promise.all([
      new Promise(resolve => this.dispatchEvent(new CustomEvent('yjs-get-rooms', {
        detail: {
          resolve
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))),
      this.getNotifications(),
      this.roomPromise
    ]).then(async ([getRoomsResult, fetchedNotifications, roomPromise]) => {
      const room = await roomPromise.room
      const notificationsData = {}
      Object.keys(getRoomsResult.value).filter(roomName => roomName !== room).forEach(roomName => {
        const lastEntered = getRoomsResult.value[roomName].entered[0]
        if (Array.isArray(pushMessageNotifications[roomName])) {
          notificationsData[roomName] = pushMessageNotifications[roomName].filter(notification => notification.timestamp > lastEntered)
        }
        fetchedNotifications.forEach(fetchedNotification => {
          if (Array.isArray(fetchedNotification[roomName])) {
            if (!Array.isArray(notificationsData[roomName])) notificationsData[roomName] = []
            notificationsData[roomName] = notificationsData[roomName].concat(fetchedNotification[roomName].filter(notification => notification.timestamp > lastEntered && !notificationsData[roomName].some(setNotification => setNotification.timestamp === notification.timestamp)))
          }
        })
        if (notificationsData[roomName]) notificationsData[roomName] = notificationsData[roomName].sort((a, b) => b.timestamp - a.timestamp)
      })
      this.notificationsResolve({notifications: notificationsData})
      this.notificationsPromise = Promise.resolve({notifications: notificationsData})
      return {notifications: notificationsData}
    })
  }

  urlFixProtocol (url) {
    return url.replace('ws:', 'http:').replace('wss:', 'https:')
  }

  /**
   * The namespace is prepended to the custom event names
   * priority of value appliance: options, attribute
   *
   * @param {string} value
   */
  set namespace (value) {
    if (value) this.setAttribute('namespace', value)
  }

  /**
   * @return {string}
   */
  get namespace () {
    // @ts-ignore
    return this.getAttribute('namespace')
  }

  get globalEventTarget () {
    // @ts-ignore
    return this._globalEventTarget || (this._globalEventTarget = self.Environment?.activeRoute || document.body)
  }
}
