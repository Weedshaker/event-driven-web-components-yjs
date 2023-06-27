// @ts-check

import * as Y from './dependencies/yjs.js'

// https://github.com/yjs
/**
 * Constructor options
 @typedef {{
  namespace?: string,
  identifier?: string,
  websocketUrl?: string,
  webrtcUrl?: string
 }} options
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
 * Provider container
 @typedef {
  Map<ProviderNames, Map<string, ProviderTypes>>
 } Providers
*/

/**
 * initial local state field user
 @typedef {{
  epoch: number,
  sessionEpoch: number,
  localEpoch: number,
  fingerprint: string
  }} InitialUserValue
*/

// Events:
/**
 * outgoing event
 @typedef {{
  yjs: Promise<{ doc: import("./dependencies/yjs").Doc, providers: Providers}>,
  identifier: string,
 }} LoadEventDetail
*/

/**
 * outgoing event
 @typedef {{
  provider: ProviderTypes,
  name: ProviderNames,
  url: string,
  awareness: any,
  changes?: any,
  stateValues?: any,
  identifier: string,
 } & InitialUserValue} AwarenessUpdateChangeEventDetail
*/

/**
 * ingoing event
 @typedef {{
  command: string,
  arguments: any[],
  resolve?: any,
  observe?: boolean | string,
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
  identifier: string
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
  identifier: string
 }} NewTypeResultEventDetail
*/

/**
 * outgoing event
 @typedef {{
  yjsEvent: any,
  type: any,
  id: string,
  identifier: string
 }} ObserveEventDetail
*/

/**
 * ingoing event
 @typedef {{
  websocketUrl?: string,
  webrtcUrl?: string,
  noHistory?: boolean
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
  identifier: string
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
 }} GetIdentifierEventDetail
*/

/* global HTMLElement */
/* global document */
/* global self */
/* global fetch */
/* global CustomEvent */
/* global location */
/* global history */

