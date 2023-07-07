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
   * Creates an instance of yjs users. The constructor will be called for every custom element using this class when initially created.
   *
   * @param {options} [options = {namespace=undefined}]
   * @param {*} args
   */
  constructor (options = { namespace: undefined }, ...args) {
    super(...args)

    // set attribute namespace
    if (options.namespace) this.namespace = options.namespace
    else if (!this.namespace) this.namespace = 'yjs-'

    this.awarenessChangeEventListener = async event => {
      const yArray = (await this.yArray).type
      const users = yArray.toArray()
      const stateValueUsers = event.detail.stateValues.map(stateValue => stateValue.user)
      const selfUser = {
        epoch: event.detail.epoch,
        fingerprint: event.detail.fingerprint,
        localEpoch: event.detail.localEpoch,
        sessionEpoch: event.detail.sessionEpoch,
        uid: event.detail.uid,
        connectedUsers: {
          [event.detail.url]: stateValueUsers.filter(user => (user.uid !== event.detail.uid))
        },
        ...(stateValueUsers.find(user => (user.uid === event.detail.uid)) || {}), // get all updates on own user
      }
      let selfUserIndex
      if ((selfUserIndex = users.findIndex(user => (user.uid === selfUser.uid))) === -1) {
        // TODO: push this user
      } else {
        // TODO: update this user in the array
      }
      console.log('awarenessChangeEventListener', {detail: event.detail, users, selfUser})
    }

    this.awarenessUsersEventListener = async event => {
      console.log('awarenessUsersEventListener', event.detail.type);
      this.dispatchEvent(new CustomEvent(`${this.namespace}users`, {
        detail: {
          // TODO: Enrich the objects here
          users: event.detail.type.toArray()
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    /** @type {(any)=>void} */
    this.yArrayResolve = array => array
    /** @type {Promise<{type: import("../dependencies/yjs").Array}>} */
    this.yArray = new Promise(resolve => (this.yArrayResolve = resolve))
  }

  connectedCallback () {
    document.body.addEventListener(`${this.namespace}websocket-awareness-change`, this.awarenessChangeEventListener)
    document.body.addEventListener(`${this.namespace}webrtc-awareness-change`, this.awarenessChangeEventListener)
    document.body.addEventListener(`${this.namespace}p2pt-awareness-change`, this.awarenessChangeEventListener)
    document.body.addEventListener(`${this.namespace}awareness-users`, this.awarenessUsersEventListener)
    this.dispatchEvent(new CustomEvent(`${this.namespace}doc`, {
      detail: {
        command: 'getArray',
        arguments: ['users'],
        observe: `${this.namespace}awareness-users`,
        resolve: this.yArrayResolve
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))
  }

  disconnectedCallback () {
    document.body.removeEventListener(`${this.namespace}websocket-awareness-change`, this.awarenessChangeEventListener)
    document.body.removeEventListener(`${this.namespace}webrtc-awareness-change`, this.awarenessChangeEventListener)
    document.body.removeEventListener(`${this.namespace}p2pt-awareness-change`, this.awarenessChangeEventListener)
    document.body.removeEventListener(`${this.namespace}users`, this.awarenessUsersEventListener)
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
