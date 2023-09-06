/* global location */
/* global self */
/* global caches */
/* global fetch */

class MasterServiceWorker {
  constructor () {
    this.showNotificationTimeout = 60 * 1000
    this.location = {}
    this.notificationData = null
    // TODO: event.waitUntil... https://stackoverflow.com/questions/66318926/how-to-avoid-showing-a-notification-in-service-worker-push-event

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
        this.showNotification(data)
      } else {
        this.cancelNotification()
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
        this.cancelNotification()
      }
    })
  }

  // https://notifications.spec.whatwg.org/#dom-notification-actions
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
  /**
   *
   *
   * @param {{room: string, type: string, visibilityState?: 'hidden', body?: string}} data
   * @param {Event} [event=undefined]
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
      this.showNotificationTimeoutID = setTimeout(() => {
        self.registration.showNotification(
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
        ).then(result => {
          this.notificationData = null
          return result
        })
      }, this.showNotificationTimeout)
    } else if(event) {
      event.preventDefault()
    }
  }

  cancelNotification () {
    clearTimeout(this.showNotificationTimeoutID)
  }
}
const ServiceWorker = new MasterServiceWorker()
