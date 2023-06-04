/* global HTMLElement */

export default class AwarenessChange extends HTMLElement {
  constructor (...args) {
    super(...args)

    this.eventListener = event => (this.textContent = `Awareness on ${this.getAttribute('key') || 'websocket'} changed with stateValues: ${JSON.stringify(event.detail.stateValues)}`)
  }

  connectedCallback () {
    document.body.addEventListener(`yjs-${this.getAttribute('key') || 'websocket'}-awareness-change`, this.eventListener)
  }

  disconnectedCallback () {
    document.body.removeEventListener(`yjs-${this.getAttribute('key') || 'websocket'}-awareness-change`, this.eventListener)
  }
}
