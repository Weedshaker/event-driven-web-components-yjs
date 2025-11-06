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
 * @typedef {{cryptoKey: import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').KEY, disabled?: boolean, privateName?: string, publicName?: string}} KEY
 */

/**
 * @typedef {KEY[]} KEYS
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

    // @ts-ignore
    this.roomNamePrefix = self.Environment?.roomNamePrefix || 'chat-'

    // set attribute namespace
    if (options.namespace) this.namespace = options.namespace
    else if (!this.namespace) this.namespace = 'yjs-'

    this.getActiveRoomPublicKeyEventListener = async event => this.respond(event.detail?.resolve, event.detail?.name || `${this.namespace}active-room-public-key`, (await this.#getActiveRoomKeyPair()).publicKey)
    this.getKeysEventListener = async event => this.respond(event.detail?.resolve, event.detail?.name || `${this.namespace}keys`, this.#getKeys())
    this.setNewKeyEventListener = async event => this.respond(event.detail?.resolve, event.detail?.name || `${this.namespace}new-key`, this.#setNewKey())
    this.setKeyDisabledEventListener = async event => this.respond(event.detail?.resolve, event.detail?.name || `${this.namespace}key-property-modified`, this.#setKeyProperty(event.detail.epoch, 'disabled', event.detail.propertyValue))
    this.setKeyPrivateNameEventListener = async event => this.respond(event.detail?.resolve, event.detail?.name || `${this.namespace}key-property-modified`, this.#setKeyProperty(event.detail.epoch, 'privateName', event.detail.propertyValue))
    this.setKeyPublicNameEventListener = async event => this.respond(event.detail?.resolve, event.detail?.name || `${this.namespace}key-property-modified`, this.#setKeyProperty(event.detail.epoch, 'publicName', event.detail.propertyValue))
    this.deleteKeyEventListener = async event => this.respond(event.detail?.resolve, event.detail?.name || `${this.namespace}key-deleted`, this.#deleteKey(event.detail.epoch))
  }

  connectedCallback () {
    this.globalEventTarget.addEventListener(`${this.namespace}get-active-room-public-key`, this.getActiveRoomPublicKeyEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}get-keys`, this.getKeysEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}get-new-key`, this.setNewKeyEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}set-key-disabled`, this.setKeyDisabledEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}set-key-private-name`, this.setKeyPrivateNameEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}set-key-public-name`, this.setKeyPublicNameEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}delete-key`, this.deleteKeyEventListener)
  }

  disconnectedCallback () {
    this.globalEventTarget.removeEventListener(`${this.namespace}get-active-room-public-key`, this.getActiveRoomPublicKeyEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}get-keys`, this.getKeysEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}get-new-key`, this.setNewKeyEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}set-key-disabled`, this.setKeyDisabledEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}set-key-private-name`, this.setKeyPrivateNameEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}set-key-public-name`, this.setKeyPublicNameEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}delete-key`, this.deleteKeyEventListener)
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
   * getActiveRoomKeyPair
   * each room holds an async key pair in the storage, which is also on the self.user object and gets generated, in case it does not yet exist
   * 
   * @async
   * @returns {Promise<import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').KEY_PAIR>}
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
    /** @type {import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').KEY_PAIR} */
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

  /**
   * setKey
   * to the storage [chat-keys]
   * 
   * @async
   * @param {KEY} key
   * @returns {Promise<KEYS>}
   */
  async #setKey (key) {
    let allKeys
    if ((allKeys = await this.#getKeys()).some(allKey => allKey.cryptoKey.epoch === key.cryptoKey.epoch)) return allKeys
    return new Promise(resolve => this.dispatchEvent(new CustomEvent('storage-merge', {
      detail: {
        key: `${this.roomNamePrefix}keys`,
        value: [key],
        resolve
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))).then(data => Array.isArray(data.value)
      ? data.value
      : [])
  }

  /**
   * setNewKey
   * to the storage [chat-keys]
   * 
   * @async
   * @returns {Promise<{allKeys: KEYS, newKey: KEY}>}
   */
  async #setNewKey () {
    const newKey = await this.#getNewKey()
    return {
      newKey,
      allKeys: await this.#setKey(newKey)
    }
  }

  /**
   * getKeys
   * from the storage [chat-keys]
   * 
   * @async
   * @returns {Promise<KEYS>}
   */
  #getKeys () {
    return new Promise(resolve => this.dispatchEvent(new CustomEvent('storage-get', {
      detail: {
        key: `${this.roomNamePrefix}keys`,
        resolve
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))).then(data => Array.isArray(data.value)
      ? data.value
      : [])
  }

  /**
   * getKey
   * from the storage [chat-keys][?]
   * 
   * @async
   * @returns {Promise<KEY|undefined>}
   */
  async #getKey (epoch) {
    return (await this.#getKeys()).find(key => key.cryptoKey.epoch === epoch)
  }

  /**
   * getNewKey
   * 
   * @async
   * @returns {Promise<KEY>}
   */
  async #getNewKey () {
    return {
      cryptoKey: await new Promise(resolve => this.dispatchEvent(new CustomEvent('crypto-generate-key', {
        detail: {
          resolve,
          synchronous: true,
          jsonWebKey: true
        },
        bubbles: true,
        cancelable: true,
        composed: true
      })))
    }
  }

  /**
   * setKeyProperty
   * at the storage [chat-keys][?]
   * 
   * @async
   * @prop {string} epoch
   * @prop {string} name
   * @prop {string} value
   * @returns {Promise<false|{epoch: string, modified: {name: string, value: string, key: KEY}, allKeys: KEYS}>}
   */
  async #setKeyProperty (epoch, name, value) {
    const allKeys = await this.#getKeys()
    const key = allKeys.find(key => key.cryptoKey.epoch === epoch)
    if (!key) return false
    key[name] = value
    return {
      epoch,
      modified: {
        name,
        value,
        key
      },
      allKeys: await new Promise(resolve => this.dispatchEvent(new CustomEvent('storage-set', {
        detail: {
          key: `${this.roomNamePrefix}keys`,
          value: allKeys,
          resolve
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))).then(data => Array.isArray(data.value)
        ? data.value
        : [])
    }
  }

  /**
   * deleteKey
   * at the storage [chat-keys][?]
   * 
   * @async
   * @returns {Promise<false|{epoch: string, deleted: KEY, allKeys: KEYS}>}
   */
  async #deleteKey (epoch) {
    const allKeys = await this.#getKeys()
    const keyIndex = allKeys.findIndex(key => key.cryptoKey.epoch === epoch)
    if (keyIndex === -1) return false
    const deleted = allKeys.splice(keyIndex, 1)[0]
    return {
      epoch,
      deleted,
      allKeys: await new Promise(resolve => this.dispatchEvent(new CustomEvent('storage-set', {
        detail: {
          key: `${this.roomNamePrefix}keys`,
          value: allKeys,
          resolve
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))).then(data => Array.isArray(data.value)
        ? data.value
        : [])
    }
  }

  get globalEventTarget () {
    // @ts-ignore
    return this._globalEventTarget || (this._globalEventTarget = self.Environment?.activeRoute || document.body)
  }
}
