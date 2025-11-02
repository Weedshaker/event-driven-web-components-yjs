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
 * this.init() result with Yjs and Providers
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
  uid: string,
  awarenessEpoch?: string,
  publicKey?: string
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
 * AwarenessUpdateChangeEvent can be triggered manually, when there is no provider active, to create uid, etc. Then some values are null.
 * outgoing event
 @typedef {{
  provider: ProviderTypes | null,
  providers: Providers,
  isProviderConnected: (ProviderTypes) => boolean,
  name: ProviderNames | null,
  url: URL | string,
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
  isProviderConnected: (ProviderTypes) => boolean,
  websocketUrl: string,
  webrtcUrl: string,
  locationHref: string
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
  resolve?: any;
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
  resolve?: any,
 }} GetRoomEventDetail
*/

/**
 * ingoing event
 @typedef {{
  room: string,
  resolve?: any
 }} SetRoomEventDetail
*/

/**
 * outgoing event
 @typedef {{
  resolve: any,
 }} RequestRoomEventDetail
*/

/* global document */
/* global self */
/* global CustomEvent */
/* global location */
/* global history */
/* global HTMLElement */

// Supported attributes:
// Attribute {websocket-url} string comma separated list of all websocket urls
// Attribute {webrtc-url} string comma separated list of all webrtc urls
// Attribute {p2pt} has use p2pt
// Attribute {indexeddb} has use indexeddb
// Attribute {no-history} has don't write to the url with history.replaceState
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
    this.hasProvider = (providers = this.providers) => Array.from(providers).some(([name, providerMap]) => providerMap.size)
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
    )) this.websocketUrl = '' // 'wss://demos.yjs.dev'

    // set attribute webrtc-url
    // @ts-ignore
    if (!this.hasAttribute('no-url-params') && this.url.searchParams.get('webrtc-url')) this.webrtcUrl = this.url.searchParams.get('webrtc-url')
    else if (options.webrtcUrl) this.webrtcUrl = options.webrtcUrl
    else if (!this.webrtcUrl && (
      (!this.hasAttribute('no-url-params') && this.url.searchParams.has('webrtc-url')) ||
      Object.hasOwnProperty.call(options, 'webrtcUrl') ||
      this.hasAttribute('webrtc-url')
    )) this.webrtcUrl = '' // 'wss://signaling.yjs.dev,wss://y-webrtc-signaling-eu.herokuapp.com,wss://y-webrtc-signaling-us.herokuapp.com'

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
        this.dispatch(`${this.namespace}type-result`, detail)
        // use a separate controller regarding doc-actions on the above created type
      }
    }

    /**
     * subscribe to url changes
     *
     * trigger this event by history navigation of the browser
     * don't hijack this by history.pushState(state, '', url) through a proxy analog https://github.com/Weedshaker/event-driven-web-components-router/blob/master/src/Router.js#L142 but use the events set-room and update-providers to change the url parameters
     *
     * @param {PopStateEvent} event
     */
    this.popstateEventListener = async event => {
      const newUrl = new URL(location.href)
      const oldRoom = this.url.searchParams.get('room')
      if (!oldRoom && newUrl.searchParams.get('room')) this.roomResolve(newUrl.searchParams.get('room'))
    }

    /**
     * getAttribute webrtc-url & websocket-url through event
     *
     * @param {any & {detail: GetProvidersEventDetail}} event
     */
    this.getProvidersEventListener = async event => {
      await (await this.yjs).providers
      const detail = {
        providers: this.providers,
        isProviderConnected: this.isProviderConnected,
        websocketUrl: this.websocketUrl,
        webrtcUrl: this.webrtcUrl,
        locationHref: location.href
      }
      if (event && event.detail && event.detail.resolve) return event.detail.resolve(detail)
      this.dispatch(`${this.namespace}providers`, detail)
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
      await (await this.yjs).providers
      const detail = {
        providers: this.providers,
        isProviderConnected: this.isProviderConnected,
        websocketUrl: this.websocketUrl,
        webrtcUrl: this.webrtcUrl,
        locationHref: location.href
      }
      if (event && event.detail && event.detail.resolve) return event.detail.resolve(detail)
      this.dispatch(`${this.namespace}providers`, detail)
    }

    /**
     * @param {any & {detail: LoadIndexeddbEventDetail}} event
     * @param {import("./dependencies/yjs").Doc | any} [doc=this.yjs.doc]
     * @return {Promise<void>}
     */
    this.loadIndexeddbEventListener = async (event, doc) => {
      if (!doc) doc = (await this.yjs).doc

      /** @type {import("./dependencies/y-indexeddb")} */
      const indexeddb = await this.importIndexeddb
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
      const detail = { room: this.room, locationHref: location.href }
      if (event && event.detail && event.detail.resolve) return event.detail.resolve(detail)
      this.dispatch(`${this.namespace}room`, detail)
    }

    /**
     * deliver the room
     *
     * @param {any & {detail: GetRoomEventDetail}} event
     */
    this.getRoomEventListener = event => {
      const detail = { room: this.room, locationHref: location.href }
      if (event && event.detail && event.detail.resolve) return event.detail.resolve(detail)
      this.dispatch(`${this.namespace}room`, detail)
    }

    // https://docs.yjs.dev/api/about-awareness#awareness-crdt-api
    // set the last known local state on focus, connected
    this.focusEventListener = async event => {
      await (await this.yjs).providers
      this.awarenesses.forEach((awareness, i) => {
        if (this.awarenessLocalStates[i] && !awareness.getLocalState()) awareness.setLocalState(this.awarenessLocalStates[i])
      })
    }
    this.beforeunloadEventListener = async event => this.blurEventListener()
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
    const providers = this.updateProviders(doc, undefined, 'init')
    return { doc, providers }
  }

  /**
   * create or destory providers as required
   *
   * @param {import("./dependencies/yjs").Doc | any} [doc=this.yjs.doc]
   * @param {'websocket-url' | 'webrtc-url'} [name=undefined]
   * @param {string} [message=undefined]
   * @return {Promise<Providers>}
   */
  async updateProviders (doc, name, message) {
    if (!doc) doc = (await this.yjs).doc
    const room = await this.room

    if (!name || name === 'websocket-url') {
      /** @type {Map<string, ProviderTypes>} */
      // @ts-ignore
      const websocketMap = this.providers.get('websocket')
      if (this.websocketUrl) {
        const websocketUrls = this.websocketUrl.split(',').filter(websocketUrl => {
          try {
            new URL(websocketUrl) // eslint-disable-line
            return true
          } catch (error) {
            return false
          }
        }).map(websocketUrl => new URL(websocketUrl))
        /** @type {import("./dependencies/y-websocket")} */
        const websocket = await this.importWebsocket
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
              this.dispatch(`${this.namespace}unsubscribe-notifications`, {
                url: (new URL(url)).origin,
                room
              })
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
            this.dispatch(`${this.namespace}unsubscribe-notifications`, {
              url: (new URL(url)).origin,
              room
            })
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
          const webrtc = await this.importWebrtc
          webrtcMap.set(this.webrtcUrl, new webrtc.WebrtcProvider(room, doc,
            {
              signaling: this.webrtcUrl.split(',').filter(url => {
                try {
                  new URL(url) // eslint-disable-line
                  return true
                } catch (error) {
                  return false
                }
              }).map(url => self.decodeURIComponent(url))
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

    // TODO: P2pt is not yet working... see task add/make new providers
    if (!name) {
      /** @type {Map<string, ProviderTypes>} */
      // @ts-ignore
      const p2ptMap = this.providers.get('p2pt')
      if (this.hasAttribute('p2pt')) {
        if (p2ptMap.has('p2pt')) {
          p2ptMap.get('p2pt')?.connect()
        } else {
          /** @type {import("./dependencies/y-p2pt")} */
          const p2pt = await this.importP2pt
          p2ptMap.set('p2pt', new p2pt.P2ptProvider(room, doc))
        }
      } else if (p2ptMap.has('p2pt')) {
        p2ptMap.get('p2pt')?.disconnect()
      }
    }

    /** @type {InitialUserValue} */
    const initialUserValue = {
      epoch: this.epoch, // first script execution time
      sessionEpoch: await this.getEpochStorage('session'),
      localEpoch: await this.getEpochStorage('local'),
      fingerprint: await this.fingerprint,
      // TODO: Already tried: https://github.com/jackspirou/clientjs and now https://fingerprintjs.github.io/fingerprintjs/ but both libraries do not deliver consistent fingerprints, means the same browser with the same localStorage would get different fingerprints assigned. Conclusion: Using the uuid with the timestamp for this uid property.
      // uid: JSON.stringify({ ...JSON.parse(await this.getEpochStorage('local')), fingerprint: await this.fingerprint })
      uid: await this.getEpochStorage('local'),
      publicKey: this.hasAttribute('use-public-key')
        ? JSON.stringify(await new Promise(resolve => this.dispatch(`${this.namespace}get-active-room-public-key`,{ resolve })))
        : undefined
    }

    /**
     * listen to awareness update & change
     *
     * @param {ProviderTypes | null} provider
     * @param {ProviderNames | null} name
     * @param {string} url
     */
    const awarenessAddEventListener = (provider, name, url) => {
      if (provider) {
        if(this.awarenesses.includes(provider.awareness)) return
        this.awarenesses.push(provider.awareness)
      }
      /** @type {AwarenessUpdateChangeEventDetail} */
      const detail = {
        provider,
        providers: this.providers,
        isProviderConnected: this.isProviderConnected,
        name,
        // webrtc handles multiple urls for signaling, thats why this provider has no valid url, eg: ws://localhost:1234,ws://localhost:4444
        url: !url || name === 'webrtc' ? url : new URL(url),
        room,
        awareness: provider?.awareness,
        ...initialUserValue
      }
      if (provider) {
        // awareness events
        // https://docs.yjs.dev/api/about-awareness#awareness-crdt-api
        provider.awareness.on('update', changes => this.dispatch(`${this.namespace}${name}-awareness-update`,
          /** @type {AwarenessUpdateChangeEventDetail} */
          {
            ...detail,
            awarenessEpoch: EventDrivenYjs.epochDateNow, // awareness update time
            changes,
            stateValues: Array.from(provider.awareness.getStates().values())
          }
        ))
        provider.awareness.on('change', changes => this.dispatch(`${this.namespace}${name}-awareness-change`,
          /** @type {AwarenessUpdateChangeEventDetail} */
          {
            ...detail,
            awarenessEpoch: EventDrivenYjs.epochDateNow, // awareness update time
            changes,
            stateValues: Array.from(provider.awareness.getStates().values())
          }
        ))
        // set the initial user local state field
        provider.awareness.setLocalStateField('user', initialUserValue)
      } else {
        // no providers but trigger the event listener awarenessChangeEventListener at src/es/event-driven-web-components-yjs/src/es/controllers/Users.js:108 by using webrtc-awareness-change
        this.dispatch(`${this.namespace}webrtc-awareness-change`,
          /** @type {AwarenessUpdateChangeEventDetail} */
          {
            ...detail,
            awarenessEpoch: EventDrivenYjs.epochDateNow, // awareness update time
            changes: null,
            stateValues: null
          }
        )
      }
    }
    // loop each provider to add awareness event listener
    if (this.hasProvider()) {
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
    } else {
      // no event is fired when there is no provider where no awareness gets connected, so we send the initial values about the own user manually
      awarenessAddEventListener(null, null, '')
    }
    // without timeout this gets fired on boot up twice, since init and attribute changed call update providers
    clearTimeout(this._updateProviderTimeoutId)
    this._updateProviderTimeoutId = setTimeout(() => {
      this.dispatch(`${this.namespace}providers-update`,
        /** @type {ProvidersUpdateEventDetail} */
        {
          providers: this.providers,
          isProviderConnected: this.isProviderConnected,
          websocketUrl: this.websocketUrl,
          webrtcUrl: this.webrtcUrl,
          locationHref: location.href,
          message
        }
      )
    }, 50)
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
    (await this.yjs).providers = this.updateProviders(undefined, undefined, 'disconnectAllProviders')
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
    (await this.yjs).providers = this.updateProviders(undefined, undefined, 'reconnectAllProviders')
  }

  /**
   * ensure url location search consistency
   *
   * @return {Promise<void>}
   */
  async fixUrlSearchParams () {
    if (location.search !== this.url.search) {
      this.replaceState('room', await this.room || '')
      this.replaceState('websocket-url', this.websocketUrl || '')
      this.replaceState('webrtc-url', this.webrtcUrl || '')
    }
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
    this.focusEventListener()
    self.addEventListener('focus', this.focusEventListener)
    if (!this.hasAttribute('no-blur')) self.addEventListener('blur', this.blurEventListener)
    self.addEventListener('beforeunload', this.beforeunloadEventListener)
    self.addEventListener('popstate', this.popstateEventListener)
    this.globalEventTarget.setAttribute(`${this.namespace}load`, 'true')
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
    this.fixUrlSearchParams()
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
    this.blurEventListener()
    self.removeEventListener('focus', this.focusEventListener)
    if (!this.hasAttribute('no-blur')) self.removeEventListener('blur', this.blurEventListener)
    self.removeEventListener('beforeunload', this.beforeunloadEventListener)
    self.removeEventListener('popstate', this.popstateEventListener)
    this.globalEventTarget.removeAttribute(`${this.namespace}load`)
    if (!this.hasAttribute('keep-alive')) this.disconnectAllProviders()
  }

  async attributeChangedCallback (name, oldValue, newValue) {
    newValue = this.getAttribute(name) // the new value eventually already changed, here we make sure to work with the most recent
    if ((name === 'websocket-url' || name === 'webrtc-url') && oldValue !== newValue) {
      this.replaceState(name, newValue);
      (await this.yjs).providers = this.updateProviders(undefined, name, 'attributeChangedCallback')
    } else if (name === 'room' && !oldValue && newValue) {
      this.replaceState(name, newValue)
      this.roomResolve(newValue)
    }
  }

  /**
   * replaceState to History
   *
   * @param {string} key
   * @param {string} value
   * @return {void}
   */
  replaceState (key, value) {
    const oldValue = this.url.searchParams.get(key)
    if (!this.hasAttribute('no-history') && this.isConnected && oldValue !== value) {
      if (!value) {
        this.url.searchParams.delete(key)
      } else {
        this.url.searchParams.set(key, value)
      }
      history.replaceState(history.state, document.title, this.url.href)
    }
  }

  /**
   * dispatchEvent function which chooses to dispatch from this.globalEventTarget, if not connected
   *
   * @param {string} name
   * @param {any} detail
   * @param {HTMLElement} node
   * @return {void}
   */
  dispatch (name, detail, node = this.isConnected ? this : this.globalEventTarget) {
    node.dispatchEvent(new CustomEvent(name, {
      detail,
      bubbles: true,
      cancelable: true,
      composed: true
    }))
  }

  /**
   * Each provider has other flags to indicated its connection status, this function should work for all providers
   *
   * @param {ProviderTypes} provider
   * @returns {boolean}
   */
  isProviderConnected = provider => {
    if (!provider) return false
    // check if instanceof...
    switch (provider.constructor) {
      // @ts-ignore
      case this.importWebsocket.WebsocketProvider:
        // @ts-ignore
        return provider.synced
      // @ts-ignore
      case this.importWebrtc.WebrtcProvider:
        // @ts-ignore
        return provider.signalingConns.some(signalingConn => signalingConn.connected)
      default:
        // @ts-ignore
        return provider.connected || provider.synced
    }
  }

  /**
   * @name (get) importIndexeddb
   * @returns {Promise<import("./dependencies/y-indexeddb.js")> | import("./dependencies/y-indexeddb.js")}
   */
  get importIndexeddb () {
    return this._importIndexeddb || import('./dependencies/y-indexeddb.js').then(module => (this._importIndexeddb = module))
  }

  /**
   * @name (get) importIndexeddb
   * @returns {Promise<import("./dependencies/y-websocket")> | import("./dependencies/y-websocket")}
   */
  get importWebsocket () {
    return this._importWebsocket || import('./dependencies/y-websocket.js').then(module => (this._importWebsocket = module))
  }

  /**
   * @name (get) importIndexeddb
   * @returns {Promise<import("./dependencies/y-webrtc.js")> | import("./dependencies/y-webrtc.js")}
   */
  get importWebrtc () {
    return this._importWebrtc || import('./dependencies/y-webrtc.js').then(module => (this._importWebrtc = module))
  }

  /**
   * TODO: P2pt is not yet working... see task add/make new providers
   * 
   * @name (get) importIndexeddb
   * @returns {Promise<import("./dependencies/y-p2pt.js")> | import("./dependencies/y-p2pt.js")}
   */
  get importP2pt () {
    return this._importP2pt || import('./dependencies/y-p2pt.js').then(module => (this._importP2pt = module))
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
    return this._epoch || (this._epoch = EventDrivenYjs.epochDateNow)
  }

  /**
   * @return {string}
   */
  static get epochDateNow () {
    return JSON.stringify({ epoch: Date.now(), uuid: self.crypto.randomUUID() })
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

  get globalEventTarget () {
    // @ts-ignore
    return this._globalEventTarget || (this._globalEventTarget = self.Environment?.activeRoute || document.body)
  }
}
