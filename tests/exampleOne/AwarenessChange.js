/* global HTMLElement */

export default class AwarenessChange extends HTMLElement {
  constructor (...args) {
    super(...args)

    const stateValues = new Map()
    this.eventListener = event => {
      stateValues.set(event.detail.url, JSON.stringify(event.detail.stateValues))
      this.innerHTML = `Awareness on ${this.getAttribute('key') || 'websocket'} changed with stateValues:`
      const ul = document.createElement('ul')
      stateValues.forEach((stateValue, url) => (ul.innerHTML += `<li>${url}:<br>${stateValue}</li>`))
      this.appendChild(ul)
    }
  }

  connectedCallback () {
    document.body.addEventListener(`yjs-${this.getAttribute('key') || 'websocket'}-awareness-change`, this.eventListener)
  }

  disconnectedCallback () {
    document.body.removeEventListener(`yjs-${this.getAttribute('key') || 'websocket'}-awareness-change`, this.eventListener)
  }
}
