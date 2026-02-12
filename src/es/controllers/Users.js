// @ts-check
import { WebWorker } from '../../event-driven-web-components-prototypes/src/WebWorker.js'
import { EventDrivenYjs } from '../EventDrivenYjs.js'

// https://github.com/yjs
/**
 * Constructor options
 @typedef {{
  namespace?: string
 }} options
*/

/**
 * Connected User Expl.: { providerName: InitialUserValue[] }
 @typedef {{string: import("../EventDrivenYjs").InitialUserValue[]}} ConnectedUsers
*/

/**
 * User container
 @typedef {
import("../EventDrivenYjs").InitialUserValue & {
    connectedUsers: ConnectedUsers,
    connectedUsersCount: number,
    isSelf: boolean,
    mutuallyConnectedUsers: ConnectedUsers,
    mutuallyConnectedUsersCount: number,
    nickname?: string,
    publicKey?: string
  }
} User
*/

/**
 * User container
 @typedef {
  Map<string, User>
 } UsersContainer
*/

/**
 * allUsers: All ever registered users to the users CRDT connected to this room
 * users: Mutually connected users
 * usersConnectedWithSelf: Includes the own user as well
 @typedef {
  {allUsers: UsersContainer, users: UsersContainer, usersConnectedWithSelf: UsersContainer}
 } GetDataResult
*/

/**
 * outgoing event
 @typedef {{
  getData: () => Promise<GetDataResult>,
  selfUser: import("../EventDrivenYjs").InitialUserValue | null // Can be initially null until the object loaded,
  keysChanged: any[],
  separator: string
 }} UsersEventDetail
*/

/**
 * outgoing event
 @typedef {{
  nickname: string,
  resolve?: any
 }} SetNicknameDetail
*/

/* global CustomEvent */
/* global self */

// separator used for separating provider name <> origin eg.: 'webrtc<>wss://local.it:8080' as key in connectedUsers object
export const separator = '<>'
// EventDrivenYjsClass.epochDateNow
const EventDrivenYjsClass = EventDrivenYjs()

// Supported attributes:
// Attribute {namespace} string default is yjs-, which gets prepend to each outgoing event string as well as on each listener event string

/**
 * Users is a helper to keep all user object in a yjs map and forwarding the proper events helping having an overview of all participants
 *
 * @export
 * @function Users
 * @param {CustomElementConstructor} [ChosenHTMLElement = WebWorker()]
 * @return {CustomElementConstructor | *}
 */
