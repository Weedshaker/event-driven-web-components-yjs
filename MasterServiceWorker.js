/* global location */
/* global self */
/* global caches */
/* global fetch */

class MasterServiceWorker {
  constructor () {
    this.showNotificationTimeout = /*60 * */1000
    this.showNotificationResolve = () => {}
    this.showNotificationReject = () => {}
    this.location = {}
    this.notificationData = null

    this.addInstallEventListener()
    this.addActivateEventListener()
    this.addNotificationclickEventListener()
    this.addMessageEventListener()
    this.addPushEventListener()
  }

  addInstallEventListener () {
    self.addEventListener('install', event => self.skipWaiting())
  }

  addActivateEventListener () {
    self.addEventListener('activate', event => event.waitUntil(self.clients.claim()))
  }

  addNotificationclickEventListener () {
    self.addEventListener('notificationclick', event => {
      if (!this.location.href) return
      event.notification.close()
      event.waitUntil(
        clients.matchAll({
          type: 'window',
          includeUncontrolled: true
        }).then(clientList => {
          let client
          if ((client = clientList.find(client => client.url === this.location.href)) && typeof client.focus === 'function') {
            client.focus()
            client.postMessage('Push notification clicked!')
          } else {
            clients.openWindow(this.location.href)
          }
        })
      )
    })
  }

  addMessageEventListener () {
    // Notify 24h after last document.visibilityState === 'visible'
    self.addEventListener('message', event => {
      let data = null
      try {
        data = JSON.parse(event.data) || null
      } catch (e) {
        return (data = null)
      }
      // get the location values from the dom
      if (data.key === 'location' && data.value) return (this.location = data.value)
      if (data.visibilityState === 'hidden') {
        /* this event has no waitUntil and can be omitted */
        this.showNotification(data, event)
      } else {
        this.cancelNotification(event)
      }
    })
  }

  addPushEventListener () {
    self.addEventListener('push', async (event) => {
      let data = null
      try {
        data = event.data.json() || null
      } catch (e) {
        return (data = null)
      }
      if (await clients.matchAll({
        type: 'window',
        includeUncontrolled: true
      }).then(clientList => {
        let client
        if ((client = clientList.find(client => client.url === this.location.href))) {
          return client.visibilityState
        } else {
          return 'hidden'
        }
      }) === 'hidden') {
        this.showNotification(data, event)
      } else {
        this.cancelNotification(event)
      }
    })
  }

  // NOTE: remove and with a time out add push listener does not work

  /**
   * https://notifications.spec.whatwg.org/#dom-notification-actions
   * https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
   *
   * @param {{room: string, type: string, visibilityState?: 'hidden', body?: string}} data
   * @param {Event} event
   * @return {void}
   */
  showNotification (data, event) {
    if (!data) return
    const trigger = !this.notificationData
    if (this.notificationData && this.notificationData.body && !data.body && this.notificationData.room === data.room) {
      this.notificationData = Object.assign(this.notificationData, data)
    } else {
      this.notificationData = data
    }
    if (trigger) {
      this.cancelNotification()
      const waitUntilPromise = new Promise((resolve, reject) => {
        this.showNotificationResolve = resolve
        this.showNotificationReject = reject
      })
      waitUntilPromise.finally(result => {
        this.notificationData = null
        return result
      }).catch(error => error)
      if (event.eventPhase !== 0) event.waitUntil(waitUntilPromise)
      this.showNotificationTimeoutID = setTimeout(() => {
        this.showNotificationResolve(self.registration.showNotification(
          this.notificationData.room
            ? `Update @${this.notificationData.room}!`
            : 'Update',
          {
            body: this.notificationData.body
              ? this.notificationData.body
              : `There has been an update in the room: ${this.notificationData.room}`,
            lang: navigator.language,
            requireInteraction: true,
            vibrate: [300, 100, 400]
          }
        ))
      }, this.showNotificationTimeout)
    } else if(event) {
      this.cancelNotification(event, false)
    }
  }

  /**
   * @param {Event} [event=undefined]
   * @param {boolean} [clear=true]
   * @return {void}
   */
  cancelNotification (event, clear = true) {
    if (clear) clearTimeout(this.showNotificationTimeoutID)
    this.showNotificationReject()
    if (event) event.preventDefault()
  }
}
const ServiceWorker = new MasterServiceWorker()
