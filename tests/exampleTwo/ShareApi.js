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
          font-size: 20px;
        }
      </style>
      <button>${this.textContent} 💌</button>
    `
    this.eventListener = async event => {
      try {
        await navigator.share({
          title: document.title,
          url: location.href
        })
      } catch (err) {
        alert(`share this link 👉 ${location.href}`)
      }
    }
  }

  connectedCallback () {
    this.addEventListener('click', this.eventListener)
  }

  disconnectedCallback () {
    this.removeEventListener('click', this.eventListener)
  }
}
