// @ts-check
import { WebWorker } from '../../event-driven-web-components-prototypes/src/WebWorker.js'
import { separator } from './Users.js'
import { urlFixProtocol } from '../helpers/Utils.js'

/* global CustomEvent */
/* global Image */

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
 * GetSessionProvidersByStatusResult
 @typedef {{connected: string[], disconnected: string[]}
 } GetSessionProvidersByStatusResult
*/

/**
 * allProviders: All ever registered providers to the users CRDT connected to this room
 * providers: Mutually connected providers
 * pingProvider: Test if provider is reachable
 * getSessionProvidersByStatus: Connected and disconnected providers of current session
 @typedef {
  {
    allProviders: ProvidersContainer,
    providers: ProvidersContainer,
    pingProvider: (url: string, force: boolean) => Promise<{status: 'timeout'|'success'|'offline', event: Event}>,
    getWebsocketInfo: (url: string, force: boolean) => Promise<Response>,
    getSessionProvidersByStatus: (nameUrlSeparator: string) => Promise<GetSessionProvidersByStatusResult>,
    getProvidersFromRooms: () => Promise<{}>,
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

    /** @type {Map<string, Promise<Response>>} */
    this.getWebsocketInfoMap = new Map()

    /** @type {Map<string, Promise<{status: string, event?: any}>>} */
    this.pingProviderMap = new Map()

    this.usersEventListener =
    /**
     * @param {Event & {detail:UsersEventDetail} | any} event
     */
    event => {
      /** @type {null | GetDataResult} */
      let getDataResult = null
      /**
       * @param {boolean} [addToStorage=true]
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
        const allProviders = await getProviders((await event.detail.getData()).allUsers, false)
        const providers = await getProviders((await event.detail.getData()).users, true)
        const reduceProvidersToUrls = providers => Array.from(providers).reduce((acc, [providerName, providerMap]) => Array.from(providerMap).reduce((acc, [url, users]) => [...acc, `${providerName}${separator}${url}`], acc), [])
        if (addToStorage) {
          this.dispatchEvent(new CustomEvent('yjs-merge-unique-active-room', {
            detail: {
              allProviders: reduceProvidersToUrls(allProviders),
              providers: reduceProvidersToUrls(providers)
            },
            bubbles: true,
            cancelable: true,
            composed: true
          }))
        }
        return (getDataResult = {
          allProviders,
          providers,
          getSessionProvidersByStatus: this.getSessionProvidersByStatus,
          getProvidersFromRooms: this.getProvidersFromRooms,
          pingProvider: this.pingProvider,
          getWebsocketInfo: this.getWebsocketInfo,
          separator: event.detail.separator
        })
      }
      /** @type {ProvidersEventDetail} */
      const detail = { getData }
      this.providersEventDetailResolve(detail)
      this.providersEventDetail = Promise.resolve(detail)
      this.dispatchEvent(new CustomEvent(`${this.namespace}providers-data`, {
        /** @type {ProvidersEventDetail} */
        detail,
        bubbles: true,
        cancelable: true,
        composed: true
      }))
    }

    // usersEventListener does not trigger when awareness changed but already nobody was connected. We still want to know, if providers are connected
    this.awarenessChangeWithNoUserChangeEventListener = event => this.dispatchEvent(new CustomEvent(`${this.namespace}providers-change`, {
      /** @type {ProvidersEventDetail} */
      detail: event.detail,
      bubbles: true,
      cancelable: true,
      composed: true
    }))

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
    this.addEventListener(`${this.namespace}awareness-change-with-no-user-change`, this.awarenessChangeWithNoUserChangeEventListener)
    this.addEventListener(`${this.namespace}get-providers-event-detail`, this.getProvidersEventDetailEventListener)
  }

  disconnectedCallback () {
    this.removeEventListener(`${this.namespace}users`, this.usersEventListener)
    this.removeEventListener(`${this.namespace}awareness-change-with-no-user-change`, this.awarenessChangeWithNoUserChangeEventListener)
    this.removeEventListener(`${this.namespace}get-providers-event-detail`, this.getProvidersEventDetailEventListener)
  }

  // Note: Putting getSessionProvidersByStatus into a web worker is going to use more calc power to get the provider object through the message channel than running it in the main thread
  getSessionProvidersByStatus = (nameUrlSeparator = separator) => {
    return new Promise(resolve => this.dispatchEvent(new CustomEvent(`${this.namespace}get-providers`, {
      detail: {
        resolve
      },
      bubbles: true,
      cancelable: true,
      composed: true
    }))).then(({ providers, isProviderConnected }) => {
      /** @type {GetSessionProvidersByStatusResult} */
      const result = {
        connected: [],
        disconnected: []
      }
      Array.from(providers).forEach(([providerName, providerMap]) => Array.from(providerMap).forEach(([url, provider]) => {
        if (isProviderConnected(provider)) {
          result.connected.push(`${providerName}${nameUrlSeparator}${url}`)
        } else {
          result.disconnected.push(`${providerName}${nameUrlSeparator}${url}`)
        }
      }))
      return result
    })
  }

  /**
   * Get rooms from local storage and grab all reported providers
   *
   * @returns {Promise<{room: string, url: string, prop: 'allProviders' | 'providers'}[]>}
   */
  getProvidersFromRooms = async () => {
    const rooms = await new Promise(resolve => this.dispatchEvent(new CustomEvent('yjs-get-rooms', {
      detail: {
        resolve
      },
      bubbles: true,
      cancelable: true,
      composed: true
    })))
    const providers = []
    for (const key in rooms?.value) {
      rooms.value[key].allProviders?.forEach(url => providers.push({
        room: key,
        url,
        providerFallbacks: rooms.value[key]?.providerFallbacks || [],
        prop: 'allProviders'
      }))
      rooms.value[key].providers?.forEach(url => providers.push({
        room: key,
        url,
        providerFallbacks: rooms.value[key]?.providerFallbacks || [],
        prop: 'providers'
      }))
    }
    return providers
  }

  /**
   * get /get-info from a websocket
   *
   * @param {string} url
   * @param {boolean} [force=false]
   * @returns {Promise<Response>}
   */
  getWebsocketInfo = (url, force = false) => {
    // @ts-ignore
    if (!force && this.getWebsocketInfoMap.has(url)) return this.getWebsocketInfoMap.get(url)
    // @ts-ignore
    return this.getWebsocketInfoMap.set(url, fetch(`${urlFixProtocol(url)}/get-info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Bypass-Tunnel-Reminder': 'yup' // https://github.com/localtunnel/localtunnel + https://github.com/localtunnel/localtunnel/issues/663
      }
    }).then(response => {
      if (response.status >= 200 && response.status <= 299) return response.json()
      throw new Error(response.statusText)
    }).then(result => {
      try {
        // @ts-ignore
        url = new URL(url)
      } catch (error) {}
      this.dispatchEvent(new CustomEvent('yjs-merge-unique-active-room', {
        detail: {
          providerFallbacks: {
            // @ts-ignore
            [url.hostname ? url.hostname : url]: {
              name: 'websocket',
              urls: Array.from(new Map(result.providerFallbacks))
            }
          }
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
      return result
      // @ts-ignore
    }).catch(error => console.error(error) || { error })).get(url)
  }

  /**
   * check if a server responses
   *
   * @param {string} url
   * @param {boolean} [force=false]
   * @returns {Promise<{status: 'timeout'|'success'|'offline', event: Event}>}
   */
  pingProvider = (url, force = false) => {
    // @ts-ignore
    if (!force && this.pingProviderMap.has(url)) return this.pingProviderMap.get(url)
    // @ts-ignore
    return this.pingProviderMap.set(url, new Promise((resolve, reject) => {
      const img = new Image()
      img.setAttribute('src', url.replace(new URL(url).protocol, 'http:'))
      const timeout = setTimeout(() => {
        reject({ // eslint-disable-line
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
      // receiving an error means some instance answered
      img.addEventListener('error', event => {
        clearTimeout(timeout)
        resolve({
          status: navigator.onLine ? 'success' : 'offline',
          event
        })
        img.remove()
      })
    }).catch(error => error)).get(url)
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
