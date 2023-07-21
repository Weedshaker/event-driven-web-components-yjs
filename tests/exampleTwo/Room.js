// @ts-check

/* global HTMLElement */

export default class Room extends HTMLElement {
  constructor (...args) {
    super(...args)

    this.usersEventListener = event => {
      console.log('users', event.detail.getData())
    }
  }

  connectedCallback () {
    document.body.addEventListener('yjs-users', this.usersEventListener)
  }

  disconnectedCallback () {
    document.body.removeEventListener('yjs-users', this.usersEventListener)
  }

  /**
   * The namespace is prepended to the custom event names
   * priority of value appliance: options, attribute
   *
   * @param {string} value
   */
  set namespace (value) {
    if (value) this.setAttribute('namespace', value)
  }

  /**
   * @return {string}
   */
  get namespace () {
    // @ts-ignore
    return this.getAttribute('namespace')
  }
}
