/* global location */
/* global self */
/* global caches */
/* global fetch */

class MasterServiceWorker {
  constructor () {
    this.addInstallEventListener()
    this.addActivateEventListener()
    this.addMessageChannelEventListener()
    this.addPushEventListener()
  }

  addInstallEventListener () {
    self.addEventListener('install', event => self.skipWaiting())
  }

  addActivateEventListener () {
    self.addEventListener('activate', event => event.waitUntil(self.clients.claim()))
  }

  addMessageChannelEventListener () {
    // Notify 24h after last document.visibilityState === 'visible'
    self.addEventListener('message', event => {
      let data = null
      try {
        data = JSON.parse(event.data) || null
      } catch (e) {
        return (data = null)
      }
      if (data.visibilityState === 'visible') return
      console.log('post message', data);
      // clearTimeout(this.messageTimeoutId)
      // this.messageTimeoutId = setTimeout(() => {
      //   self.registration.showNotification(`decentral chat user ${data.nickname} wrote:`, {
      //     body: data.text,
      //     /* icon: `${location.origin}/img/android-icon-192x192.png`,
      //     badge: `${location.origin}/img/android-icon-96x96.png`, */
      //     lang: navigator.language,
      //     requireInteraction: true,
      //     vibrate: [300, 100, 400]
      //   })
      // }, 1000)
    })
  }

  addPushEventListener () {
    self.addEventListener('push', event => {
      let data = null
      try {
        data = event.data.json() || null
      } catch (e) {
        return (data = null)
      }
      console.log('push message', data);
      /*
      // TODO: figure out where the link goes and how to add a link in actions
      if(data.type === 'update') {

      } else { // 'change'
        clearTimeout(this.pushChangeTimeoutId)
        this.pushChangeTimeoutId = setTimeout(() => {
          console.log('push change', data);
          self.registration.showNotification(
            `${data.room} changed!`,
            {
              actions: [
                {
                  action: 'onclick',
                  title: `${data.room} changed!`,
                  body: data.room,
                  //icon: ''
                }
              ],
              body: data.room,
              lang: navigator.language,
              requireInteraction: true,
              vibrate: [300, 100, 400]
            }
          )
        }, 60 * 1000) // wait a minute
      }
      */
    })
  }
}
const ServiceWorker = new MasterServiceWorker()
