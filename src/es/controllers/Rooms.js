// @ts-check

/* global HTMLElement */
/* global CustomEvent */

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
   * @param {*} args
   */
  constructor (...args) {
    super(...args)

    this.roomNamePrefix = 'chat-'

    // save room name and last focused timestamp to local storage
    // dispatch from self.Environment?.router that it also works on disconnect, since the storage controller is above the router
    this.focusEventListener = event => this.saveRoom()

    // save room name to local storage
    this.providersUpdateEventListener = async event => {
      this.dispatchEvent(new CustomEvent('storage-merge', {
        detail: {
          key: `${this.roomNamePrefix}rooms`,
          value: {
            [await (await this.roomPromise).room]: {
              locationHref: event.detail.locationHref,
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
      this.dispatchEvent(new CustomEvent('storage-rooms', {
        detail: await this.getRooms(),
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    this.getActiveRoomEventListener = async event => {
      if (event && event.detail && event.detail.resolve) return event.detail.resolve((await this.getRooms()).value[await (await this.roomPromise).room])
      this.dispatchEvent(new CustomEvent('storage-active-room', {
        detail: (await this.getRooms()).value[await (await this.roomPromise).room],
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
          }
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    /** @type {(any)=>void} */
    this.roomResolve = map => map
    /** @type {Promise<{ locationHref: string, room: Promise<string> & {done: boolean} }>} */
    this.roomPromise = new Promise(resolve => (this.roomResolve = resolve))
  }

  connectedCallback () {
    self.addEventListener('focus', this.focusEventListener)
    this.globalEventTarget.addEventListener('yjs-providers-update', this.providersUpdateEventListener)
    this.globalEventTarget.addEventListener('storage-get-rooms', this.getRoomsEventListener)
    this.globalEventTarget.addEventListener('storage-get-active-room', this.getActiveRoomEventListener)
    this.globalEventTarget.addEventListener('merge-active-room', this.mergeActiveRoomEventListener)
    this.saveRoom()
    this.connectedCallbackOnce()
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
    self.removeEventListener('focus', this.focusEventListener)
    this.globalEventTarget.removeEventListener('yjs-providers-update', this.providersUpdateEventListener)
    this.globalEventTarget.removeEventListener('storage-get-rooms', this.getRoomsEventListener)
    this.globalEventTarget.removeEventListener('storage-get-active-room', this.getActiveRoomEventListener)
    this.globalEventTarget.removeEventListener('merge-active-room', this.mergeActiveRoomEventListener)
    this.saveRoom()
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
    // @ts-ignore
    this.roomPromise.then(async ({locationHref, room}) => (self.Environment?.router || this).dispatchEvent(new CustomEvent('storage-merge', {
      detail: {
        key: `${this.roomNamePrefix}rooms`,
        value: {
          [await room]: {
            entered: [Date.now()]
          }
        },
        concat: 'unshift',
        maxLength: 100
      },
      bubbles: true,
      cancelable: true,
      composed: true
    })))
  }

  get globalEventTarget () {
    // @ts-ignore
    return this._globalEventTarget || (this._globalEventTarget = self.Environment?.activeRoute || document.body)
  }
}
