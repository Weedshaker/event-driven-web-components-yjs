/* global HTMLElement */
/* global CustomEvent */

export default class Button extends HTMLElement {
  constructor (...args) {
    super(...args)

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        :host > button {
          padding: 0.5em 1em;
          font-size: 20px;
        }
      </style>
      <button>${this.textContent}</button>
    `
    this.eventListener = event => this.dispatchEvent(new CustomEvent(this.getAttribute('action'), {
      bubbles: true,
      cancelable: true,
      composed: true
    }))
  }

  connectedCallback () {
    this.addEventListener('click', this.eventListener)
  }

  disconnectedCallback () {
    this.removeEventListener('click', this.eventListener)
  }
}
