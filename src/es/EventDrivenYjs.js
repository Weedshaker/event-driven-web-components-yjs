// @ts-check

import * as Y from './dependencies/yjs.js'

// https://github.com/yjs
/**
 * Constructor options
 @typedef {{
  namespace?: string,
  room?: string,
  websocketUrl?: string,
  webrtcUrl?: string
 }} options
*/

/**
 * this.init() result with Yjs, Providers and Notification
 @typedef {Promise<{ doc: import("./dependencies/yjs").Doc, providers: Promise<Providers>}>} YJS
*/

/**
 * Different Providers
 @typedef {import("./dependencies/y-websocket").WebsocketProvider | import("./dependencies/y-webrtc").WebrtcProvider | import("./dependencies/y-p2pt").P2ptProvider} ProviderTypes
*/

/**
 * Provider names
 @typedef {
  'websocket' | 'webrtc' | 'p2pt'
 } ProviderNames
*/

/**
 * Provider attribute names
 @typedef {
  'websocket-url' | 'webrtc-url' | 'p2pt'
 } ProviderAttributeNames
*/

/**
 * Provider container
 @typedef {
  Map<ProviderNames, Map<string, ProviderTypes>>
 } Providers
*/

/**
 * initial local state field user
 @typedef {{
  epoch: string,
  sessionEpoch: string,
  localEpoch: string,
  fingerprint: string,
  uid: string
  }} InitialUserValue
*/

// Events:
/**
 * outgoing event
 @typedef {{
  yjs: Promise<{ doc: import("./dependencies/yjs").Doc, providers: Providers}>,
  room: Promise<string>,
 }} LoadEventDetail
*/

/**
 * outgoing event
 @typedef {{
  provider: ProviderTypes,
  name: ProviderNames,
  url: URL,
  awareness: any,
  changes?: any,
  stateValues?: any,
  room: string
 } & InitialUserValue} AwarenessUpdateChangeEventDetail
*/

/**
 * outgoing event
 @typedef {{
  providers: Providers,
  websocketUrl: string,
  webrtcUrl: string
 }} ProvidersUpdateEventDetail
*/

/**
 * ingoing event
 @typedef {{
  command: string,
  arguments: any[],
  resolve?: any,
  observe?: boolean | string,
  observeDeep?: boolean,
  id?: string
 }} DocEventDetail
*/

/**
 * outgoing event
 @typedef {{
  command: string,
  arguments: any[],
  type: any,
  id?: string,
  room: string
 }} DocResultEventDetail
*/

/**
 * ingoing event
 @typedef {{
  command: string,
  resolve?: any,
  id?: string
 }} NewTypeEventDetail
*/

/**
 * outgoing event
 @typedef {{
  command: string,
  type: any,
  id?: string,
  room: Promise<string>
 }} NewTypeResultEventDetail
*/

/**
 * outgoing event
 @typedef {{
  yjsEvent: any,
  type: any,
  id: string,
  room: Promise<string>
 }} ObserveEventDetail
*/

/**
 * ingoing event
 @typedef {{
  resolve: any;
 }} GetProvidersEventDetail
*/

/**
 * ingoing event
 @typedef {{
  websocketUrl?: string,
  webrtcUrl?: string,
  noHistory?: boolean,
  resolve?: any
 }} UpdateProvidersEventDetail
*/

/**
 * ingoing event
 @typedef {{
  resolve?: any,
 }} LoadIndexeddbEventDetail
*/

/**
 * outgoing event
 @typedef {{
  indexeddb: import("./dependencies/y-indexeddb"),
  indexeddbPersistence: import("./dependencies/y-indexeddb").IndexeddbPersistence,
  data: any,
  room: Promise<string>
 }} IndexeddbSyncedEventDetail
*/

/**
 * ingoing event
 @typedef {{
  value: Object<string, any>,
  overwrite?: boolean
 }} SetLocalStateEventDetail
*/

/**
 * ingoing event
 @typedef {{
  key?: string,
  value: Object<string, any>,
  overwrite?: boolean
 }} SetLocalStateFieldEventDetail
*/

/**
 * ingoing event
 @typedef {{
  resolve: any,
 }} GetRoomEventDetail
*/

