/* global HTMLElement */
/* global CustomEvent */

// controller for the yjs map object
export default class YjsChat extends HTMLElement {
  constructor (...args) {
    super(...args)

    this.observeEventListener = async event => {
      this.dispatchEvent(new CustomEvent('yjs-chat-update', {
        detail: {
          chat: await Promise.all(event.detail.type.toArray().map(async textObj => ({...textObj, isSelf: textObj.nickname === await this.nickname})))
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
          nickname: await this.nickname,
          text: input.value,
          timestamp: Date.now()
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
    document.body.addEventListener('yjs-set-local-state-field', this.nicknameEventListener, {once: true})
  }

  disconnectedCallback () {
    this.removeEventListener('change', this.changeEventListener)
    document.body.removeEventListener('yjs-map-change', this.observeEventListener)
  }
}
