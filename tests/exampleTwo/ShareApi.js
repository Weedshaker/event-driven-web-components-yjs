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
          flex-wrap: wrap;
          align-items: stretch;
          gap: 0.3em;
        }
        :host > button {
          cursor: pointer;
          flex-grow: 1;
          max-width: calc(50% - 0.25em);
          min-height: max(3em, 100%);
          word-break: break-all;
        }
        :host > button > #room-name {
          font-size: 0.8em;
        }
      </style>
      <iframe class="gh-button" src="https://ghbtns.com/github-btn.html?user=Weedshaker&amp;repo=event-driven-web-components-yjs&amp;type=star&amp;count=true&amp;size=large" scrolling="0" width="130px" height="40px" frameborder="0"></iframe>
      <button id=reload>&#9842;<br>new room</button>
      <button id=server>&#9743;<br>connections</button>
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
        if (!confirm('api.qrserver.com generates your qr code, continue?')) return
        self.open(`https://api.qrserver.com/v1/create-qr-code/?data="${self.encodeURIComponent(location.href)}"`)
      } else if (event.composedPath()[0].getAttribute('id') === 'reload') {
        self.open(location.origin + location.pathname)
      } else if (event.composedPath()[0].getAttribute('id') === 'server') {
        new Promise(resolve => this.dispatchEvent(new CustomEvent('yjs-get-providers', {
          detail: {
            resolve
          },
          bubbles: true,
          cancelable: true,
          composed: true
        }))).then(async ({ websocketUrl, webrtcUrl }) => {
          const newWebsocketUrls = prompt('websocketUrls separated with a "," and no spaces in between', websocketUrl || '')
          if (newWebsocketUrls && newWebsocketUrls !== websocketUrl) this.dispatchEvent(new CustomEvent('yjs-update-providers', {
            detail: {
              websocketUrl: newWebsocketUrls
            },
            bubbles: true,
            cancelable: true,
            composed: true
          }))
          const newWebrtcUrls = prompt('webrtcUrls separated with a "," and no spaces in between', webrtcUrl || '')
          if (newWebrtcUrls && newWebrtcUrls !== webrtcUrl) this.dispatchEvent(new CustomEvent('yjs-update-providers', {
            detail: {
              webrtcUrl: newWebrtcUrls
            },
            bubbles: true,
            cancelable: true,
            composed: true
          }))
        })
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
