// @ts-check

import * as Y from './dependencies/yjs.js'

// https://github.com/yjs
/**
 * Constructor options
 @typedef {{
  namespace?: string,
  identifier?: string
}} options
*/

/**
 * Different Providers
 @typedef {import("./dependencies/y-websocket").WebsocketProvider | import("./dependencies/y-webrtc").WebrtcProvider | import("./dependencies/y-p2pt").P2ptProvider} providerType
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
  provider: providerType,
  key: string,
  awareness: any,
  changes: any,
  stateValues: any
}} AwarenessChangeEventDetail
*/

/* global HTMLElement */
/* global document */
/* global self */
/* global fetch */
/* global CustomEvent */

/**
 * EventDrivenYjs is a helper to bring the docs events into a truly event driven environment
 * NOTE: only the indexeddb provider is yet 100% supported, the strategy is rather to have separate web components for the messaging aka. event-driven-web-components-p2pt
 *
 * @export
 * @function EventDrivenYjs
 * @param {CustomElementConstructor} [ChosenHTMLElement = HTMLElement]
 * @property {
    connectedCallback,
    disconnectedCallback,
  }
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
    // @ts-ignore
    super(...args)

    if (typeof options.namespace === 'string') this.setAttribute('namespace', options.namespace)
    /** @type {string} */
    this.namespace = this.getAttribute('namespace') || 'yjs-'

    if (typeof options.identifier === 'string') this.setAttribute('identifier', options.identifier)
    /** @type {string} */
    this.identifier = this.getAttribute('identifier') || 'weedshakers-event-driven-web-components'

    /** @type {Promise<{ doc: import("./dependencies/yjs").Doc, providers: Map<[string, providerType]>}>} */
    this.yjs = this.init()
  }

  /**
   * initialize P2PT
   *
   * @return {Promise<{ doc: import("./dependencies/yjs").Doc, providers: Map<[string, providerType]>}>}
   */
  async init () {
    const div = document.createElement('div')
    this.appendChild(div)
        
    const doc = new Y.Doc()

    const providers = new Map()
    /** @type {import("./dependencies/y-websocket")} */
    let websocket
    if (this.hasAttribute('websocket')) {
      websocket = await import('./dependencies/y-websocket.js')
      providers.set('websocket', new websocket.WebsocketProvider('wss://the-decentral-web.herokuapp.com', this.identifier, doc))
    }

    /** @type {import("./dependencies/y-webrtc")} */
    let webrtc
    if (this.hasAttribute('webrtc')) {
      webrtc = await import('./dependencies/y-webrtc.js')
      providers.set('webrtc', new webrtc.WebrtcProvider(this.identifier, doc/*, {signaling: ['wss://signaling.yjs.dev', 'wss://y-webrtc-signaling-eu.herokuapp.com', 'wss://y-webrtc-signaling-us.herokuapp.com']}*/))
    }

    /** @type {import("./dependencies/y-p2pt")} */
    let p2pt
    if (this.hasAttribute('p2pt')) {
      p2pt = await import('./dependencies/y-p2pt.js')
      providers.set('p2pt', new p2pt.P2ptProvider(this.identifier, doc))
    }

    /** @type {import("./dependencies/y-indexeddb")} */
    let indexeddb
    /** @type {import("./dependencies/y-indexeddb").IndexeddbPersistence} */
    let indexeddbPersistence
    if (this.hasAttribute('indexeddb')) {
      indexeddb = await import('./dependencies/y-indexeddb.js')
      indexeddbPersistence = new indexeddb.IndexeddbPersistence(this.identifier, doc)
      indexeddbPersistence.whenSynced.then(data => this.dispatchEvent(new CustomEvent(`${this.namespace}indexeddb-synced`, {
        /** @type {IndexeddbSyncedEventDetail} */
        detail: {
          indexeddb,
          indexeddbPersistence,
          data,
        },
        bubbles: true,
        cancelable: true,
        composed: true
      })))
    }
    
    // awareness
    providers.forEach((provider, key) => {
      const awareness = provider.awareness;
      awareness.on('change', changes => this.dispatchEvent(new CustomEvent(`${this.namespace}${key}-awareness-change`, {
        /** @type {AwarenessChangeEventDetail} */
        detail: {
          provider,
          key,
          awareness,
          changes,
          stateValues: Array.from(awareness.getStates().values()),
        },
        bubbles: true,
        cancelable: true,
        composed: true
      })))

      // TODO: from here on down
      // TODO: setLocalStateFiled by event ether for particular provider and if not specified for all
      awareness.setLocalStateField('user', {
        name: new Date().getUTCMilliseconds()
      })
    })

    const yarray = doc.getArray('count')
    // observe changes of the sum
    yarray.observe(event => {
      console.log(event.changes.delta)
      // print updates when the data changes
      const text = 'new sum: ' + yarray.toArray().reduce((a,b) => a + b)
      console.log(text)
      div.textContent += ' / ' + text
    })

    const button = document.createElement('button')
    this.appendChild(button)
    button.textContent = 'yarray.push([1])'
    // add 1 to the sum
    button.addEventListener('click', event => yarray.push([1])) // => "new sum: 1"

    const buttonTwo = document.createElement('button')
    this.appendChild(buttonTwo)
    buttonTwo.textContent = 'yarray.delete(-1)'
    // add 1 to the sum
    buttonTwo.addEventListener('click', event => yarray.delete(-1)) // => "new sum: 1"

    return {doc, providers}
  }

  /**
   * Lifecycle callback, triggered when node is attached to the dom
   * must be here as a placeholder
   *
   * @return {void}
   */
  connectedCallback () {}

  /**
   * Lifecycle callback, triggered when node is detached from the dom
   * must be here as a placeholder
   *
   * @return {void}
   */
  disconnectedCallback () {}
}
