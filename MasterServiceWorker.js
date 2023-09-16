/* global location */
/* global self */
/* global caches */
/* global fetch */

class MasterServiceWorker {
  constructor () {
    this.location = {}

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

  // NOTE: self.removeEventListener('push'... does not work resp. adding after the initial face is not allowed

  /**
   * https://notifications.spec.whatwg.org/#dom-notification-actions
   * https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
   *
   * @param {{room: string, type: string, visibilityState?: 'hidden', body?: string}} data
   * @param {Event} event
   * @return {void}
   */
  showNotification (data, event) {
    if (!data) return this.cancelNotification(event)
    const eventWaitUntil = event.eventPhase !== 0 ? event.waitUntil : () => {}
    try {
      eventWaitUntil(self.registration.showNotification(
        data.room
          ? `Update @${data.room}${data.nickname ? ` by ${data.nickname}` : ''}!`
          : `Update${data.nickname ? ` by ${data.nickname}` : ''}`,
        {
          body: data.body || data.text
            ? data.body || data.text
            : `There has been an update in the room: ${data.room}`,
          lang: navigator.language,
          requireInteraction: true,
          vibrate: [300, 100, 400]
        }
      ))
    } catch (error) {
      this.cancelNotification(event)
    }
  }

  /**
   * @param {Event} event
   * @return {void}
   */
  cancelNotification (event) {
    event.preventDefault()
  }
}
const ServiceWorker = new MasterServiceWorker()
