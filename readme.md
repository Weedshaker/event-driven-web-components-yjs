# Event Driven Web Components yjs

> yjs web components wrapper
https://weedshaker.github.io/event-driven-web-components-yjs/


### Installation

- git submodule init
- git submodule update
- npm install

(no stack repo)

### Rough Roadmap

Dezentral Chat, Dezentral Chat with Video, Dezentral Game (voxel.js, or other stuff) with Chat + Video

## Implementation

Frontend Event Driven Architecture works basically like the DOM itself...

## TODO:

Frontend
- [x] activate text link as html a tag (https://github.com/meyt/linkable.js)
- [x] save to leveldb (servers/y-websocket/bin/server.js) with timeout to be deleted https://github.com/yjs/y-leveldb/tree/master persistence.clearDocument
- [x] User controller with CRDT User object including connected ProviderNames + urls on user props
- [ ] draw.io representation
- [x] implement more solid fingerprint library (https://github.com/fingerprintjs/fingerprintjs/tree/master)
- [x] default offline but on set providers offer default servers fetched from file from github pages
- [x] fingerprint is still not consistent, consider to remove fingerprint from the uid
- [ ] MasterServiceWorker add a Notification Queue which can be read through events
- [ ] user local state field through user controller event at controllers/Users.js
- [ ] EventDrivenYjs.js localstorage analog breathing app in one object with epoch per room and general local epoch without room ref. but just first contact
- [ ] replace tests/exampleOne/AwarenessChange.js with users, etc.  at tests/exampleFour.html or App (live-share)
- [ ] view component for controllers/Users.js + controllers/Providers.js with https://github.com/feross/p2p-graph
- [ ] controllers/Providers.js when on automatic connect look for the most favorable connections and avoid orphans else allow manual choice at Providers view (User controller if not connected offer to connect to other urls max. 2 per socket / connecting to other servers according user crdt data [provider has mutually connected users with some connected to other providers with mutually connected users and vice versa]) + handle on error ws connection at provider
- [ ] controllers/Rooms.js getting a room event from EventDrivenYjs.js and maintaining the rooms at local storage for further consumption at Rooms view
- [ ] document.body should not be an absolute event listener target (https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) (shadow.js add event target choose function || document.body)
- [ ] developer tutorials and tools

Websocket/RTC
- [x] websocket without leveldb nor runtime cache (removed all persistance and deployed at https://github.com/Weedshaker/y-websocket)
- [x] **websocket push (https://web.dev/push-notifications-subscribing-a-user/), notifications (https://astral.ninja/notifications) and service worker controller with cache and evtl. own yjs doc instance**
- [x] allow the user to choose to keep chat alive at websocket (see TODO: allow certain rooms to have persistence at https://github.com/
- [ ] Provider connection ERROR handling (take note of it in the provider class)
- [ ] Use Notification FCM alternatives even though it is already encrypted but FCM is blocked by Brave (https://github.com/7-iris/iris_server | https://emteria.com/blog/fcm-alternatives)
- [ ] hosting websocket/webrtc from local machine through https://tailscale.com/blog/tailscale-funnel-beta/?utm_source=changelog-news
- [ ] hosting websocket/webrtc from local through https://www.runonflux.io/flux-nodes.html
- [ ] hosting websocket/webrtc from local through onion service
- [ ] on websocket shutdown save the map (subscriptions) to leveldb and load it backup when starting... servers/y-websocket/bin/utils.js
- [ ] value for value (v4v): https://github.com/monero-ecosystem/monero-javascript ...
- [ ] verification service (badge analog twitter verification badge) through SMS or post card with qr code
- [ ] own heroku webrtc testing

Vision
- Principles: 100% Open Source, Offline eg. Local First (decentralized content [CRDT] === decentralized ownership), as decentralized in all aspects as feasible
- creativity (app types: bullet board, wiki, draw, chat, one way chat (web site builder), givesendgo (crowd founding), doodle, sudoku, miro like, 2d platformer, add voice & video, simple games, heartbeat game, breathing app lobby to breath and meditate together afterwards staying in touch in own chat room)



## Credit

Created by [Edmgb](https://github.com/Edmgb) + [Weedshaker](https://github.com/Weedshaker)
