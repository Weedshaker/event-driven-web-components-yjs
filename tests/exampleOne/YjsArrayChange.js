/* global HTMLElement */

export default class YjsArrayChange extends HTMLElement {
  constructor (...args) {
    super(...args)

    this.attachShadow({ mode: 'open' })
    const div = document.createElement('div')
    this.shadowRoot.innerHTML = `
      <style>
        :host > div {
          font-size: 1.2em;
        }
      </style>
    `
    this.shadowRoot.appendChild(div)
    this.eventListener = event => (div.textContent += ` / ${event.detail.text}`)
  }

  connectedCallback () {
    document.body.addEventListener('yjs-array-new-sum', this.eventListener)
  }

  disconnectedCallback () {
    document.body.removeEventListener('yjs-array-new-sum', this.eventListener)
  }
}
