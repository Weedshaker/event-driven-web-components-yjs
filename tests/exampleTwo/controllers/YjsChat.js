/* global HTMLElement */
/* global CustomEvent */

// controller for the yjs map object
export default class YjsChat extends HTMLElement {
  constructor (...args) {
    super(...args)

    this.observeEventListener = async event => {
      this.dispatchEvent(new CustomEvent('yjs-chat-update', {
        detail: {
          // enrich the chat object with the info if it has been self
          chat: await Promise.all(event.detail.type.toArray().map(async textObj => ({ ...textObj, isSelf: textObj.nickname === await this.nickname })))
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }
    this.inputEventListener = async event => {
      const input = event.detail.input
      if (input.value) {
        (await this.array).push([{
          nickname: await this.nickname,
          text: input.value,
          timestamp: Date.now(),
          sendNotifications: true, // servers websocket utils.js has this check
        }])
        input.value = ''
      }
    }
    let nicknameResolve
    this.nickname = new Promise(resolve => (nicknameResolve = resolve))
    this.nicknameEventListener = event => {
      const nickname = event?.detail?.value?.nickname
      if (nickname) nicknameResolve(nickname)
    }
  }

  connectedCallback () {
    this.addEventListener('yjs-input', this.inputEventListener)
    document.body.addEventListener('yjs-chat-observe', this.observeEventListener)
    this.array = new Promise(resolve => this.dispatchEvent(new CustomEvent('yjs-doc', {
      detail: {
        command: 'getArray',
        arguments: ['chat-test-1'],
        observe: 'yjs-chat-observe',
        resolve
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))).then(result => {
      this.observeEventListener({ detail: { type: result.type } })
      return result.type
    })
    document.body.addEventListener('yjs-set-local-state-field', this.nicknameEventListener, { once: true })
  }

  disconnectedCallback () {
    this.removeEventListener('yjs-input', this.inputEventListener)
    document.body.removeEventListener('yjs-map-change', this.observeEventListener)
  }
}
