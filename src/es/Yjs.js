// @ts-check

import * as Y from './dependencies/yjs.js'

/* global HTMLElement */
/* global document */
/* global self */
/* global fetch */
/* global CustomEvent */

/**
 * Yjs is a helper to bring the docs events into a truly event driven environment
 * NOTE: only the indexeddb provider is yet 100% supported, the strategy is rather to have separate web components for the messaging aka. event-driven-web-components-p2pt
 *
 * @export
 * @function Yjs
 * @param {CustomElementConstructor} [ChosenHTMLElement = HTMLElement]
 * @property {
    connectedCallback,
    disconnectedCallback,
  }
 * @return {CustomElementConstructor | *}
 */
export const Yjs = (ChosenHTMLElement = HTMLElement) => class Yjs extends ChosenHTMLElement {
  /**
   * Creates an instance of Yjs. The constructor will be called for every custom element using this class when initially created.
   *
   * @param {*} args
   */
  constructor (...args) {
    // @ts-ignore
    super(...args)

    this.Y = Y
    this.ydoc = new Y.Doc()
  }

  /**
   * Lifecycle callback, triggered when node is attached to the dom
   * must be here as a placeholder
   *
   * @return {void}
   */
  connectedCallback () {}

  /**
   * Lifecycle callback, triggered when node is detached from the dom
   * must be here as a placeholder
   *
   * @return {void}
   */
  disconnectedCallback () {}
}
