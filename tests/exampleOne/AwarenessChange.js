/* global HTMLElement */
/* global CustomEvent */
/* global self */

export default class AwarenessChange extends HTMLElement {
  constructor (...args) {
    super(...args)

    this.attachShadow({ mode: 'open' })
    const stateValues = new Map()
    this.eventListener = event => {
      stateValues.set(event.detail.url, JSON.stringify(event.detail.stateValues))
      this.shadowRoot.innerHTML = `
        <style>
          :host > ul > li {
            word-break: break-all;
            margin-bottom: 1em;
          }
          :host .username {
            color: blue;
            font-weight: bold;
          }
          :host .self {
            color: orange;
            font-weight: bold;
          }
          :host .certainly-self {
            color: green;
            font-weight: bold;
          }
        </style>
        Awareness on ${this.getAttribute('key') || 'websocket'} changed with stateValues:
      `
      const ul = document.createElement('ul')
      stateValues.forEach((stateValue, url) => (ul.innerHTML += `<li>${url}:<br>${
        stateValue
          .replace('},', '},<br><br>')
          .replace(/"username":"(.*?)"/g, '<span class=username>"username":"$1"</span>')
          .replace(new RegExp(`"fingerprint":(${event.detail.fingerprint})`, 'g'), '<span class=self>"own-fingerprint":$1</span>')
          .replace(new RegExp(`"localEpoch":(${event.detail.localEpoch})`, 'g'), '<span class=certainly-self>"own-localEpoch":$1</span>')
      }</li>`))
      this.shadowRoot.appendChild(ul)
    }
  }

  connectedCallback () {
    document.body.addEventListener(`yjs-${this.getAttribute('key') || 'websocket'}-awareness-change`, this.eventListener)
    let username = 'no-name'
    this.dispatchEvent(new CustomEvent('yjs-set-local-state-field', {
      /** @type {import("../../src/es/EventDrivenYjs.js").SetLocalStateFieldEventDetail} */
      detail: {
        value: {
          username: (username = self.localStorage.getItem('username') || self.prompt('username') || username)
        }
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))
    self.localStorage.setItem('username', username)
  }

  disconnectedCallback () {
    document.body.removeEventListener(`yjs-${this.getAttribute('key') || 'websocket'}-awareness-change`, this.eventListener)
  }
}
