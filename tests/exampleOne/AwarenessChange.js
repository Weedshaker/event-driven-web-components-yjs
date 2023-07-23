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
          :host .nickname {
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
          :host .certainly-self::after {
            color: black;
            content: ' <- this is your own user';
            font-weight: normal;
            text-decoration: underline;
          }
        </style>
        Awareness on ${this.getAttribute('key') || 'websocket'} changed with stateValues:
      `
      const ul = document.createElement('ul')
      stateValues.forEach((stateValue, url) => {
        const uuid = JSON.parse(event.detail.localEpoch).uuid
        JSON.parse(stateValue).forEach(user => (ul.innerHTML += `<li class=${JSON.parse(user.user.localEpoch).uuid === uuid ? 'certainly-self' : ''}>${url}:<br>${
          JSON.stringify(user)
            .replace(/},/g, '},<br><br>')
            .replace(/"nickname":"(.*?)"/g, '<span class=nickname>"nickname":"$1"</span>')
            .replace(new RegExp(`"fingerprint":(${event.detail.fingerprint})`, 'g'), '<span class=self>"own-fingerprint":$1</span>')
          }</li>`)
        )
      })
      this.shadowRoot.appendChild(ul)
    }
  }

  connectedCallback () {
    document.body.addEventListener(`yjs-${this.getAttribute('key') || 'websocket'}-awareness-change`, this.eventListener)
    new Promise(resolve => this.dispatchEvent(new CustomEvent('yjs-get-room', {
      detail: {
        resolve
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))).then(async ({ room }) => {
      if (!room.done) {
        await new Promise(resolve => this.dispatchEvent(new CustomEvent('yjs-set-room', {
          detail: {
            room: `chat-${self.prompt('room-name', `random-room-${Date.now()}`) || 'weedshakers-event-driven-web-components-test-13'}`,
            resolve
          },
          bubbles: true,
          cancelable: true,
          composed: true
        })))
      }
      let nickname = 'no-name' + Date.now()
      if (self.localStorage.getItem(await room + '-nickname')) {
        nickname = self.localStorage.getItem(await room + '-nickname')
      } else {
        // browser issue with two prompts too close, so we wait a moment here
        await new Promise(resolve => setTimeout(() => resolve(), 200))
        nickname = self.prompt('nickname', `${nickname}-${new Date().getUTCMilliseconds()}`)
      }
      this.dispatchEvent(new CustomEvent('yjs-set-local-state-field', {
        /** @type {import("../../src/es/EventDrivenYjs.js").SetLocalStateFieldEventDetail} */
        detail: {
          value: {
            nickname
          }
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
      self.localStorage.setItem(await room + '-nickname', nickname)
    })
  }

  disconnectedCallback () {
    document.body.removeEventListener(`yjs-${this.getAttribute('key') || 'websocket'}-awareness-change`, this.eventListener)
  }
}
