/* global HTMLElement */

export default class DetailsAwarenessChange extends HTMLElement {
  constructor (...args) {
    super(...args)

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        :host .warning {
          color: red;
        }
      </style>
      <details>
        <summary>Directly connected Users</summary>
        <yjs-awareness-change></yjs-awareness-change>
      </details>
    `
    const stateValues = new Map()
    this.eventListener = event => {
      stateValues.set(event.detail.url, event.detail.stateValues)
      let length = 0
      stateValues.forEach((stateValues, url) => {
        length += stateValues.reduce((prev, curr) => {
          // TODO: TypeError: Cannot read properties of undefined (reading 'localEpoch')
          return (prev += curr.user.localEpoch !== event.detail.localEpoch ? 1 : 0)
        }, 0)
      })
      this.shadowRoot.querySelector('summary').innerHTML = `Directly connected Users: ${length < 1 ? '<span class=warning>You are alone!</span>' : length}`
    }
  }

  connectedCallback () {
    document.body.addEventListener(`yjs-${this.getAttribute('key') || 'websocket'}-awareness-change`, this.eventListener)
  }

  disconnectedCallback () {
    document.body.removeEventListener(`yjs-${this.getAttribute('key') || 'websocket'}-awareness-change`, this.eventListener)
  }
}
