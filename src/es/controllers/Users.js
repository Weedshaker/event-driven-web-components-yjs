// @ts-check

// https://github.com/yjs
/**
 * Constructor options
 @typedef {{
  namespace?: string
 }} options
*/

/* global HTMLElement */
/* global CustomEvent */
/* global self */

// Supported attributes:
// Attribute {namespace} string default is yjs-, which gets prepend to each outgoing event string as well as on each listener event string

/**
 * Users is a helper to keep all user object in a yjs array and forwarding the proper events helping having an overview of all participants
 *
 * @export
 * @function Users
 * @param {CustomElementConstructor} [ChosenHTMLElement = HTMLElement]
 * @return {CustomElementConstructor | *}
 */
export const Users = (ChosenHTMLElement = HTMLElement) => class Users extends ChosenHTMLElement {
  /**
   * Creates an instance of EventDrivenYjs. The constructor will be called for every custom element using this class when initially created.
   *
   * @param {options} [options = {namespace=undefined}]
   * @param {*} args
   */
  constructor (options = { namespace: undefined }, ...args) {
    super(...args)

    // set attribute namespace
    if (options.namespace) this.namespace = options.namespace
    else if (!this.namespace) this.namespace = 'yjs-'

    this.awarenessChangeEventListener = event => {
      console.log('awarenessChangeEventListener', event)
    }
  }

  connectedCallback () {
    document.body.addEventListener(`${this.namespace}websocket-awareness-change`, this.awarenessChangeEventListener)
    document.body.addEventListener(`${this.namespace}webrtc-awareness-change`, this.awarenessChangeEventListener)
    document.body.addEventListener(`${this.namespace}p2pt-awareness-change`, this.awarenessChangeEventListener)
  }

  disconnectedCallback () {
    document.body.removeEventListener(`${this.namespace}websocket-awareness-change`, this.awarenessChangeEventListener)
    document.body.removeEventListener(`${this.namespace}webrtc-awareness-change`, this.awarenessChangeEventListener)
    document.body.removeEventListener(`${this.namespace}p2pt-awareness-change`, this.awarenessChangeEventListener)
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
