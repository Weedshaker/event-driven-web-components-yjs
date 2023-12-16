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

// Supported attributes:
// Attribute {namespace} string default is yjs-, which gets prepend to each outgoing event string as well as on each listener event string

/**
 * Rooms is a helper to keep all rooms object in a yjs map and forwarding the proper events helping having an overview of all participants
 * TODO: view component for controllers/Rooms.js with requesting the room string instead of confirm box here
 * 
 * @export
 * @function Rooms
 * @param {CustomElementConstructor} [ChosenHTMLElement = HTMLElement]
 * @return {CustomElementConstructor | *}
 */
export const Rooms = (ChosenHTMLElement = HTMLElement) => class Rooms extends ChosenHTMLElement {
  /**
   * Creates an instance of yjs rooms. The constructor will be called for every custom element using this class when initially created.
   *
   * @param {options} [options = {namespace=undefined}]
   * @param {*} args
   */
  constructor (options = { namespace: undefined }, ...args) {
    super(...args)

    // set attribute namespace
    if (options.namespace) this.namespace = options.namespace
    else if (!this.namespace) this.namespace = 'yjs-'
  }

  connectedCallback () {
    
  }

  disconnectedCallback () {
    
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
}
