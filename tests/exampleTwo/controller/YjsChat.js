/* global HTMLElement */
/* global CustomEvent */

// controller for the yjs map object
export default class YjsChat extends HTMLElement {
  constructor (...args) {
    super(...args)

    this.changeEventListener = event => {
      // event.detail.type.toArray()
      this.dispatchEvent(new CustomEvent('yjs-chat-update', {
        detail: {
          yjsEvent: event.detail.yjsEvent
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }
    this.inputEventListener = async event => (await this.array).delete(-1)
  }

  connectedCallback () {
    this.addEventListener('input', this.inputEventListener)
    document.body.addEventListener('yjs-chat-observe', this.changeEventListener)
    this.array = new Promise(resolve => this.dispatchEvent(new CustomEvent('yjs-doc', {
      detail: {
        command: 'getArray',
        arguments: 'chat',
        observe: 'yjs-chat-observe',
        resolve
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))).then(result => result.type)
  }

  disconnectedCallback () {
    this.removeEventListener('input', this.inputEventListener)
    document.body.removeEventListener('yjs-map-change', this.changeEventListener)
  }
}