export const Users = (ChosenHTMLElement = WebWorker()) => class Users extends ChosenHTMLElement {
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

    // get the own user uid once for further use at this.usersObserveEventListener
    this.awarenessChangeEventListenerOnce = event => {
      this.uidResolve(event.detail.uid)
      this.awarenessChangeEventListenerOnce = () => {}
    }

    let lastSelfUser = null
    // receive on awareness change event the details of the own user as well as the awareness stateValueUsers with all direct connections and save itself into the user ymap
    this.awarenessChangeEventListener = async (event, isUpdate = false) => {
      this.awarenessChangeEventListenerOnce(event)
      const yMap = (await this.yMap).type
      const stateValueUsers = event.detail.stateValues ? event.detail.stateValues.map(stateValue => stateValue.user) : []
      let selfUser = {
        epoch: event.detail.epoch,
        fingerprint: event.detail.fingerprint,
        localEpoch: event.detail.localEpoch,
        sessionEpoch: event.detail.sessionEpoch,
        uid: event.detail.uid,
        nickname: (await this.getNickname()).nickname,
        publicKey: await this.getPublicKey(),
        connectedUsers: stateValueUsers.length
          ? {
            // clean all connectedUsers according to the provider status
            [`${event.detail.name}${separator}${event.detail.url.origin || event.detail.url}`]: event.detail.isProviderConnected(event.detail.provider)
              ? stateValueUsers.filter(user => (user?.uid !== event.detail?.uid))
              : []
          }
          : [],
        ...(stateValueUsers.find(user => (user.uid === event.detail.uid)) || {}) // get all updates on own user
      }
      // only change the awarenessEpoch when awareness change event. the awareness update event fires regularly and would make too many changes to the user yMap.
      if (!isUpdate) selfUser.awarenessEpoch = event.detail.awarenessEpoch // when event is fired it takes Date.now() to create this value
      if (yMap.has(selfUser.uid)) {
        // merge the map user with the awareness user
        const selfUserFromMap = yMap.get(selfUser.uid)
        for (const key in selfUser) {
          if (typeof selfUser[key] === 'object') selfUser[key] = { ...selfUserFromMap[key], ...selfUser[key] }
        }
        selfUser = { ...selfUserFromMap, ...selfUser }
      }
      if (JSON.stringify(lastSelfUser) !== JSON.stringify(selfUser)) {
        yMap.set(selfUser.uid, (lastSelfUser = selfUser))
      } else {
        this.dispatchEvent(new CustomEvent(`${this.namespace}awareness-change-with-no-user-change`, {
          detail: event.detail,
          bubbles: true,
          cancelable: true,
          composed: true
        }))
      }
    }

    this.awarenessUpdateEventListener = event => this.awarenessChangeEventListener(event, true)

    this.usersObserveEventListener = async event => {
      const uid = await this.uid
      /* type: event.detail.type */ // protect the original users map
      const selfUser = self.structuredClone(event.detail.type.get(uid))
      /** @type {null | GetDataResult} */
      let getDataResult = null
      /** @return {Promise<GetDataResult>} */
      const getData = async () => {
        if (getDataResult) return getDataResult
        // @ts-ignore
        return (getDataResult = await this.webWorker((type, uid) => {
          type = new Map(type)
          /** @type {UsersContainer} */
          const users = new Map()
          /** @type {UsersContainer} */
          const usersAll = new Map()
          // clone the yjs type map into a new map to avoid unwanted editing, which should happen through events
          // analyze and enrich each user, if that object is this clients user. "isSelf"
          type.forEach((user, key) => {
            let connectedUsersCount = 0
            let mutuallyConnectedUsersCount = 0
            if (user.connectedUsers) {
              user.mutuallyConnectedUsers = {}
              for (const url in user.connectedUsers) {
                connectedUsersCount += user.connectedUsers[url].length || 0
                user.connectedUsers[url].forEach(connectedUser => {
                  if (!connectedUser) return
                  connectedUser.isSelf = connectedUser.uid === uid
                  // look for the user on the yjs type map and check if it also contains this user in its connectedUsers
                  let connectedUserType
                  if ((connectedUserType = type.get(connectedUser.uid)) && connectedUserType.connectedUsers[url]?.find(connectedUser => (connectedUser?.uid === user.uid))) {
                    user.mutuallyConnectedUsers[url] = [...user.mutuallyConnectedUsers[url] || [], connectedUser]
                    mutuallyConnectedUsersCount++
                  }
                })
              }
            }
            user = { ...user, connectedUsersCount, mutuallyConnectedUsersCount, isSelf: user.uid === uid }
            usersAll.set(key, user)
            if (user.mutuallyConnectedUsersCount > 0) users.set(key, user)
          })
          /** @type {UsersContainer} */
          const usersConnectedWithSelf = new Map()
          let mutuallyConnectedUsers
          if ((mutuallyConnectedUsers = users.get(uid)?.mutuallyConnectedUsers)) {
            /**
             * Recursively fill all mutually connected users
             *
             * @param {{string: import("../EventDrivenYjs").InitialUserValue[]}} usersContainer
             * @returns {void}
             */
            const fillUsers = usersContainer => {
              for (const key in usersContainer) {
                usersContainer[key].forEach(user => {
                  let fullUser
                  if (!usersConnectedWithSelf.has(user.uid) && (fullUser = users.get(user.uid))) {
                    usersConnectedWithSelf.set(user.uid, fullUser)
                    fillUsers(fullUser.mutuallyConnectedUsers)
                  }
                })
              }
            }
            fillUsers(mutuallyConnectedUsers)
          }
          // allUsers just all ever written into the CRDT, users which have a confirmed mutual connection, usersConnectedWithSelf are directly or indirectly mutually connected
          return { allUsers: usersAll, users, usersConnectedWithSelf }
        }, Array.from(event.detail.type).map(([key, user]) => [key, self.structuredClone(user)]), uid))
      }
      /** @type {UsersEventDetail} */
      const detail = {
        getData,
        selfUser,
        keysChanged: event.detail.yjsEvent?.reduce((acc, curr) => acc.concat(Array.from(curr.keysChanged || [])), []) || [],
        separator
      }
      this.usersEventDetailResolve(detail)
      this.usersEventDetail = Promise.resolve(detail)
      this.dispatchEvent(new CustomEvent(`${this.namespace}users`, {
        /** @type {UsersEventDetail} */
        detail,
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    this.getUserEventListener = async event => {
      const allUsers = (await (await this.usersEventDetail).getData()).allUsers
      const detail = {
        user: event.detail.uid
        ? allUsers.get(event.detail.uid)
        : Array.from(allUsers.values()).find(user => user.publicKey === event.detail.publicKey)
      }
      if (event && event.detail && event.detail.resolve) return event.detail.resolve(detail)
      this.dispatchEvent(new CustomEvent(`${this.namespace}user`, {
        /** @type {{user: User|undefined}} */
        detail,
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    this.getUsersEventDetailEventListener = event => {
      if (event && event.detail && event.detail.resolve) return event.detail.resolve(this.usersEventDetail)
      this.dispatchEvent(new CustomEvent(`${this.namespace}users-event-detail`, {
        /** @type {Promise<UsersEventDetail>} */
        detail: this.usersEventDetail,
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    this.setNicknameEventListener = async event => {
      if (!event.detail.nickname) return
      const uid = await this.uid
      const yMap = (await this.yMap).type
      const selfUser = yMap.get(uid)
      const nickname = event.detail.nickname
      if (selfUser && (selfUser.nickname !== nickname)) yMap.set(uid, { ...selfUser, nickname })
      const detail = { nickname }
      if (event && event.detail && event.detail.resolve) return event.detail.resolve(detail)
      this.dispatchEvent(new CustomEvent(`${this.namespace}nickname`, {
        detail,
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    this.getNicknameEventListener = async event => {
      const getNicknameResult = await this.getNickname()
      const detail = {
        nickname: getNicknameResult.nickname,
        isRandom: getNicknameResult.isRandom,
        isNewlyGenerated: getNicknameResult.isNewlyGenerated
      }
      if (event && event.detail && event.detail.resolve) return event.detail.resolve(detail)
      this.dispatchEvent(new CustomEvent(`${this.namespace}nickname`, {
        detail,
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    // manually update the awareness epoch
    this.updateAwarenessEpochEventListener = async event => {
      const uid = await this.uid
      const yMap = (await this.yMap).type
      const selfUser = yMap.get(uid)
      const awarenessEpoch = EventDrivenYjsClass.epochDateNow
      if (selfUser && (selfUser.awarenessEpoch !== awarenessEpoch)) yMap.set(uid, { ...selfUser, awarenessEpoch })
    }

    /** @type {(UsersEventDetail)=>void} */
    this.usersEventDetailResolve = map => map
    /** @type {Promise<UsersEventDetail>} */
    this.usersEventDetail = new Promise(resolve => (this.usersEventDetailResolve = resolve))

    /** @type {(any)=>void} */
    this.uidResolve = map => map
    /** @type {Promise<string>} */
    this.uid = new Promise(resolve => (this.uidResolve = resolve))

    /** @type {(any)=>void} */
    this.yMapResolve = map => map
    /** @type {Promise<{type: import("../dependencies/yjs").Map}>} */
    this.yMap = new Promise(resolve => (this.yMapResolve = resolve))
  }

  connectedCallback () {
    this.globalEventTarget.addEventListener(`${this.namespace}websocket-awareness-change`, this.awarenessChangeEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}webrtc-awareness-change`, this.awarenessChangeEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}p2pt-awareness-change`, this.awarenessChangeEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}websocket-awareness-update`, this.awarenessUpdateEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}webrtc-awareness-update`, this.awarenessUpdateEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}p2pt-awareness-update`, this.awarenessUpdateEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}users-observe`, this.usersObserveEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}get-user`, this.getUserEventListener)
    this.addEventListener(`${this.namespace}get-users-event-detail`, this.getUsersEventDetailEventListener)
    this.addEventListener(`${this.namespace}set-nickname`, this.setNicknameEventListener)
    this.addEventListener(`${this.namespace}get-nickname`, this.getNicknameEventListener)
    this.addEventListener(`${this.namespace}update-awareness-epoch`, this.updateAwarenessEpochEventListener)
    if (this.isConnected) this.connectedCallbackOnce()
  }

  connectedCallbackOnce () {
    this.dispatchEvent(new CustomEvent(`${this.namespace}doc`, {
      detail: {
        command: 'getMap',
        arguments: ['users'],
        observe: `${this.namespace}users-observe`,
        observeDeep: true,
        resolve: this.yMapResolve
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))
    this.connectedCallbackOnce = () => {}
  }

  disconnectedCallback () {
    this.globalEventTarget.removeEventListener(`${this.namespace}websocket-awareness-change`, this.awarenessChangeEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}webrtc-awareness-change`, this.awarenessChangeEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}p2pt-awareness-change`, this.awarenessChangeEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}websocket-awareness-update`, this.awarenessUpdateEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}webrtc-awareness-update`, this.awarenessUpdateEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}p2pt-awareness-update`, this.awarenessUpdateEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}users-observe`, this.usersObserveEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}get-user`, this.getUserEventListener)
    this.removeEventListener(`${this.namespace}get-users-event-detail`, this.getUsersEventDetailEventListener)
    this.removeEventListener(`${this.namespace}set-nickname`, this.setNicknameEventListener)
    this.removeEventListener(`${this.namespace}get-nickname`, this.getNicknameEventListener)
    this.removeEventListener(`${this.namespace}update-awareness-epoch`, this.updateAwarenessEpochEventListener)
  }

  async getPublicKey () {
    const publicKey = await new Promise(resolve => this.dispatchEvent(new CustomEvent(`${this.namespace}get-active-room-public-key`, {
      detail: { resolve },
      bubbles: true,
      cancelable: true,
      composed: true
    })))
    if (publicKey.error) return ''
    return JSON.stringify(publicKey)
  }

  /**
   * Get the current nickname from the crdt or a random nickname
   * 
   * @async
   * @returns {Promise<{ nickname: string; isRandom: boolean; isNewlyGenerated: boolean; }>}
   */
  async getNickname () {
    let nickname = (await this.yMap).type.get(await this.uid)?.nickname
    let isRandom = false
    let isNewlyGenerated = false
    if (!nickname) {
      const { randomNickname, newlyGenerated } = await this.getRandomNickname()
      nickname = randomNickname
      isRandom = true
      isNewlyGenerated = newlyGenerated
    }
    return {
      nickname,
      isRandom,
      isNewlyGenerated
    }
  }

  getRandomNickname () {
    return new Promise(resolve => this.dispatchEvent(new CustomEvent('yjs-get-active-room', {
      detail: {
        resolve
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))).then(room => {
      if (room?.randomNickname) return {
        randomNickname: room.randomNickname,
        newlyGenerated: false
      }
      const randomNickname = `no-name-${new Date().getUTCMilliseconds()}`
      this.dispatchEvent(new CustomEvent('yjs-merge-active-room', {
        detail: { randomNickname },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
      return {
        randomNickname,
        newlyGenerated: true
      }
    })
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

  get globalEventTarget () {
    // @ts-ignore
    return this._globalEventTarget || (this._globalEventTarget = self.Environment?.activeRoute || document.body)
  }
}
