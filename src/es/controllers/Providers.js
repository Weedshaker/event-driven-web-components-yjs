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
 * fsa
 @typedef {{connected: string[], disconnected: string[]}
 } GetSessionProvidersByStatusResult
*/

/**
 * allProviders: All ever registered providers to the users CRDT connected to this room
 * providers: Mutually connected providers
 * pingProviders: Test if provider is reachable
 * getSessionProvidersByStatus: Connected and disconnected providers of current session
 @typedef {
  {
    allProviders: ProvidersContainer,
    providers: ProvidersContainer,
    pingProviders: (providers: ProvidersContainer, force: boolean) => Map<string, Promise<{status: 'timeout'|'success'|'navigator offline', event: Event}>>,
    getSessionProvidersByStatus: () => Promise<GetSessionProvidersByStatusResult>,
    separator: string
  }
 } GetDataResult
*/


/**
 * outgoing event
 @typedef {{
  getData: () => Promise<GetDataResult>
 }} ProvidersEventDetail
*/

// Supported attributes:
// Attribute {namespace} string default is yjs-, which gets prepend to each outgoing event string as well as on each listener event string

/**
 * Providers is a helper to keep all provider object in a yjs map and forwarding the proper events helping having an overview of all participants
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

    // set attribute namespace
    if (options.namespace) this.namespace = options.namespace
    else if (!this.namespace) this.namespace = 'yjs-'

    this.usersEventListener =
    /**
     * @param {Event & {detail:UsersEventDetail} | any} event
     */
    event => {
      /** @type {null | GetDataResult} */
      let getDataResult = null
      /** @type {null | GetSessionProvidersByStatusResult} */
      let getSessionProvidersByStatusResult = null
      /**
       * * @param {boolean} [addToStorage=true]
       * @return {Promise<GetDataResult>}
       */
      const getData = async (addToStorage = true) => {
        if (getDataResult) return getDataResult
        /**
         * @param {import('./Users').UsersContainer | []} [users = []]
         * @param {boolean} [onlyMutuallyConnectedUsers=false]
         * @return {Promise<ProvidersContainer>}
         */
        const getProviders = (users = [], onlyMutuallyConnectedUsers = false) => {
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
        const providers = await getProviders((await event.detail.getData()).users, true)
        if (addToStorage) this.dispatchEvent(new CustomEvent('merge-unique-active-room', {
          // @ts-ignore
          detail: { providers: Array.from(providers).reduce((acc, [providerName, providerMap]) => Array.from(providerMap).reduce((acc, [url, users]) => [...acc, url], acc), []) },
          bubbles: true,
          cancelable: true,
          composed: true
        }))
        return (getDataResult = {
          allProviders: await getProviders((await event.detail.getData()).allUsers, false),
          providers,
          // Note: Putting getSessionProvidersByStatus into a web worker is going to use more calc power to get the provider object through the message channel than running it in the main thread
          getSessionProvidersByStatus: () => {
            if (getSessionProvidersByStatusResult) return Promise.resolve(getSessionProvidersByStatusResult)
            return new Promise(resolve => this.dispatchEvent(new CustomEvent(`${this.namespace}get-providers`, {
              detail: {
                resolve
              },
              bubbles: true,
              cancelable: true,
              composed: true
            }))).then(({providers, isProviderConnected}) => {
              /** @type {GetSessionProvidersByStatusResult} */
              const result = {
                connected: [],
                disconnected: [],
              }
              Array.from(providers).forEach(([providerName, providerMap]) => Array.from(providerMap).forEach(([url, provider]) => {
                if (isProviderConnected(provider)) {
                  result.connected.push(`${providerName}${event.detail.separator}${url}`)
                } else {
                  result.disconnected.push(`${providerName}${event.detail.separator}${url}`)
                }
              }))
              return (getSessionProvidersByStatusResult = result)
            })
          },
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
          },
          separator: event.detail.separator
        })
      }
      /** @type {ProvidersEventDetail} */
      const detail = { getData }
      this.providersEventDetailResolve(detail)
      this.providersEventDetail = Promise.resolve(detail)
      this.dispatchEvent(new CustomEvent(`${this.namespace}providers`, {
        /** @type {ProvidersEventDetail} */
        detail,
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    this.getProvidersEventDetailEventListener = event => {
      if (event && event.detail && event.detail.resolve) return event.detail.resolve(this.providersEventDetail)
      this.dispatchEvent(new CustomEvent(`${this.namespace}providers-event-detail`, {
        /** @type {Promise<ProvidersEventDetail>} */
        detail: this.providersEventDetail,
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    /** @type {(ProvidersEventDetail)=>void} */
    this.providersEventDetailResolve = map => map
    /** @type {Promise<ProvidersEventDetail>} */
    this.providersEventDetail = new Promise(resolve => (this.providersEventDetailResolve = resolve))
  }

  connectedCallback () {
    this.addEventListener(`${this.namespace}users`, this.usersEventListener)
    this.addEventListener(`${this.namespace}get-providers-event-detail`, this.getProvidersEventDetailEventListener)
  }

  disconnectedCallback () {
    this.removeEventListener(`${this.namespace}users`, this.usersEventListener)
    this.removeEventListener(`${this.namespace}get-providers-event-detail`, this.getProvidersEventDetailEventListener)
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
