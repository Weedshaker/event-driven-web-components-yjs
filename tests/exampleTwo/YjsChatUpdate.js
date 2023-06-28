/* global HTMLElement */

export default class YjsChatUpdate extends HTMLElement {
  constructor (...args) {
    super(...args)

    this.attachShadow({ mode: 'open' })
    const ul = document.createElement('ul')
    this.shadowRoot.innerHTML = `
      <style>
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
        :host > ul > li > .timestamp {
          font-size: 0.6em;
        }
      </style>
    `
    this.shadowRoot.appendChild(ul)
    this.eventListener = event => {
      ul.innerHTML = ''
      event.detail.chat.sort((a, b) => a.timestamp - b.timestamp).forEach(entry => {
        const li = document.createElement('li')
        if (entry.isSelf) li.classList.add('self')
        li.innerHTML = `<span class="user">${entry.nickname}: </span><br><span class="text">${entry.text}</span><br><span class="timestamp">${(new Date(entry.timestamp)).toLocaleString(navigator.language)}</span>`
        ul.appendChild(li)
      })
      this.scroll(0, this.scrollHeight)
    }
  }

  connectedCallback () {
    document.body.addEventListener('yjs-chat-update', this.eventListener)
  }

  disconnectedCallback () {
    document.body.removeEventListener('yjs-chat-update', this.eventListener)
  }
}
