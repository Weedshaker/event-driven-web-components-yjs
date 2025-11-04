// @ts-check
import { WebWorker } from '../../event-driven-web-components-prototypes/src/WebWorker.js'
import { separator } from './Users.js'
import { urlHttpProtocol } from '../helpers/Utils.js'

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
 * Provider container for rendering
 @typedef {
  'environment' | 'crdt' | 'session' | 'get-info' | 'notifications' | string
 } Origin
*/

/**
 * Provider container for rendering
 * Status gets filled by 5 runs, so max. length 5
 @typedef {
  'connected' | 'disconnected' | 'default' | 'once-established' | 'active' | 'unknown' | 'fallback'
 } Status
*/

/**
 * Provider container for rendering
 @typedef {{
  origins: Origin[],
  status: Status[],
  statusCount?: number,
  providerFallbacks?: Map<string, string[]>,
  permanentFallback?: string,
  urls: Map<string, {
    name: import("../../../../event-driven-web-components-yjs/src/es/EventDrivenYjs.js").ProviderNames,
    status: Status,
    origins: Origin,
    url: URL
  }>
}} Provider

/**
 * Provider container for rendering
 @typedef {
  Map<string, Provider>
 } CompleteProvidersContainer
*/

/**
 * ingoing event
 @typedef {import("./Users").UsersEventDetail} UsersEventDetail
*/

