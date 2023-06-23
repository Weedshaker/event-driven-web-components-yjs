/* global HTMLElement */
/* global CustomEvent */

// controller for the yjs array object
export default class YjsArray extends HTMLElement {
  constructor (...args) {
    super(...args)

    this.changeEventListener = event => {
      console.log(event.detail.yjsEvent.changes.delta)
      this.dispatchEvent(new CustomEvent('yjs-array-new-sum', {
        detail: {
          text: 'new sum: ' + event.detail.type.toArray().reduce((a, b) => a + b)
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }
    this.pushEventListener = async event => (await this.array).push([1])
    this.deleteEventListener = async event => (await this.array).delete(-1)
  }

  connectedCallback () {
    document.body.addEventListener('yjs-array-change', this.changeEventListener)
    document.body.addEventListener('yjs-array-push', this.pushEventListener)
    document.body.addEventListener('yjs-array-delete', this.deleteEventListener)
    this.array = new Promise(resolve => this.dispatchEvent(new CustomEvent('yjs-api', {
      detail: {
        command: 'getArray',
        arguments: 'count',
        observe: 'yjs-array-change',
        resolve
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))).then(result => result.type)
  }

  disconnectedCallback () {
    document.body.removeEventListener('yjs-array-change', this.eventListener)
    document.body.removeEventListener('yjs-array-push', this.pushEventListener)
    document.body.removeEventListener('yjs-array-delete', this.deleteEventListener)
  }
}
