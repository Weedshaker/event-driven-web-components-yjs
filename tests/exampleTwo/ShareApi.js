/* global HTMLElement */
/* global location */
/* global alert */

export default class ShareApi extends HTMLElement {
  constructor (...args) {
    super(...args)

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        :host > button {
          cursor: pointer;
          padding: 0.5em 1em;
          font-size: 1.2em;
        }
        :host > button > #room-name {
          font-size: 0.8em;
        }
      </style>
      <button>💌<br>${this.textContent} 👉 [<span id=room-name></span>]</button>
    `
    this.eventListener = async event => {
      try {
        await navigator.share({
          title: document.title,
          url: location.href
        })
      } catch (err) {
        alert(`use this link 👉 ${location.href}`)
      }
    }
  }

  connectedCallback () {
    this.addEventListener('click', this.eventListener)
    new Promise(resolve => this.dispatchEvent(new CustomEvent('yjs-get-room', {
      detail: {
        resolve
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))).then(async ({ room }) => (this.shadowRoot.querySelector('#room-name').textContent = await room))
  }

  disconnectedCallback () {
    this.removeEventListener('click', this.eventListener)
  }
}
