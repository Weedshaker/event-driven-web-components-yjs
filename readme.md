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

- [x] activate text link as html a tag (https://github.com/meyt/linkable.js)
- [x] save to leveldb (servers/y-websocket/bin/server.js) with timeout to be deleted https://github.com/yjs/y-leveldb/tree/master persistence.clearDocument
- [ ] check out more solid fingerprint library (https://github.com/fingerprintjs/fingerprintjs/tree/master)
- [ ] user local state field through user controller
- [ ] replace tests/exampleOne/AwarenessChange.js with users view component evtl. with https://github.com/feross/p2p-graph
- [ ] draw.io representation
- [ ] developer tutorials and tools
- [x] User controller with CRDT User object including connected ProviderNames + urls on user props

Websocket/RTC
- [x] websocket without leveldb nor runtime cache (removed all persistance and deployed at https://github.com/Weedshaker/y-websocket)
- [ ] own heroku webrtc testing

At decentralweb App level
- [ ] submodule views: rooms (own rooms or with controller analog users), users and providers (with initial providers fetched from gist or separate repo json)
- [ ] ipfs and webtorrent integrations
- [ ] User controller if not connected offer to connect to other urls max. 2 per socket / connecting to other servers according user crdt data
- [ ] allow the user to choose to keep chat alive at websocket (see TODO: allow certain rooms to have persistence at https://github.com/Weedshaker/y-websocket)
- [ ] security and text & room link encryption 
- [ ] search/crawl
- [ ] id, room administrators
- [ ] dns (link board) / dns crdt
- [ ] websocket push, notifications and service worker controller with cache and evtl. own yjs doc instance

Vision
- creativity (app types: bullet board, wiki, draw, chat, one way chat (web site builder), miro like, 2d platformer, add voice & video, simple games, heartbeat games)



## Credit

Created by [Edmgb](https://github.com/Edmgb) + [Weedshaker](https://github.com/Weedshaker)
