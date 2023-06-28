/* global HTMLElement */
/* global CustomEvent */

// controller for the yjs array object
export default class YjsArray extends HTMLElement {
  constructor (...args) {
    super(...args)

    this.changeEventListener = event => {
      this.dispatchEvent(new CustomEvent('yjs-array-new-sum', {
        detail: {
          text: 'new sum: ' + event.detail.type.toArray().reduce((a, b) => a + b, 0)
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
    this.addEventListener('yjs-array-push', this.pushEventListener)
    this.addEventListener('yjs-array-delete', this.deleteEventListener)
    this.array = new Promise(resolve => this.dispatchEvent(new CustomEvent('yjs-doc', {
      detail: {
        command: 'getArray',
        arguments: 'count',
        observe: 'yjs-array-change',
        resolve
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))).then(result => {
      this.changeEventListener({ detail: { type: result.type } })
      return result.type
    })
  }

  disconnectedCallback () {
    document.body.removeEventListener('yjs-array-change', this.changeEventListener)
    this.removeEventListener('yjs-array-push', this.pushEventListener)
    this.removeEventListener('yjs-array-delete', this.deleteEventListener)
  }
}