// Supported attributes:
// Attribute {websocket-url} string comma separated list of all websocket urls
// Attribute {webrtc-url} string comma separated list of all webrtc urls
// Attribute {indexeddb} has use indexeddb
// Attribute {p2pt} has use p2pt
// Attribute {no-history} has don't write to the url with history.pushState
// Attribute {no-blur} don't react with awareness on blur
// Attribute {namespace} string default is yjs-, which gets prepend to each outgoing event string as well as on each listener event string
// Attribute {identifier} string is the room name at webrtc and websocket as well as the key for the indexeddb

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
    return ['websocket-url', 'webrtc-url']
  }

  /**
   * Creates an instance of EventDrivenYjs. The constructor will be called for every custom element using this class when initially created.
   *
   * @param {options} [options = {namespace=undefined, identifier=undefined}]
   * @param {*} args
   */
  constructor (options = { namespace: undefined, identifier: undefined }, ...args) {
    super(...args)

    this.url = new URL(location.href)
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

    // set attribute identifier
    // @ts-ignore
    if (this.url.searchParams.get('identifier')) this.identifier = this.url.searchParams.get('identifier')
    else if (options.identifier) this.identifier = options.identifier
    else if (!this.identifier) this.identifier = 'weedshakers-event-driven-web-components'

    // set attribute websocket-url
    // @ts-ignore
    if (this.url.searchParams.get('websocket-url')) this.websocketUrl = this.url.searchParams.get('websocket-url')
    else if (options.websocketUrl) this.websocketUrl = options.websocketUrl
    else if (!this.websocketUrl && (
      this.url.searchParams.has('websocket-url') ||
      Object.hasOwnProperty.call(options, 'websocketUrl') ||
      this.hasAttribute('websocket-url')
    )) this.websocketUrl = 'wss://demos.yjs.dev'

    // set attribute webrtc-url
    // @ts-ignore
    if (this.url.searchParams.get('webrtc-url')) this.webrtcUrl = this.url.searchParams.get('webrtc-url')
    else if (options.webrtcUrl) this.webrtcUrl = options.webrtcUrl
    else if (!this.webrtcUrl && (
      this.url.searchParams.has('webrtc-url') ||
      Object.hasOwnProperty.call(options, 'webrtcUrl') ||
      this.hasAttribute('webrtc-url')
    )) this.webrtcUrl = 'wss://signaling.yjs.dev,wss://y-webrtc-signaling-eu.herokuapp.com,wss://y-webrtc-signaling-us.herokuapp.com'

    // Events:
    /**
     * consume doc commands to yjs through events
     *
     * @param {any & {detail: DocEventDetail}} event
     */
    this.docEventListener = async event => {
      if (event.detail.command && typeof event.detail.command === 'string') {
        const yjs = await this.yjs
        const type = yjs.doc[event.detail.command](...event.detail?.arguments)
        if (event.detail.observe) {
          type.observe(yjsEvent => this.dispatch(typeof event.detail.observe === 'string' ? event.detail.observe : `${this.namespace}observe`,
            /** @type {ObserveEventDetail} */
            {
              yjsEvent,
              type,
              id: event.detail.id,
              identifier: this.identifier,
            }
          ))
        }
        if (event.detail.resolve) {
          return event.detail.resolve({
            command: event.detail.command,
            arguments: event.detail.arguments,
            type,
            id: event.detail.id
          })
        }
        this.dispatch(`${this.namespace}doc-result`,
          /** @type {DocResultEventDetail} */
          {
            command: event.detail.command,
            arguments: event.detail.arguments,
            type,
            id: event.detail.id,
            identifier: this.identifier,
          }
        )
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
        if (event.detail.resolve) {
          return event.detail.resolve({
            command: event.detail.command,
            type,
            id: event.detail.id
          })
        }
        this.dispatch(`${this.namespace}doc-result`,
          /** @type {NewTypeResultEventDetail} */
          {
            command: event.detail.command,
            type,
            id: event.detail.id,
            identifier: this.identifier,
          }
        )
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
      await this.yjs
      const oldWebsocketUrl = this.url.searchParams.get('websocket-url')
      const oldWebrtcUrl = this.url.searchParams.get('webrtc-url')
      this.url = new URL(location.href)
      if (oldWebsocketUrl !== this.url.searchParams.get('websocket-url')) this.websocketUrl = this.url.searchParams.get('websocket-url') || ''
      if (oldWebrtcUrl !== this.url.searchParams.get('webrtc-url')) this.webrtcUrl = this.url.searchParams.get('webrtc-url') || ''
    }

    /**
     * setAttribute webrtc-url & websocket-url through event
     *
     * @param {any & {detail: UpdateProvidersEventDetail}} event
     */
    this.updateProvidersEventListener = async event => {
      await this.yjs
      if (event.detail.noHistory) this.setAttribute('no-history', 'true')
      if (event.detail.websocketUrl) this.setAttribute('websocket-url', event.detail.websocketUrl)
      if (event.detail.webrtcUrl) this.setAttribute('webrtc-url', event.detail.webrtcUrl)
    }

    /**
     * @param {any & {detail: LoadIndexeddbEventDetail}} event
     * @param {import("./dependencies/yjs").Doc | any} [doc=this.yjs.doc]
     * @return {Promise<void>}
     */
    this.loadIndexeddbEventListener  = async (event, doc) => {
      if (!doc) doc = (await this.yjs).doc

      /** @type {import("./dependencies/y-indexeddb")} */
      const indexeddb = await import('./dependencies/y-indexeddb.js')
      /** @type {import("./dependencies/y-indexeddb").IndexeddbPersistence} */
      const indexeddbPersistence = new indexeddb.IndexeddbPersistence(this.identifier, doc)
      indexeddbPersistence.whenSynced.then(data => {
        const detail = {
          indexeddb,
          indexeddbPersistence,
          data,
          identifier: this.identifier,
        }
        if (event && event.detail && event.detail.resolve) return event.detail.resolve(detail)
        this.dispatch(`${this.namespace}indexeddb-synced`,
          /** @type {IndexeddbSyncedEventDetail} */
          detail
        )
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
     * deliver the identifier
     *
     * @param {any & {detail: GetIdentifierEventDetail}} event
     */
    this.getIdentifierEventListener = event => event.detail.resolve(this.identifier)

    // https://docs.yjs.dev/api/about-awareness#awareness-crdt-api
    // set the last known local state on focus, connected
    this.focusEventListener = async event => {
      await this.yjs
      this.awarenesses.forEach((awareness, i) => {
        if (this.awarenessLocalStates[i] && !awareness.getLocalState()) awareness.setLocalState(this.awarenessLocalStates[i])
      })
    }
    // save the last known local state and set the local state to null on blur, disconnect or unload
    this.blurEventListener = async event => {
      await this.yjs
      this.awarenesses.forEach((awareness, i) => {
        let localState
        if ((localState = awareness.getLocalState())) {
          this.awarenessLocalStates[i] = localState
          awareness.setLocalState(null)
        }
      })
    }

    /** @type {Promise<{ doc: import("./dependencies/yjs").Doc, providers: Providers}>} */
    this.yjs = this.init()
    // delay indexeddb updates until the document and its docEventListeners are ready
    if (this.hasAttribute('indexeddb')) this.yjs.then(({ doc }) => this.loadIndexeddbEventListener(undefined, doc))
  }

  /**
   * initialize the yjs doc
   *
   * @return {Promise<{ doc: import("./dependencies/yjs").Doc, providers: Providers}>}
   */
  async init () {
    const doc = new Y.Doc()
    return { doc, providers: await this.updateProviders(doc) }
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

    if (!name || name === 'websocket-url') {
      /** @type {Map<string, ProviderTypes>} */
      // @ts-ignore
      const websocketMap = this.providers.get('websocket')
      if (this.websocketUrl) {
        /** @type {import("./dependencies/y-websocket")} */
        const websocket = await import('./dependencies/y-websocket.js')
        this.websocketUrl.split(',').filter(url => url).forEach(websocketUrl => {
          if (websocketMap.has(websocketUrl)) {
            websocketMap.get(websocketUrl)?.connect()
          } else {
            websocketMap.set(websocketUrl, new websocket.WebsocketProvider(self.decodeURIComponent(websocketUrl), this.identifier, doc))
          }
        })
        websocketMap.forEach(
          /**
           * @param {ProviderTypes} provider
           * @param {string} url
           */
          (provider, url) => {
            if (!this.websocketUrl.includes(url)) provider.disconnect()
          }
        )
      } else {
        websocketMap.forEach(
          /**
           * @param {ProviderTypes} provider
           */
          provider => provider.disconnect()
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
          webrtcMap.set(this.webrtcUrl, new webrtc.WebrtcProvider(this.identifier, doc,
            {
              signaling: this.webrtcUrl.split(',').filter(url => url).map(url => self.decodeURIComponent(url))
            }
          ))
        }
      } else if (webrtcMap.has(this.webrtcUrl)) {
        webrtcMap.get(this.webrtcUrl)?.disconnect()
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
          p2ptMap.set('p2pt', new p2pt.P2ptProvider(this.identifier, doc))
        }
      } else if (p2ptMap.has('p2pt')) {
        p2ptMap.get('p2pt')?.disconnect()
      }
    }

    /** @type {InitialUserValue} */
    const initialUserValue = {
      epoch: this.epoch,
      sessionEpoch: this.sessionEpoch,
      localEpoch: this.localEpoch,
      fingerprint: await this.fingerprint
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
        url,
        identifier: this.identifier,
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
          stateValues: Array.from(provider.awareness.getStates().values()),
          identifier: this.identifier
        }
      ))
      provider.awareness.on('change', changes => this.dispatch(`${this.namespace}${name}-awareness-change`,
        /** @type {AwarenessUpdateChangeEventDetail} */
        {
          ...detail,
          changes,
          stateValues: Array.from(provider.awareness.getStates().values()),
          identifier: this.identifier
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
    return this.providers
  }

  /**
   * Lifecycle callback, triggered when node is attached to the dom
   *
   * @return {void}
   */
  connectedCallback () {
    this.addEventListener(`${this.namespace}doc`, this.docEventListener)
    this.addEventListener(`${this.namespace}api`, this.newTypeEventListener)
    this.addEventListener(`${this.namespace}update-providers`, this.updateProvidersEventListener)
    this.addEventListener(`${this.namespace}load-indexeddb`, this.loadIndexeddbEventListener)
    this.addEventListener(`${this.namespace}set-local-state`, this.setLocalStateEventListener)
    this.addEventListener(`${this.namespace}set-local-state-field`, this.setLocalStateFieldEventListener)
    this.addEventListener(`${this.namespace}get-identifier`, this.getIdentifierEventListener)
    this.focusEventListener()
    self.addEventListener('focus', this.focusEventListener)
    if (!this.hasAttribute('no-blur')) self.addEventListener('blur', this.blurEventListener)
    self.addEventListener('beforeunload', this.blurEventListener)
    self.addEventListener('popstate', this.popstateEventListener)
    document.body.setAttribute(`${this.namespace}load`, 'true')
    this.dispatch(`${this.namespace}load`,
      /** @type {LoadEventDetail} */
      {
        yjs: this.yjs,
        identifier: this.identifier
      }
    )
  }

  /**
   * Lifecycle callback, triggered when node is detached from the dom
   *
   * @return {void}
   */
  disconnectedCallback () {
    this.removeEventListener(`${this.namespace}doc`, this.docEventListener)
    this.removeEventListener(`${this.namespace}api`, this.newTypeEventListener)
    this.removeEventListener(`${this.namespace}update-providers`, this.updateProvidersEventListener)
    this.removeEventListener(`${this.namespace}load-indexeddb`, this.loadIndexeddbEventListener)
    this.removeEventListener(`${this.namespace}set-local-state`, this.setLocalStateEventListener)
    this.removeEventListener(`${this.namespace}set-local-state-field`, this.setLocalStateFieldEventListener)
    this.removeEventListener(`${this.namespace}get-identifier`, this.getIdentifierEventListener)
    this.blurEventListener()
    self.removeEventListener('focus', this.focusEventListener)
    if (!this.hasAttribute('no-blur')) self.removeEventListener('blur', this.blurEventListener)
    self.removeEventListener('beforeunload', this.blurEventListener)
    self.removeEventListener('popstate', this.popstateEventListener)
    document.body.removeAttribute(`${this.namespace}load`)
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (oldValue && oldValue !== newValue && (name === 'websocket-url' || name === 'webrtc-url')) {
      const oldParam = this.url.searchParams.get(name)
      if (!this.hasAttribute('no-history') && oldParam !== newValue) {
        this.url.searchParams.set(name, newValue)
        history.pushState(history.state, document.title, this.url.href)
      }
      this.updateProviders(undefined, name)
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
   * The identifier is used as the room name
   * priority of value appliance: url param, options, attribute
   *
   * @param {string} value
   */
  set identifier (value) {
    if (value) this.setAttribute('identifier', value)
  }

  /**
   * @return {string}
   */
  get identifier () {
    // @ts-ignore
    return this.getAttribute('identifier')
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
    // ClientJS does not work with ES6 Imports and for that we fetch it
    return this._fingerprint || (this._fingerprint = fetch(`${import.meta.url.replace(/(.*\/)(.*)$/, '$1')}dependencies/clientjs/dist/client.min.js`).then(response => response.text()).then(clientJS => {
      const script = document.createElement('script')
      script.textContent = clientJS
      document.head.appendChild(script)
      // @ts-ignore
      return (new self.ClientJS()).getFingerprint()
    }))
  }

  /**
   * @return {number}
   */
  get epoch () {
    return this._epoch || (this._epoch = Date.now())
  }

  /**
   * @return {number}
   */
  get sessionEpoch () {
    return this._sessionEpoch || (this._sessionEpoch = this.getEpochStorage('session'))
  }

  /**
   * @return {number}
   */
  get localEpoch () {
    return this._localEpoch || (this._localEpoch = this.getEpochStorage('local'))
  }

  /**
   * @param {'session' | 'local'} name
   * @return {number}
   */
  getEpochStorage (name) {
    const key = `${this.namespace}${this.identifier}-${name}-epoch`
    let epoch = Number(self[`${name}Storage`].getItem(key))
    if (epoch) return epoch
    self[`${name}Storage`].setItem(key, String(epoch = this.epoch))
    return epoch
  }
}
