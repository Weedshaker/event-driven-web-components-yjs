// @ts-check

import { EventDrivenYjs } from "./EventDrivenYjs.js"

 /**
 * outgoing event
 @typedef {{
  resolve: any,
 }} RequestRoomEventDetail

/* global document */

/**
 * SwEventDrivenYjs is a helper to bring the docs events into a truly event driven environment
 *
 * @export
 * @function SwEventDrivenYjs
 * @param {any} [ChosenHTMLElement = HTMLElement]
 * @return {CustomElementConstructor | *}
 */
export const SwEventDrivenYjs = (ChosenHTMLElement = EventDrivenYjs()) => class SwEventDrivenYjs extends ChosenHTMLElement {
  
  // TODO: proper init stuff
  init () {return new Promise(resolve => {})}
  /**
   * Lifecycle callback, triggered when node is attached to the dom
   *
   * @return {void}
   */
  connectedCallback () {
    super.connectedCallback()
    navigator.serviceWorker.register('../../MasterServiceWorker.js', { scope: './', type: 'module' }).then(registration => {
      registration.update()
      self.Notification.requestPermission(result => {
        if (result === 'granted') {
          this.registration = registration
          this.registration.active.postMessage(JSON.stringify([
            {
              target: 'eventDrivenYjs',
              type: 'set',
              name: 'attributes',
              value: Array.from(this.attributes).reduce((acc, curr) => ({[curr.name]: curr.value, ...acc}), {})
            },
            {
              target: 'eventDrivenYjs',
              type: 'new'
            }
          ]))
        }
      })
    }).catch(error => console.error(error))
  }

  /**
   * Lifecycle callback, triggered when node is detached from the dom
   *
   * @return {void}
   */
  disconnectedCallback () {
    super.disconnectedCallback()
    if (this.registration) {
      this.registration.unregister()
      this.registration = null
    }
  }
}