/**
 * ingoing event
 @typedef {{
  room: string,
  resolve?: any
 }} SetRoomEventDetail

/**
 * outgoing event
 @typedef {{
  resolve: any,
 }} RequestRoomEventDetail

/**
 * ingoing event
 @typedef {{
  resolve: any,
  url?: string,
  room?: string
 }} SubscribeNotificationsEventDetail

/**
 * ingoing event
 @typedef {{
  url?: string,
  room?: string
 }} UnsubscribeNotificationsEventDetail

/**
 * ingoing event
 @typedef {{
  resolve: any,
  data?: Object,
 }} SendNotificationEventDetail

/* global document */
/* global self */
/* global fetch */
/* global CustomEvent */
/* global location */
/* global history */
/* global HTMLElement */

// Supported attributes:
// Attribute {websocket-url} string comma separated list of all websocket urls
// Attribute {webrtc-url} string comma separated list of all webrtc urls
// Attribute {p2pt} has use p2pt
// Attribute {indexeddb} has use indexeddb
// Attribute {no-history} has don't write to the url with history.pushState
// Attribute {no-url-params} has don't use the url params
// Attribute {no-blur} don't react with awareness on blur
// Attribute {keep-alive} don't disconnect providers on disconnected callback
// Attribute {namespace} string default is yjs-, which gets prepend to each outgoing event string as well as on each listener event string
// Attribute {room} string is the room name at webrtc and websocket as well as the key for the indexeddb

/**
 * EventDrivenYjs is a helper to bring the docs events into a truly event driven environment
 *
 * @export
 * @function EventDrivenYjs
 * @param {CustomElementConstructor} [ChosenHTMLElement = HTMLElement]
 * @return {CustomElementConstructor | *}
 */