/**
 * GetSessionProvidersByStatusResult
 @typedef {{connected: string[], disconnected: string[], websocketUrl: string, webrtcUrl: string}
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
    getCompleteProviders: () => Promise<CompleteProvidersContainer>,
    getProvidersFromRooms: () => Promise<{room: string, url: string, prop: 'allProviders' | 'providers' | 'connectedProviders'}[]>,
    getProvidersFromNotificationsSettings: () => Promise<string[]|null>,
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
      /** @type {null | CompleteProvidersContainer} */
      let getCompleteProvidersResult = null
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
          this.dispatchEvent(new CustomEvent(`${this.namespace}merge-unique-active-room`, {
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
          getProvidersFromNotificationsSettings: this.getProvidersFromNotificationsSettings,
          // @ts-ignore
          getCompleteProviders: (force = false) => {
            if (!force && getCompleteProvidersResult) return getCompleteProvidersResult
            // @ts-ignore
            return (getCompleteProvidersResult = this.getCompleteProviders(getDataResult))
          },
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

  /**
   * Grab all providers from all possible sources
   * 
   * @param {GetDataResult} data
   * @returns {Promise<CompleteProvidersContainer>}
   */
  async getCompleteProviders (data) {
    /** @type {CompleteProvidersContainer} */
    const providers = new Map()
    // Note: WebWorkers 900ms are slower than this 240ms, tested 06/25/25
    // important, keep order not that less information overwrites the more precise information at mergeProvider
    Providers.fillProvidersWithProvidersFromCrdt(providers, data.allProviders)
    Providers.fillProvidersWithProvidersFromRooms(providers, await data.getProvidersFromRooms(), data.separator)
    Providers.fillProvidersWithProvidersFromNotificationsSettings(providers, await data.getProvidersFromNotificationsSettings())
    Providers.fillProvidersWithProvidersFromCrdt(providers, data.providers, 'once-established')
    // @ts-ignore
    Providers.fillProvidersWithProvidersFromEnvironment(providers, self.Environment)
    const sessionProvidersByStatus = await data.getSessionProvidersByStatus(data.separator)
    Providers.fillProvidersWithSessionProvidersByStatus(providers, sessionProvidersByStatus, data.separator)
    const mapHostname = url => {
      try {
        return (new URL(url)).hostname
      } catch (error) {
        return null
      }
    }
    const websocketHostnames = (sessionProvidersByStatus.websocketUrl || '').split(',').map(mapHostname)
    const webrtcHostnames = (sessionProvidersByStatus.webrtcUrl || '').split(',').map(mapHostname)
    const mapOrigin = url => {
      try {
        return (new URL(url)).origin
      } catch (error) {
        return null
      }
    }
    const websocketOrigins = (sessionProvidersByStatus.websocketUrl || '').split(',').map(mapOrigin)
    const webrtcOrigins = (sessionProvidersByStatus.webrtcUrl || '').split(',').map(mapOrigin)
    // check if the provider is active
    providers.forEach((provider, key) => {
      if (websocketHostnames?.includes(key) || webrtcHostnames?.includes(key)) {
        provider.status.push('active')
        provider.urls.forEach((urlContainer, key) => {
          if ((urlContainer.name === 'websocket' ? websocketOrigins : webrtcOrigins || '').includes(urlContainer.url.origin)) urlContainer.status = 'active'
        })
      }
    })
    // Sorting 'connected' | 'disconnected' | 'default' | 'once-established' | 'active' | 'unknown'; the lower the number the higher ranked
    const statusPriority = {
      active: 1,
      connected: 2,
      disconnected: 3,
      default: 4,
      'once-established': 5,
      unknown: 6
    }
    const lowestPriority = 6
    // @ts-ignore
    return new Map(Array.from(providers).map(([name, providerData]) => {
      // calc the status number; the lower the number the higher it shall rank in the ascending list
      providerData.statusCount = providerData.status.reduce((acc, curr, i) => {
        acc[i] = statusPriority[curr] ? statusPriority[curr] : lowestPriority
        return acc
        // prefill the array with 5 elements, since it gets filled 5 times above, if all found
      }, new Array(5).fill(lowestPriority)).reduce((acc, curr) => acc + curr, 0)
      return [name, providerData]
      // Note: A negative value indicates that a should come before b
      // @ts-ignore
    }).sort(([aName, aProviderData], [bName, bProviderData]) => aProviderData.statusCount - bProviderData.statusCount))
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
    }))).then(({ providers, isProviderConnected, websocketUrl, webrtcUrl }) => {
      /** @type {GetSessionProvidersByStatusResult} */
      const result = {
        connected: [],
        disconnected: [],
        websocketUrl,
        webrtcUrl
      }
      Array.from(providers).forEach(([providerName, providerMap]) => Array.from(providerMap).forEach(([url, provider]) => {
        if (isProviderConnected(provider)) {
          result.connected.push(`${providerName}${nameUrlSeparator}${url}`)
        } else {
          result.disconnected.push(`${providerName}${nameUrlSeparator}${url}`)
        }
      }))
      this.dispatchEvent(new CustomEvent(`${this.namespace}merge-unique-active-room`, {
        detail: {
          connectedProviders: result.connected
        },
        bubbles: true,
        cancelable: true,
        composed: true
      }))
      return result
    })
  }

  /**
   * Get rooms from local storage and grab all reported providers
   *
   * @returns {Promise<{room: string, url: string, prop: 'allProviders' | 'providers' | 'connectedProviders'}[]>}
   */
  getProvidersFromRooms = async () => {
    const rooms = await new Promise(resolve => this.dispatchEvent(new CustomEvent(`${this.namespace}get-rooms`, {
      detail: {
        resolve
      },
      bubbles: true,
      cancelable: true,
      composed: true
    })))
    const providers = []
    for (const key in rooms?.value) {
      rooms.value[key].connectedProviders?.forEach(url => providers.push({
        room: key,
        url,
        providerFallbacks: rooms.value[key]?.providerFallbacks || [],
        prop: 'connectedProviders' // 'allProviders' delivers junk provider names, which never were connected
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
   * Get rooms from local storage and grab all reported providers
   *
   * @param {boolean} [includeMutes=false]
   * @returns {Promise<string[]|null>}
   */
  getProvidersFromNotificationsSettings = async (includeMutes = false) => {
    const notifications = await new Promise(resolve => this.dispatchEvent(new CustomEvent(`${this.namespace}get-notifications-settings`, {
      detail: {
        resolve
      },
      bubbles: true,
      cancelable: true,
      composed: true
    })))
    if (notifications.error) return null
    return [...(notifications.value?.amplified?.hostnames || []), ...(includeMutes ? notifications.value?.mutes?.hostnames || [] : [])]
  }

  static fillProvidersWithProvidersFromCrdt (providers, data, status = 'unknown') {
    Array.from(data).forEach(([name, providersMap]) => Array.from(providersMap).forEach(([url, users]) => {
      try {
        url = new URL(url)
      } catch (error) {
        return providers
      }
      providers.set(url.hostname, Providers.mergeProvider(providers.get(url.hostname), {
        status: [status],
        urls: new Map([[url.origin, { name, url, status, origin: 'crdt' }]]),
        origins: ['crdt']
      }))
    }))
    return providers
  }

  static fillProvidersWithProvidersFromRooms (providers, data, separator) {
    Array.from(data).forEach(({ room, url, prop, providerFallbacks }) => {
      let [name, realUrl] = url.split(separator)
      // incase no separator is found (fallback for old room provider array)
      if (!realUrl) {
        realUrl = name
        name = 'websocket'
      }
      try {
        url = new URL(realUrl)
      } catch (error) {
        return providers
      }
      const status = prop === 'providers' ? 'once-established' : 'unknown'
      providers.set(url.hostname, Providers.mergeProvider(providers.get(url.hostname), {
        status: [status],
        urls: new Map([[url.origin, { name, url, status, origin: room }]]),
        origins: [room],
        providerFallbacks: new Map(providerFallbacks[url.hostname]?.urls)
      }))
    })
    return providers
  }

  static fillProvidersWithProvidersFromNotificationsSettings (providers, data) {
    if (!Array.isArray(data)) return providers
    Array.from(data).forEach(hostname => {
      let urlWss, urlWs
      try {
        urlWss = new URL(`wss://${hostname}`)
        urlWs = new URL(`ws://${hostname}`)
      } catch (error) {
        return providers
      }
      providers.set(hostname, Providers.mergeProvider(providers.get(hostname), {
        status: ['unknown'],
        urls: new Map([
          [urlWss.origin, { name: 'websocket', url: urlWss, status: 'unknown', origin: 'notifications' }],
          [urlWs.origin, { name: 'websocket', url: urlWs, status: 'unknown', origin: 'notifications' }]
        ]),
        origins: ['notifications']
      }))
    })
    return providers
  }

  static fillProvidersWithProvidersFromEnvironment (providers, data, status = 'default') {
    data.providers.forEach(provider => {
      const url = new URL(provider.url)
      providers.set(url.hostname, Providers.mergeProvider(providers.get(url.hostname), {
        status: [status],
        urls: new Map([[url.origin, { name: provider.name, url, status, origin: 'environment' }]]),
        origins: ['environment']
      }))
    })
    return providers
  }

  static fillProvidersWithSessionProvidersByStatus (providers, data, separator) {
    const loopProviders = (providersArr, key) => providersArr.forEach(url => {
      const [name, realUrl] = url.split(separator)
      url = new URL(realUrl)
      providers.set(url.hostname, Providers.mergeProvider(providers.get(url.hostname), {
        status: [key],
        urls: new Map([[url.origin, { name, url, status: key, origin: 'session' }]]),
        origins: ['session']
      }))
    })
    // keep strictly this order, that the connected overwrites the disconnected
    loopProviders(data.disconnected, 'disconnected')
    loopProviders(data.connected, 'connected')
    return providers
  }

  static mergeProvider (providerA, providerB) {
    if (!providerA) return providerB
    const providerNew = {}
    if (providerA.origins && providerB.origins) providerNew.origins = Array.from(new Set(providerA.origins.concat(providerB.origins)))
    if (providerA.status && providerB.status) providerNew.status = Array.from(new Set(providerA.status.concat(providerB.status)))
    providerNew.urls = Providers.mergeMap(providerA.urls, providerB.urls)
    providerNew.providerFallbacks = Providers.mergeMap(providerA.providerFallbacks, providerB.providerFallbacks)
    return Object.assign(providerA, providerB, providerNew)
  }

  static mergeMap (mapA, mapB) {
    if (!mapA) return mapB
    if (!mapB) return mapA
    const reduce = arr => Array.from(arr).reduce((acc, [key, value]) => {
      acc.push(key)
      return acc
    }, [])
    const keys = Array.from(new Set(reduce(mapA).concat(reduce(mapB))))
    return keys.reduce((acc, key) => {
      const valueA = mapA.get(key)
      const valueB = mapB.get(key)
      acc.set(key, !valueA
        ? valueB
        : !valueB
            ? valueA
            : Array.isArray(valueA) && Array.isArray(valueB)
              ? Array.from(new Set(valueA.concat(valueB)))
              : Object.assign(valueA, valueB)
      ).get(key)
      return acc
    }, new Map())
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
    return this.getWebsocketInfoMap.set(url, fetch(`${urlHttpProtocol(url)}/get-info`, {
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
      this.dispatchEvent(new CustomEvent(`${this.namespace}merge-unique-active-room`, {
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
      img.setAttribute('src', urlHttpProtocol(url))
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
