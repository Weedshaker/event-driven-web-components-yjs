/* global HTMLElement */

export default class IndexeddbSynced extends HTMLElement {
  constructor (...args) {
    super(...args)

    this.eventListener = event => (this.textContent = `IndexedDB synced with data: ${JSON.stringify(event.detail.data)}`)
  }

  connectedCallback () {
    document.body.addEventListener('yjs-indexeddb-synced', this.eventListener)
  }

  disconnectedCallback () {
    document.body.removeEventListener('yjs-indexeddb-synced', this.eventListener)
  }
}
