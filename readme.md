# Event Driven Web Components yjs

> yjs web components wrapper


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
- [ ] implement more solid fingerprint library (https://github.com/fingerprintjs/fingerprintjs/tree/master)
- [ ] user local state field through user controller event at controllers/Users.js
- [ ] replace tests/exampleOne/AwarenessChange.js with users, etc.  at tests/exampleThree.html (live-share)
- [ ] view component for controllers/Users.js + controllers/Providers.js with https://github.com/feross/p2p-graph
- [ ] developer tutorials and tools
- [ ] controllers/Providers.js when on automatic connect look for the most favorable connections and avoid orphans else allow manual choice at Providers view (User controller if not connected offer to connect to other urls max. 2 per socket / connecting to other servers according user crdt data)
- [ ] controllers/Rooms.js getting a room event from EventDrivenYjs.js and maintaining the rooms at local storage for further consumption at Rooms view
- [ ] document.body should not be an absolute event listener target (https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) (shadow.js add event target choose function || document.body)

Websocket/RTC
- [x] websocket without leveldb nor runtime cache (removed all persistance and deployed at https://github.com/Weedshaker/y-websocket)
- [ ] value for value (v4v): https://github.com/monero-ecosystem/monero-javascript ...
- [ ] websocket push (https://developer.mozilla.org/en-US/docs/Web/API/Push_API/Best_Practices | https://medium.com/swlh/building-a-browser-push-notification-service-the-challenges-with-the-websocket-server-8cf9b1827e24), notifications (https://astral.ninja/notifications) and service worker controller with cache and evtl. own yjs doc instance
- [ ] allow the user to choose to keep chat alive at websocket (see TODO: allow certain rooms to have persistence at https://github.com/
- [ ] verification service (badge analog twitter verification badge) through SMS or post card with qr codce
- [ ] own heroku webrtc testing
- [ ] hosting websocket/webrtc from local machine through https://tailscale.com/blog/tailscale-funnel-beta/?utm_source=changelog-news
- [ ] hosting websocket/webrtc from local through https://www.runonflux.io/flux-nodes.html
- [ ] hosting websocket/webrtc from local through onion service

At decentralweb App level
- [ ] choose license (https://www.infoworld.com/article/3703768/the-open-source-licensing-war-is-over.html?utm_source=changelog-news)
- [ ] organization (DOA?)
- [ ] ipfs and webtorrent integrations (https://developer.mozilla.org/en-US/docs/Web/API/Navigator/registerProtocolHandler?retiredLocale=de)
- [ ] speech (tests/exampleThree.html) see tests/exampleThree/Input.js
- [ ] security and text & room link encryption 
- [ ] search/crawl
- [ ] id, room administrators (nostr)
- [ ] dns (link board) / dns crdt

Vision
- creativity (app types: bullet board, wiki, draw, chat, one way chat (web site builder), doodle, sudoku, miro like, 2d platformer, add voice & video, simple games, heartbeat games)



## Credit

Created by [Edmgb](https://github.com/Edmgb) + [Weedshaker](https://github.com/Weedshaker)
