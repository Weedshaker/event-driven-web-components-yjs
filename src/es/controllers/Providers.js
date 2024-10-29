// @ts-check
import { WebWorker } from '../../event-driven-web-components-prototypes/src/WebWorker.js'
import { separator } from './Users.js'

/* global HTMLElement */
/* global CustomEvent */

// https://github.com/yjs
/**
 * Constructor options
 @typedef {{
  namespace?: string
 }} options
*/

/**
 * Provider container
 @typedef {
  Map<import("../EventDrivenYjs").ProviderNames, Map<string, ProvidersContainer>>
 } ProvidersContainer
*/

/**
 * ingoing event
 @typedef {import("./Users").UsersEventDetail} UsersEventDetail
*/

/**
 * outgoing event
 @typedef {{
  getData: () => Promise<{allProviders: ProvidersContainer, providers: ProvidersContainer}>
 }} ProvidersEventDetail
*/

// Supported attributes:
// Attribute {namespace} string default is yjs-, which gets prepend to each outgoing event string as well as on each listener event string

/**
 * Providers is a helper to keep all provider object in a yjs map and forwarding the proper events helping having an overview of all participants
 * TODO: view component for controllers/Providers.js with https://github.com/feross/p2p-graph
 *
 * @export
 * @function Providers
 * @param {CustomElementConstructor} [ChosenHTMLElement = WebWorker()]
 * @return {CustomElementConstructor | *}
 */
export const Providers = (ChosenHTMLElement = WebWorker()) => class Providers extends ChosenHTMLElement {
  /**
   * Creates an instance of yjs providers. The constructor will be called for every custom element using this class when initially created.
   *
   * @param {options} [options = {namespace=undefined}]
   * @param {*} args
   */
  constructor (options = { namespace: undefined }, ...args) {
    super(...args)

    // TODO:
    // default proposed websocket urls: 'wss://signaling.yjs.dev,wss://y-webrtc-signaling-eu.herokuapp.com,wss://y-webrtc-signaling-us.herokuapp.com'
    // default proposed webrtc urls: 'wss://demos.yjs.dev'
    // read notifications hostAndPort of messages for this room and propose to connect to some of those providers, if not already connected

    // set attribute namespace
    if (options.namespace) this.namespace = options.namespace
    else if (!this.namespace) this.namespace = 'yjs-'

    this.usersEventListener =
    /**
     * @param {Event & {detail:UsersEventDetail} | any} event
     */
    event => {
      /** @type {null | {allProviders: ProvidersContainer, providers: ProvidersContainer, pingProviders: (providers: ProvidersContainer, force: boolean) => Map<string, Promise<{status: 'timeout'|'success'|'navigator offline', event: Event}>>}} */
      let getDataResult = null
      const getData = async () => {
        if (getDataResult) return getDataResult
        const getProviders =
          /**
           * @param {import('./Users').UsersContainer | []} [users = []]
           * @param {boolean} [onlyMutuallyConnectedUsers=false]
           * @return {Promise<ProvidersContainer>}
           */
          (users = [], onlyMutuallyConnectedUsers = false) => {
            // @ts-ignore
            return this.webWorker((users = [], onlyMutuallyConnectedUsers = false, separator) => {
              /** @type {ProvidersContainer} */
              const providers = new Map()
              users.forEach(user => {
                for (const url in user[onlyMutuallyConnectedUsers ? 'mutuallyConnectedUsers' : 'connectedUsers']) {
                  // give an overview from providers perspective
                  /** @type {[import("../EventDrivenYjs").ProviderNames, string] | any} */
                  const [name, realUrl] = url.split(separator)
                  /** @type {any} */
                  const provider = providers.get(name) || providers.set(name, new Map()).get(name)
                  provider.set(realUrl, [...provider.get(realUrl) || [], ...user[onlyMutuallyConnectedUsers ? 'mutuallyConnectedUsers' : 'connectedUsers'][url] || []])
                }
              })
              return providers
            }, users, onlyMutuallyConnectedUsers, separator)
          }
        return (getDataResult = {
          allProviders: await getProviders((await event.detail.getData()).allUsers, false),
          providers: await getProviders((await event.detail.getData()).users, true),
          // TODO: WebSocket could have an api call to check the status and deliver some context from the owner
          pingProviders: function (providers = this.allProviders, force = false) {
            // @ts-ignore
            if (!force && this.pingProvidersResult?.has(providers)) return this.pingProvidersResult.get(providers)
            // map with keys "websocket" aka. provider type and value with a map. This map holds keys "provider urls" and value user objects
            // @ts-ignore
            const result = new Map(providers.values().reduce((acc, map) => [...acc, ...map.keys().map(key => [key, new Promise((resolve, reject) =>{
              const img = new Image()
              img.setAttribute('src', key.replace(new URL(key).protocol, 'http:'))
              const timeout = setTimeout(() => {
                reject({
                  status: 'timeout'
                })
                img.remove()
              }, 1500)
              img.addEventListener('load', event => {
                clearTimeout(timeout)
                resolve({
                  status: 'success',
                  event
                })
                img.remove()
              })
              img.addEventListener('error', event => {
                clearTimeout(timeout)
                resolve({
                  status: navigator.onLine ? 'success' : 'navigator offline',
                  event
                })
                img.remove()
              })
            }).catch(error => error)])], []))
            // @ts-ignore
            this.pingProvidersResult = new Map([[providers, result], ...Array.from(this.pingProvidersResult || [])])
            return result
          }
        })
      }
      this.dispatchEvent(new CustomEvent(`${this.namespace}providers-data`, {
        /** @type {ProvidersEventDetail} */
        detail: {
          getData
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }
  }

  connectedCallback () {
    this.addEventListener(`${this.namespace}users`, this.usersEventListener)
  }

  disconnectedCallback () {
    this.removeEventListener(`${this.namespace}users`, this.usersEventListener)
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
