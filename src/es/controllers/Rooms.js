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
 * Rooms is a helper to keep all rooms object at storage and forwarding the proper events helping having an overview of all participants
 *
 * @export
 * @function Rooms
 * @param {CustomElementConstructor} [ChosenHTMLElement = HTMLElement]
 * @return {CustomElementConstructor | *}
 */
export const Rooms = (ChosenHTMLElement = HTMLElement) => class Rooms extends ChosenHTMLElement {
  /**
   * Creates an instance rooms. The constructor will be called for every custom element using this class when initially created.
   *
   * @param {options} [options = {namespace=undefined}]
   * @param {*} args
   */
  constructor (options = { namespace: undefined }, ...args) {
    super(...args)

    // set attribute namespace
    if (options.namespace) this.namespace = options.namespace
    else if (!this.namespace) this.namespace = 'yjs-'
    // @ts-ignore
    this.roomNamePrefix = self.Environment?.roomNamePrefix || 'chat-'

    // save room name and last focused timestamp to local storage
    // dispatch from self.Environment?.router that it also works on disconnect, since the storage controller is above the router
    this.focusEventListener = event => this.saveRoom()
    this.chatUpdateEventListener = async event => {
      await event.detail.getAll()
      this.saveRoom()
    }

    // save room name to local storage
    this.providersUpdateEventListener = async event => {
      this.providersPromise = Promise.resolve(event.detail)
      this.dispatchEvent(new CustomEvent('storage-merge', {
        detail: {
          key: `${this.roomNamePrefix}rooms`,
          value: {
            [await (await this.roomPromise).room]: {
              locationHref: event.detail.locationHref
            }
          }
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    this.getRoomsEventListener = async event => {
      if (event && event.detail && event.detail.resolve) return event.detail.resolve(await this.getRooms())
      this.dispatchEvent(new CustomEvent(`${this.namespace}rooms`, {
        detail: await this.getRooms(),
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    this.getSpecificRoomEventListener = async event => {
      const detail = {
        room: (await this.getRooms()).value[event.detail.roomName],
        isActiveRoom: await (await this.roomPromise).room === event.detail.roomName
      }
      if (event && event.detail && event.detail.resolve) return event.detail.resolve(detail)
      this.dispatchEvent(new CustomEvent(`${this.namespace}specific-room`, {
        detail,
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    this.getActiveRoomEventListener = async event => {
      if (event && event.detail && event.detail.resolve) return event.detail.resolve((await this.getRooms()).value[await (await this.roomPromise).room])
      this.dispatchEvent(new CustomEvent(`${this.namespace}active-room`, {
        detail: (await this.getRooms()).value[await (await this.roomPromise).room],
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    this.mergeUniqueActiveRoomEventListener = async event => {
      this.dispatchEvent(new CustomEvent('storage-merge', {
        detail: {
          key: `${this.roomNamePrefix}rooms`,
          value: {
            [await (await this.roomPromise).room]: event.detail
          },
          uniqueArray: true,
          uniqueMap: true,
          resolve: event.detail.resolve
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    this.mergeActiveRoomEventListener = async event => {
      this.dispatchEvent(new CustomEvent('storage-merge', {
        detail: {
          key: `${this.roomNamePrefix}rooms`,
          value: {
            [await (await this.roomPromise).room]: event.detail
          },
          resolve: event.detail.resolve
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    this.mergeRoomEventListener = async event => {
      this.dispatchEvent(new CustomEvent('storage-merge', {
        detail: {
          key: `${this.roomNamePrefix}rooms`,
          value: {
            [event.detail.key]: event.detail.value
          },
          resolve: event.detail.resolve
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    this.deleteRoomEventListener = async event => {
      // bug fix, it was possible to add rooms with double quotes " which escaped the attribute, see Line 481 (delete="${key.replace(/"/g, "'")}")
      // this fix can be removed after a while
      let rooms
      if ((rooms = await this.getRooms()).value[event.detail.name]) {
        delete rooms.value[event.detail.name]
      } else {
        delete rooms.value[event.detail.name.replace(/'/g, '"')]
      }
      this.dispatchEvent(new CustomEvent('storage-set', {
        detail: {
          key: `${this.roomNamePrefix}rooms`,
          value: rooms.value,
          resolve: event.detail?.resolve
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    this.undoRoomEventListener = async event => {
      this.dispatchEvent(new CustomEvent('storage-undo', {
        detail: {
          key: `${this.roomNamePrefix}rooms`,
          resolve: event.detail?.resolve
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    /** @type {(any)=>void} */
    this.providersResolve = map => map
    /** @type {Promise<import("../EventDrivenYjs.js").ProvidersUpdateEventDetail>} */
    this.providersPromise = new Promise(resolve => (this.providersResolve = resolve))

    /** @type {(any)=>void} */
    this.roomResolve = map => map
    /** @type {Promise<{ locationHref: string, room: Promise<string> & {done: boolean} }>} */
    this.roomPromise = new Promise(resolve => (this.roomResolve = resolve))
  }

  connectedCallback () {
    self.addEventListener('focus', this.focusEventListener)
    this.globalEventTarget.addEventListener('yjs-chat-update', this.chatUpdateEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}providers-update`, this.providersUpdateEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}get-rooms`, this.getRoomsEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}get-specific-room`, this.getSpecificRoomEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}get-active-room`, this.getActiveRoomEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}merge-active-room`, this.mergeActiveRoomEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}merge-room`, this.mergeRoomEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}merge-unique-active-room`, this.mergeUniqueActiveRoomEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}delete-room`, this.deleteRoomEventListener)
    this.globalEventTarget.addEventListener(`${this.namespace}undo-room`, this.undoRoomEventListener)
    this.saveRoom()
    if (this.isConnected) this.connectedCallbackOnce()
  }

  connectedCallbackOnce () {
    this.dispatchEvent(new CustomEvent(`${this.namespace}get-providers`, {
      detail: {
        resolve: this.providersResolve
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))
    this.dispatchEvent(new CustomEvent(`${this.namespace}get-room`, {
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
    self.removeEventListener('focus', this.focusEventListener)
    this.globalEventTarget.removeEventListener('yjs-chat-update', this.chatUpdateEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}providers-update`, this.providersUpdateEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}get-rooms`, this.getRoomsEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}get-specific-room`, this.getSpecificRoomEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}get-active-room`, this.getActiveRoomEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}merge-active-room`, this.mergeActiveRoomEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}merge-room`, this.mergeRoomEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}merge-unique-active-room`, this.mergeUniqueActiveRoomEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}delete-room`, this.deleteRoomEventListener)
    this.globalEventTarget.removeEventListener(`${this.namespace}undo-room`, this.undoRoomEventListener)
  }

  getRooms () {
    return new Promise(resolve => this.dispatchEvent(new CustomEvent('storage-get', {
      detail: {
        key: `${this.roomNamePrefix}rooms`,
        resolve
      },
      bubbles: true,
      cancelable: true,
      composed: true
    })))
  }

  saveRoom () {
    // save room name and last focused timestamp to local storage
    // dispatch from self.Environment?.router that it also works on disconnect, since the storage controller is above the router
    this.roomPromise.then(async ({ locationHref, room }) => {
      const providersObj = await this.providersPromise
      const roomValue = {
        entered: [Date.now()],
        enteredProviders: Array.from(providersObj.providers?.get('websocket') || []).reduce((acc, [url, provider]) => {
          try {
            if (providersObj.isProviderConnected(provider)) acc[new URL(url).hostname] = [Date.now()]
          } catch (error) {}
          return acc
        }, {}),
        messagesTimestamps: (await new Promise(resolve => this.dispatchEvent(new CustomEvent(`${this.namespace}get-timestamps-of-messages`, {
          detail: { resolve },
          bubbles: true,
          cancelable: true,
          composed: true
        })))).reverse()
      }
      // @ts-ignore
      if (!roomValue.enteredProviders || !Object.keys(roomValue.enteredProviders).length) delete roomValue.enteredProviders;
      // @ts-ignore
      (self.Environment?.router || this).dispatchEvent(new CustomEvent('storage-merge', {
        detail: {
          key: `${this.roomNamePrefix}rooms`,
          value: {
            [await room]: roomValue
          },
          concat: 'unshift',
          maxLength: 20
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    })
  }

  get globalEventTarget () {
    // @ts-ignore
    return this._globalEventTarget || (this._globalEventTarget = self.Environment?.activeRoute || document.body)
  }
}
