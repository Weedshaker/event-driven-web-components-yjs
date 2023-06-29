/* global HTMLElement */
/* global CustomEvent */

export default class Input extends HTMLElement {
  constructor (...args) {
    super(...args)

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
        }
        :host > input {
          flex-grow: 15;
          height: 3em;
        }
        :host > button {
          cursor: pointer;
          flex-grow: 1;
          min-height: 100%;
        }
        :host > button#peer-web-site {
          flex-grow: 2;
        }
      </style>
      <input placeholder="type your message...">
      <button>send</button>
      <button id=peer-web-site>&#10000; attach media</button>
    `
    this.changeEventListener = (event, input) => {
      this.dispatchEvent(new CustomEvent('yjs-input', {
        detail: {
          input: input || event.composedPath()[0]
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }
    this.clickEventListener = event => {
      if(event.composedPath()[0].getAttribute('id') === 'peer-web-site') self.open('https://peerweb.site/')
    }
  }

  connectedCallback () {
    this.shadowRoot.addEventListener('change', this.changeEventListener)
    this.shadowRoot.addEventListener('click', this.clickEventListener)
    self.addEventListener("message", event => {
      this.shadowRoot.querySelector('input').value = `<a href="${event.data.href}" target="_blank">👉 ${event.data.title} 👈 <span class=peer-web-site>(temporary hosted media content @peerweb.site)</span></a>`
      this.changeEventListener(undefined, this.shadowRoot.querySelector('input'))
    })
  }

  disconnectedCallback () {
    this.shadowRoot.removeEventListener('change', this.changeEventListener)
    this.shadowRoot.removeEventListener('click', this.clickEventListener)
  }
}