export const EventDrivenYjs = (ChosenHTMLElement = HTMLElement) => class EventDrivenYjs extends ChosenHTMLElement {
  static get observedAttributes () {
    return ['websocket-url', 'webrtc-url', 'room']
  }

  /**
   * Creates an instance of EventDrivenYjs. The constructor will be called for every custom element using this class when initially created.
   *
   * @param {options} [options = {namespace=undefined, room=undefined}]
   * @param {*} args
   */
  constructor (options = { namespace: undefined, room: undefined }, ...args) {
    super(...args)

    this.url = new URL(location.href)
    this.importMetaUrl = import.meta.url.replace(/(.*\/)(.*)$/, '$1')
    /**
     * @type {Providers}
     */
    this.providers = new Map()
    this.providers.set('websocket', new Map())
    this.providers.set('webrtc', new Map())
    this.providers.set('p2pt', new Map()) // NOTE: the p2pt provider is not ready yet and only for test purposes here
    /**
     * keep track of all awareness to which we have an event listener
     *
     * @type {any}
     */
    this.awarenesses = []
    /**
     * keep the locale states before blur or unload in this array which is length an pos synced to this.awarenesses
     *
     * @type {any}
     */
    this.awarenessLocalStates = []

    // set attribute namespace
    if (options.namespace) this.namespace = options.namespace
    else if (!this.namespace) this.namespace = 'yjs-'

    // set attribute room, which must be available at init/updateProvider and can only be set once
    /** @type {(any)=>void} */
    this.roomResolve = room => room
    this.room = new Promise(resolve => (this.roomResolve = resolve))
    // @ts-ignore
    if (!this.hasAttribute('no-url-params') && this.url.searchParams.get('room')) this.room = Promise.resolve(this.url.searchParams.get('room'))
    else if (options.room) this.room = Promise.resolve(options.room)
    // @ts-ignore
    else if (this.hasAttribute('room')) this.room = Promise.resolve(this.getAttribute('room'))
    // @ts-ignore
    this.room.done = false
    // @ts-ignore
    this.room.finally(() => (this.room.done = true))

    // set attribute websocket-url
    // @ts-ignore
    if (!this.hasAttribute('no-url-params') && this.url.searchParams.get('websocket-url')) this.websocketUrl = this.url.searchParams.get('websocket-url')
    else if (options.websocketUrl) this.websocketUrl = options.websocketUrl
    else if (!this.websocketUrl && (
      (!this.hasAttribute('no-url-params') && this.url.searchParams.has('websocket-url')) ||
      Object.hasOwnProperty.call(options, 'websocketUrl') ||
      this.hasAttribute('websocket-url')
    )) this.websocketUrl = '' //'wss://demos.yjs.dev'

    // set attribute webrtc-url
    // @ts-ignore
    if (!this.hasAttribute('no-url-params') && this.url.searchParams.get('webrtc-url')) this.webrtcUrl = this.url.searchParams.get('webrtc-url')
    else if (options.webrtcUrl) this.webrtcUrl = options.webrtcUrl
    else if (!this.webrtcUrl && (
      (!this.hasAttribute('no-url-params') && this.url.searchParams.has('webrtc-url')) ||
      Object.hasOwnProperty.call(options, 'webrtcUrl') ||
      this.hasAttribute('webrtc-url')
    )) this.webrtcUrl = '' //'wss://signaling.yjs.dev,wss://y-webrtc-signaling-eu.herokuapp.com,wss://y-webrtc-signaling-us.herokuapp.com'

    // Notifications
    /** @type {Promise<ServiceWorkerRegistration>} */
    this.serviceWorkerRegistration = navigator.serviceWorker.ready
    /** @type {Promise<PushSubscription>} */
    this.pushSubscription = this.serviceWorkerRegistration.then(
      serviceWorkerRegistration => {
        serviceWorkerRegistration.update()
        return serviceWorkerRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          // https://vapidkeys.com/
          applicationServerKey: 'BITPxH2Sa4eoGRCqJtvmOnGFCZibh_ZaUFNmzI_f3q-t2FwA3HkgMqlOqN37L2vwm_RBlwmbcmVSOjPeZCW6YI4',
        })
    })

    // Events:
    /**
     * consume doc commands to yjs through events
     *
     * @param {any & {detail: DocEventDetail}} event
     */
    this.docEventListener = async event => {
      if (event.detail.command && typeof event.detail.command === 'string') {
        const yjs = await this.yjs
        if (['getMap', 'getArray', 'getText', 'getXmlFragment'].includes(event.detail.command)) {
          if (!Array.isArray(event.detail.arguments)) return console.error('EventDrivenYjs expects an arguments array with the command string at [0]', event.detail.arguments)
          // namespace the yjs objects name with the room name
          event.detail.arguments[0] = `${await this.room}-${event.detail?.arguments[0]}`
        }
        const type = yjs.doc[event.detail.command](...event.detail.arguments)
        if (event.detail.observe) {
          type[event.detail.observeDeep
            ? 'observeDeep'
            : 'observe'
          ](yjsEvent => this.dispatch(typeof event.detail.observe === 'string' ? event.detail.observe : `${this.namespace}observe`,
            /** @type {ObserveEventDetail} */
            {
              yjsEvent,
              type,
              id: event.detail.id,
              room: this.room
            }
          ))
        }
        /** @type {DocResultEventDetail} */
        const detail = {
          command: event.detail.command,
          arguments: event.detail.arguments,
          type,
          id: event.detail.id,
          room: await this.room
        }
        if (event.detail.resolve) return event.detail.resolve(detail)
        this.dispatch(`${this.namespace}doc-result`, detail)
        // use a separate controller regarding doc-actions on the above created type
      }
    }

    /**
     * consume api commands to yjs through events, expl.: const yarrayNested = new Y.Array()
     *
     * @param {any & {detail: NewTypeEventDetail}} event
     */
    this.newTypeEventListener = event => {
      if (event.detail.command && typeof event.detail.command === 'string') {
        const type = new Y[event.detail.command]()
        /** @type {NewTypeResultEventDetail} */
        const detail = {
          command: event.detail.command,
          type,
          id: event.detail.id,
          room: this.room
        }
        if (event.detail.resolve) return event.detail.resolve(detail)
        this.dispatch(`${this.namespace}doc-result`, detail)
        // use a separate controller regarding doc-actions on the above created type
      }
    }

    /**
     * subscribe to url changes
     *
     * trigger this event by history.pushState(state, '', url) + dispatchEvent(new PopStateEvent('popstate', { state: state }))
     * otherwise this is only triggered by the user clicking the history navigation of the browser
     * more: https://stackoverflow.com/questions/10940837/history-pushstate-does-not-trigger-popstate-event
     *
     * @param {PopStateEvent} event
     */
    this.popstateEventListener = async event => {
      const newUrl = new URL(location.href)
      const oldRoom = this.url.searchParams.get('room')
      if (!oldRoom && newUrl.searchParams.get('room')) this.roomResolve(newUrl.searchParams.get('room'))
      await (await this.yjs).providers
      const oldWebsocketUrl = this.url.searchParams.get('websocket-url')
      const oldWebrtcUrl = this.url.searchParams.get('webrtc-url')
      this.url = newUrl
      if (oldWebsocketUrl !== this.url.searchParams.get('websocket-url')) this.websocketUrl = this.url.searchParams.get('websocket-url') || ''
      if (oldWebrtcUrl !== this.url.searchParams.get('webrtc-url')) this.webrtcUrl = this.url.searchParams.get('webrtc-url') || ''
    }

    /**
     * getAttribute webrtc-url & websocket-url through event
     *
     * @param {any & {detail: GetProvidersEventDetail}} event
     */
    this.getProvidersEventListener = async event => {
      await (await this.yjs).providers
      if (event && event.detail && event.detail.resolve) {
        return event.detail.resolve({
          providers: this.providers,
          websocketUrl: this.websocketUrl,
          webrtcUrl: this.webrtcUrl
        })
      }
    }

    /**
     * setAttribute webrtc-url & websocket-url through event
     *
     * @param {any & {detail: UpdateProvidersEventDetail}} event
     */
    this.updateProvidersEventListener = async event => {
      await (await this.yjs).providers
      if (event.detail.noHistory) this.setAttribute('no-history', event.detail.noHistory)
      if (event.detail.websocketUrl !== undefined) this.setAttribute('websocket-url', event.detail.websocketUrl)
      if (event.detail.webrtcUrl !== undefined) this.setAttribute('webrtc-url', event.detail.webrtcUrl)
      if (event.detail.resolve) event.detail.resolve(await (await this.yjs).providers)
    }

    /**
     * @param {any & {detail: LoadIndexeddbEventDetail}} event
     * @param {import("./dependencies/yjs").Doc | any} [doc=this.yjs.doc]
     * @return {Promise<void>}
     */
    this.loadIndexeddbEventListener = async (event, doc) => {
      if (!doc) doc = (await this.yjs).doc

      /** @type {import("./dependencies/y-indexeddb")} */
      const indexeddb = await import('./dependencies/y-indexeddb.js')
      /** @type {import("./dependencies/y-indexeddb").IndexeddbPersistence} */
      const indexeddbPersistence = new indexeddb.IndexeddbPersistence(await this.room, doc)
      indexeddbPersistence.whenSynced.then(data => {
        /** @type {IndexeddbSyncedEventDetail} */
        const detail = {
          indexeddb,
          indexeddbPersistence,
          data,
          room: this.room
        }
        if (event && event.detail && event.detail.resolve) return event.detail.resolve(detail)
        this.dispatch(`${this.namespace}indexeddb-synced`, detail)
      })
    }

    /**
     * set all awarenesses local state
     *
     * @param {any & {detail: SetLocalStateEventDetail}} event
     */
    this.setLocalStateEventListener = async event => {
      await this.yjs
      if (event.detail.value) {
        this.awarenesses.forEach(awareness => awareness.setLocalState(event.detail.overwrite
          ? event.detail.value
          : {
              ...(awareness.getLocalState() || {}),
              ...event.detail.value
            }
        ))
      }
    }
    /**
     * set all awarenesses local state field
     *
     * @param {any & {detail: SetLocalStateFieldEventDetail}} event
     */
    this.setLocalStateFieldEventListener = async event => {
      await this.yjs
      if (event.detail.value) {
        this.awarenesses.forEach(awareness => {
          const key = event.detail.key || 'user'
          awareness.setLocalStateField(key, event.detail.overwrite
            ? event.detail.value
            : {
                ...(awareness.getLocalState()[key] || {}),
                ...event.detail.value
              }
          )
        })
      }
    }

    /**
     * set the room
     *
     * @param {any & {detail: SetRoomEventDetail}} event
     */
    this.setRoomEventListener = event => {
      this.roomResolve(event.detail.room)
      event.detail.resolve({ room: this.room })
    }

    /**
     * deliver the room
     *
     * @param {any & {detail: GetRoomEventDetail}} event
     */
    this.getRoomEventListener = event => event.detail.resolve({ room: this.room })

    // Notification Events
    this.subscribeNotificationsEventListenerOnce = event => navigator.serviceWorker.register(`${this.importMetaUrl}../../MasterServiceWorker.js`, { scope: './' })

    /**
     * subscribe to notifications
     *
     * @param {any & {detail: SubscribeNotificationsEventDetail}} event
     */
    this.subscribeNotificationsEventListener = event => {
      self.Notification.requestPermission(async (result) => {
        if (result === 'granted') {
          await (await this.yjs).providers
          if (event.detail.url) {
            this.setNotification(event.detail.url, 'subscribe', event.detail.room || await this.room)
          } else {
            // @ts-ignore
            this.providers.get('websocket').forEach(
              /**
               * @param {ProviderTypes} provider
               */
              async (provider, url) => {
                const origin = (new URL(url)).origin
                if (this.websocketUrl.includes(origin)) this.setNotification(origin, 'subscribe', event.detail.room || await this.room)
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
      await (await this.yjs).providers
      if (event.detail.url) {
        this.setNotification(event.detail.url, 'unsubscribe', event.detail.room || await this.room)
      } else {
        // @ts-ignore
        this.providers.get('websocket').forEach(
          /**
           * @param {ProviderTypes} provider
           */
          async (provider, url) => this.setNotification((new URL(url)).origin, 'unsubscribe', event.detail.room || await this.room)
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
        if (result === 'granted') {
          this.serviceWorkerRegistration.then(serviceWorkerRegistration => {
            if (!serviceWorkerRegistration.active) return
            serviceWorkerRegistration.active.postMessage(JSON.stringify({
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

    // https://docs.yjs.dev/api/about-awareness#awareness-crdt-api
    // set the last known local state on focus, connected
    this.focusEventListener = async event => {
      await (await this.yjs).providers
      this.awarenesses.forEach((awareness, i) => {
        if (this.awarenessLocalStates[i] && !awareness.getLocalState()) awareness.setLocalState(this.awarenessLocalStates[i])
      })
    }
    this.beforeunloadEventListener = async event => {
      this.blurEventListener()
      // TODO: Send message to MasterServiceWorker.js to ignore the notifications for the next 2min
      // reason: when connection aka. tab closes the user object updates and triggers an immediate notification, which by itself outsets further relevant notifications.
    }
    // save the last known local state and set the local state to null on blur, disconnect or unload
    this.blurEventListener = async event => {
      await (await this.yjs).providers
      this.awarenesses.forEach((awareness, i) => {
        let localState
        if ((localState = awareness.getLocalState())) {
          this.awarenessLocalStates[i] = localState
          awareness.setLocalState(null)
        }
      })
    }

    /** @type {YJS} */
    this.yjs = this.init()
    // delay indexeddb updates until the document and its docEventListeners are ready
    if (this.hasAttribute('indexeddb')) this.yjs.then(({ doc }) => this.loadIndexeddbEventListener(undefined, doc))
  }

  /**
   * initialize the yjs doc
   *
   * @return {YJS}
   */
  async init () {
    const doc = new Y.Doc()
    const providers = this.updateProviders(doc)
    return { doc, providers }
  }

  /**
   * create or destory providers as required
   *
   * @param {import("./dependencies/yjs").Doc | any} [doc=this.yjs.doc]
   * @param {'websocket-url' | 'webrtc-url'} [name=undefined]
   * @return {Promise<Providers>}
   */
  async updateProviders (doc, name) {
    if (!doc) doc = (await this.yjs).doc
    const room = await this.room

    if (!name || name === 'websocket-url') {
      /** @type {Map<string, ProviderTypes>} */
      // @ts-ignore
      const websocketMap = this.providers.get('websocket')
      if (this.websocketUrl) {
        const websocketUrls = this.websocketUrl.split(',').filter(websocketUrl => websocketUrl).map(websocketUrl => new URL(websocketUrl))
        /** @type {import("./dependencies/y-websocket")} */
        const websocket = await import('./dependencies/y-websocket.js')
        websocketUrls.forEach(websocketUrl => {
          if (websocketMap.has(websocketUrl.href)) {
            websocketMap.get(websocketUrl.href)?.connect()
          } else {
            // grab and remove query parameters from websocketUrl and add those to the room, for passing it to the websocket req.url
            websocketMap.set(websocketUrl.href, new websocket.WebsocketProvider(self.decodeURIComponent(websocketUrl.origin), `${room}${websocketUrl.search}`, doc))
          }
        })
        websocketMap.forEach(
          /**
           * @param {ProviderTypes} provider
           * @param {string} url
           */
          (provider, url) => {
            if (!websocketUrls.some(websocketUrl => (websocketUrl.href === url))) {
              provider?.disconnect()
              this.setNotification((new URL(url)).origin, 'unsubscribe', room)
            }
          }
        )
      } else {
        websocketMap.forEach(
          /**
           * @param {ProviderTypes} provider
           */
          (provider, url) => {
            provider?.disconnect()
            this.setNotification((new URL(url)).origin, 'unsubscribe', room)
          }
        )
      }
    }

    if (!name || name === 'webrtc-url') {
      /** @type {Map<string, ProviderTypes>} */
      // @ts-ignore
      const webrtcMap = this.providers.get('webrtc')
      if (this.webrtcUrl) {
        if (webrtcMap.has(this.webrtcUrl)) {
          webrtcMap.get(this.webrtcUrl)?.connect()
        } else {
          /** @type {import("./dependencies/y-webrtc")} */
          const webrtc = await import('./dependencies/y-webrtc.js')
          webrtcMap.set(this.webrtcUrl, new webrtc.WebrtcProvider(room, doc,
            {
              signaling: this.webrtcUrl.split(',').filter(url => url).map(url => self.decodeURIComponent(url))
            }
          ))
        }
        webrtcMap.forEach(
          /**
           * @param {ProviderTypes} provider
           * @param {string} url
           */
          (provider, url) => {
            if (this.webrtcUrl !== url) provider?.disconnect()
          }
        )
      } else {
        webrtcMap.forEach(
          /**
           * @param {ProviderTypes} provider
           */
          provider => provider?.disconnect()
        )
      }
    }

    if (!name) {
      /** @type {Map<string, ProviderTypes>} */
      // @ts-ignore
      const p2ptMap = this.providers.get('p2pt')
      if (this.hasAttribute('p2pt')) {
        if (p2ptMap.has('p2pt')) {
          p2ptMap.get('p2pt')?.connect()
        } else {
          /** @type {import("./dependencies/y-p2pt")} */
          const p2pt = await import('./dependencies/y-p2pt.js')
          p2ptMap.set('p2pt', new p2pt.P2ptProvider(room, doc))
        }
      } else if (p2ptMap.has('p2pt')) {
        p2ptMap.get('p2pt')?.disconnect()
      }
    }

    /** @type {InitialUserValue} */
    const initialUserValue = {
      epoch: this.epoch,
      sessionEpoch: await this.getEpochStorage('session'),
      localEpoch: await this.getEpochStorage('local'),
      fingerprint: await this.fingerprint,
      // TODO: Already tried: https://github.com/jackspirou/clientjs and now https://fingerprintjs.github.io/fingerprintjs/ but both libraries do not deliver consistent fingerprints, means the same browser with the same localStorage would get different fingerprints assigned. Conclusion: Using the uuid with the timestamp for this uid property.
      //uid: JSON.stringify({ ...JSON.parse(await this.getEpochStorage('local')), fingerprint: await this.fingerprint })
      uid: await this.getEpochStorage('local')
    }

    /**
     * listen to awareness update & change
     *
     * @param {ProviderTypes} provider
     * @param {ProviderNames} name
     * @param {string} url
     */
    const awarenessAddEventListener = (provider, name, url) => {
      if (this.awarenesses.includes(provider.awareness)) return
      this.awarenesses.push(provider.awareness)
      /** @type {AwarenessUpdateChangeEventDetail} */
      const detail = {
        provider,
        name,
        url: new URL(url),
        room,
        awareness: provider.awareness,
        ...initialUserValue
      }
      // awareness events
      // https://docs.yjs.dev/api/about-awareness#awareness-crdt-api
      provider.awareness.on('update', changes => this.dispatch(`${this.namespace}${name}-awareness-update`,
        /** @type {AwarenessUpdateChangeEventDetail} */
        {
          ...detail,
          changes,
          stateValues: Array.from(provider.awareness.getStates().values())
        }
      ))
      provider.awareness.on('change', changes => this.dispatch(`${this.namespace}${name}-awareness-change`,
        /** @type {AwarenessUpdateChangeEventDetail} */
        {
          ...detail,
          changes,
          stateValues: Array.from(provider.awareness.getStates().values())
        }
      ))
      // set the initial user local state field
      provider.awareness.setLocalStateField('user', initialUserValue)
    }
    // loop each provider to add awareness event listener
    this.providers.forEach(
      /**
       * @param {Map<string, ProviderTypes>} providerMap
       * @param {ProviderNames} name
       */
      (providerMap, name) => providerMap.forEach(
        /**
         * @param {ProviderTypes} provider
         * @param {string} url
         */
        (provider, url) => awarenessAddEventListener(provider, name, url)
      )
    )
    this.dispatch(`${this.namespace}${name}-providers-update`,
      /** @type {ProvidersUpdateEventDetail} */
      {
        providers: this.providers,
        websocketUrl: this.websocketUrl,
        webrtcUrl: this.webrtcUrl
      }
    )
    return this.providers
  }

  /**
   * sets all providers (related attributes) to empty strings
   *
   * @return {Promise<void>}
   */
  async disconnectAllProviders () {
    /**
     * @param {ProviderAttributeNames} name
     * @param {Map<ProviderAttributeNames, string | null>} memory
     * @return {Map<ProviderAttributeNames, string | null>}
     */
    const removeAttributes = (name, memory) => {
      if (this.hasAttribute(name)) {
        memory.set(name, this.getAttribute(name))
        this.removeAttribute(name)
      }
      return memory
    }
    /** @type {Map<ProviderAttributeNames, string | null>} */
    this.removedAttributes = new Map()
    removeAttributes('p2pt', this.removedAttributes)
    removeAttributes('websocket-url', this.removedAttributes)
    removeAttributes('webrtc-url', this.removedAttributes);
    (await this.yjs).providers = this.updateProviders()
  }

  /**
   * recovers all providers
   *
   * @return {Promise<void>}
   */
  async reconnectAllProviders () {
    if (!this.removedAttributes) return
    this.removedAttributes.forEach(
      /**
       * @param {string | null} value
       * @param {ProviderAttributeNames} name
       */
      (value, name) => {
        if (!this.hasAttribute(name)) this.setAttribute(name, value || '')
      }
    )
    delete this.removedAttributes;
    (await this.yjs).providers = this.updateProviders()
  }

  /**
   * Lifecycle callback, triggered when node is attached to the dom
   *
   * @return {void}
   */
  connectedCallback () {
    this.addEventListener(`${this.namespace}doc`, this.docEventListener)
    this.addEventListener(`${this.namespace}api`, this.newTypeEventListener)
    this.addEventListener(`${this.namespace}get-providers`, this.getProvidersEventListener)
    this.addEventListener(`${this.namespace}update-providers`, this.updateProvidersEventListener)
    this.addEventListener(`${this.namespace}load-indexeddb`, this.loadIndexeddbEventListener)
    this.addEventListener(`${this.namespace}set-local-state`, this.setLocalStateEventListener)
    this.addEventListener(`${this.namespace}set-local-state-field`, this.setLocalStateFieldEventListener)
    this.addEventListener(`${this.namespace}set-room`, this.setRoomEventListener)
    this.addEventListener(`${this.namespace}get-room`, this.getRoomEventListener)
    this.addEventListener(`${this.namespace}subscribe-notifications`, this.subscribeNotificationsEventListenerOnce, {once: true})
    this.addEventListener(`${this.namespace}subscribe-notifications`, this.subscribeNotificationsEventListener)
    this.addEventListener(`${this.namespace}unsubscribe-notifications`, this.unsubscribeNotificationsEventListener)
    this.addEventListener(`${this.namespace}send-notification`, this.sendNotificationEventListener)
    this.focusEventListener()
    self.addEventListener('focus', this.focusEventListener)
    if (!this.hasAttribute('no-blur')) self.addEventListener('blur', this.blurEventListener)
    self.addEventListener('beforeunload', this.beforeunloadEventListener)
    self.addEventListener('popstate', this.popstateEventListener)
    document.body.setAttribute(`${this.namespace}load`, 'true')
    this.dispatch(`${this.namespace}load`,
      /** @type {LoadEventDetail} */
      {
        yjs: this.yjs,
        room: this.room
      }
    )
    // @ts-ignore
    if (!this.room.done) {
      this.dispatch(`${this.namespace}request-room`,
      /** @type {RequestRoomEventDetail} */
        {
          resolve: this.roomResolve
        }
      )
    }
    this.reconnectAllProviders()
  }

  /**
   * Lifecycle callback, triggered when node is detached from the dom
   *
   * @return {void}
   */
  disconnectedCallback () {
    this.removeEventListener(`${this.namespace}doc`, this.docEventListener)
    this.removeEventListener(`${this.namespace}api`, this.newTypeEventListener)
    this.removeEventListener(`${this.namespace}get-providers`, this.getProvidersEventListener)
    this.removeEventListener(`${this.namespace}update-providers`, this.updateProvidersEventListener)
    this.removeEventListener(`${this.namespace}load-indexeddb`, this.loadIndexeddbEventListener)
    this.removeEventListener(`${this.namespace}set-local-state`, this.setLocalStateEventListener)
    this.removeEventListener(`${this.namespace}set-local-state-field`, this.setLocalStateFieldEventListener)
    this.removeEventListener(`${this.namespace}set-room`, this.setRoomEventListener)
    this.removeEventListener(`${this.namespace}get-room`, this.getRoomEventListener)
    this.removeEventListener(`${this.namespace}subscribe-notifications`, this.subscribeNotificationsEventListener)
    this.removeEventListener(`${this.namespace}unsubscribe-notifications`, this.unsubscribeNotificationsEventListener)
    this.removeEventListener(`${this.namespace}send-notification`, this.sendNotificationEventListener)
    this.blurEventListener()
    self.removeEventListener('focus', this.focusEventListener)
    if (!this.hasAttribute('no-blur')) self.removeEventListener('blur', this.blurEventListener)
    self.removeEventListener('beforeunload', this.beforeunloadEventListener)
    self.removeEventListener('popstate', this.popstateEventListener)
    document.body.removeAttribute(`${this.namespace}load`)
    if (!this.hasAttribute('keep-alive')) this.disconnectAllProviders()
  }

  async attributeChangedCallback (name, oldValue, newValue) {
    newValue = this.getAttribute(name) // the new value eventually already changed, here we make sure to work with the most recent
    if ((name === 'websocket-url' || name === 'webrtc-url') && oldValue !== newValue) {
      this.pushState(name, newValue);
      (await this.yjs).providers = this.updateProviders(undefined, name)
    } else if (name === 'room' && !oldValue && newValue) {
      this.pushState(name, newValue)
      this.roomResolve(newValue)
    }
  }

  /**
   * pushState to History
   *
   * @param {string} key
   * @param {string} value
   * @return {void}
   */
  pushState (key, value) {
    const oldValue = this.url.searchParams.get(key)
    if (!this.hasAttribute('no-history') && oldValue !== value) {
      if (!value) {
        this.url.searchParams.delete(key)
      } else {
        this.url.searchParams.set(key, value)
      }
      history.pushState(history.state, document.title, this.url.href)
    }
  }

  /**
   * dispatchEvent function which chooses to dispatch from document.body, if not connected
   *
   * @param {string} name
   * @param {any} detail
   * @param {HTMLElement} node
   * @return {void}
   */
  dispatch (name, detail, node = this.isConnected ? this : document.body) {
    node.dispatchEvent(new CustomEvent(name, {
      detail,
      bubbles: true,
      cancelable: true,
      composed: true
    }))
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
    // Subscribe for notifications
    return this.pushSubscription.then(pushSubscription => fetch(`${url.replace('ws:', 'http:').replace('wss:', 'https:')}/${route}`,{
        method: "POST",
        body: JSON.stringify(Object.assign(JSON.parse(JSON.stringify(pushSubscription)), {room})),
        headers: {
          "Content-Type": "application/json",
        }
      }).then(resp => resp.text()).then(text => console.info('notification subscription', {this: this, text, url}))
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

  /**
   * The room is used as the room name
   * priority of value appliance: url param, options, attribute
   *
   * @param {Promise<string>} value
   */
  set room (value) {
    this._room = value
    value.then(room => {
      if (room) this.setAttribute('room', room)
    })
  }

  /**
   * @return {Promise<string>}
   */
  get room () {
    // @ts-ignore
    return this._room
  }

  /**
   * priority of value appliance: url param, options, attribute
   *
   * @param {string} value
   */
  set websocketUrl (value) {
    this.setAttribute('websocket-url', value)
  }

  /**
   * @return {string}
   */
  get websocketUrl () {
    // @ts-ignore
    return this.getAttribute('websocket-url')
  }

  /**
   * priority of value appliance: url param, options, attribute
   *
   * @param {string} value
   */
  set webrtcUrl (value) {
    this.setAttribute('webrtc-url', value)
  }

  /**
   * @return {string}
   */
  get webrtcUrl () {
    // @ts-ignore
    return this.getAttribute('webrtc-url')
  }

  /**
   * @return {Promise<string>}
   */
  get fingerprint () {
    // FingerprintJS does not work with ES6 Imports and for that we fetch it
    return this._fingerprint || (this._fingerprint = import(`${this.importMetaUrl}dependencies/fp.min.js`).then(
      FingerprintJS => FingerprintJS.load()
    ).then(
      fp => fp.get()
    ).then(
      result => result.visitorId
    ).catch(error => 'no-fingerprint:' + error))
  }

  /**
   * @return {string}
   */
  get epoch () {
    return this._epoch || (this._epoch = JSON.stringify({ epoch: Date.now(), uuid: self.crypto.randomUUID() }))
  }

  /**
   * @param {'session' | 'local'} name
   * @return {Promise<string>}
   */
  async getEpochStorage (name) {
    const key = `${this.namespace}${await this.room}-${name}-epoch`
    let epoch = self[`${name}Storage`].getItem(key)
    if (epoch) return epoch
    self[`${name}Storage`].setItem(key, String(epoch = this.epoch))
    return epoch
  }
}
