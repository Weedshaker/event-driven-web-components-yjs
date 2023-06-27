/* global HTMLElement */
/* global CustomEvent */

// controller for the yjs map object
export default class YjsChat extends HTMLElement {
  constructor (...args) {
    super(...args)

    this.observeEventListener = async event => {
      this.dispatchEvent(new CustomEvent('yjs-chat-update', {
        detail: {
          chat: await Promise.all(event.detail.type.toArray().map(async textObj => ({...textObj, isSelf: textObj.username === await this.username})))
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }
    this.changeEventListener = async event => {
      const input = event.composedPath()[0]
      if (input.value) {
        (await this.array).push([{
          username: await this.username,
          text: input.value,
          timestamp: Date.now()
        }])
        input.value = ''
      }
    }
    let usernameResolve
    this.username = new Promise(resolve => (usernameResolve = resolve))
    this.usernameEventListener = event => {
      const username = event?.detail?.value?.username
      if (username) usernameResolve(username)
    }
  }

  connectedCallback () {
    this.addEventListener('change', this.changeEventListener)
    document.body.addEventListener('yjs-chat-observe', this.observeEventListener)
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
    }))).then(result => {
      this.observeEventListener({detail: {type: result.type}})
      return result.type
    })
    // todo: a proper user controller to which can be listened here
    document.body.addEventListener('yjs-set-local-state-field', this.usernameEventListener, {once: true})
  }

  disconnectedCallback () {
    this.removeEventListener('change', this.changeEventListener)
    document.body.removeEventListener('yjs-map-change', this.observeEventListener)
  }
}
