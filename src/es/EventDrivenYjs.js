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
 * outgoing event
 @typedef {{
  yjs: Promise<{ doc: import("./dependencies/yjs").Doc, providers: Providers}>
 }} LoadEventDetail
*/

/**
 * outgoing event
 @typedef {{
  indexeddb: import("./dependencies/y-indexeddb"),
  indexeddbPersistence: import("./dependencies/y-indexeddb").IndexeddbPersistence,
  data: any
 }} IndexeddbSyncedEventDetail
*/

/**
 * outgoing event
 @typedef {{
  provider: ProviderTypes,
  name: ProviderNames,
  url: string,
  awareness: any,
  changes: any,
  stateValues: any
 }} AwarenessChangeEventDetail
*/

/**
 * ingoing event
 @typedef {{
  command: string,
  arguments: any[],
  resolve?: any,
  observe?: boolean | string,
  id?: string
 }} ApiEventDetail
*/

/**
 * outgoing event
 @typedef {{
  command: string,
  arguments: any[],
  result?: any,
  id?: string
 }} ApiResultEventDetail
*/

/**
 * outgoing event
 @typedef {{
  yjsEvent: any,
  type: any,
  id: string
 }} ObserveEventDetail
*/

/* global HTMLElement */
/* global document */
/* global self */
/* global fetch */
/* global CustomEvent */
/* global location */

/**
 * EventDrivenYjs is a helper to bring the docs events into a truly event driven environment
 *
 * @export
 * @function EventDrivenYjs
 * @param {CustomElementConstructor} [ChosenHTMLElement = HTMLElement]
 * @return {CustomElementConstructor | *}
 */
