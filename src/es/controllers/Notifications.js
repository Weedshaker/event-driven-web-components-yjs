// @ts-check

/* global HTMLElement */
/* global CustomEvent */

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
  data?: Object,
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

    /** @type {string} */
    this.importMetaUrl = import.meta.url.replace(/(.*\/)(.*)$/, '$1')

    // Notifications
    /** @type {Promise<ServiceWorkerRegistration>} */
    this.serviceWorkerRegistration = navigator.serviceWorker?.ready
    if (this.serviceWorkerRegistration) {
      // initially inform the sw about the real location to attach the link to the messages
      this.serviceWorkerRegistration.then(serviceWorkerRegistration => {
        if (!serviceWorkerRegistration.active) return
        serviceWorkerRegistration.active.postMessage(JSON.stringify({
          key: 'location',
          value: location
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
    }

    // Notification Events
    this.subscribeNotificationsEventListenerOnce = event => navigator.serviceWorker?.register(this.getAttribute('sw-url') || `${this.importMetaUrl}../serviceWorkers/NotificationServiceWorker.js`, { scope: this.getAttribute('sw-scope') || './' })

    /**
     * subscribe to notifications
     *
     * @param {any & {detail: SubscribeNotificationsEventDetail}} event
     */
    this.subscribeNotificationsEventListener = async event => {
      // TODO: triggers twice
      self.Notification.requestPermission(async (result) => {
        if (result === 'granted') {
          if (event.detail.url) {
            // TODO: response with false if any fetch of setNotification returns an error
            this.setNotification(event.detail.url, 'subscribe', event.detail.room || await (await this.roomPromise).room)
          } else {
            // @ts-ignore
            (await this.providersPromise).providers.get('websocket').forEach(
              /**
               * @param {import("../EventDrivenYjs.js").ProviderTypes} provider
               */
              async (provider, url) => {
                const origin = (new URL(url)).origin
                // TODO: response with false if any fetch of setNotification returns an error
                const websocketUrl = (await this.providersPromise).websocketUrl
                if (websocketUrl && websocketUrl.includes(origin)) this.setNotification(origin, 'subscribe', event.detail.room || await (await this.roomPromise).room)
              }
            )
          }
          event.detail.resolve(true)
        } else {
          event.detail.resolve(false)
        }
      })
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
      this.dispatchEvent(new CustomEvent(`${this.namespace}subscribe-notifications`, {
        detail: {
          resolve: result => console.log('subscribed', result)
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    /** @type {(any)=>void} */
    this.roomResolve = map => map
    /** @type {Promise<{ locationHref: string, room: Promise<string> & {done: boolean} }>} */
    this.roomPromise = new Promise(resolve => (this.roomResolve = resolve))

    /** @type {(any)=>void} */
    this.providersResolve = map => map
    /** @type {Promise<import("../EventDrivenYjs.js").ProvidersUpdateEventDetail>} */
    this.providersPromise = new Promise(resolve => (this.providersResolve = resolve))
  }

  connectedCallback () {
    this.globalEventTarget.addEventListener(`${this.namespace}subscribe-notifications`, this.subscribeNotificationsEventListenerOnce, { once: true })
    this.globalEventTarget.addEventListener(`${this.namespace}subscribe-notifications`, this.subscribeNotificationsEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}unsubscribe-notifications`, this.unsubscribeNotificationsEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}send-notification`, this.sendNotificationEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}providers-update`, this.providersUpdateEventListener)
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
    document.body.addEventListener('click', event => this.dispatchEvent(new CustomEvent(`${this.namespace}subscribe-notifications`, {
      detail: {
        resolve: result => console.log('subscribed', result)
      },
      bubbles: true,
      cancelable: true,
      composed: true
    })), { once: true })
    this.connectedCallbackOnce = () => {}
  }

  disconnectedCallback () {
    this.globalEventTarget.removeEventListener(`${this.namespace}subscribe-notifications`, this.subscribeNotificationsEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}unsubscribe-notifications`, this.unsubscribeNotificationsEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}send-notification`, this.sendNotificationEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}providers-update`, this.providersUpdateEventListener)
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
    return this.pushSubscription.then(pushSubscription => fetch(`${url.replace('ws:', 'http:').replace('wss:', 'https:')}/${route}`, {
      method: 'POST',
      body: JSON.stringify(Object.assign(JSON.parse(JSON.stringify(pushSubscription)), { room })),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.text()).then(text => console.info('notification subscription', { this: this, text, url }))
    ).catch(error => console.error(error))
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
