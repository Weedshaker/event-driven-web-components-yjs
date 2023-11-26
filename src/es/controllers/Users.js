// @ts-check

// https://github.com/yjs
/**
 * Constructor options
 @typedef {{
  namespace?: string
 }} options
*/

/**
 * User container
 @typedef {
  Map<string, import("../EventDrivenYjs").InitialUserValue & {
    connectedUsers: {string: import("../EventDrivenYjs").InitialUserValue},
    connectedUsersCount: number,
    isSelf: boolean,
    mutuallyConnectedUsers: {string: import("../EventDrivenYjs").InitialUserValue},
    mutuallyConnectedUsersCount: number
  }>
 } UsersContainer
*/

/**
 * outgoing event
 @typedef {{
  getData: () => {allUsers: UsersContainer, users: UsersContainer}
 }} UsersEventDetail
*/

/* global HTMLElement */
/* global CustomEvent */
/* global self */

export const separator = '<>'

// Supported attributes:
// Attribute {namespace} string default is yjs-, which gets prepend to each outgoing event string as well as on each listener event string

/**
 * Users is a helper to keep all user object in a yjs map and forwarding the proper events helping having an overview of all participants
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

    // get the own user uid once for further use at this.awarenessUsersEventListener
    this.awarenessChangeEventListenerOnce = event => {
      this.uidResolve(event.detail.uid)
      this.awarenessChangeEventListenerOnce = () => {}
    }
    // receive on awareness change event the details of the own user as well as the awareness stateValueUsers with all direct connections and save itself into the user ymap
    this.awarenessChangeEventListener = async event => {
      this.awarenessChangeEventListenerOnce(event)
      const yMap = (await this.yMap).type
      const stateValueUsers = event.detail.stateValues.map(stateValue => stateValue.user)
      const selfUser = {
        epoch: event.detail.epoch,
        fingerprint: event.detail.fingerprint,
        localEpoch: event.detail.localEpoch,
        sessionEpoch: event.detail.sessionEpoch,
        uid: event.detail.uid,
        connectedUsers: {
          // TODO: TypeError: Cannot read properties of undefined (reading 'uid')
          [`${event.detail.name}${separator}${event.detail.url.origin}`]: stateValueUsers.filter(user => (user.uid !== event.detail.uid))
        },
        ...(stateValueUsers.find(user => (user.uid === event.detail.uid)) || {}) // get all updates on own user
      }
      if (yMap.has(selfUser.uid)) {
        // merge the map user with the awareness user
        const selfUserFromMap = yMap.get(selfUser.uid)
        for (const key in selfUser) {
          if (typeof selfUser[key] === 'object') selfUser[key] = { ...selfUserFromMap[key], ...selfUser[key] }
        }
        yMap.set(selfUser.uid, { ...selfUserFromMap, ...selfUser })
      } else {
        // newly set the first timer
        yMap.set(selfUser.uid, selfUser)
      }
    }

    this.awarenessUsersEventListener = async event => {
      const uid = await this.uid
      /** @type {null | {allUsers: UsersContainer,users: UsersContainer}} */
      let getDataResult = null
      const getData = () => {
        if (getDataResult) return getDataResult
        /** @type {UsersContainer} */
        const users = new Map()
        /** @type {UsersContainer} */
        const allUsers = new Map()
        // clone the yjs type map into a new map to avoid unwanted editing, which should happen through events
        // analyze and enrich each user, if that object is this clients user. "isSelf"
        event.detail.type.forEach((user, key) => {
          user = self.structuredClone(user)
          let connectedUsersCount = 0
          let mutuallyConnectedUsersCount = 0
          if (user.connectedUsers) {
            user.mutuallyConnectedUsers = {}
            for (const url in user.connectedUsers) {
              connectedUsersCount += user.connectedUsers[url].length || 0
              user.connectedUsers[url].forEach(connectedUser => {
                connectedUser.isSelf = connectedUser.uid === uid
                // look for the user on the yjs type map and check if it also contains this user in its connectedUsers
                let connectedUserType
                if ((connectedUserType = event.detail.type.get(connectedUser.uid)) && connectedUserType.connectedUsers[url]?.find(connectedUser => (connectedUser.uid === user.uid))) {
                  user.mutuallyConnectedUsers[url] = [...user.mutuallyConnectedUsers[url] || [], connectedUser]
                  mutuallyConnectedUsersCount++
                }
              })
            }
          }
          user = { ...user, connectedUsersCount, mutuallyConnectedUsersCount, isSelf: user.uid === uid }
          allUsers.set(key, user)
          if (user.mutuallyConnectedUsersCount > 0) users.set(key, user)
        })
        return (getDataResult = { allUsers, users })
      }
      this.dispatchEvent(new CustomEvent(`${this.namespace}users`, {
        /** @type {UsersEventDetail} */
        detail: {
          getData
          /* type: event.detail.type */ // protect the original users map
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

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
    document.body.addEventListener(`${this.namespace}websocket-awareness-change`, this.awarenessChangeEventListener)
    document.body.addEventListener(`${this.namespace}webrtc-awareness-change`, this.awarenessChangeEventListener)
    document.body.addEventListener(`${this.namespace}p2pt-awareness-change`, this.awarenessChangeEventListener)
    document.body.addEventListener(`${this.namespace}awareness-users`, this.awarenessUsersEventListener)
    this.dispatchEvent(new CustomEvent(`${this.namespace}doc`, {
      detail: {
        command: 'getMap',
        arguments: ['users'],
        observe: `${this.namespace}awareness-users`,
        observeDeep: true,
        resolve: this.yMapResolve
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
    document.body.removeEventListener(`${this.namespace}awareness-users`, this.awarenessUsersEventListener)
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
