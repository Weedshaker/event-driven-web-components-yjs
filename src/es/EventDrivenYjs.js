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

    /** @type {Promise<import("./dependencies/yjs").Doc>} */
    this.doc = this.init()
  }

  /**
   * initialize P2PT
   *
   * @return {Promise<import("./dependencies/yjs").Doc>}
   */
  async init () {
    const div = document.createElement('div')
    this.appendChild(div)
        
    const doc = new Y.Doc()

    const providers = []
    /** @type {import("./dependencies/y-websocket")} */
    let websocket
    /** @type {import("./dependencies/y-websocket").WebsocketProvider} */
    let websocketProvider
    if (this.hasAttribute('websocket')) {
      websocket = await import('./dependencies/y-websocket.js')
      providers.push(websocketProvider = new websocket.WebsocketProvider('wss://the-decentral-web.herokuapp.com', this.identifier, doc))
    }

    /** @type {import("./dependencies/y-webrtc")} */
    let webrtc
    /** @type {import("./dependencies/y-webrtc").WebrtcProvider} */
    let webrtcProvider
    if (this.hasAttribute('webrtc')) {
      webrtc = await import('./dependencies/y-webrtc.js')
      providers.push(webrtcProvider = new webrtc.WebrtcProvider(this.identifier, doc/*, {signaling: ['wss://signaling.yjs.dev', 'wss://y-webrtc-signaling-eu.herokuapp.com', 'wss://y-webrtc-signaling-us.herokuapp.com']}*/))
    }

    /** @type {import("./dependencies/y-p2pt")} */
    let p2pt
    /** @type {import("./dependencies/y-p2pt").P2ptProvider} */
    let p2ptProvider
    if (this.hasAttribute('p2pt')) {
      p2pt = await import('./dependencies/y-p2pt.js')
      providers.push(p2ptProvider = new p2pt.P2ptProvider(this.identifier, doc))
    }

    /** @type {import("./dependencies/y-indexeddb")} */
    let indexeddb
    /** @type {import("./dependencies/y-indexeddb").IndexeddbPersistence} */
    let indexeddbPersistence
    if (this.hasAttribute('indexeddb')) {
      indexeddb = await import('./dependencies/y-indexeddb.js')
      indexeddbPersistence = new indexeddb.IndexeddbPersistence(this.identifier, doc)
      indexeddbPersistence.whenSynced.then((data) => {
        console.log('loaded data from indexed db',data)
        div.textContent += ' / loaded data from indexed db'
    })
    }
    
    // awareness
    if (providers[0]) {
      const awareness = providers[0].awareness;
      console.log(awareness);
      awareness.setLocalStateField("user", {
        name: new Date().getUTCMilliseconds()
      });
      // You can observe when a user updates their awareness information
      awareness.on('change', changes => {
        // Whenever somebody updates their awareness information,
        // we log all awareness information from all users.
        console.log("awareness CHANGE", Array.from(awareness.getStates().values()))
      })
    }

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

    return doc
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
