/* global HTMLElement */
/* global self */

export default class YjsChatUpdate extends HTMLElement {
  constructor (...args) {
    super(...args)

    this.attachShadow({ mode: 'open' })
    const ul = document.createElement('ul')
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          -webkit-mask-image: -webkit-gradient(linear, left 15%, left top, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
        }
        :host > ul {
          margin: 0;
          padding: 0;
        }
        :host > ul > li {
          background-color: lightgray;
          border-radius: 0.5em;
          float: left;
          list-style: none;
          padding: 1em;
          margin: 0.25em 0.1em 0.25em 0;
          width: 80%;
        }
        :host > ul > li.self {
          background-color: lightgreen;
          float: right;
        }
        :host > ul > li > .user, :host > ul > li > .timestamp {
          color: gray;
          font-size: 0.8em;
        }
        :host > ul > li > span {
          word-break: break-word;
        }
        :host > ul > li span.peer-web-site {
          font-size: 0.8em;
        }
        :host > ul > li > .timestamp {
          font-size: 0.6em;
        }
      </style>
    `
    this.shadowRoot.appendChild(ul)
    this.timeoutID = null
    this.eventListener = event => {
      const isScrolledBottom = this.scrollHeight < this.scrollTop + this.offsetHeight + 200 /* tollerance */
      let lastEntryIsSelf = false
      let lastMessage = null
      ul.innerHTML = ''
      event.detail.chat.sort((a, b) => a.timestamp - b.timestamp).forEach((entry, i, chat) => {
        const li = document.createElement('li')
        if (entry.isSelf) li.classList.add('self')
        li.innerHTML = `<span class="user">${entry.nickname}: </span><br><span class="text">${entry.text}</span><br><span class="timestamp">${(new Date(entry.timestamp)).toLocaleString(navigator.language)}</span>`
        ul.appendChild(li)
        if (chat.length === i + 1 && entry.isSelf) lastEntryIsSelf = true
        if (chat.length === i + 1) lastMessage = entry
      })
      if (lastEntryIsSelf || isScrolledBottom) this.scroll(0, this.scrollHeight)
      if (lastMessage && this.registration && !lastEntryIsSelf) {
        this.registration.active.postMessage(`{
        "nickname": "${lastMessage.nickname}",
        "text": "${lastMessage.text}",
        "visibilityState": "${document.visibilityState}"
      }`)
      }
    }
  }

  connectedCallback () {
    document.body.addEventListener('yjs-chat-update', this.eventListener)
    // wait shortly with registering also until the first message sync happend, which certainly could be solved nicer than with a timeout
    setTimeout(() => {
      // use a service worker for notifications
      // Service Worker
      this.registration = null
      navigator.serviceWorker.register('./MasterServiceWorker.js', { scope: './' }).then(registration => {
        self.Notification.requestPermission(result => {
          if (result === 'granted') this.registration = registration
        })
        registration.update()
      }).catch(error => console.error(error))
    }, 3000)
  }

  disconnectedCallback () {
    document.body.removeEventListener('yjs-chat-update', this.eventListener)
  }
}