export const EventDrivenYjs = (ChosenHTMLElement = HTMLElement) => class EventDrivenYjs extends ChosenHTMLElement {
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
    this.awareness = []

    // set attribute namespace
    if (options.namespace) this.namespace = options.namespace
    else if (!this.namespace) this.namespace = 'yjs-'

    // set attribute identifier
    // @ts-ignore
    if (this.url.searchParams.get('identifier')) this.identifier = this.url.searchParams.get('identifier')
    else if (options.identifier) this.identifier = options.identifier
    else if (!this.identifier) this.identifier = 'weedshakers-event-driven-web-components'

    // TODO: make the urls easily accessible through changes at attribute and url, also allow disconnect and adding on top on the fly

    // set attribute websocket-url
    // @ts-ignore
    if (this.url.searchParams.get('websocket-url')) this.websocketUrl = this.url.searchParams.get('websocket-url')
    else if (options.websocketUrl) this.websocketUrl = options.websocketUrl
    else if (!this.websocketUrl && (
      this.url.searchParams.has('websocket-url') ||
      Object.hasOwnProperty.call(options, 'websocketUrl') ||
      this.hasAttribute('websocket-url')
    )) this.websocketUrl = 'wss://demos.yjs.dev'

    // set attribute web-rtc-url
    // @ts-ignore
    if (this.url.searchParams.get('web-rtc-url')) this.webrtcUrl = this.url.searchParams.get('web-rtc-url')
    else if (options.webrtcUrl) this.webrtcUrl = options.webrtcUrl
    else if (!this.webrtcUrl && (
      this.url.searchParams.has('web-rtc-url') ||
      Object.hasOwnProperty.call(options, 'webrtcUrl') ||
      this.hasAttribute('web-rtc-url')
    )) this.webrtcUrl = 'wss://signaling.yjs.dev,wss://y-webrtc-signaling-eu.herokuapp.com,wss://y-webrtc-signaling-us.herokuapp.com'

    /** @type {Promise<{ doc: import("./dependencies/yjs").Doc, providers: Providers}>} */
    this.yjs = this.init()

    /**
     * consume api commands to yjs through events
     *
     * @param {any & {detail: ApiEventDetail}} event
     */
    this.apiListener = async event => {
      if (event.detail.command && typeof event.detail.command === 'string') {
        const yjs = await this.yjs
        const type = yjs.doc[event.detail.command](...event.detail?.arguments)
        if (event.detail.observe) {
          type.observe(yjsEvent => this.dispatchEvent(/** @type {ObserveEventDetail} */new CustomEvent(typeof event.detail.observe === 'string' ? event.detail.observe : `${this.namespace}observe`, {
            detail: {
              yjsEvent,
              type,
              id: event.detail.id
            },
            bubbles: true,
            cancelable: true,
            composed: true
          })))
        }
        if (event.detail.resolve) {
          return event.detail.resolve({
            command: event.detail.command,
            arguments: event.detail.arguments,
            type,
            id: event.detail.id
          })
        }
        this.dispatchEvent(/** @type {ApiResultEventDetail} */new CustomEvent(`${this.namespace}api-result`, {
          detail: {
            command: event.detail.command,
            arguments: event.detail.arguments,
            type,
            id: event.detail.id
          },
          bubbles: true,
          cancelable: true,
          composed: true
        }))
      }
    }
  }

  /**
   * initialize the yjs doc
   *
   * @return {Promise<{ doc: import("./dependencies/yjs").Doc, providers: Providers}>}
   */
  async init () {
    const doc = new Y.Doc()

    if (this.hasAttribute('indexeddb')) {
      /** @type {import("./dependencies/y-indexeddb")} */
      const indexeddb = await import('./dependencies/y-indexeddb.js')
      /** @type {import("./dependencies/y-indexeddb").IndexeddbPersistence} */
      const indexeddbPersistence = new indexeddb.IndexeddbPersistence(this.identifier, doc)
      indexeddbPersistence.whenSynced.then(data => this.dispatchEvent(new CustomEvent(`${this.namespace}indexeddb-synced`, {
        /** @type {IndexeddbSyncedEventDetail} */
        detail: {
          indexeddb,
          indexeddbPersistence,
          data
        },
        bubbles: true,
        cancelable: true,
        composed: true
      })))
    }

    this.updateProviders(doc)

    return { doc, providers: this.providers }
  }

  /**
   * create or destory providers as required
   *
   * @param {import("./dependencies/yjs").Doc} doc
   */
  async updateProviders (doc) {
    if (!doc) doc = (await this.yjs).doc

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
          websocketMap.set(websocketUrl, new websocket.WebsocketProvider(websocketUrl, this.identifier, doc))
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
            signaling: this.webrtcUrl.split(',').filter(url => url)
          }
        ))
      }
    } else if (webrtcMap.has(this.webrtcUrl)) {
      webrtcMap.get(this.webrtcUrl)?.disconnect()
    }

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

    /**
     * awareness
     *
     * @param {ProviderTypes} provider
     * @param {ProviderNames} name
     * @param {string} url
     */
    const awarenessAddEventListener = async (provider, name, url) => {
      if (this.awareness.includes(provider.awareness)) return
      this.awareness.push(provider.awareness)
      provider.awareness.on('change', changes => this.dispatchEvent(new CustomEvent(`${this.namespace}${name}-awareness-change`, {
        /** @type {AwarenessChangeEventDetail} */
        detail: {
          provider,
          name,
          url,
          awareness: provider.awareness,
          changes,
          stateValues: Array.from(provider.awareness.getStates().values())
        },
        bubbles: true,
        cancelable: true,
        composed: true
      })))

      // TODO: from here on down
      // TODO: setLocalStateFiled by event ether for particular provider and if not specified for all
      provider.awareness.setLocalStateField('user', {
        name: new Date().getUTCMilliseconds(),
        fingerprint: await this.fingerprint
      })
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
  }

  /**
   * Lifecycle callback, triggered when node is attached to the dom
   *
   * @return {void}
   */
  connectedCallback () {
    this.addEventListener(`${this.namespace}api`, this.apiListener)
    document.body.setAttribute(`${this.namespace}load`, 'true')
    this.dispatchEvent(new CustomEvent(`${this.namespace}load`, {
      /** @type {LoadEventDetail} */
      detail: {
        yjs: this.yjs
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))
  }

  /**
   * Lifecycle callback, triggered when node is detached from the dom
   *
   * @return {void}
   */
  disconnectedCallback () {
    this.removeEventListener(`${this.namespace}api`, this.apiListener)
    document.body.removeAttribute(`${this.namespace}load`)
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
    this.setAttribute('web-rtc-url', value)
  }

  /**
   * @return {string}
   */
  get webrtcUrl () {
    // @ts-ignore
    return this.getAttribute('web-rtc-url')
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
}
