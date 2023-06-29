/* global HTMLElement */
/* global location */
/* global alert */
/* global self */
/* global CustomEvent */

export default class ShareApi extends HTMLElement {
  constructor (...args) {
    super(...args)

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          align-items: stretch;
          gap: 0.3em;
        }
        :host > button {
          cursor: pointer;
          flex-grow: 1;
          min-height: max(3em, 100%);
        }
        :host > button > #room-name {
          font-size: 0.8em;
        }
      </style>
      <iframe class="gh-button" src="https://ghbtns.com/github-btn.html?user=Weedshaker&amp;repo=event-driven-web-components-yjs&amp;type=star&amp;count=true&amp;size=large" scrolling="0" width="130px" height="30px" frameborder="0"></iframe>
      <button id=reload>&#9842;<br>new room</button>
      <button id=share>💌<br>${this.textContent} [<span id=room-name></span>]</button>
      <button id=qr>&#9783;<br>generate a qr code</button>
    `
    this.eventListener = async event => {
      if (event.composedPath()[0].getAttribute('id') === 'share') {
        try {
          await navigator.share({
            title: document.title,
            url: location.href
          })
        } catch (err) {
          alert(`use this link 👉 ${location.href}`)
        }
      } else if (event.composedPath()[0].getAttribute('id') === 'qr') {
        self.open(`https://api.qrserver.com/v1/create-qr-code/?data="${self.encodeURIComponent(location.href)}"`)
      } else if (event.composedPath()[0].getAttribute('id') === 'reload') {
        self.open(location.origin + location.pathname)
      }
    }
  }

  connectedCallback () {
    this.addEventListener('click', this.eventListener)
    new Promise(resolve => this.dispatchEvent(new CustomEvent('yjs-get-room', {
      detail: {
        resolve
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))).then(async ({ room }) => {
      this.shadowRoot.querySelector('#room-name').textContent = await room
      document.title = await room
    })
  }

  disconnectedCallback () {
    this.removeEventListener('click', this.eventListener)
  }
}
