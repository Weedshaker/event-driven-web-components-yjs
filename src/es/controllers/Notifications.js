// @ts-check
import { WebWorker } from '../../event-driven-web-components-prototypes/src/WebWorker.js'
import { urlFixProtocol, urlRemoveProtocolRegex } from '../helpers/Utils.js'
import { separator } from './Users.js'

/* global self */
/* global location */
/* global history */

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
 * @param {CustomElementConstructor} [ChosenHTMLElement = WebWorker()]
 * @return {CustomElementConstructor | *}
 */
export const Notifications = (ChosenHTMLElement = WebWorker()) => class Notifications extends ChosenHTMLElement {
  /**
   * Creates an instance of yjs notifications. The constructor will be called for every custom element using this class when initially created.
   *
   * @param {options} [options = {namespace=undefined}]
   * @param {*} args
   */
  constructor (options = { namespace: undefined }, ...args) {
    super(...args)

    // @ts-ignore
    this.roomNamePrefix = self.Environment?.roomNamePrefix || 'chat-'

    // set attribute namespace
    if (options.namespace) this.namespace = options.namespace
    else if (!this.namespace) this.namespace = 'yjs-'

    // @ts-ignore
    this.updateNotificationsAfter = self.Environment?.updateNotificationsAfter || 5000
    this.lastUpdatedNotifications = Date.now() - this.updateNotificationsAfter
    this.succeededGetNotificationsOrigins = []
    this.failedGetNotificationsOrigins = new Map()
    this.abortControllersGetNotifications = new Map()

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
        let websocketUrls
        if (event.detail?.url) {
          this.setNotification(event.detail.url, 'subscribe', event.detail.room || await (await this.roomPromise).room)
        } else if (event.detail?.locationHref && (websocketUrls = (new URL(event.detail.locationHref)).searchParams.get('websocket-url'))) {
          websocketUrls.split(',').forEach(async websocketUrl => this.setNotification((new URL(websocketUrl)).origin, 'subscribe', event.detail.room || await (await this.roomPromise).room))
        } else {
          // @ts-ignore
          (await this.providersPromise).providers.get('websocket').forEach(
            /**
             * @param {import("../EventDrivenYjs.js").ProviderTypes} provider
             */
            async (provider, url) => {
              const origin = (new URL(url)).origin
              this.setNotification(origin, 'subscribe', event.detail?.room || await (await this.roomPromise).room)
            }
          )
        }
        if (typeof event.detail?.resolve === 'function') event.detail.resolve(true)
      } else if (typeof event.detail?.resolve === 'function') {
        event.detail.resolve(false)
      }
    }

    /**
     * unsubscribe to notifications
     *
     * @param {any & {detail: UnsubscribeNotificationsEventDetail}} event
     */
    this.unsubscribeNotificationsEventListener = async (event) => {
      let websocketUrls
      if (event.detail?.url) {
        this.setNotification(event.detail.url, 'unsubscribe', event.detail.room || await (await this.roomPromise).room)
      } else if (event.detail?.locationHref && (websocketUrls = (new URL(event.detail.locationHref)).searchParams.get('websocket-url'))) {
        websocketUrls.split(',').forEach(async websocketUrl => this.setNotification((new URL(websocketUrl)).origin, 'unsubscribe', event.detail.room || await (await this.roomPromise).room))
      } else {
        // @ts-ignore
        (await this.providersPromise).providers.get('websocket').forEach(
          /**
           * @param {import("../EventDrivenYjs.js").ProviderTypes} provider
           */
          async (provider, url) => this.setNotification((new URL(url)).origin, 'unsubscribe', event.detail?.room || await (await this.roomPromise).room)
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
      if (this.bodyClicked && event.detail.message !== 'reconnectAllProviders') {
        this.dispatchEvent(new CustomEvent(`${this.namespace}subscribe-notifications`, {
          bubbles: true,
          cancelable: true,
          composed: true
        }))
      }
    }

    this.usersEventListener = async event => {
      if (event.detail.selfUser?.uid) {
        this.uidResolve(event.detail.selfUser.uid)
        this.globalEventTarget.removeEventListener(`${this.namespace}users`, this.usersEventListener)
      }
    }

    this.pushEventMessageListener = async event => {
      const data = JSON.parse(event.data)
      if (data.key === 'notifications') {
        this.dispatchEvent(new CustomEvent(`${this.namespace}notifications`, {
          detail: await this.updateNotifications(data.notifications, data.message !== 'requestClearNotifications'),
          bubbles: true,
          cancelable: true,
          composed: true
        }))
      } else if (data.key === 'click' && location.origin && data.hostAndPort && data.room) {
        // @ts-ignore
        history.pushState({ ...history.state, pageTitle: data.room }, data.room, `${location.origin}/?page=/chat&websocket-url=${data.hostAndPort}?keep-alive=${self.Environment.keepAlive || 86400000}&room=${data.room}`)
      }
    }

    let timeoutId = null
    this.requestNotificationsEventListener = async event => {
      if (event && event.detail && event.detail.resolve) {
        event.detail.resolve(await this.updateNotifications(undefined, event.detail?.force))
      } else {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(async () => {
          this.dispatchEvent(new CustomEvent(`${this.namespace}notifications`, {
            detail: await this.updateNotifications(undefined, event.detail?.force),
            bubbles: true,
            cancelable: true,
            composed: true
          }))
        }, 50)
      }
    }

    // mute notifications for hostname else roomName
    this.muteNotificationsEventListener = event => {
      new Promise(resolve => this.dispatchEvent(new CustomEvent('storage-get', {
        detail: {
          key: `${this.roomNamePrefix}notifications`,
          resolve
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))).then((notifications) => {
        notifications.value = {
          mutes: {},
          amplified: {},
          ...notifications.value
        }
        if (event.detail.hostname) {
          notifications.value.mutes.hostnames = Array.from(new Set((notifications.value.mutes.hostnames || []).concat([event.detail.hostname])))
          notifications.value.amplified.hostnames = Array.from(new Set(notifications.value.amplified.hostnames?.filter(hostname => event.detail.hostname !== hostname) || []))
        } else if (event.detail.roomName) {
          notifications.value.mutes.roomNames = Array.from(new Set((notifications.value.mutes.roomNames || []).concat([event.detail.roomName])))
        }
        new Promise(resolve => this.dispatchEvent(new CustomEvent('storage-set', {
          detail: {
            key: `${this.roomNamePrefix}notifications`,
            value: notifications.value,
            resolve
          },
          bubbles: true,
          cancelable: true,
          composed: true
        }))).then(async () => {
          const result = await this.updateNotifications()
          if (event.detail?.resolve) event.detail.resolve(result)
          this.dispatchEvent(new CustomEvent(`${this.namespace}notifications`, {
            detail: result,
            bubbles: true,
            cancelable: true,
            composed: true
          }))
        })
      })
    }
    // unmute notifications for hostname else roomName
    this.unmuteNotificationsEventListener = event => {
      new Promise(resolve => this.dispatchEvent(new CustomEvent('storage-get', {
        detail: {
          key: `${this.roomNamePrefix}notifications`,
          resolve
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))).then((notifications) => {
        notifications.value = {
          mutes: {},
          amplified: {},
          ...notifications.value
        }
        if (event.detail.hostname) {
          notifications.value.mutes.hostnames = notifications.value.mutes.hostnames?.filter(hostname => event.detail.hostname !== hostname) || []
          notifications.value.amplified.hostnames = Array.from(new Set((notifications.value.amplified.hostnames || []).concat([event.detail.hostname])))
          this.failedGetNotificationsOrigins.forEach((value, origin) => {
            if (origin.includes(event.detail.hostname)) this.failedGetNotificationsOrigins.delete(origin)
          })
        } else if (event.detail.roomName) {
          notifications.value.mutes.roomNames = notifications.value.mutes.roomNames?.filter(roomName => event.detail.roomName !== roomName) || []
        }
        new Promise(resolve => this.dispatchEvent(new CustomEvent('storage-set', {
          detail: {
            key: `${this.roomNamePrefix}notifications`,
            value: notifications.value,
            resolve
          },
          bubbles: true,
          cancelable: true,
          composed: true
        }))).then(async () => {
          const result = await this.updateNotifications(undefined, true)
          if (event.detail?.resolve) event.detail.resolve(result)
          this.dispatchEvent(new CustomEvent(`${this.namespace}notifications`, {
            detail: result,
            bubbles: true,
            cancelable: true,
            composed: true
          }))
        })
      })
    }

    this.focusEventListener = async event => {
      if ((await this.notificationsPromise).notifications.hasOwnProperty(await (await this.roomPromise).room)) { // eslint-disable-line
        this.serviceWorkerRegistration.then(async serviceWorkerRegistration => {
          if (!serviceWorkerRegistration.active) return
          serviceWorkerRegistration.active.postMessage(JSON.stringify({
            key: 'requestClearNotifications',
            room: await (await this.roomPromise).room
          }))
        })
      } else {
        this.dispatchEvent(new CustomEvent(`${this.namespace}request-notifications`, {
          bubbles: true,
          cancelable: true,
          composed: true
        }))
      }
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
    this.lastUpdatedNotifications = Date.now() - this.updateNotificationsAfter
    this.globalEventTarget.addEventListener(`${this.namespace}subscribe-notifications`, this.subscribeNotificationsEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}unsubscribe-notifications`, this.unsubscribeNotificationsEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}send-notification`, this.sendNotificationEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}request-notifications`, this.requestNotificationsEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}mute-notifications`, this.muteNotificationsEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}unmute-notifications`, this.unmuteNotificationsEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}providers-update`, this.providersUpdateEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}users`, this.usersEventListener)
    navigator.serviceWorker?.addEventListener('message', this.pushEventMessageListener)
    self.addEventListener('focus', this.focusEventListener)
    this.serviceWorkerRegistration?.then(async serviceWorkerRegistration => {
      if (!serviceWorkerRegistration.active) return
      clearTimeout(this._requestClearNotificationsTimeoutId)
      // @ts-ignore
      this._requestClearNotificationsTimeoutId = setTimeout(async () => serviceWorkerRegistration.active.postMessage(JSON.stringify({
        key: 'requestClearNotifications',
        room: await (await this.roomPromise).room
      })), this.updateNotificationsAfter)
    })
    clearInterval(this._intervalId)
    this._intervalId = setInterval(async () => {
      this.dispatchEvent(new CustomEvent(`${this.namespace}notifications`, {
        detail: await this.updateNotifications(),
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }, this.updateNotificationsAfter * 10)
    clearInterval(this._clearFailedIntervalId)
    this._clearFailedIntervalId = setInterval(() => this.failedGetNotificationsOrigins.clear(), this.updateNotificationsAfter * 50) // approx. 4min
    if (this.isConnected) this.connectedCallbackOnce()
  }

  connectedCallbackOnce () {
    document.body.addEventListener('click', event => {
      this.dispatchEvent(new CustomEvent(`${this.namespace}subscribe-notifications`, {
        bubbles: true,
        cancelable: true,
        composed: true
      }))
      this.bodyClicked = true
    }, { once: true })
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
    this.connectedCallbackOnce = () => {}
  }

  disconnectedCallback () {
    this.globalEventTarget.removeEventListener(`${this.namespace}subscribe-notifications`, this.subscribeNotificationsEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}unsubscribe-notifications`, this.unsubscribeNotificationsEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}send-notification`, this.sendNotificationEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}request-notifications`, this.requestNotificationsEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}mute-notifications`, this.muteNotificationsEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}unmute-notifications`, this.unmuteNotificationsEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}providers-update`, this.providersUpdateEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}users`, this.usersEventListener)
    navigator.serviceWorker?.removeEventListener('message', this.pushEventMessageListener)
    self.removeEventListener('focus', this.focusEventListener)
    clearTimeout(this._requestClearNotificationsTimeoutId)
    clearInterval(this._intervalId)
    clearInterval(this._clearFailedIntervalId)
    this.failedGetNotificationsOrigins.clear()
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
    return this.pushSubscription.then(pushSubscription => fetch(`${urlFixProtocol(url)}/${route}`, {
      method: 'POST',
      body: JSON.stringify(Object.assign(JSON.parse(JSON.stringify(pushSubscription)), { room })),
      headers: {
        'Content-Type': 'application/json',
        'Bypass-Tunnel-Reminder': 'yup' // https://github.com/localtunnel/localtunnel + https://github.com/localtunnel/localtunnel/issues/663
      }
    }).then(response => {
      if (response.status >= 200 && response.status <= 299) {
        return response.text()
      }
      throw new Error(response.statusText)
    // @ts-ignore
    }).then(text => console.info('notification subscription', { this: this, text, url })).catch(error => console.error(error)))
  }

  /**
   * get all notifications from websocket
   *
   * @return {Promise<{ fetches: Promise<[{string: [{timestamp: number}]}]>, origins: string[]}>}
   */
  async _getNotifications (getRoomsResult, notificationMutes, notificationAmplified) {
    let roomNames = Object.keys(getRoomsResult.value)
    // get websocket provider origins from other rooms
    /** @type {URL[]} */
    let urls = roomNames.reduce((acc, roomName) => {
      let room
      if ((room = getRoomsResult.value[roomName])) {
        room.providers?.forEach(url => {
          let [name, realUrl] = url.split(separator)
          // incase no separator is found (fallback for old room provider array)
          if (!realUrl) {
            realUrl = name
            name = undefined
          }
          try {
            // @ts-ignore
            acc.push(new URL(realUrl))
          } catch (error) {}
        })
      }
      return acc
    }, []);
    // get websocket provider urls from ${this.namespace}providers-update, the providers map from EventDrivenYjs.js
    // @ts-ignore
    (await this.providersPromise).providers.get('websocket').forEach(
      /**
       * @param {import("../EventDrivenYjs.js").ProviderTypes} provider
       */
      (provider, url) => {
        try {
          // @ts-ignore
          urls.push(new URL(url))
        } catch (error) {}
      }
    )
    if (notificationMutes.roomNames) roomNames = roomNames.filter(roomName => !notificationMutes.roomNames.includes(roomName))
    // get storage amplified providers
    notificationAmplified.hostnames?.forEach(
      /**
       * @param {string} url
       */
      url => {
        try {
          // @ts-ignore
          urls.push(new URL(`wss://${url}`))
        } catch (error) {}
      }
    )
    // @ts-ignore
    roomNames = JSON.stringify(roomNames)
    if (notificationMutes.hostnames) urls = urls.filter(url => notificationMutes.hostnames.every(hostname => hostname !== url.hostname))
    const origins = Array.from(new Set(urls.map(url => urlFixProtocol(url.origin))))
    // @ts-ignore
    return { fetches: await Promise.all(origins.map(origin => this._fetchNotifications(origin, roomNames))), origins }
  }

  _fetchNotifications (origin, body) {
    if (this.failedGetNotificationsOrigins.has(origin) && !this.succeededGetNotificationsOrigins.includes(origin)) return Promise.resolve(this.failedGetNotificationsOrigins.get(origin))
    const wasOnline = navigator.onLine
    if (this.abortControllersGetNotifications.has(origin)) this.abortControllersGetNotifications.get(origin).abort('new request coming')
    this.abortControllersGetNotifications.set(origin, new AbortController())
    return fetch(`${origin}/get-notifications`, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
        'Bypass-Tunnel-Reminder': 'yup' // https://github.com/localtunnel/localtunnel + https://github.com/localtunnel/localtunnel/issues/663
      },
      signal: this.abortControllersGetNotifications.get(origin).signal
    }).then(response => {
      if (response.status >= 200 && response.status <= 299) {
        if (this.failedGetNotificationsOrigins.has(origin)) this.failedGetNotificationsOrigins.delete(origin)
        if (!this.succeededGetNotificationsOrigins.includes(origin)) this.succeededGetNotificationsOrigins.push(origin)
        return response.json()
      }
      throw new Error(response.statusText)
    }).then(json => Object.assign({ origin }, json)).catch(error => {
      if (wasOnline && navigator.onLine && !error.toLocaleString().includes('abort')) this.failedGetNotificationsOrigins.set(origin, { error })
      // @ts-ignore
      return console.error(error) || { error }
    })
  }

  updateNotifications (pushMessageNotifications = this.lastPushMessageNotifications || {}, force = false) {
    this.lastPushMessageNotifications = pushMessageNotifications
    let notificationsFromStorage = null
    const getNotificationsFromStorage = (force = false) => ((!force && notificationsFromStorage) || (notificationsFromStorage = new Promise(resolve => this.dispatchEvent(new CustomEvent('storage-get', {
      detail: {
        key: `${this.roomNamePrefix}notifications`,
        resolve
      },
      bubbles: true,
      cancelable: true,
      composed: true
    })))))
    const getNotificationMutes = force => getNotificationsFromStorage(force).then(notifications => notifications.value.mutes || {})
    const getNotificationAmplified = force => getNotificationsFromStorage().then(notifications => notifications.value.amplified || {})
    // return set notificationsPromise when not done yet or without force but too soon of a new request
    // @ts-ignore
    if (!force && (this.notificationsPromise.done === false || this.lastUpdatedNotifications + this.updateNotificationsAfter > Date.now())) return this.notificationsPromise.then(async result => ({ ...result, notificationMutes: (await getNotificationMutes()) }))
    // @ts-ignore
    this.notificationsPromise.done = false
    clearTimeout(this._waitForNotificationsPromiseResolveTimeout)
    // force to resolve the promise, that a new fetch can start after this.updateNotificationsAfter * 10
    // @ts-ignore
    this._waitForNotificationsPromiseResolveTimeout = setTimeout(() => (this.notificationsPromise.done = true), this.updateNotificationsAfter * 10)
    this.lastUpdatedNotifications = Date.now()
    return Promise.all([
      new Promise(resolve => this.dispatchEvent(new CustomEvent(`${this.namespace}get-rooms`, {
        detail: {
          resolve
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))),
      this.roomPromise,
      getNotificationMutes(),
      getNotificationAmplified()
    ]).then(async ([getRoomsResult, roomPromise, notificationMutes, notificationAmplified]) => {
      const { origins, fetches: fetchedNotifications } = await this._getNotifications(getRoomsResult, notificationMutes, notificationAmplified)
      const room = await roomPromise.room
      const activeRoomMessageTimestamps = await new Promise(resolve => this.dispatchEvent(new CustomEvent(`${this.namespace}get-timestamps-of-messages`, {
        detail: { resolve },
        bubbles: true,
        cancelable: true,
        composed: true
      })))
      // @ts-ignore
      const notificationsData = await this.webWorker(Notifications._updateNotifications, room, getRoomsResult.value, pushMessageNotifications, fetchedNotifications, urlRemoveProtocolRegex, activeRoomMessageTimestamps)
      const result = { notifications: notificationsData, rooms: getRoomsResult, activeRoom: room, notificationMutes: (await getNotificationMutes(true)), origins }
      this.notificationsResolve(result)
      this.notificationsPromise = Promise.resolve(result)
      // @ts-ignore
      this.notificationsPromise.done = true
      return result
    })
  }

  static _updateNotifications (activeRoom, rooms, pushMessages, fetchMessages, urlRemoveProtocolRegex, activeRoomMessageTimestamps) {
    const notificationsData = {}
    Object.keys(rooms).forEach(roomName => {
      const lastEntered = rooms[roomName].entered?.[0] || Date.now()
      // tread push messages
      if (Array.isArray(pushMessages[roomName])) notificationsData[roomName] = pushMessages[roomName].filter(notification => notification && notification.timestamp > lastEntered)
      // tread fetched messages
      const storageMessagesTimestamps = rooms[roomName].messagesTimestamps || []
      const looped = []
      fetchMessages.forEach(fetchedNotification => {
        if (Array.isArray(fetchedNotification[roomName])) {
          if (!Array.isArray(notificationsData[roomName])) notificationsData[roomName] = []
          notificationsData[roomName] = notificationsData[roomName].concat(fetchedNotification[roomName].filter(notification => {
            if (looped.includes(notification.timestamp)) return false
            looped.push(notification.timestamp)
            notification.host = fetchedNotification.origin.replace(urlRemoveProtocolRegex, '')
            try {
              notification.hostname = new URL(fetchedNotification.origin).hostname
            } catch (error) {
              notification.hostname = null
            }
            if (roomName === activeRoom && activeRoomMessageTimestamps.includes(notification.timestamp)) {
              return false
            } else if(storageMessagesTimestamps.includes(notification.timestamp)) {
              return false
            } else if (rooms[roomName].enteredProviders?.[notification.hostname]) {
              return notification.timestamp > rooms[roomName].enteredProviders[notification.hostname][0]
            }
            return true
          }))
        }
      })
      if (notificationsData[roomName]) notificationsData[roomName] = notificationsData[roomName].sort((a, b) => b.timestamp - a.timestamp)
    })
    return notificationsData
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
