// @ts-check

/* global HTMLElement */
/* global CustomEvent */
/* global self */

/**
 * Constructor options
 @typedef {{
  namespace?: string
 }} options
*/

/**
 * Keys is a helper to keep all keys object at storage and forwarding the proper events helping having an overview of all participants
 *
 * @export
 * @function Keys
 * @param {CustomElementConstructor} [ChosenHTMLElement = HTMLElement]
 * @return {CustomElementConstructor | *}
 */
export const Keys = (ChosenHTMLElement = HTMLElement) => class Keys extends ChosenHTMLElement {
  /**
   * Creates an instance keys. The constructor will be called for every custom element using this class when initially created.
   *
   * @param {options} [options = {namespace=undefined}]
   * @param {*} args
   */
  constructor (options = { namespace: undefined }, ...args) {
    super(...args)

    // set attribute namespace
    if (options.namespace) this.namespace = options.namespace
    else if (!this.namespace) this.namespace = 'yjs-'

    this.getActiveRoomPublicKeyEventListener = async event => this.respond(event.detail?.resolve, event.detail?.name || `${this.namespace}active-room-public-key`, (await this.#getActiveRoomKeyPair()).publicKey)
  }

  connectedCallback () {
    this.globalEventTarget.addEventListener(`${this.namespace}get-active-room-public-key`, this.getActiveRoomPublicKeyEventListener)
  }

  disconnectedCallback () {
    this.globalEventTarget.removeEventListener(`${this.namespace}get-active-room-public-key`, this.getActiveRoomPublicKeyEventListener)
  }

  /**
   * @param {(any)=>void} resolve
   * @param {string|undefined} name
   * @param {any} detail
   * @return {void | any}
   */
  respond (resolve, name, detail) {
    if (typeof resolve === 'function') return resolve(detail)
    if (typeof name === 'string') {
      this.dispatchEvent(new CustomEvent(name, {
        detail,
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }
  }

  /**
   * Description
   * 
   * @async
   * @returns {Promise<{publicKey: import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').KEY, privateKey: import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').KEY}>}
   */
  async #getActiveRoomKeyPair () {
    const activeRoom = await new Promise(resolve => this.dispatchEvent(new CustomEvent(`${this.namespace}get-active-room`, {
      detail: {
        resolve
      },
      bubbles: true,
      cancelable: true,
      composed: true
    })))
    if (activeRoom?.keyPair?.privateKey?.jsonWebKey && activeRoom?.keyPair?.publicKey?.jsonWebKey) return activeRoom.keyPair
    const keyPair = await new Promise(resolve => this.dispatchEvent(new CustomEvent('crypto-generate-key', {
      detail: {
        resolve,
        synchronous: false,
        jsonWebKey: true
      },
      bubbles: true,
      cancelable: true,
      composed: true
    })))
    this.dispatchEvent(new CustomEvent(`${this.namespace}merge-active-room`, {
      detail: { keyPair },
      bubbles: true,
      cancelable: true,
      composed: true
    }))
    return keyPair
  }

  get globalEventTarget () {
    // @ts-ignore
    return this._globalEventTarget || (this._globalEventTarget = self.Environment?.activeRoute || document.body)
  }
}
