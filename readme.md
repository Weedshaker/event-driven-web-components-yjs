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

- [x] websocket without leveldb nor runtime cache (removed all persistance and deployed at https://github.com/Weedshaker/y-websocket)
- [ ] providers map by room + url as key to allow connect disconnect with different room
- [ ] own heroku webrtc testing
- [ ] User controller with CRDT User object including connected ProviderNames + urls on user props
- [ ] User controller if not connected offer to connect to other urls max. 2 per socket
- [ ] At decentralweb App level, allow the user to choose to keep chat alive at websocket (see TODO: allow certain rooms to have persistence at https://github.com/Weedshaker/y-websocket)


## Credit

Created by [Edmgb](https://github.com/Edmgb) + [Weedshaker](https://github.com/Weedshaker)
