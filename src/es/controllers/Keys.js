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
 * @typedef {{
 *  key: import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').KEY,
 *  disabled: boolean,
 *  private: {
 *    name?: string,
 *    origin?: {
 *      room: string
 *      publicKey?: import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').KEY
 *    },
 *    shared?: {
 *      room: string
 *      publicKey: import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').KEY,
 *    }[],
 *    received?: {
 *      room: string
 *      publicKey: import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').KEY,
 *    }[],
 *    used?: {string:number[]}
 *  },
 *  public: {name?: string},
 * }} KEY_CONTAINER
 */

/**
 * @typedef {KEY_CONTAINER[]} KEY_CONTAINERS
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
    // @ts-ignore
    this.getKeysEventListener = event => this.respond(event.detail?.resolve, event.detail?.name || `${this.namespace}keys`, this.#getKeys())
    this.setNewKeyEventListener = event => this.respond(event.detail?.resolve, event.detail?.name || `${this.namespace}new-key`, this.#setNewKey())
    this.setKeyDisabledEventListener = event => this.respond(event.detail?.resolve, event.detail?.name || `${this.namespace}key-property-modified`, this.#setKeyProperty(event.detail.epoch, 'disabled', event.detail.propertyValue))
    this.setKeyPrivateNameEventListener = event => this.respond(event.detail?.resolve, event.detail?.name || `${this.namespace}key-property-modified`, this.#setKeyProperty(event.detail.epoch, 'private.name', event.detail.propertyValue))
    this.setKeyPublicNameEventListener = event => this.respond(event.detail?.resolve, event.detail?.name || `${this.namespace}key-property-modified`, this.#setKeyProperty(event.detail.epoch, 'public.name', event.detail.propertyValue))
    this.deleteKeyEventListener = event => this.respond(event.detail?.resolve, event.detail?.name || `${this.namespace}key-deleted`, this.#deleteKey(event.detail.epoch))
    this.encryptEventListener = event => this.respond(event.detail?.resolve, event.detail?.name || `${this.namespace}encrypted`, this.#encrypt(event.detail.text, Keys.getKeyContainer(event.detail.key)))
    this.decryptEventListener = event => this.respond(event.detail?.resolve, event.detail?.name || `${this.namespace}decrypted`, this.#decrypt(event.detail.encrypted, Keys.getKeyContainer(event.detail.key)))
    this.shareKeyEventListener = event => this.respond(event.detail?.resolve, event.detail?.name || `${this.namespace}shared-key`, this.#shareKey(Keys.getKeyContainer(event.detail.key), event.detail.privateKey, event.detail.publicKey))
    this.receiveKeyEventListener = event => this.respond(event.detail?.resolve, event.detail?.name || `${this.namespace}received-key`, this.#receiveKey(event.detail.encrypted, event.detail.privateKey, event.detail.publicKey))

    /** @type {(any)=>void} */
    this.roomResolve = map => map
    /** @type {Promise<{ locationHref: string, room: Promise<string> & {done: boolean} }>} */
    this.roomPromise = new Promise(resolve => (this.roomResolve = resolve))
  }

  connectedCallback () {
    this.globalEventTarget.addEventListener(`${this.namespace}get-active-room-public-key`, this.getActiveRoomPublicKeyEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}get-keys`, this.getKeysEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}get-new-key`, this.setNewKeyEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}set-key-disabled`, this.setKeyDisabledEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}set-key-private-name`, this.setKeyPrivateNameEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}set-key-public-name`, this.setKeyPublicNameEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}delete-key`, this.deleteKeyEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}encrypt`, this.encryptEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}decrypt`, this.decryptEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}share-key`, this.shareKeyEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}receive-key`, this.receiveKeyEventListener)
    if (this.isConnected) this.connectedCallbackOnce()
  }

  connectedCallbackOnce () {
    this.dispatchEvent(new CustomEvent('yjs-get-room', {
      detail: {
        resolve: this.roomResolve
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))
    // @ts-ignore
    this.connectedCallbackOnce = () => {}
  }

  disconnectedCallback () {
    this.globalEventTarget.removeEventListener(`${this.namespace}get-active-room-public-key`, this.getActiveRoomPublicKeyEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}get-keys`, this.getKeysEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}get-new-key`, this.setNewKeyEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}set-key-disabled`, this.setKeyDisabledEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}set-key-private-name`, this.setKeyPrivateNameEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}set-key-public-name`, this.setKeyPublicNameEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}delete-key`, this.deleteKeyEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}encrypt`, this.encryptEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}decrypt`, this.decryptEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}share-key`, this.shareKeyEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}receive-key`, this.receiveKeyEventListener)
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
   * a key can only be set once with the same epoch
   * 
   * @async
   * @param {KEY_CONTAINER} keyContainer
   * @param {import("../../event-driven-web-components-prototypes/src/controllers/Crypto.js").KEY | null} publicKey
   * @returns {Promise<KEY_CONTAINERS|import("../../event-driven-web-components-prototypes/src/controllers/Crypto.js").JSON_WEB_KEY_TO_CRYPTOKEY_ERROR>}
   */
  async #setKey (keyContainer, publicKey = null) {
    let allKeyContainers
    if ((allKeyContainers = await this.#getKeys()).some(allKeyContainer => allKeyContainer.key.epoch === keyContainer.key.epoch)) return allKeyContainers
    if (!keyContainer.private) keyContainer.private = {}
    if (!keyContainer.private.origin) keyContainer.private.origin = { room: ''}
    // when foreign received key check the validity of the jsonWebKey by converting it to a cryptoKey object
    if (publicKey) {
      const cryptoKey = await new Promise(resolve => this.dispatchEvent(new CustomEvent('crypto-get-json-web-key-to-crypto-key', {
        detail: {
          resolve,
          jsonWebKey: keyContainer.key.jsonWebKey
        },
        bubbles: true,
        cancelable: true,
        composed: true
      })))
      if (cryptoKey.error) return cryptoKey
      keyContainer.private.origin.publicKey = publicKey
    }
    keyContainer.private.origin.room = await (await this.roomPromise).room
    return new Promise(resolve => this.dispatchEvent(new CustomEvent('storage-merge', {
      detail: {
        key: `${this.roomNamePrefix}keys`,
        value: [keyContainer],
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
   * @returns {Promise<{keyContainers: KEY_CONTAINERS, newKey: KEY_CONTAINER}>}
   */
  async #setNewKey () {
    const newKey = await this.#getNewKey()
    return {
      newKey,
      // @ts-ignore
      keyContainers: await this.#setKey(newKey)
    }
  }

  /**
   * getKeys
   * from the storage [chat-keys]
   * 
   * @async
   * @returns {Promise<KEY_CONTAINERS>}
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
   * @returns {Promise<KEY_CONTAINER|undefined>}
   */
  async #getKey (epoch) {
    return (await this.#getKeys()).find(keyContainer => keyContainer.key.epoch === epoch)
  }

  /**
   * getNewKey
   * 
   * @async
   * @returns {Promise<KEY_CONTAINER>}
   */
  async #getNewKey () {
    return {
      key: await new Promise(resolve => this.dispatchEvent(new CustomEvent('crypto-generate-key', {
        detail: {
          resolve,
          synchronous: true,
          jsonWebKey: true
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))),
      disabled: false,
      private: {},
      public: {}
    }
  }

  /**
   * setKeyProperty
   * at the storage [chat-keys][?]
   * 
   * @async
   * @prop {string} epoch
   * @prop {string} propNames
   * @prop {string|any} value
   * @prop {any} storageDeepMergeDetail
   * @returns {Promise<false|{epoch: string, modified: {propNames: string, value: string, keyContainer: KEY_CONTAINER}, keyContainers: KEY_CONTAINERS}>}
   */
  async #setKeyProperty (epoch, propNames, value, storageDeepMergeDetail = {}) {
    const keyContainers = await this.#getKeys()
    /** @type {KEY_CONTAINER|any} */
    const keyContainer = keyContainers.find(keyContainer => keyContainer.key.epoch === epoch)
    if (!keyContainer) return false
    // set value to the keyContainer
    value = propNames.split('.').reduceRight((acc, propName) => {
      return {
        [propName]: acc
      }
    }, value)
    const newKeyContainer = (await new Promise(resolve => this.dispatchEvent(new CustomEvent('storage-deep-merge', {
      detail: {
        ...storageDeepMergeDetail,
        target: keyContainer,
        source: value,
        resolve
      },
      bubbles: true,
      cancelable: true,
      composed: true
    })))).value
    keyContainers.splice(keyContainers.indexOf(keyContainer), 1, newKeyContainer)
    return {
      epoch,
      modified: {
        propNames,
        value,
        keyContainer: newKeyContainer
      },
      keyContainers: await new Promise(resolve => this.dispatchEvent(new CustomEvent('storage-set', {
        detail: {
          key: `${this.roomNamePrefix}keys`,
          value: keyContainers,
          resolve
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))).then(data => Array.isArray(data.value)
        ? data.value
        : []
      )
    }
  }

  /**
   * deleteKey
   * at the storage [chat-keys][?]
   * 
   * @async
   * @returns {Promise<false|{epoch: string, deleted: KEY_CONTAINER, keyContainers: KEY_CONTAINERS}>}
   */
  async #deleteKey (epoch) {
    const keyContainers = await this.#getKeys()
    const keyIndex = keyContainers.findIndex(key => key.key.epoch === epoch)
    if (keyIndex === -1) return false
    const deleted = keyContainers.splice(keyIndex, 1)[0]
    return {
      epoch,
      deleted,
      keyContainers: await new Promise(resolve => this.dispatchEvent(new CustomEvent('storage-set', {
        detail: {
          key: `${this.roomNamePrefix}keys`,
          value: keyContainers,
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
   * encrypt text
   * 
   * @async
   * @prop {string} text
   * @prop {KEY_CONTAINER} keyContainer
   * @returns {Promise<import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').ENCRYPTED | import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').ENCRYPTED_ERROR | import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').JSON_WEB_KEY_TO_CRYPTOKEY_ERROR>}
   */
  async #encrypt (text, keyContainer) {
    this.#setKeyProperty(keyContainer.key.epoch, 'private.used', {
      [await (await this.roomPromise).room]: [Date.now()]
    }, {
      concat: 'unshift',
      maxLength: 20
    })
    return new Promise(resolve => this.dispatchEvent(new CustomEvent('crypto-encrypt', {
      detail: {
        resolve,
        text,
        key: keyContainer.key,
        jsonWebKey: true
      },
      bubbles: true,
      cancelable: true,
      composed: true
    })))
  }

  /**
   * decrypt text
   * 
   * @async
   * @prop {import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').encrypted} encrypted
   * @prop {KEY_CONTAINER} keyContainer
   * @returns {Promise<import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').DECRYPTED | import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').DECRYPTED_ERROR | import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').JSON_WEB_KEY_TO_CRYPTOKEY_ERROR>}
   */
  async #decrypt (encrypted, keyContainer) {
    this.#setKeyProperty(keyContainer.key.epoch, 'private.used', {
      [await (await this.roomPromise).room]: [Date.now()]
    }, {
      concat: 'unshift',
      maxLength: 20
    })
    return new Promise(resolve => this.dispatchEvent(new CustomEvent('crypto-decrypt', {
      detail: {
        resolve,
        encrypted,
        key: keyContainer.key,
        jsonWebKey: true
      },
      bubbles: true,
      cancelable: true,
      composed: true
    })))
  }

  /**
   * Share a key with someone
   * Step1: Derive key with foreign publicKey and own privateKey
   * Step2: Encrypt the key to share "shareKey" with the derived key
   * 
   * @async
   * @param {KEY_CONTAINER} shareKeyContainer
   * @param {import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').KEY} privateKey
   * @param {import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').KEY} publicKey
   * @returns {Promise<import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').ENCRYPTED | import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').ENCRYPTED_ERROR | import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').JSON_WEB_KEY_TO_CRYPTOKEY_ERROR | import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').DERIVE_ERROR>}
   */
  async #shareKey (shareKeyContainer, privateKey, publicKey) {
    /** @type {KEY_CONTAINER} */
    const derivedKey = Keys.getKeyContainer(await new Promise(async resolve => this.dispatchEvent(new CustomEvent('crypto-derive-key', {
      detail: {
        resolve,
        privateKey: privateKey || (await this.#getActiveRoomKeyPair()).privateKey,
        publicKey: publicKey,
        jsonWebKey: true
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))))
    this.#setKeyProperty(shareKeyContainer.key.epoch, 'private.shared', [{
      publicKey,
      room: await (await this.roomPromise).room,
      timestamp: Date.now()
    }])
    const clone = structuredClone(shareKeyContainer)
    // @ts-ignore
    if (clone.private) delete clone.private
    clone.disabled = false
    return this.#encrypt(JSON.stringify(clone), derivedKey)
  }

  /**
   * Receive a key from someone
   * Step1: Derive key with foreign publicKey and own privateKey
   * Step2: Decrypt the key to share "shareKey" with the derived key
   * 
   * @async
   * @param {import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').ENCRYPTED} encrypted
   * @param {import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').KEY} privateKey
   * @param {import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').KEY} publicKey
   * @returns {Promise<KEY_CONTAINER | import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').DECRYPTED_ERROR | import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').JSON_WEB_KEY_TO_CRYPTOKEY_ERROR | import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').DERIVE_ERROR>}
   */
  async #receiveKey (encrypted, privateKey, publicKey) {
    /** @type {KEY_CONTAINER} */
    const derivedKey = Keys.getKeyContainer(await new Promise(async resolve => this.dispatchEvent(new CustomEvent('crypto-derive-key', {
      detail: {
        resolve,
        privateKey: privateKey || (await this.#getActiveRoomKeyPair()).privateKey,
        publicKey: publicKey,
        jsonWebKey: true
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))))
    // @ts-ignore
    const receiveKeyContainer = JSON.parse((await this.#decrypt(encrypted, derivedKey)).text)
    this.#setKey(receiveKeyContainer, publicKey)
    this.#setKeyProperty(receiveKeyContainer.key.epoch, 'private.received', [{
      publicKey,
      room: await (await this.roomPromise).room,
      timestamp: Date.now()
    }])
    return receiveKeyContainer
  }

  /**
   * Always get a container back
   * 
   * @static
   * @param {KEY_CONTAINER | import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').KEY | any} keyContainer
   * @returns {KEY_CONTAINER | any}
   */
  static getKeyContainer (keyContainer) {
    if (typeof keyContainer === 'string') {
      try {
        keyContainer = JSON.parse(keyContainer)
      } catch (error) {
        return null
      }
    }
    return keyContainer.key?.jsonWebKey
      ? keyContainer
      : keyContainer.jsonWebKey
        ? {key: keyContainer}
        : {key: { jsonWebKey: keyContainer}}
  }

  get globalEventTarget () {
    // @ts-ignore
    return this._globalEventTarget || (this._globalEventTarget = self.Environment?.activeRoute || document.body)
  }
}
