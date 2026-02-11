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
 *    name: string,
 *    origin: {
 *      room: string,
 *      publicKey?: import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').KEY,
 *      uid?: string | null,
 *      nickname?: string,
 *      timestamp: number,
 *      self: boolean
 *    },
 *    shared?: {
 *      room: string,
 *      publicKey: import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').KEY,
 *      uid: string | null,
 *      nickname: string,
 *      timestamp: number
 *    }[],
 *    received?: {
 *      room: string,
 *      publicKey: import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').KEY,
 *      uid: string | null,
 *      nickname: string,
 *      timestamp: number
 *    }[],
 *    encrypted?: {
 *      room: string,
 *      timestamp: number
 *    }[],
 *    decrypted?: {
 *      room: string,
 *      uid?: string | null,
 *      nickname?: string,
 *      timestamp: number
 *    }[]
 *  },
 *  public: {name: string},
 * }} KEY_CONTAINER
 */

/**
 * @typedef {KEY_CONTAINER[]} KEY_CONTAINERS
 */

/** @typedef {{ error: true, message: string, decrypted: import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').DECRYPTED, key: import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').KEY }} RECEIVE_KEY_PARSE_ERROR */

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

    // keep track of key shared, received, encrypted and decrypted for each maximum 100
    this.maxLength = this.getAttribute('max-length') || 100
    this.encryptMaxLength = this.getAttribute('encrypt-max-length') || 20
    this.labelNoNickname = 'nickname not found!'
    // filter for unique objects by uid
    this.arrayUidFilterFunction = (element, index, array) => {
      const arrIndex = array.findIndex(arrElement => arrElement !== element && arrElement.uid === element.uid)
      if (arrIndex !== -1 && arrIndex < index) return false
      return true
    }
    // filter for unique objects by publicKey
    this.arrayPublicKeyFilterFunction = (element, index, array) => {
      const arrIndex = array.findIndex(arrElement => arrElement !== element && arrElement.publicKey === element.publicKey)
      if (arrIndex !== -1 && arrIndex < index) return false
      return true
    }
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
    this.setKeyPublicNameEventListener = async event => {
      // also adjust the private name, if it is still random
      if (event.detail.adjustRandomNames) {
        const keyContainer = await this.#getKey(event.detail.epoch)
        if (keyContainer?.private.name.includes(Keys.randomNamePrefix)) {
          const result = await this.#setKeyProperty(event.detail.epoch, 'private.name', event.detail.propertyValue)
          // @ts-ignore
          this.respond(undefined, `${this.namespace}key-property-modified`, result)
        }
      }
      this.respond(event.detail?.resolve, event.detail?.name || `${this.namespace}key-property-modified`, this.#setKeyProperty(event.detail.epoch, 'public.name', event.detail.propertyValue))
    }
    this.deleteKeyEventListener = event => this.respond(event.detail?.resolve, event.detail?.name || `${this.namespace}key-deleted`, this.#deleteKey(event.detail.epoch))
    this.encryptEventListener = event => this.respond(event.detail?.resolve, event.detail?.name || `${this.namespace}encrypted`, this.#encrypt(event.detail.text, Keys.getKeyContainer(event.detail.key)))
    this.decryptEventListener = event => this.respond(event.detail?.resolve, event.detail?.name || `${this.namespace}decrypted`, this.#decrypt(event.detail.encrypted, Keys.getKeyContainer(event.detail.key), event.detail.uid))
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
    this.globalEventTarget.addEventListener(`${this.namespace}set-new-key`, this.setNewKeyEventListener)
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
    this.globalEventTarget.removeEventListener(`${this.namespace}set-new-key`, this.setNewKeyEventListener)
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
   * @async
   * @param {(any)=>void} resolve
   * @param {string|undefined} name
   * @param {any} detail
   * @return {Promise<any | false>}
   */
  async respond (resolve, name, detail) {
    if (typeof resolve === 'function') return resolve(detail)
    if (typeof name === 'string') {
      this.dispatchEvent(new CustomEvent(name, {
        detail: await detail,
        bubbles: true,
        cancelable: true,
        composed: true
      }))
      return detail
    }
    return false
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
    if (keyContainer.disabled === undefined) keyContainer.disabled = false
    // @ts-ignore
    if (!keyContainer.public) keyContainer.public = {}
    if (!keyContainer.public.name) keyContainer.public.name = Keys.randomName
    // @ts-ignore
    if (!keyContainer.private) keyContainer.private = {}
    if (!keyContainer.private.name) keyContainer.private.name = keyContainer.public.name
    // @ts-ignore
    if (!keyContainer.private.origin) keyContainer.private.origin = {}
    if (!keyContainer.private.origin.timestamp) keyContainer.private.origin.timestamp = Date.now()
    if (keyContainer.private.origin.self === undefined) keyContainer.private.origin.self = false
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
      if (!keyContainer.private.origin.publicKey) {
        keyContainer.private.origin.publicKey = publicKey
        const user = (await new Promise(resolve => this.dispatchEvent(new CustomEvent('yjs-get-user', {
          detail: {
            resolve,
            publicKey
          },
          bubbles: true,
          cancelable: true,
          composed: true
        })))).user
        keyContainer.private.origin.uid = user?.uid || null
        keyContainer.private.origin.nickname = user?.nickname || this.labelNoNickname
      }
    }
    if (!keyContainer.private.origin.room) keyContainer.private.origin.room = await (await this.roomPromise).room
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
    const newKey = await this.#_getNewKey()
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
   * @param {string} epoch
   * @param {KEY_CONTAINERS} [keyContainers=undefined]
   * @returns {Promise<KEY_CONTAINER|undefined>}
   */
  async #getKey (epoch, keyContainers) {
    return (keyContainers || await this.#getKeys()).find(keyContainer => keyContainer.key.epoch === epoch)
  }

  /**
   * getNewKey
   * 
   * @async
   * @returns {Promise<KEY_CONTAINER>}
   */
  async #_getNewKey () {
    const randomName = Keys.randomName
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
      private: {
        name: randomName,
        origin: {
          room: await (await this.roomPromise).room,
          timestamp: Date.now(),
          self: true
        }
      },
      public: { name: randomName }
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
    const keyContainer = await this.#getKey(epoch, keyContainers)
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
   * @prop {boolean} [setKeyProperty=true]
   * @returns {Promise<import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').ENCRYPTED | import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').ENCRYPTED_ERROR | import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').JSON_WEB_KEY_TO_CRYPTOKEY_ERROR>}
   */
  async #encrypt (text, keyContainer, setKeyProperty = true) {
    if (setKeyProperty) this.#setKeyProperty(keyContainer.key.epoch, 'private.encrypted', [{
      room: await (await this.roomPromise).room,
      timestamp: Date.now()
    }], {
      concat: 'unshift',
      maxLength: this.encryptMaxLength
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
   * @prop {string} [uid=null]
   * @prop {boolean} [setKeyProperty=true]
   * @returns {Promise<import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').DECRYPTED | import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').DECRYPTED_ERROR | import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').JSON_WEB_KEY_TO_CRYPTOKEY_ERROR>}
   */
  async #decrypt (encrypted, keyContainer, uid = null, setKeyProperty = true) {
    if (setKeyProperty) this.#setKeyProperty(keyContainer.key.epoch, 'private.decrypted', [{
      uid,
      nickname: uid
        ? (await new Promise(resolve => this.dispatchEvent(new CustomEvent('yjs-get-user', {
          detail: {
            resolve,
            uid
          },
          bubbles: true,
          cancelable: true,
          composed: true
        })))).user?.nickname || this.labelNoNickname
        : this.labelNoNickname,
      room: await (await this.roomPromise).room,
      timestamp: Date.now()
    }], {
      concat: 'unshift',
      maxLength: this.maxLength,
      arrayFilter: this.arrayUidFilterFunction
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
   * @returns {Promise<{keyContainers: import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').JSON_WEB_KEY_TO_CRYPTOKEY_ERROR | KEY_CONTAINERS | null, shared: import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').ENCRYPTED | import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').ENCRYPTED_ERROR | import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').JSON_WEB_KEY_TO_CRYPTOKEY_ERROR | import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').DERIVE_ERROR}>}
   */
  async #shareKey (shareKeyContainer, privateKey, publicKey) {
    const derivedKey = await new Promise(async resolve => this.dispatchEvent(new CustomEvent('crypto-derive-key', {
      detail: {
        resolve,
        privateKey: privateKey || (await this.#getActiveRoomKeyPair()).privateKey,
        publicKey: publicKey,
        jsonWebKey: true
      },
      bubbles: true,
      cancelable: true,
      composed: true
    })))
    if (derivedKey.error) return derivedKey
    const user = (await new Promise(resolve => this.dispatchEvent(new CustomEvent('yjs-get-user', {
      detail: {
        resolve,
        publicKey
      },
      bubbles: true,
      cancelable: true,
      composed: true
    })))).user
    const setKeyPropertyResult = await this.#setKeyProperty(shareKeyContainer.key.epoch, 'private.shared', [{
      publicKey,
      uid: user?.uid || null,
      nickname: user?.nickname || this.labelNoNickname,
      room: await (await this.roomPromise).room,
      timestamp: Date.now()
    }], {
      concat: 'unshift',
      maxLength: this.maxLength,
      arrayFilter: this.arrayPublicKeyFilterFunction
    })
    const keyContainers = setKeyPropertyResult ? setKeyPropertyResult.keyContainers : null
    const clone = structuredClone(shareKeyContainer)
    // @ts-ignore
    if (clone.private) delete clone.private
    clone.disabled = false
    return {
      shared: await this.#encrypt(JSON.stringify(clone), Keys.getKeyContainer(derivedKey), false),
      keyContainers
    }
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
   * @returns {Promise<{keyContainers: import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').JSON_WEB_KEY_TO_CRYPTOKEY_ERROR | KEY_CONTAINERS | null, received: KEY_CONTAINER | RECEIVE_KEY_PARSE_ERROR | import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').DECRYPTED_ERROR | import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').JSON_WEB_KEY_TO_CRYPTOKEY_ERROR | import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').DERIVE_ERROR}>}
   */
  async #receiveKey (encrypted, privateKey, publicKey) {
    const derivedKey = await new Promise(async resolve => this.dispatchEvent(new CustomEvent('crypto-derive-key', {
      detail: {
        resolve,
        privateKey: privateKey || (await this.#getActiveRoomKeyPair()).privateKey,
        publicKey: publicKey,
        jsonWebKey: true
      },
      bubbles: true,
      cancelable: true,
      composed: true
    })))
    if (derivedKey.error) return derivedKey
    /** @type {import('../../event-driven-web-components-prototypes/src/controllers/Crypto.js').DECRYPTED} */
    // @ts-ignore
    const decrypted = await this.#decrypt(encrypted, Keys.getKeyContainer(derivedKey), undefined, false)
    // @ts-ignore
    if (decrypted.error) return decrypted
    let receivedKeyContainer
    try {
      receivedKeyContainer = JSON.parse(decrypted.text)
    } catch (error) {
      return {
        received: {
          error: true,
          message: `Error decrypted message could not be JSON parsed: ${error}`,
          decrypted,
          key: derivedKey,
        },
        keyContainers: null
      }
    }
    const keyContainers = await this.#setKey(receivedKeyContainer, publicKey)
    const user = (await new Promise(resolve => this.dispatchEvent(new CustomEvent('yjs-get-user', {
      detail: {
        resolve,
        publicKey
      },
      bubbles: true,
      cancelable: true,
      composed: true
    })))).user
    this.#setKeyProperty(receivedKeyContainer.key.epoch, 'private.received', [{
      publicKey,
      uid: user?.uid || null,
      nickname: user?.nickname || this.labelNoNickname,
      room: await (await this.roomPromise).room,
      timestamp: Date.now()
    }], {
      concat: 'unshift',
      maxLength: this.maxLength,
      arrayFilter: this.arrayPublicKeyFilterFunction
    })
    return {
      received: receivedKeyContainer,
      keyContainers
    }
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

  static get randomNamePrefix () {
    return 'no-key-name-'
  }

  static get randomName () {
    return `${Keys.randomNamePrefix}${new Date().getUTCMilliseconds()}`
  }

  get globalEventTarget () {
    // @ts-ignore
    return this._globalEventTarget || (this._globalEventTarget = self.Environment?.activeRoute || document.body)
  }
}
