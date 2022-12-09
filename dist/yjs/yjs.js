// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"jq1Hk":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "42036d7a98ade5a7";
module.bundle.HMR_BUNDLE_ID = "359969da2d346d66";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"gKhOL":[function(require,module,exports) {
var global = arguments[3];
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var observable = require("lib0/dist/observable.cjs");
var array = require("lib0/dist/array.cjs");
var math = require("lib0/dist/math.cjs");
var map = require("lib0/dist/map.cjs");
var encoding = require("lib0/dist/encoding.cjs");
var decoding = require("lib0/dist/decoding.cjs");
var random = require("lib0/dist/random.cjs");
var promise = require("lib0/dist/promise.cjs");
var buffer = require("lib0/dist/buffer.cjs");
var error = require("lib0/dist/error.cjs");
var binary = require("lib0/dist/binary.cjs");
var f = require("lib0/dist/function.cjs");
var set = require("lib0/dist/set.cjs");
var logging = require("lib0/dist/logging.cjs");
var time = require("lib0/dist/time.cjs");
var iterator = require("lib0/dist/iterator.cjs");
var object = require("lib0/dist/object.cjs");
function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) Object.keys(e).forEach(function(k) {
        if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
                enumerable: true,
                get: function() {
                    return e[k];
                }
            });
        }
    });
    n["default"] = e;
    return Object.freeze(n);
}
var array__namespace = /*#__PURE__*/ _interopNamespace(array);
var math__namespace = /*#__PURE__*/ _interopNamespace(math);
var map__namespace = /*#__PURE__*/ _interopNamespace(map);
var encoding__namespace = /*#__PURE__*/ _interopNamespace(encoding);
var decoding__namespace = /*#__PURE__*/ _interopNamespace(decoding);
var random__namespace = /*#__PURE__*/ _interopNamespace(random);
var promise__namespace = /*#__PURE__*/ _interopNamespace(promise);
var buffer__namespace = /*#__PURE__*/ _interopNamespace(buffer);
var error__namespace = /*#__PURE__*/ _interopNamespace(error);
var binary__namespace = /*#__PURE__*/ _interopNamespace(binary);
var f__namespace = /*#__PURE__*/ _interopNamespace(f);
var set__namespace = /*#__PURE__*/ _interopNamespace(set);
var logging__namespace = /*#__PURE__*/ _interopNamespace(logging);
var time__namespace = /*#__PURE__*/ _interopNamespace(time);
var iterator__namespace = /*#__PURE__*/ _interopNamespace(iterator);
var object__namespace = /*#__PURE__*/ _interopNamespace(object);
/**
 * This is an abstract interface that all Connectors should implement to keep them interchangeable.
 *
 * @note This interface is experimental and it is not advised to actually inherit this class.
 *       It just serves as typing information.
 *
 * @extends {Observable<any>}
 */ class AbstractConnector extends observable.Observable {
    /**
   * @param {Doc} ydoc
   * @param {any} awareness
   */ constructor(ydoc, awareness){
        super();
        this.doc = ydoc;
        this.awareness = awareness;
    }
}
class DeleteItem {
    /**
   * @param {number} clock
   * @param {number} len
   */ constructor(clock, len){
        /**
     * @type {number}
     */ this.clock = clock;
        /**
     * @type {number}
     */ this.len = len;
    }
}
/**
 * We no longer maintain a DeleteStore. DeleteSet is a temporary object that is created when needed.
 * - When created in a transaction, it must only be accessed after sorting, and merging
 *   - This DeleteSet is send to other clients
 * - We do not create a DeleteSet when we send a sync message. The DeleteSet message is created directly from StructStore
 * - We read a DeleteSet as part of a sync/update message. In this case the DeleteSet is already sorted and merged.
 */ class DeleteSet {
    constructor(){
        /**
     * @type {Map<number,Array<DeleteItem>>}
     */ this.clients = new Map();
    }
}
/**
 * Iterate over all structs that the DeleteSet gc's.
 *
 * @param {Transaction} transaction
 * @param {DeleteSet} ds
 * @param {function(GC|Item):void} f
 *
 * @function
 */ const iterateDeletedStructs = (transaction, ds, f)=>ds.clients.forEach((deletes, clientid)=>{
        const structs = /** @type {Array<GC|Item>} */ transaction.doc.store.clients.get(clientid);
        for(let i = 0; i < deletes.length; i++){
            const del = deletes[i];
            iterateStructs(transaction, structs, del.clock, del.len, f);
        }
    });
/**
 * @param {Array<DeleteItem>} dis
 * @param {number} clock
 * @return {number|null}
 *
 * @private
 * @function
 */ const findIndexDS = (dis, clock)=>{
    let left = 0;
    let right = dis.length - 1;
    while(left <= right){
        const midindex = math__namespace.floor((left + right) / 2);
        const mid = dis[midindex];
        const midclock = mid.clock;
        if (midclock <= clock) {
            if (clock < midclock + mid.len) return midindex;
            left = midindex + 1;
        } else right = midindex - 1;
    }
    return null;
};
/**
 * @param {DeleteSet} ds
 * @param {ID} id
 * @return {boolean}
 *
 * @private
 * @function
 */ const isDeleted = (ds, id)=>{
    const dis = ds.clients.get(id.client);
    return dis !== undefined && findIndexDS(dis, id.clock) !== null;
};
/**
 * @param {DeleteSet} ds
 *
 * @private
 * @function
 */ const sortAndMergeDeleteSet = (ds)=>{
    ds.clients.forEach((dels)=>{
        dels.sort((a, b)=>a.clock - b.clock);
        // merge items without filtering or splicing the array
        // i is the current pointer
        // j refers to the current insert position for the pointed item
        // try to merge dels[i] into dels[j-1] or set dels[j]=dels[i]
        let i, j;
        for(i = 1, j = 1; i < dels.length; i++){
            const left = dels[j - 1];
            const right = dels[i];
            if (left.clock + left.len >= right.clock) left.len = math__namespace.max(left.len, right.clock + right.len - left.clock);
            else {
                if (j < i) dels[j] = right;
                j++;
            }
        }
        dels.length = j;
    });
};
/**
 * @param {Array<DeleteSet>} dss
 * @return {DeleteSet} A fresh DeleteSet
 */ const mergeDeleteSets = (dss)=>{
    const merged = new DeleteSet();
    for(let dssI = 0; dssI < dss.length; dssI++)dss[dssI].clients.forEach((delsLeft, client)=>{
        if (!merged.clients.has(client)) {
            // Write all missing keys from current ds and all following.
            // If merged already contains `client` current ds has already been added.
            /**
         * @type {Array<DeleteItem>}
         */ const dels = delsLeft.slice();
            for(let i = dssI + 1; i < dss.length; i++)array__namespace.appendTo(dels, dss[i].clients.get(client) || []);
            merged.clients.set(client, dels);
        }
    });
    sortAndMergeDeleteSet(merged);
    return merged;
};
/**
 * @param {DeleteSet} ds
 * @param {number} client
 * @param {number} clock
 * @param {number} length
 *
 * @private
 * @function
 */ const addToDeleteSet = (ds, client, clock, length)=>{
    map__namespace.setIfUndefined(ds.clients, client, ()=>[]).push(new DeleteItem(clock, length));
};
const createDeleteSet = ()=>new DeleteSet();
/**
 * @param {StructStore} ss
 * @return {DeleteSet} Merged and sorted DeleteSet
 *
 * @private
 * @function
 */ const createDeleteSetFromStructStore = (ss)=>{
    const ds = createDeleteSet();
    ss.clients.forEach((structs, client)=>{
        /**
     * @type {Array<DeleteItem>}
     */ const dsitems = [];
        for(let i = 0; i < structs.length; i++){
            const struct = structs[i];
            if (struct.deleted) {
                const clock = struct.id.clock;
                let len = struct.length;
                if (i + 1 < structs.length) for(let next = structs[i + 1]; i + 1 < structs.length && next.deleted; next = structs[++i + 1])len += next.length;
                dsitems.push(new DeleteItem(clock, len));
            }
        }
        if (dsitems.length > 0) ds.clients.set(client, dsitems);
    });
    return ds;
};
/**
 * @param {DSEncoderV1 | DSEncoderV2} encoder
 * @param {DeleteSet} ds
 *
 * @private
 * @function
 */ const writeDeleteSet = (encoder, ds)=>{
    encoding__namespace.writeVarUint(encoder.restEncoder, ds.clients.size);
    ds.clients.forEach((dsitems, client)=>{
        encoder.resetDsCurVal();
        encoding__namespace.writeVarUint(encoder.restEncoder, client);
        const len = dsitems.length;
        encoding__namespace.writeVarUint(encoder.restEncoder, len);
        for(let i = 0; i < len; i++){
            const item = dsitems[i];
            encoder.writeDsClock(item.clock);
            encoder.writeDsLen(item.len);
        }
    });
};
/**
 * @param {DSDecoderV1 | DSDecoderV2} decoder
 * @return {DeleteSet}
 *
 * @private
 * @function
 */ const readDeleteSet = (decoder)=>{
    const ds = new DeleteSet();
    const numClients = decoding__namespace.readVarUint(decoder.restDecoder);
    for(let i = 0; i < numClients; i++){
        decoder.resetDsCurVal();
        const client = decoding__namespace.readVarUint(decoder.restDecoder);
        const numberOfDeletes = decoding__namespace.readVarUint(decoder.restDecoder);
        if (numberOfDeletes > 0) {
            const dsField = map__namespace.setIfUndefined(ds.clients, client, ()=>[]);
            for(let i1 = 0; i1 < numberOfDeletes; i1++)dsField.push(new DeleteItem(decoder.readDsClock(), decoder.readDsLen()));
        }
    }
    return ds;
};
/**
 * @todo YDecoder also contains references to String and other Decoders. Would make sense to exchange YDecoder.toUint8Array for YDecoder.DsToUint8Array()..
 */ /**
 * @param {DSDecoderV1 | DSDecoderV2} decoder
 * @param {Transaction} transaction
 * @param {StructStore} store
 * @return {Uint8Array|null} Returns a v2 update containing all deletes that couldn't be applied yet; or null if all deletes were applied successfully.
 *
 * @private
 * @function
 */ const readAndApplyDeleteSet = (decoder, transaction, store)=>{
    const unappliedDS = new DeleteSet();
    const numClients = decoding__namespace.readVarUint(decoder.restDecoder);
    for(let i = 0; i < numClients; i++){
        decoder.resetDsCurVal();
        const client = decoding__namespace.readVarUint(decoder.restDecoder);
        const numberOfDeletes = decoding__namespace.readVarUint(decoder.restDecoder);
        const structs = store.clients.get(client) || [];
        const state = getState(store, client);
        for(let i1 = 0; i1 < numberOfDeletes; i1++){
            const clock = decoder.readDsClock();
            const clockEnd = clock + decoder.readDsLen();
            if (clock < state) {
                if (state < clockEnd) addToDeleteSet(unappliedDS, client, state, clockEnd - state);
                let index = findIndexSS(structs, clock);
                /**
         * We can ignore the case of GC and Delete structs, because we are going to skip them
         * @type {Item}
         */ // @ts-ignore
                let struct = structs[index];
                // split the first item if necessary
                if (!struct.deleted && struct.id.clock < clock) {
                    structs.splice(index + 1, 0, splitItem(transaction, struct, clock - struct.id.clock));
                    index++; // increase we now want to use the next struct
                }
                while(index < structs.length){
                    // @ts-ignore
                    struct = structs[index++];
                    if (struct.id.clock < clockEnd) {
                        if (!struct.deleted) {
                            if (clockEnd < struct.id.clock + struct.length) structs.splice(index, 0, splitItem(transaction, struct, clockEnd - struct.id.clock));
                            struct.delete(transaction);
                        }
                    } else break;
                }
            } else addToDeleteSet(unappliedDS, client, clock, clockEnd - clock);
        }
    }
    if (unappliedDS.clients.size > 0) {
        const ds = new UpdateEncoderV2();
        encoding__namespace.writeVarUint(ds.restEncoder, 0); // encode 0 structs
        writeDeleteSet(ds, unappliedDS);
        return ds.toUint8Array();
    }
    return null;
};
/**
 * @module Y
 */ const generateNewClientId = random__namespace.uint32;
/**
 * @typedef {Object} DocOpts
 * @property {boolean} [DocOpts.gc=true] Disable garbage collection (default: gc=true)
 * @property {function(Item):boolean} [DocOpts.gcFilter] Will be called before an Item is garbage collected. Return false to keep the Item.
 * @property {string} [DocOpts.guid] Define a globally unique identifier for this document
 * @property {string | null} [DocOpts.collectionid] Associate this document with a collection. This only plays a role if your provider has a concept of collection.
 * @property {any} [DocOpts.meta] Any kind of meta information you want to associate with this document. If this is a subdocument, remote peers will store the meta information as well.
 * @property {boolean} [DocOpts.autoLoad] If a subdocument, automatically load document. If this is a subdocument, remote peers will load the document as well automatically.
 * @property {boolean} [DocOpts.shouldLoad] Whether the document should be synced by the provider now. This is toggled to true when you call ydoc.load()
 */ /**
 * A Yjs instance handles the state of shared data.
 * @extends Observable<string>
 */ class Doc extends observable.Observable {
    /**
   * @param {DocOpts} [opts] configuration
   */ constructor({ guid =random__namespace.uuidv4() , collectionid =null , gc =true , gcFilter =()=>true , meta =null , autoLoad =false , shouldLoad =true  } = {}){
        super();
        this.gc = gc;
        this.gcFilter = gcFilter;
        this.clientID = generateNewClientId();
        this.guid = guid;
        this.collectionid = collectionid;
        /**
     * @type {Map<string, AbstractType<YEvent<any>>>}
     */ this.share = new Map();
        this.store = new StructStore();
        /**
     * @type {Transaction | null}
     */ this._transaction = null;
        /**
     * @type {Array<Transaction>}
     */ this._transactionCleanups = [];
        /**
     * @type {Set<Doc>}
     */ this.subdocs = new Set();
        /**
     * If this document is a subdocument - a document integrated into another document - then _item is defined.
     * @type {Item?}
     */ this._item = null;
        this.shouldLoad = shouldLoad;
        this.autoLoad = autoLoad;
        this.meta = meta;
        this.isLoaded = false;
        this.whenLoaded = promise__namespace.create((resolve)=>{
            this.on("load", ()=>{
                this.isLoaded = true;
                resolve(this);
            });
        });
    }
    /**
   * Notify the parent document that you request to load data into this subdocument (if it is a subdocument).
   *
   * `load()` might be used in the future to request any provider to load the most current data.
   *
   * It is safe to call `load()` multiple times.
   */ load() {
        const item = this._item;
        if (item !== null && !this.shouldLoad) transact(/** @type {any} */ item.parent.doc, (transaction)=>{
            transaction.subdocsLoaded.add(this);
        }, null, true);
        this.shouldLoad = true;
    }
    getSubdocs() {
        return this.subdocs;
    }
    getSubdocGuids() {
        return new Set(Array.from(this.subdocs).map((doc)=>doc.guid));
    }
    /**
   * Changes that happen inside of a transaction are bundled. This means that
   * the observer fires _after_ the transaction is finished and that all changes
   * that happened inside of the transaction are sent as one message to the
   * other peers.
   *
   * @param {function(Transaction):void} f The function that should be executed as a transaction
   * @param {any} [origin] Origin of who started the transaction. Will be stored on transaction.origin
   *
   * @public
   */ transact(f, origin = null) {
        transact(this, f, origin);
    }
    /**
   * Define a shared data type.
   *
   * Multiple calls of `y.get(name, TypeConstructor)` yield the same result
   * and do not overwrite each other. I.e.
   * `y.define(name, Y.Array) === y.define(name, Y.Array)`
   *
   * After this method is called, the type is also available on `y.share.get(name)`.
   *
   * *Best Practices:*
   * Define all types right after the Yjs instance is created and store them in a separate object.
   * Also use the typed methods `getText(name)`, `getArray(name)`, ..
   *
   * @example
   *   const y = new Y(..)
   *   const appState = {
   *     document: y.getText('document')
   *     comments: y.getArray('comments')
   *   }
   *
   * @param {string} name
   * @param {Function} TypeConstructor The constructor of the type definition. E.g. Y.Text, Y.Array, Y.Map, ...
   * @return {AbstractType<any>} The created type. Constructed with TypeConstructor
   *
   * @public
   */ get(name, TypeConstructor = AbstractType) {
        const type = map__namespace.setIfUndefined(this.share, name, ()=>{
            // @ts-ignore
            const t = new TypeConstructor();
            t._integrate(this, null);
            return t;
        });
        const Constr = type.constructor;
        if (TypeConstructor !== AbstractType && Constr !== TypeConstructor) {
            if (Constr === AbstractType) {
                // @ts-ignore
                const t = new TypeConstructor();
                t._map = type._map;
                type._map.forEach(/** @param {Item?} n */ (n)=>{
                    for(; n !== null; n = n.left)// @ts-ignore
                    n.parent = t;
                });
                t._start = type._start;
                for(let n = t._start; n !== null; n = n.right)n.parent = t;
                t._length = type._length;
                this.share.set(name, t);
                t._integrate(this, null);
                return t;
            } else throw new Error(`Type with the name ${name} has already been defined with a different constructor`);
        }
        return type;
    }
    /**
   * @template T
   * @param {string} [name]
   * @return {YArray<T>}
   *
   * @public
   */ getArray(name = "") {
        // @ts-ignore
        return this.get(name, YArray);
    }
    /**
   * @param {string} [name]
   * @return {YText}
   *
   * @public
   */ getText(name = "") {
        // @ts-ignore
        return this.get(name, YText);
    }
    /**
   * @template T
   * @param {string} [name]
   * @return {YMap<T>}
   *
   * @public
   */ getMap(name = "") {
        // @ts-ignore
        return this.get(name, YMap);
    }
    /**
   * @param {string} [name]
   * @return {YXmlFragment}
   *
   * @public
   */ getXmlFragment(name = "") {
        // @ts-ignore
        return this.get(name, YXmlFragment);
    }
    /**
   * Converts the entire document into a js object, recursively traversing each yjs type
   * Doesn't log types that have not been defined (using ydoc.getType(..)).
   *
   * @deprecated Do not use this method and rather call toJSON directly on the shared types.
   *
   * @return {Object<string, any>}
   */ toJSON() {
        /**
     * @type {Object<string, any>}
     */ const doc = {};
        this.share.forEach((value, key)=>{
            doc[key] = value.toJSON();
        });
        return doc;
    }
    /**
   * Emit `destroy` event and unregister all event handlers.
   */ destroy() {
        array__namespace.from(this.subdocs).forEach((subdoc)=>subdoc.destroy());
        const item = this._item;
        if (item !== null) {
            this._item = null;
            const content = /** @type {ContentDoc} */ item.content;
            content.doc = new Doc({
                guid: this.guid,
                ...content.opts,
                shouldLoad: false
            });
            content.doc._item = item;
            transact(/** @type {any} */ item.parent.doc, (transaction)=>{
                const doc = content.doc;
                if (!item.deleted) transaction.subdocsAdded.add(doc);
                transaction.subdocsRemoved.add(this);
            }, null, true);
        }
        this.emit("destroyed", [
            true
        ]);
        this.emit("destroy", [
            this
        ]);
        super.destroy();
    }
    /**
   * @param {string} eventName
   * @param {function(...any):any} f
   */ on(eventName, f) {
        super.on(eventName, f);
    }
    /**
   * @param {string} eventName
   * @param {function} f
   */ off(eventName, f) {
        super.off(eventName, f);
    }
}
class DSDecoderV1 {
    /**
   * @param {decoding.Decoder} decoder
   */ constructor(decoder){
        this.restDecoder = decoder;
    }
    resetDsCurVal() {
    // nop
    }
    /**
   * @return {number}
   */ readDsClock() {
        return decoding__namespace.readVarUint(this.restDecoder);
    }
    /**
   * @return {number}
   */ readDsLen() {
        return decoding__namespace.readVarUint(this.restDecoder);
    }
}
class UpdateDecoderV1 extends DSDecoderV1 {
    /**
   * @return {ID}
   */ readLeftID() {
        return createID(decoding__namespace.readVarUint(this.restDecoder), decoding__namespace.readVarUint(this.restDecoder));
    }
    /**
   * @return {ID}
   */ readRightID() {
        return createID(decoding__namespace.readVarUint(this.restDecoder), decoding__namespace.readVarUint(this.restDecoder));
    }
    /**
   * Read the next client id.
   * Use this in favor of readID whenever possible to reduce the number of objects created.
   */ readClient() {
        return decoding__namespace.readVarUint(this.restDecoder);
    }
    /**
   * @return {number} info An unsigned 8-bit integer
   */ readInfo() {
        return decoding__namespace.readUint8(this.restDecoder);
    }
    /**
   * @return {string}
   */ readString() {
        return decoding__namespace.readVarString(this.restDecoder);
    }
    /**
   * @return {boolean} isKey
   */ readParentInfo() {
        return decoding__namespace.readVarUint(this.restDecoder) === 1;
    }
    /**
   * @return {number} info An unsigned 8-bit integer
   */ readTypeRef() {
        return decoding__namespace.readVarUint(this.restDecoder);
    }
    /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @return {number} len
   */ readLen() {
        return decoding__namespace.readVarUint(this.restDecoder);
    }
    /**
   * @return {any}
   */ readAny() {
        return decoding__namespace.readAny(this.restDecoder);
    }
    /**
   * @return {Uint8Array}
   */ readBuf() {
        return buffer__namespace.copyUint8Array(decoding__namespace.readVarUint8Array(this.restDecoder));
    }
    /**
   * Legacy implementation uses JSON parse. We use any-decoding in v2.
   *
   * @return {any}
   */ readJSON() {
        return JSON.parse(decoding__namespace.readVarString(this.restDecoder));
    }
    /**
   * @return {string}
   */ readKey() {
        return decoding__namespace.readVarString(this.restDecoder);
    }
}
class DSDecoderV2 {
    /**
   * @param {decoding.Decoder} decoder
   */ constructor(decoder){
        /**
     * @private
     */ this.dsCurrVal = 0;
        this.restDecoder = decoder;
    }
    resetDsCurVal() {
        this.dsCurrVal = 0;
    }
    /**
   * @return {number}
   */ readDsClock() {
        this.dsCurrVal += decoding__namespace.readVarUint(this.restDecoder);
        return this.dsCurrVal;
    }
    /**
   * @return {number}
   */ readDsLen() {
        const diff = decoding__namespace.readVarUint(this.restDecoder) + 1;
        this.dsCurrVal += diff;
        return diff;
    }
}
class UpdateDecoderV2 extends DSDecoderV2 {
    /**
   * @param {decoding.Decoder} decoder
   */ constructor(decoder){
        super(decoder);
        /**
     * List of cached keys. If the keys[id] does not exist, we read a new key
     * from stringEncoder and push it to keys.
     *
     * @type {Array<string>}
     */ this.keys = [];
        decoding__namespace.readVarUint(decoder); // read feature flag - currently unused
        this.keyClockDecoder = new decoding__namespace.IntDiffOptRleDecoder(decoding__namespace.readVarUint8Array(decoder));
        this.clientDecoder = new decoding__namespace.UintOptRleDecoder(decoding__namespace.readVarUint8Array(decoder));
        this.leftClockDecoder = new decoding__namespace.IntDiffOptRleDecoder(decoding__namespace.readVarUint8Array(decoder));
        this.rightClockDecoder = new decoding__namespace.IntDiffOptRleDecoder(decoding__namespace.readVarUint8Array(decoder));
        this.infoDecoder = new decoding__namespace.RleDecoder(decoding__namespace.readVarUint8Array(decoder), decoding__namespace.readUint8);
        this.stringDecoder = new decoding__namespace.StringDecoder(decoding__namespace.readVarUint8Array(decoder));
        this.parentInfoDecoder = new decoding__namespace.RleDecoder(decoding__namespace.readVarUint8Array(decoder), decoding__namespace.readUint8);
        this.typeRefDecoder = new decoding__namespace.UintOptRleDecoder(decoding__namespace.readVarUint8Array(decoder));
        this.lenDecoder = new decoding__namespace.UintOptRleDecoder(decoding__namespace.readVarUint8Array(decoder));
    }
    /**
   * @return {ID}
   */ readLeftID() {
        return new ID(this.clientDecoder.read(), this.leftClockDecoder.read());
    }
    /**
   * @return {ID}
   */ readRightID() {
        return new ID(this.clientDecoder.read(), this.rightClockDecoder.read());
    }
    /**
   * Read the next client id.
   * Use this in favor of readID whenever possible to reduce the number of objects created.
   */ readClient() {
        return this.clientDecoder.read();
    }
    /**
   * @return {number} info An unsigned 8-bit integer
   */ readInfo() {
        return /** @type {number} */ this.infoDecoder.read();
    }
    /**
   * @return {string}
   */ readString() {
        return this.stringDecoder.read();
    }
    /**
   * @return {boolean}
   */ readParentInfo() {
        return this.parentInfoDecoder.read() === 1;
    }
    /**
   * @return {number} An unsigned 8-bit integer
   */ readTypeRef() {
        return this.typeRefDecoder.read();
    }
    /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @return {number}
   */ readLen() {
        return this.lenDecoder.read();
    }
    /**
   * @return {any}
   */ readAny() {
        return decoding__namespace.readAny(this.restDecoder);
    }
    /**
   * @return {Uint8Array}
   */ readBuf() {
        return decoding__namespace.readVarUint8Array(this.restDecoder);
    }
    /**
   * This is mainly here for legacy purposes.
   *
   * Initial we incoded objects using JSON. Now we use the much faster lib0/any-encoder. This method mainly exists for legacy purposes for the v1 encoder.
   *
   * @return {any}
   */ readJSON() {
        return decoding__namespace.readAny(this.restDecoder);
    }
    /**
   * @return {string}
   */ readKey() {
        const keyClock = this.keyClockDecoder.read();
        if (keyClock < this.keys.length) return this.keys[keyClock];
        else {
            const key = this.stringDecoder.read();
            this.keys.push(key);
            return key;
        }
    }
}
class DSEncoderV1 {
    constructor(){
        this.restEncoder = encoding__namespace.createEncoder();
    }
    toUint8Array() {
        return encoding__namespace.toUint8Array(this.restEncoder);
    }
    resetDsCurVal() {
    // nop
    }
    /**
   * @param {number} clock
   */ writeDsClock(clock) {
        encoding__namespace.writeVarUint(this.restEncoder, clock);
    }
    /**
   * @param {number} len
   */ writeDsLen(len) {
        encoding__namespace.writeVarUint(this.restEncoder, len);
    }
}
class UpdateEncoderV1 extends DSEncoderV1 {
    /**
   * @param {ID} id
   */ writeLeftID(id) {
        encoding__namespace.writeVarUint(this.restEncoder, id.client);
        encoding__namespace.writeVarUint(this.restEncoder, id.clock);
    }
    /**
   * @param {ID} id
   */ writeRightID(id) {
        encoding__namespace.writeVarUint(this.restEncoder, id.client);
        encoding__namespace.writeVarUint(this.restEncoder, id.clock);
    }
    /**
   * Use writeClient and writeClock instead of writeID if possible.
   * @param {number} client
   */ writeClient(client) {
        encoding__namespace.writeVarUint(this.restEncoder, client);
    }
    /**
   * @param {number} info An unsigned 8-bit integer
   */ writeInfo(info) {
        encoding__namespace.writeUint8(this.restEncoder, info);
    }
    /**
   * @param {string} s
   */ writeString(s) {
        encoding__namespace.writeVarString(this.restEncoder, s);
    }
    /**
   * @param {boolean} isYKey
   */ writeParentInfo(isYKey) {
        encoding__namespace.writeVarUint(this.restEncoder, isYKey ? 1 : 0);
    }
    /**
   * @param {number} info An unsigned 8-bit integer
   */ writeTypeRef(info) {
        encoding__namespace.writeVarUint(this.restEncoder, info);
    }
    /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @param {number} len
   */ writeLen(len) {
        encoding__namespace.writeVarUint(this.restEncoder, len);
    }
    /**
   * @param {any} any
   */ writeAny(any) {
        encoding__namespace.writeAny(this.restEncoder, any);
    }
    /**
   * @param {Uint8Array} buf
   */ writeBuf(buf) {
        encoding__namespace.writeVarUint8Array(this.restEncoder, buf);
    }
    /**
   * @param {any} embed
   */ writeJSON(embed) {
        encoding__namespace.writeVarString(this.restEncoder, JSON.stringify(embed));
    }
    /**
   * @param {string} key
   */ writeKey(key) {
        encoding__namespace.writeVarString(this.restEncoder, key);
    }
}
class DSEncoderV2 {
    constructor(){
        this.restEncoder = encoding__namespace.createEncoder(); // encodes all the rest / non-optimized
        this.dsCurrVal = 0;
    }
    toUint8Array() {
        return encoding__namespace.toUint8Array(this.restEncoder);
    }
    resetDsCurVal() {
        this.dsCurrVal = 0;
    }
    /**
   * @param {number} clock
   */ writeDsClock(clock) {
        const diff = clock - this.dsCurrVal;
        this.dsCurrVal = clock;
        encoding__namespace.writeVarUint(this.restEncoder, diff);
    }
    /**
   * @param {number} len
   */ writeDsLen(len) {
        if (len === 0) error__namespace.unexpectedCase();
        encoding__namespace.writeVarUint(this.restEncoder, len - 1);
        this.dsCurrVal += len;
    }
}
class UpdateEncoderV2 extends DSEncoderV2 {
    constructor(){
        super();
        /**
     * @type {Map<string,number>}
     */ this.keyMap = new Map();
        /**
     * Refers to the next uniqe key-identifier to me used.
     * See writeKey method for more information.
     *
     * @type {number}
     */ this.keyClock = 0;
        this.keyClockEncoder = new encoding__namespace.IntDiffOptRleEncoder();
        this.clientEncoder = new encoding__namespace.UintOptRleEncoder();
        this.leftClockEncoder = new encoding__namespace.IntDiffOptRleEncoder();
        this.rightClockEncoder = new encoding__namespace.IntDiffOptRleEncoder();
        this.infoEncoder = new encoding__namespace.RleEncoder(encoding__namespace.writeUint8);
        this.stringEncoder = new encoding__namespace.StringEncoder();
        this.parentInfoEncoder = new encoding__namespace.RleEncoder(encoding__namespace.writeUint8);
        this.typeRefEncoder = new encoding__namespace.UintOptRleEncoder();
        this.lenEncoder = new encoding__namespace.UintOptRleEncoder();
    }
    toUint8Array() {
        const encoder = encoding__namespace.createEncoder();
        encoding__namespace.writeVarUint(encoder, 0); // this is a feature flag that we might use in the future
        encoding__namespace.writeVarUint8Array(encoder, this.keyClockEncoder.toUint8Array());
        encoding__namespace.writeVarUint8Array(encoder, this.clientEncoder.toUint8Array());
        encoding__namespace.writeVarUint8Array(encoder, this.leftClockEncoder.toUint8Array());
        encoding__namespace.writeVarUint8Array(encoder, this.rightClockEncoder.toUint8Array());
        encoding__namespace.writeVarUint8Array(encoder, encoding__namespace.toUint8Array(this.infoEncoder));
        encoding__namespace.writeVarUint8Array(encoder, this.stringEncoder.toUint8Array());
        encoding__namespace.writeVarUint8Array(encoder, encoding__namespace.toUint8Array(this.parentInfoEncoder));
        encoding__namespace.writeVarUint8Array(encoder, this.typeRefEncoder.toUint8Array());
        encoding__namespace.writeVarUint8Array(encoder, this.lenEncoder.toUint8Array());
        // @note The rest encoder is appended! (note the missing var)
        encoding__namespace.writeUint8Array(encoder, encoding__namespace.toUint8Array(this.restEncoder));
        return encoding__namespace.toUint8Array(encoder);
    }
    /**
   * @param {ID} id
   */ writeLeftID(id) {
        this.clientEncoder.write(id.client);
        this.leftClockEncoder.write(id.clock);
    }
    /**
   * @param {ID} id
   */ writeRightID(id) {
        this.clientEncoder.write(id.client);
        this.rightClockEncoder.write(id.clock);
    }
    /**
   * @param {number} client
   */ writeClient(client) {
        this.clientEncoder.write(client);
    }
    /**
   * @param {number} info An unsigned 8-bit integer
   */ writeInfo(info) {
        this.infoEncoder.write(info);
    }
    /**
   * @param {string} s
   */ writeString(s) {
        this.stringEncoder.write(s);
    }
    /**
   * @param {boolean} isYKey
   */ writeParentInfo(isYKey) {
        this.parentInfoEncoder.write(isYKey ? 1 : 0);
    }
    /**
   * @param {number} info An unsigned 8-bit integer
   */ writeTypeRef(info) {
        this.typeRefEncoder.write(info);
    }
    /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @param {number} len
   */ writeLen(len) {
        this.lenEncoder.write(len);
    }
    /**
   * @param {any} any
   */ writeAny(any) {
        encoding__namespace.writeAny(this.restEncoder, any);
    }
    /**
   * @param {Uint8Array} buf
   */ writeBuf(buf) {
        encoding__namespace.writeVarUint8Array(this.restEncoder, buf);
    }
    /**
   * This is mainly here for legacy purposes.
   *
   * Initial we incoded objects using JSON. Now we use the much faster lib0/any-encoder. This method mainly exists for legacy purposes for the v1 encoder.
   *
   * @param {any} embed
   */ writeJSON(embed) {
        encoding__namespace.writeAny(this.restEncoder, embed);
    }
    /**
   * Property keys are often reused. For example, in y-prosemirror the key `bold` might
   * occur very often. For a 3d application, the key `position` might occur very often.
   *
   * We cache these keys in a Map and refer to them via a unique number.
   *
   * @param {string} key
   */ writeKey(key) {
        const clock = this.keyMap.get(key);
        if (clock === undefined) {
            /**
       * @todo uncomment to introduce this feature finally
       *
       * Background. The ContentFormat object was always encoded using writeKey, but the decoder used to use readString.
       * Furthermore, I forgot to set the keyclock. So everything was working fine.
       *
       * However, this feature here is basically useless as it is not being used (it actually only consumes extra memory).
       *
       * I don't know yet how to reintroduce this feature..
       *
       * Older clients won't be able to read updates when we reintroduce this feature. So this should probably be done using a flag.
       *
       */ // this.keyMap.set(key, this.keyClock)
            this.keyClockEncoder.write(this.keyClock++);
            this.stringEncoder.write(key);
        } else this.keyClockEncoder.write(clock);
    }
}
/**
 * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
 * @param {Array<GC|Item>} structs All structs by `client`
 * @param {number} client
 * @param {number} clock write structs starting with `ID(client,clock)`
 *
 * @function
 */ const writeStructs = (encoder, structs, client, clock)=>{
    // write first id
    clock = math__namespace.max(clock, structs[0].id.clock); // make sure the first id exists
    const startNewStructs = findIndexSS(structs, clock);
    // write # encoded structs
    encoding__namespace.writeVarUint(encoder.restEncoder, structs.length - startNewStructs);
    encoder.writeClient(client);
    encoding__namespace.writeVarUint(encoder.restEncoder, clock);
    const firstStruct = structs[startNewStructs];
    // write first struct with an offset
    firstStruct.write(encoder, clock - firstStruct.id.clock);
    for(let i = startNewStructs + 1; i < structs.length; i++)structs[i].write(encoder, 0);
};
/**
 * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
 * @param {StructStore} store
 * @param {Map<number,number>} _sm
 *
 * @private
 * @function
 */ const writeClientsStructs = (encoder, store, _sm)=>{
    // we filter all valid _sm entries into sm
    const sm = new Map();
    _sm.forEach((clock, client)=>{
        // only write if new structs are available
        if (getState(store, client) > clock) sm.set(client, clock);
    });
    getStateVector(store).forEach((clock, client)=>{
        if (!_sm.has(client)) sm.set(client, 0);
    });
    // write # states that were updated
    encoding__namespace.writeVarUint(encoder.restEncoder, sm.size);
    // Write items with higher client ids first
    // This heavily improves the conflict algorithm.
    Array.from(sm.entries()).sort((a, b)=>b[0] - a[0]).forEach(([client, clock])=>{
        // @ts-ignore
        writeStructs(encoder, store.clients.get(client), client, clock);
    });
};
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder The decoder object to read data from.
 * @param {Doc} doc
 * @return {Map<number, { i: number, refs: Array<Item | GC> }>}
 *
 * @private
 * @function
 */ const readClientsStructRefs = (decoder, doc)=>{
    /**
   * @type {Map<number, { i: number, refs: Array<Item | GC> }>}
   */ const clientRefs = map__namespace.create();
    const numOfStateUpdates = decoding__namespace.readVarUint(decoder.restDecoder);
    for(let i = 0; i < numOfStateUpdates; i++){
        const numberOfStructs = decoding__namespace.readVarUint(decoder.restDecoder);
        /**
     * @type {Array<GC|Item>}
     */ const refs = new Array(numberOfStructs);
        const client = decoder.readClient();
        let clock = decoding__namespace.readVarUint(decoder.restDecoder);
        // const start = performance.now()
        clientRefs.set(client, {
            i: 0,
            refs
        });
        for(let i1 = 0; i1 < numberOfStructs; i1++){
            const info = decoder.readInfo();
            switch(binary__namespace.BITS5 & info){
                case 0:
                    {
                        const len = decoder.readLen();
                        refs[i1] = new GC(createID(client, clock), len);
                        clock += len;
                        break;
                    }
                case 10:
                    {
                        // @todo we could reduce the amount of checks by adding Skip struct to clientRefs so we know that something is missing.
                        const len1 = decoding__namespace.readVarUint(decoder.restDecoder);
                        refs[i1] = new Skip(createID(client, clock), len1);
                        clock += len1;
                        break;
                    }
                default:
                    {
                        /**
           * The optimized implementation doesn't use any variables because inlining variables is faster.
           * Below a non-optimized version is shown that implements the basic algorithm with
           * a few comments
           */ const cantCopyParentInfo = (info & (binary__namespace.BIT7 | binary__namespace.BIT8)) === 0;
                        // If parent = null and neither left nor right are defined, then we know that `parent` is child of `y`
                        // and we read the next string as parentYKey.
                        // It indicates how we store/retrieve parent from `y.share`
                        // @type {string|null}
                        const struct = new Item(createID(client, clock), null, (info & binary__namespace.BIT8) === binary__namespace.BIT8 ? decoder.readLeftID() : null, null, (info & binary__namespace.BIT7) === binary__namespace.BIT7 ? decoder.readRightID() : null, cantCopyParentInfo ? decoder.readParentInfo() ? doc.get(decoder.readString()) : decoder.readLeftID() : null, cantCopyParentInfo && (info & binary__namespace.BIT6) === binary__namespace.BIT6 ? decoder.readString() : null, readItemContent(decoder, info) // item content
                        );
                        /* A non-optimized implementation of the above algorithm:

          // The item that was originally to the left of this item.
          const origin = (info & binary.BIT8) === binary.BIT8 ? decoder.readLeftID() : null
          // The item that was originally to the right of this item.
          const rightOrigin = (info & binary.BIT7) === binary.BIT7 ? decoder.readRightID() : null
          const cantCopyParentInfo = (info & (binary.BIT7 | binary.BIT8)) === 0
          const hasParentYKey = cantCopyParentInfo ? decoder.readParentInfo() : false
          // If parent = null and neither left nor right are defined, then we know that `parent` is child of `y`
          // and we read the next string as parentYKey.
          // It indicates how we store/retrieve parent from `y.share`
          // @type {string|null}
          const parentYKey = cantCopyParentInfo && hasParentYKey ? decoder.readString() : null

          const struct = new Item(
            createID(client, clock),
            null, // leftd
            origin, // origin
            null, // right
            rightOrigin, // right origin
            cantCopyParentInfo && !hasParentYKey ? decoder.readLeftID() : (parentYKey !== null ? doc.get(parentYKey) : null), // parent
            cantCopyParentInfo && (info & binary.BIT6) === binary.BIT6 ? decoder.readString() : null, // parentSub
            readItemContent(decoder, info) // item content
          )
          */ refs[i1] = struct;
                        clock += struct.length;
                    }
            }
        }
    // console.log('time to read: ', performance.now() - start) // @todo remove
    }
    return clientRefs;
};
/**
 * Resume computing structs generated by struct readers.
 *
 * While there is something to do, we integrate structs in this order
 * 1. top element on stack, if stack is not empty
 * 2. next element from current struct reader (if empty, use next struct reader)
 *
 * If struct causally depends on another struct (ref.missing), we put next reader of
 * `ref.id.client` on top of stack.
 *
 * At some point we find a struct that has no causal dependencies,
 * then we start emptying the stack.
 *
 * It is not possible to have circles: i.e. struct1 (from client1) depends on struct2 (from client2)
 * depends on struct3 (from client1). Therefore the max stack size is eqaul to `structReaders.length`.
 *
 * This method is implemented in a way so that we can resume computation if this update
 * causally depends on another update.
 *
 * @param {Transaction} transaction
 * @param {StructStore} store
 * @param {Map<number, { i: number, refs: (GC | Item)[] }>} clientsStructRefs
 * @return { null | { update: Uint8Array, missing: Map<number,number> } }
 *
 * @private
 * @function
 */ const integrateStructs = (transaction, store, clientsStructRefs)=>{
    /**
   * @type {Array<Item | GC>}
   */ const stack = [];
    // sort them so that we take the higher id first, in case of conflicts the lower id will probably not conflict with the id from the higher user.
    let clientsStructRefsIds = Array.from(clientsStructRefs.keys()).sort((a, b)=>a - b);
    if (clientsStructRefsIds.length === 0) return null;
    const getNextStructTarget = ()=>{
        if (clientsStructRefsIds.length === 0) return null;
        let nextStructsTarget = /** @type {{i:number,refs:Array<GC|Item>}} */ clientsStructRefs.get(clientsStructRefsIds[clientsStructRefsIds.length - 1]);
        while(nextStructsTarget.refs.length === nextStructsTarget.i){
            clientsStructRefsIds.pop();
            if (clientsStructRefsIds.length > 0) nextStructsTarget = /** @type {{i:number,refs:Array<GC|Item>}} */ clientsStructRefs.get(clientsStructRefsIds[clientsStructRefsIds.length - 1]);
            else return null;
        }
        return nextStructsTarget;
    };
    let curStructsTarget = getNextStructTarget();
    if (curStructsTarget === null && stack.length === 0) return null;
    /**
   * @type {StructStore}
   */ const restStructs = new StructStore();
    const missingSV = new Map();
    /**
   * @param {number} client
   * @param {number} clock
   */ const updateMissingSv = (client, clock)=>{
        const mclock = missingSV.get(client);
        if (mclock == null || mclock > clock) missingSV.set(client, clock);
    };
    /**
   * @type {GC|Item}
   */ let stackHead = /** @type {any} */ curStructsTarget.refs[/** @type {any} */ curStructsTarget.i++];
    // caching the state because it is used very often
    const state = new Map();
    const addStackToRestSS = ()=>{
        for (const item of stack){
            const client = item.id.client;
            const unapplicableItems = clientsStructRefs.get(client);
            if (unapplicableItems) {
                // decrement because we weren't able to apply previous operation
                unapplicableItems.i--;
                restStructs.clients.set(client, unapplicableItems.refs.slice(unapplicableItems.i));
                clientsStructRefs.delete(client);
                unapplicableItems.i = 0;
                unapplicableItems.refs = [];
            } else // item was the last item on clientsStructRefs and the field was already cleared. Add item to restStructs and continue
            restStructs.clients.set(client, [
                item
            ]);
            // remove client from clientsStructRefsIds to prevent users from applying the same update again
            clientsStructRefsIds = clientsStructRefsIds.filter((c)=>c !== client);
        }
        stack.length = 0;
    };
    // iterate over all struct readers until we are done
    while(true){
        if (stackHead.constructor !== Skip) {
            const localClock = map__namespace.setIfUndefined(state, stackHead.id.client, ()=>getState(store, stackHead.id.client));
            const offset = localClock - stackHead.id.clock;
            if (offset < 0) {
                // update from the same client is missing
                stack.push(stackHead);
                updateMissingSv(stackHead.id.client, stackHead.id.clock - 1);
                // hid a dead wall, add all items from stack to restSS
                addStackToRestSS();
            } else {
                const missing = stackHead.getMissing(transaction, store);
                if (missing !== null) {
                    stack.push(stackHead);
                    // get the struct reader that has the missing struct
                    /**
           * @type {{ refs: Array<GC|Item>, i: number }}
           */ const structRefs = clientsStructRefs.get(/** @type {number} */ missing) || {
                        refs: [],
                        i: 0
                    };
                    if (structRefs.refs.length === structRefs.i) {
                        // This update message causally depends on another update message that doesn't exist yet
                        updateMissingSv(/** @type {number} */ missing, getState(store, missing));
                        addStackToRestSS();
                    } else {
                        stackHead = structRefs.refs[structRefs.i++];
                        continue;
                    }
                } else if (offset === 0 || offset < stackHead.length) {
                    // all fine, apply the stackhead
                    stackHead.integrate(transaction, offset);
                    state.set(stackHead.id.client, stackHead.id.clock + stackHead.length);
                }
            }
        }
        // iterate to next stackHead
        if (stack.length > 0) stackHead = /** @type {GC|Item} */ stack.pop();
        else if (curStructsTarget !== null && curStructsTarget.i < curStructsTarget.refs.length) stackHead = /** @type {GC|Item} */ curStructsTarget.refs[curStructsTarget.i++];
        else {
            curStructsTarget = getNextStructTarget();
            if (curStructsTarget === null) break;
            else stackHead = /** @type {GC|Item} */ curStructsTarget.refs[curStructsTarget.i++];
        }
    }
    if (restStructs.clients.size > 0) {
        const encoder = new UpdateEncoderV2();
        writeClientsStructs(encoder, restStructs, new Map());
        // write empty deleteset
        // writeDeleteSet(encoder, new DeleteSet())
        encoding__namespace.writeVarUint(encoder.restEncoder, 0); // => no need for an extra function call, just write 0 deletes
        return {
            missing: missingSV,
            update: encoder.toUint8Array()
        };
    }
    return null;
};
/**
 * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
 * @param {Transaction} transaction
 *
 * @private
 * @function
 */ const writeStructsFromTransaction = (encoder, transaction)=>writeClientsStructs(encoder, transaction.doc.store, transaction.beforeState);
/**
 * Read and apply a document update.
 *
 * This function has the same effect as `applyUpdate` but accepts an decoder.
 *
 * @param {decoding.Decoder} decoder
 * @param {Doc} ydoc
 * @param {any} [transactionOrigin] This will be stored on `transaction.origin` and `.on('update', (update, origin))`
 * @param {UpdateDecoderV1 | UpdateDecoderV2} [structDecoder]
 *
 * @function
 */ const readUpdateV2 = (decoder, ydoc, transactionOrigin, structDecoder = new UpdateDecoderV2(decoder))=>transact(ydoc, (transaction)=>{
        // force that transaction.local is set to non-local
        transaction.local = false;
        let retry = false;
        const doc = transaction.doc;
        const store = doc.store;
        // let start = performance.now()
        const ss = readClientsStructRefs(structDecoder, doc);
        // console.log('time to read structs: ', performance.now() - start) // @todo remove
        // start = performance.now()
        // console.log('time to merge: ', performance.now() - start) // @todo remove
        // start = performance.now()
        const restStructs = integrateStructs(transaction, store, ss);
        const pending = store.pendingStructs;
        if (pending) {
            // check if we can apply something
            for (const [client, clock] of pending.missing)if (clock < getState(store, client)) {
                retry = true;
                break;
            }
            if (restStructs) {
                // merge restStructs into store.pending
                for (const [client1, clock1] of restStructs.missing){
                    const mclock = pending.missing.get(client1);
                    if (mclock == null || mclock > clock1) pending.missing.set(client1, clock1);
                }
                pending.update = mergeUpdatesV2([
                    pending.update,
                    restStructs.update
                ]);
            }
        } else store.pendingStructs = restStructs;
        // console.log('time to integrate: ', performance.now() - start) // @todo remove
        // start = performance.now()
        const dsRest = readAndApplyDeleteSet(structDecoder, transaction, store);
        if (store.pendingDs) {
            // @todo we could make a lower-bound state-vector check as we do above
            const pendingDSUpdate = new UpdateDecoderV2(decoding__namespace.createDecoder(store.pendingDs));
            decoding__namespace.readVarUint(pendingDSUpdate.restDecoder); // read 0 structs, because we only encode deletes in pendingdsupdate
            const dsRest2 = readAndApplyDeleteSet(pendingDSUpdate, transaction, store);
            if (dsRest && dsRest2) // case 1: ds1 != null && ds2 != null
            store.pendingDs = mergeUpdatesV2([
                dsRest,
                dsRest2
            ]);
            else // case 2: ds1 != null
            // case 3: ds2 != null
            // case 4: ds1 == null && ds2 == null
            store.pendingDs = dsRest || dsRest2;
        } else // Either dsRest == null && pendingDs == null OR dsRest != null
        store.pendingDs = dsRest;
        // console.log('time to cleanup: ', performance.now() - start) // @todo remove
        // start = performance.now()
        // console.log('time to resume delete readers: ', performance.now() - start) // @todo remove
        // start = performance.now()
        if (retry) {
            const update = /** @type {{update: Uint8Array}} */ store.pendingStructs.update;
            store.pendingStructs = null;
            applyUpdateV2(transaction.doc, update);
        }
    }, transactionOrigin, false);
/**
 * Read and apply a document update.
 *
 * This function has the same effect as `applyUpdate` but accepts an decoder.
 *
 * @param {decoding.Decoder} decoder
 * @param {Doc} ydoc
 * @param {any} [transactionOrigin] This will be stored on `transaction.origin` and `.on('update', (update, origin))`
 *
 * @function
 */ const readUpdate = (decoder, ydoc, transactionOrigin)=>readUpdateV2(decoder, ydoc, transactionOrigin, new UpdateDecoderV1(decoder));
/**
 * Apply a document update created by, for example, `y.on('update', update => ..)` or `update = encodeStateAsUpdate()`.
 *
 * This function has the same effect as `readUpdate` but accepts an Uint8Array instead of a Decoder.
 *
 * @param {Doc} ydoc
 * @param {Uint8Array} update
 * @param {any} [transactionOrigin] This will be stored on `transaction.origin` and `.on('update', (update, origin))`
 * @param {typeof UpdateDecoderV1 | typeof UpdateDecoderV2} [YDecoder]
 *
 * @function
 */ const applyUpdateV2 = (ydoc, update, transactionOrigin, YDecoder = UpdateDecoderV2)=>{
    const decoder = decoding__namespace.createDecoder(update);
    readUpdateV2(decoder, ydoc, transactionOrigin, new YDecoder(decoder));
};
/**
 * Apply a document update created by, for example, `y.on('update', update => ..)` or `update = encodeStateAsUpdate()`.
 *
 * This function has the same effect as `readUpdate` but accepts an Uint8Array instead of a Decoder.
 *
 * @param {Doc} ydoc
 * @param {Uint8Array} update
 * @param {any} [transactionOrigin] This will be stored on `transaction.origin` and `.on('update', (update, origin))`
 *
 * @function
 */ const applyUpdate = (ydoc, update, transactionOrigin)=>applyUpdateV2(ydoc, update, transactionOrigin, UpdateDecoderV1);
/**
 * Write all the document as a single update message. If you specify the state of the remote client (`targetStateVector`) it will
 * only write the operations that are missing.
 *
 * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
 * @param {Doc} doc
 * @param {Map<number,number>} [targetStateVector] The state of the target that receives the update. Leave empty to write all known structs
 *
 * @function
 */ const writeStateAsUpdate = (encoder, doc, targetStateVector = new Map())=>{
    writeClientsStructs(encoder, doc.store, targetStateVector);
    writeDeleteSet(encoder, createDeleteSetFromStructStore(doc.store));
};
/**
 * Write all the document as a single update message that can be applied on the remote document. If you specify the state of the remote client (`targetState`) it will
 * only write the operations that are missing.
 *
 * Use `writeStateAsUpdate` instead if you are working with lib0/encoding.js#Encoder
 *
 * @param {Doc} doc
 * @param {Uint8Array} [encodedTargetStateVector] The state of the target that receives the update. Leave empty to write all known structs
 * @param {UpdateEncoderV1 | UpdateEncoderV2} [encoder]
 * @return {Uint8Array}
 *
 * @function
 */ const encodeStateAsUpdateV2 = (doc, encodedTargetStateVector = new Uint8Array([
    0
]), encoder = new UpdateEncoderV2())=>{
    const targetStateVector = decodeStateVector(encodedTargetStateVector);
    writeStateAsUpdate(encoder, doc, targetStateVector);
    const updates = [
        encoder.toUint8Array()
    ];
    // also add the pending updates (if there are any)
    if (doc.store.pendingDs) updates.push(doc.store.pendingDs);
    if (doc.store.pendingStructs) updates.push(diffUpdateV2(doc.store.pendingStructs.update, encodedTargetStateVector));
    if (updates.length > 1) {
        if (encoder.constructor === UpdateEncoderV1) return mergeUpdates(updates.map((update, i)=>i === 0 ? update : convertUpdateFormatV2ToV1(update)));
        else if (encoder.constructor === UpdateEncoderV2) return mergeUpdatesV2(updates);
    }
    return updates[0];
};
/**
 * Write all the document as a single update message that can be applied on the remote document. If you specify the state of the remote client (`targetState`) it will
 * only write the operations that are missing.
 *
 * Use `writeStateAsUpdate` instead if you are working with lib0/encoding.js#Encoder
 *
 * @param {Doc} doc
 * @param {Uint8Array} [encodedTargetStateVector] The state of the target that receives the update. Leave empty to write all known structs
 * @return {Uint8Array}
 *
 * @function
 */ const encodeStateAsUpdate = (doc, encodedTargetStateVector)=>encodeStateAsUpdateV2(doc, encodedTargetStateVector, new UpdateEncoderV1());
/**
 * Read state vector from Decoder and return as Map
 *
 * @param {DSDecoderV1 | DSDecoderV2} decoder
 * @return {Map<number,number>} Maps `client` to the number next expected `clock` from that client.
 *
 * @function
 */ const readStateVector = (decoder)=>{
    const ss = new Map();
    const ssLength = decoding__namespace.readVarUint(decoder.restDecoder);
    for(let i = 0; i < ssLength; i++){
        const client = decoding__namespace.readVarUint(decoder.restDecoder);
        const clock = decoding__namespace.readVarUint(decoder.restDecoder);
        ss.set(client, clock);
    }
    return ss;
};
/**
 * Read decodedState and return State as Map.
 *
 * @param {Uint8Array} decodedState
 * @return {Map<number,number>} Maps `client` to the number next expected `clock` from that client.
 *
 * @function
 */ // export const decodeStateVectorV2 = decodedState => readStateVector(new DSDecoderV2(decoding.createDecoder(decodedState)))
/**
 * Read decodedState and return State as Map.
 *
 * @param {Uint8Array} decodedState
 * @return {Map<number,number>} Maps `client` to the number next expected `clock` from that client.
 *
 * @function
 */ const decodeStateVector = (decodedState)=>readStateVector(new DSDecoderV1(decoding__namespace.createDecoder(decodedState)));
/**
 * @param {DSEncoderV1 | DSEncoderV2} encoder
 * @param {Map<number,number>} sv
 * @function
 */ const writeStateVector = (encoder, sv)=>{
    encoding__namespace.writeVarUint(encoder.restEncoder, sv.size);
    Array.from(sv.entries()).sort((a, b)=>b[0] - a[0]).forEach(([client, clock])=>{
        encoding__namespace.writeVarUint(encoder.restEncoder, client); // @todo use a special client decoder that is based on mapping
        encoding__namespace.writeVarUint(encoder.restEncoder, clock);
    });
    return encoder;
};
/**
 * @param {DSEncoderV1 | DSEncoderV2} encoder
 * @param {Doc} doc
 *
 * @function
 */ const writeDocumentStateVector = (encoder, doc)=>writeStateVector(encoder, getStateVector(doc.store));
/**
 * Encode State as Uint8Array.
 *
 * @param {Doc|Map<number,number>} doc
 * @param {DSEncoderV1 | DSEncoderV2} [encoder]
 * @return {Uint8Array}
 *
 * @function
 */ const encodeStateVectorV2 = (doc, encoder = new DSEncoderV2())=>{
    if (doc instanceof Map) writeStateVector(encoder, doc);
    else writeDocumentStateVector(encoder, doc);
    return encoder.toUint8Array();
};
/**
 * Encode State as Uint8Array.
 *
 * @param {Doc|Map<number,number>} doc
 * @return {Uint8Array}
 *
 * @function
 */ const encodeStateVector = (doc)=>encodeStateVectorV2(doc, new DSEncoderV1());
/**
 * General event handler implementation.
 *
 * @template ARG0, ARG1
 *
 * @private
 */ class EventHandler {
    constructor(){
        /**
     * @type {Array<function(ARG0, ARG1):void>}
     */ this.l = [];
    }
}
/**
 * @template ARG0,ARG1
 * @returns {EventHandler<ARG0,ARG1>}
 *
 * @private
 * @function
 */ const createEventHandler = ()=>new EventHandler();
/**
 * Adds an event listener that is called when
 * {@link EventHandler#callEventListeners} is called.
 *
 * @template ARG0,ARG1
 * @param {EventHandler<ARG0,ARG1>} eventHandler
 * @param {function(ARG0,ARG1):void} f The event handler.
 *
 * @private
 * @function
 */ const addEventHandlerListener = (eventHandler, f)=>eventHandler.l.push(f);
/**
 * Removes an event listener.
 *
 * @template ARG0,ARG1
 * @param {EventHandler<ARG0,ARG1>} eventHandler
 * @param {function(ARG0,ARG1):void} f The event handler that was added with
 *                     {@link EventHandler#addEventListener}
 *
 * @private
 * @function
 */ const removeEventHandlerListener = (eventHandler, f)=>{
    const l = eventHandler.l;
    const len = l.length;
    eventHandler.l = l.filter((g)=>f !== g);
    if (len === eventHandler.l.length) console.error("[yjs] Tried to remove event handler that doesn't exist.");
};
/**
 * Call all event listeners that were added via
 * {@link EventHandler#addEventListener}.
 *
 * @template ARG0,ARG1
 * @param {EventHandler<ARG0,ARG1>} eventHandler
 * @param {ARG0} arg0
 * @param {ARG1} arg1
 *
 * @private
 * @function
 */ const callEventHandlerListeners = (eventHandler, arg0, arg1)=>f__namespace.callAll(eventHandler.l, [
        arg0,
        arg1
    ]);
class ID {
    /**
   * @param {number} client client id
   * @param {number} clock unique per client id, continuous number
   */ constructor(client, clock){
        /**
     * Client id
     * @type {number}
     */ this.client = client;
        /**
     * unique per client id, continuous number
     * @type {number}
     */ this.clock = clock;
    }
}
/**
 * @param {ID | null} a
 * @param {ID | null} b
 * @return {boolean}
 *
 * @function
 */ const compareIDs = (a, b)=>a === b || a !== null && b !== null && a.client === b.client && a.clock === b.clock;
/**
 * @param {number} client
 * @param {number} clock
 *
 * @private
 * @function
 */ const createID = (client, clock)=>new ID(client, clock);
/**
 * @param {encoding.Encoder} encoder
 * @param {ID} id
 *
 * @private
 * @function
 */ const writeID = (encoder, id)=>{
    encoding__namespace.writeVarUint(encoder, id.client);
    encoding__namespace.writeVarUint(encoder, id.clock);
};
/**
 * Read ID.
 * * If first varUint read is 0xFFFFFF a RootID is returned.
 * * Otherwise an ID is returned
 *
 * @param {decoding.Decoder} decoder
 * @return {ID}
 *
 * @private
 * @function
 */ const readID = (decoder)=>createID(decoding__namespace.readVarUint(decoder), decoding__namespace.readVarUint(decoder));
/**
 * The top types are mapped from y.share.get(keyname) => type.
 * `type` does not store any information about the `keyname`.
 * This function finds the correct `keyname` for `type` and throws otherwise.
 *
 * @param {AbstractType<any>} type
 * @return {string}
 *
 * @private
 * @function
 */ const findRootTypeKey = (type)=>{
    // @ts-ignore _y must be defined, otherwise unexpected case
    for (const [key, value] of type.doc.share.entries()){
        if (value === type) return key;
    }
    throw error__namespace.unexpectedCase();
};
/**
 * Check if `parent` is a parent of `child`.
 *
 * @param {AbstractType<any>} parent
 * @param {Item|null} child
 * @return {Boolean} Whether `parent` is a parent of `child`.
 *
 * @private
 * @function
 */ const isParentOf = (parent, child)=>{
    while(child !== null){
        if (child.parent === parent) return true;
        child = /** @type {AbstractType<any>} */ child.parent._item;
    }
    return false;
};
/**
 * Convenient helper to log type information.
 *
 * Do not use in productive systems as the output can be immense!
 *
 * @param {AbstractType<any>} type
 */ const logType = (type)=>{
    const res = [];
    let n = type._start;
    while(n){
        res.push(n);
        n = n.right;
    }
    console.log("Children: ", res);
    console.log("Children content: ", res.filter((m)=>!m.deleted).map((m)=>m.content));
};
class PermanentUserData {
    /**
   * @param {Doc} doc
   * @param {YMap<any>} [storeType]
   */ constructor(doc, storeType = doc.getMap("users")){
        /**
     * @type {Map<string,DeleteSet>}
     */ const dss = new Map();
        this.yusers = storeType;
        this.doc = doc;
        /**
     * Maps from clientid to userDescription
     *
     * @type {Map<number,string>}
     */ this.clients = new Map();
        this.dss = dss;
        /**
     * @param {YMap<any>} user
     * @param {string} userDescription
     */ const initUser = (user, userDescription)=>{
            /**
       * @type {YArray<Uint8Array>}
       */ const ds = user.get("ds");
            const ids = user.get("ids");
            const addClientId = /** @param {number} clientid */ (clientid)=>this.clients.set(clientid, userDescription);
            ds.observe(/** @param {YArrayEvent<any>} event */ (event)=>{
                event.changes.added.forEach((item)=>{
                    item.content.getContent().forEach((encodedDs)=>{
                        if (encodedDs instanceof Uint8Array) this.dss.set(userDescription, mergeDeleteSets([
                            this.dss.get(userDescription) || createDeleteSet(),
                            readDeleteSet(new DSDecoderV1(decoding__namespace.createDecoder(encodedDs)))
                        ]));
                    });
                });
            });
            this.dss.set(userDescription, mergeDeleteSets(ds.map((encodedDs)=>readDeleteSet(new DSDecoderV1(decoding__namespace.createDecoder(encodedDs))))));
            ids.observe(/** @param {YArrayEvent<any>} event */ (event)=>event.changes.added.forEach((item)=>item.content.getContent().forEach(addClientId)));
            ids.forEach(addClientId);
        };
        // observe users
        storeType.observe((event)=>{
            event.keysChanged.forEach((userDescription)=>initUser(storeType.get(userDescription), userDescription));
        });
        // add intial data
        storeType.forEach(initUser);
    }
    /**
   * @param {Doc} doc
   * @param {number} clientid
   * @param {string} userDescription
   * @param {Object} [conf]
   * @param {function(Transaction, DeleteSet):boolean} [conf.filter]
   */ setUserMapping(doc, clientid, userDescription, { filter =()=>true  } = {}) {
        const users = this.yusers;
        let user = users.get(userDescription);
        if (!user) {
            user = new YMap();
            user.set("ids", new YArray());
            user.set("ds", new YArray());
            users.set(userDescription, user);
        }
        user.get("ids").push([
            clientid
        ]);
        users.observe((event)=>{
            setTimeout(()=>{
                const userOverwrite = users.get(userDescription);
                if (userOverwrite !== user) {
                    // user was overwritten, port all data over to the next user object
                    // @todo Experiment with Y.Sets here
                    user = userOverwrite;
                    // @todo iterate over old type
                    this.clients.forEach((_userDescription, clientid)=>{
                        if (userDescription === _userDescription) user.get("ids").push([
                            clientid
                        ]);
                    });
                    const encoder = new DSEncoderV1();
                    const ds = this.dss.get(userDescription);
                    if (ds) {
                        writeDeleteSet(encoder, ds);
                        user.get("ds").push([
                            encoder.toUint8Array()
                        ]);
                    }
                }
            }, 0);
        });
        doc.on("afterTransaction", /** @param {Transaction} transaction */ (transaction)=>{
            setTimeout(()=>{
                const yds = user.get("ds");
                const ds = transaction.deleteSet;
                if (transaction.local && ds.clients.size > 0 && filter(transaction, ds)) {
                    const encoder = new DSEncoderV1();
                    writeDeleteSet(encoder, ds);
                    yds.push([
                        encoder.toUint8Array()
                    ]);
                }
            });
        });
    }
    /**
   * @param {number} clientid
   * @return {any}
   */ getUserByClientId(clientid) {
        return this.clients.get(clientid) || null;
    }
    /**
   * @param {ID} id
   * @return {string | null}
   */ getUserByDeletedId(id) {
        for (const [userDescription, ds] of this.dss.entries()){
            if (isDeleted(ds, id)) return userDescription;
        }
        return null;
    }
}
/**
 * A relative position is based on the Yjs model and is not affected by document changes.
 * E.g. If you place a relative position before a certain character, it will always point to this character.
 * If you place a relative position at the end of a type, it will always point to the end of the type.
 *
 * A numeric position is often unsuited for user selections, because it does not change when content is inserted
 * before or after.
 *
 * ```Insert(0, 'x')('a|bc') = 'xa|bc'``` Where | is the relative position.
 *
 * One of the properties must be defined.
 *
 * @example
 *   // Current cursor position is at position 10
 *   const relativePosition = createRelativePositionFromIndex(yText, 10)
 *   // modify yText
 *   yText.insert(0, 'abc')
 *   yText.delete(3, 10)
 *   // Compute the cursor position
 *   const absolutePosition = createAbsolutePositionFromRelativePosition(y, relativePosition)
 *   absolutePosition.type === yText // => true
 *   console.log('cursor location is ' + absolutePosition.index) // => cursor location is 3
 *
 */ class RelativePosition {
    /**
   * @param {ID|null} type
   * @param {string|null} tname
   * @param {ID|null} item
   * @param {number} assoc
   */ constructor(type, tname, item, assoc = 0){
        /**
     * @type {ID|null}
     */ this.type = type;
        /**
     * @type {string|null}
     */ this.tname = tname;
        /**
     * @type {ID | null}
     */ this.item = item;
        /**
     * A relative position is associated to a specific character. By default
     * assoc >= 0, the relative position is associated to the character
     * after the meant position.
     * I.e. position 1 in 'ab' is associated to character 'b'.
     *
     * If assoc < 0, then the relative position is associated to the caharacter
     * before the meant position.
     *
     * @type {number}
     */ this.assoc = assoc;
    }
}
/**
 * @param {RelativePosition} rpos
 * @return {any}
 */ const relativePositionToJSON = (rpos)=>{
    const json = {};
    if (rpos.type) json.type = rpos.type;
    if (rpos.tname) json.tname = rpos.tname;
    if (rpos.item) json.item = rpos.item;
    if (rpos.assoc != null) json.assoc = rpos.assoc;
    return json;
};
/**
 * @param {any} json
 * @return {RelativePosition}
 *
 * @function
 */ const createRelativePositionFromJSON = (json)=>new RelativePosition(json.type == null ? null : createID(json.type.client, json.type.clock), json.tname || null, json.item == null ? null : createID(json.item.client, json.item.clock), json.assoc == null ? 0 : json.assoc);
class AbsolutePosition {
    /**
   * @param {AbstractType<any>} type
   * @param {number} index
   * @param {number} [assoc]
   */ constructor(type, index, assoc = 0){
        /**
     * @type {AbstractType<any>}
     */ this.type = type;
        /**
     * @type {number}
     */ this.index = index;
        this.assoc = assoc;
    }
}
/**
 * @param {AbstractType<any>} type
 * @param {number} index
 * @param {number} [assoc]
 *
 * @function
 */ const createAbsolutePosition = (type, index, assoc = 0)=>new AbsolutePosition(type, index, assoc);
/**
 * @param {AbstractType<any>} type
 * @param {ID|null} item
 * @param {number} [assoc]
 *
 * @function
 */ const createRelativePosition = (type, item, assoc)=>{
    let typeid = null;
    let tname = null;
    if (type._item === null) tname = findRootTypeKey(type);
    else typeid = createID(type._item.id.client, type._item.id.clock);
    return new RelativePosition(typeid, tname, item, assoc);
};
/**
 * Create a relativePosition based on a absolute position.
 *
 * @param {AbstractType<any>} type The base type (e.g. YText or YArray).
 * @param {number} index The absolute position.
 * @param {number} [assoc]
 * @return {RelativePosition}
 *
 * @function
 */ const createRelativePositionFromTypeIndex = (type, index, assoc = 0)=>{
    let t = type._start;
    if (assoc < 0) {
        // associated to the left character or the beginning of a type, increment index if possible.
        if (index === 0) return createRelativePosition(type, null, assoc);
        index--;
    }
    while(t !== null){
        if (!t.deleted && t.countable) {
            if (t.length > index) // case 1: found position somewhere in the linked list
            return createRelativePosition(type, createID(t.id.client, t.id.clock + index), assoc);
            index -= t.length;
        }
        if (t.right === null && assoc < 0) // left-associated position, return last available id
        return createRelativePosition(type, t.lastId, assoc);
        t = t.right;
    }
    return createRelativePosition(type, null, assoc);
};
/**
 * @param {encoding.Encoder} encoder
 * @param {RelativePosition} rpos
 *
 * @function
 */ const writeRelativePosition = (encoder, rpos)=>{
    const { type , tname , item , assoc  } = rpos;
    if (item !== null) {
        encoding__namespace.writeVarUint(encoder, 0);
        writeID(encoder, item);
    } else if (tname !== null) {
        // case 2: found position at the end of the list and type is stored in y.share
        encoding__namespace.writeUint8(encoder, 1);
        encoding__namespace.writeVarString(encoder, tname);
    } else if (type !== null) {
        // case 3: found position at the end of the list and type is attached to an item
        encoding__namespace.writeUint8(encoder, 2);
        writeID(encoder, type);
    } else throw error__namespace.unexpectedCase();
    encoding__namespace.writeVarInt(encoder, assoc);
    return encoder;
};
/**
 * @param {RelativePosition} rpos
 * @return {Uint8Array}
 */ const encodeRelativePosition = (rpos)=>{
    const encoder = encoding__namespace.createEncoder();
    writeRelativePosition(encoder, rpos);
    return encoding__namespace.toUint8Array(encoder);
};
/**
 * @param {decoding.Decoder} decoder
 * @return {RelativePosition}
 *
 * @function
 */ const readRelativePosition = (decoder)=>{
    let type = null;
    let tname = null;
    let itemID = null;
    switch(decoding__namespace.readVarUint(decoder)){
        case 0:
            // case 1: found position somewhere in the linked list
            itemID = readID(decoder);
            break;
        case 1:
            // case 2: found position at the end of the list and type is stored in y.share
            tname = decoding__namespace.readVarString(decoder);
            break;
        case 2:
            // case 3: found position at the end of the list and type is attached to an item
            type = readID(decoder);
    }
    const assoc = decoding__namespace.hasContent(decoder) ? decoding__namespace.readVarInt(decoder) : 0;
    return new RelativePosition(type, tname, itemID, assoc);
};
/**
 * @param {Uint8Array} uint8Array
 * @return {RelativePosition}
 */ const decodeRelativePosition = (uint8Array)=>readRelativePosition(decoding__namespace.createDecoder(uint8Array));
/**
 * @param {RelativePosition} rpos
 * @param {Doc} doc
 * @return {AbsolutePosition|null}
 *
 * @function
 */ const createAbsolutePositionFromRelativePosition = (rpos, doc)=>{
    const store = doc.store;
    const rightID = rpos.item;
    const typeID = rpos.type;
    const tname = rpos.tname;
    const assoc = rpos.assoc;
    let type = null;
    let index = 0;
    if (rightID !== null) {
        if (getState(store, rightID.client) <= rightID.clock) return null;
        const res = followRedone(store, rightID);
        const right = res.item;
        if (!(right instanceof Item)) return null;
        type = /** @type {AbstractType<any>} */ right.parent;
        if (type._item === null || !type._item.deleted) {
            index = right.deleted || !right.countable ? 0 : res.diff + (assoc >= 0 ? 0 : 1); // adjust position based on left association if necessary
            let n = right.left;
            while(n !== null){
                if (!n.deleted && n.countable) index += n.length;
                n = n.left;
            }
        }
    } else {
        if (tname !== null) type = doc.get(tname);
        else if (typeID !== null) {
            if (getState(store, typeID.client) <= typeID.clock) // type does not exist yet
            return null;
            const { item  } = followRedone(store, typeID);
            if (item instanceof Item && item.content instanceof ContentType) type = item.content.type;
            else // struct is garbage collected
            return null;
        } else throw error__namespace.unexpectedCase();
        if (assoc >= 0) index = type._length;
        else index = 0;
    }
    return createAbsolutePosition(type, index, rpos.assoc);
};
/**
 * @param {RelativePosition|null} a
 * @param {RelativePosition|null} b
 * @return {boolean}
 *
 * @function
 */ const compareRelativePositions = (a, b)=>a === b || a !== null && b !== null && a.tname === b.tname && compareIDs(a.item, b.item) && compareIDs(a.type, b.type) && a.assoc === b.assoc;
class Snapshot {
    /**
   * @param {DeleteSet} ds
   * @param {Map<number,number>} sv state map
   */ constructor(ds, sv){
        /**
     * @type {DeleteSet}
     */ this.ds = ds;
        /**
     * State Map
     * @type {Map<number,number>}
     */ this.sv = sv;
    }
}
/**
 * @param {Snapshot} snap1
 * @param {Snapshot} snap2
 * @return {boolean}
 */ const equalSnapshots = (snap1, snap2)=>{
    const ds1 = snap1.ds.clients;
    const ds2 = snap2.ds.clients;
    const sv1 = snap1.sv;
    const sv2 = snap2.sv;
    if (sv1.size !== sv2.size || ds1.size !== ds2.size) return false;
    for (const [key, value] of sv1.entries()){
        if (sv2.get(key) !== value) return false;
    }
    for (const [client, dsitems1] of ds1.entries()){
        const dsitems2 = ds2.get(client) || [];
        if (dsitems1.length !== dsitems2.length) return false;
        for(let i = 0; i < dsitems1.length; i++){
            const dsitem1 = dsitems1[i];
            const dsitem2 = dsitems2[i];
            if (dsitem1.clock !== dsitem2.clock || dsitem1.len !== dsitem2.len) return false;
        }
    }
    return true;
};
/**
 * @param {Snapshot} snapshot
 * @param {DSEncoderV1 | DSEncoderV2} [encoder]
 * @return {Uint8Array}
 */ const encodeSnapshotV2 = (snapshot, encoder = new DSEncoderV2())=>{
    writeDeleteSet(encoder, snapshot.ds);
    writeStateVector(encoder, snapshot.sv);
    return encoder.toUint8Array();
};
/**
 * @param {Snapshot} snapshot
 * @return {Uint8Array}
 */ const encodeSnapshot = (snapshot)=>encodeSnapshotV2(snapshot, new DSEncoderV1());
/**
 * @param {Uint8Array} buf
 * @param {DSDecoderV1 | DSDecoderV2} [decoder]
 * @return {Snapshot}
 */ const decodeSnapshotV2 = (buf, decoder = new DSDecoderV2(decoding__namespace.createDecoder(buf)))=>{
    return new Snapshot(readDeleteSet(decoder), readStateVector(decoder));
};
/**
 * @param {Uint8Array} buf
 * @return {Snapshot}
 */ const decodeSnapshot = (buf)=>decodeSnapshotV2(buf, new DSDecoderV1(decoding__namespace.createDecoder(buf)));
/**
 * @param {DeleteSet} ds
 * @param {Map<number,number>} sm
 * @return {Snapshot}
 */ const createSnapshot = (ds, sm)=>new Snapshot(ds, sm);
const emptySnapshot = createSnapshot(createDeleteSet(), new Map());
/**
 * @param {Doc} doc
 * @return {Snapshot}
 */ const snapshot = (doc)=>createSnapshot(createDeleteSetFromStructStore(doc.store), getStateVector(doc.store));
/**
 * @param {Item} item
 * @param {Snapshot|undefined} snapshot
 *
 * @protected
 * @function
 */ const isVisible = (item, snapshot)=>snapshot === undefined ? !item.deleted : snapshot.sv.has(item.id.client) && (snapshot.sv.get(item.id.client) || 0) > item.id.clock && !isDeleted(snapshot.ds, item.id);
/**
 * @param {Transaction} transaction
 * @param {Snapshot} snapshot
 */ const splitSnapshotAffectedStructs = (transaction, snapshot)=>{
    const meta = map__namespace.setIfUndefined(transaction.meta, splitSnapshotAffectedStructs, set__namespace.create);
    const store = transaction.doc.store;
    // check if we already split for this snapshot
    if (!meta.has(snapshot)) {
        snapshot.sv.forEach((clock, client)=>{
            if (clock < getState(store, client)) getItemCleanStart(transaction, createID(client, clock));
        });
        iterateDeletedStructs(transaction, snapshot.ds, (item)=>{});
        meta.add(snapshot);
    }
};
/**
 * @param {Doc} originDoc
 * @param {Snapshot} snapshot
 * @param {Doc} [newDoc] Optionally, you may define the Yjs document that receives the data from originDoc
 * @return {Doc}
 */ const createDocFromSnapshot = (originDoc, snapshot, newDoc = new Doc())=>{
    if (originDoc.gc) // we should not try to restore a GC-ed document, because some of the restored items might have their content deleted
    throw new Error("originDoc must not be garbage collected");
    const { sv , ds  } = snapshot;
    const encoder = new UpdateEncoderV2();
    originDoc.transact((transaction)=>{
        let size = 0;
        sv.forEach((clock)=>{
            if (clock > 0) size++;
        });
        encoding__namespace.writeVarUint(encoder.restEncoder, size);
        // splitting the structs before writing them to the encoder
        for (const [client, clock] of sv){
            if (clock === 0) continue;
            if (clock < getState(originDoc.store, client)) getItemCleanStart(transaction, createID(client, clock));
            const structs = originDoc.store.clients.get(client) || [];
            const lastStructIndex = findIndexSS(structs, clock - 1);
            // write # encoded structs
            encoding__namespace.writeVarUint(encoder.restEncoder, lastStructIndex + 1);
            encoder.writeClient(client);
            // first clock written is 0
            encoding__namespace.writeVarUint(encoder.restEncoder, 0);
            for(let i = 0; i <= lastStructIndex; i++)structs[i].write(encoder, 0);
        }
        writeDeleteSet(encoder, ds);
    });
    applyUpdateV2(newDoc, encoder.toUint8Array(), "snapshot");
    return newDoc;
};
class StructStore {
    constructor(){
        /**
     * @type {Map<number,Array<GC|Item>>}
     */ this.clients = new Map();
        /**
     * @type {null | { missing: Map<number, number>, update: Uint8Array }}
     */ this.pendingStructs = null;
        /**
     * @type {null | Uint8Array}
     */ this.pendingDs = null;
    }
}
/**
 * Return the states as a Map<client,clock>.
 * Note that clock refers to the next expected clock id.
 *
 * @param {StructStore} store
 * @return {Map<number,number>}
 *
 * @public
 * @function
 */ const getStateVector = (store)=>{
    const sm = new Map();
    store.clients.forEach((structs, client)=>{
        const struct = structs[structs.length - 1];
        sm.set(client, struct.id.clock + struct.length);
    });
    return sm;
};
/**
 * @param {StructStore} store
 * @param {number} client
 * @return {number}
 *
 * @public
 * @function
 */ const getState = (store, client)=>{
    const structs = store.clients.get(client);
    if (structs === undefined) return 0;
    const lastStruct = structs[structs.length - 1];
    return lastStruct.id.clock + lastStruct.length;
};
/**
 * @param {StructStore} store
 * @param {GC|Item} struct
 *
 * @private
 * @function
 */ const addStruct = (store, struct)=>{
    let structs = store.clients.get(struct.id.client);
    if (structs === undefined) {
        structs = [];
        store.clients.set(struct.id.client, structs);
    } else {
        const lastStruct = structs[structs.length - 1];
        if (lastStruct.id.clock + lastStruct.length !== struct.id.clock) throw error__namespace.unexpectedCase();
    }
    structs.push(struct);
};
/**
 * Perform a binary search on a sorted array
 * @param {Array<Item|GC>} structs
 * @param {number} clock
 * @return {number}
 *
 * @private
 * @function
 */ const findIndexSS = (structs, clock)=>{
    let left = 0;
    let right = structs.length - 1;
    let mid = structs[right];
    let midclock = mid.id.clock;
    if (midclock === clock) return right;
    // @todo does it even make sense to pivot the search?
    // If a good split misses, it might actually increase the time to find the correct item.
    // Currently, the only advantage is that search with pivoting might find the item on the first try.
    let midindex = math__namespace.floor(clock / (midclock + mid.length - 1) * right); // pivoting the search
    while(left <= right){
        mid = structs[midindex];
        midclock = mid.id.clock;
        if (midclock <= clock) {
            if (clock < midclock + mid.length) return midindex;
            left = midindex + 1;
        } else right = midindex - 1;
        midindex = math__namespace.floor((left + right) / 2);
    }
    // Always check state before looking for a struct in StructStore
    // Therefore the case of not finding a struct is unexpected
    throw error__namespace.unexpectedCase();
};
/**
 * Expects that id is actually in store. This function throws or is an infinite loop otherwise.
 *
 * @param {StructStore} store
 * @param {ID} id
 * @return {GC|Item}
 *
 * @private
 * @function
 */ const find = (store, id)=>{
    /**
   * @type {Array<GC|Item>}
   */ // @ts-ignore
    const structs = store.clients.get(id.client);
    return structs[findIndexSS(structs, id.clock)];
};
/**
 * Expects that id is actually in store. This function throws or is an infinite loop otherwise.
 * @private
 * @function
 */ const getItem = /** @type {function(StructStore,ID):Item} */ find;
/**
 * @param {Transaction} transaction
 * @param {Array<Item|GC>} structs
 * @param {number} clock
 */ const findIndexCleanStart = (transaction, structs, clock)=>{
    const index = findIndexSS(structs, clock);
    const struct = structs[index];
    if (struct.id.clock < clock && struct instanceof Item) {
        structs.splice(index + 1, 0, splitItem(transaction, struct, clock - struct.id.clock));
        return index + 1;
    }
    return index;
};
/**
 * Expects that id is actually in store. This function throws or is an infinite loop otherwise.
 *
 * @param {Transaction} transaction
 * @param {ID} id
 * @return {Item}
 *
 * @private
 * @function
 */ const getItemCleanStart = (transaction, id)=>{
    const structs = /** @type {Array<Item>} */ transaction.doc.store.clients.get(id.client);
    return structs[findIndexCleanStart(transaction, structs, id.clock)];
};
/**
 * Expects that id is actually in store. This function throws or is an infinite loop otherwise.
 *
 * @param {Transaction} transaction
 * @param {StructStore} store
 * @param {ID} id
 * @return {Item}
 *
 * @private
 * @function
 */ const getItemCleanEnd = (transaction, store, id)=>{
    /**
   * @type {Array<Item>}
   */ // @ts-ignore
    const structs = store.clients.get(id.client);
    const index = findIndexSS(structs, id.clock);
    const struct = structs[index];
    if (id.clock !== struct.id.clock + struct.length - 1 && struct.constructor !== GC) structs.splice(index + 1, 0, splitItem(transaction, struct, id.clock - struct.id.clock + 1));
    return struct;
};
/**
 * Replace `item` with `newitem` in store
 * @param {StructStore} store
 * @param {GC|Item} struct
 * @param {GC|Item} newStruct
 *
 * @private
 * @function
 */ const replaceStruct = (store, struct, newStruct)=>{
    const structs = /** @type {Array<GC|Item>} */ store.clients.get(struct.id.client);
    structs[findIndexSS(structs, struct.id.clock)] = newStruct;
};
/**
 * Iterate over a range of structs
 *
 * @param {Transaction} transaction
 * @param {Array<Item|GC>} structs
 * @param {number} clockStart Inclusive start
 * @param {number} len
 * @param {function(GC|Item):void} f
 *
 * @function
 */ const iterateStructs = (transaction, structs, clockStart, len, f)=>{
    if (len === 0) return;
    const clockEnd = clockStart + len;
    let index = findIndexCleanStart(transaction, structs, clockStart);
    let struct;
    do {
        struct = structs[index++];
        if (clockEnd < struct.id.clock + struct.length) findIndexCleanStart(transaction, structs, clockEnd);
        f(struct);
    }while (index < structs.length && structs[index].id.clock < clockEnd);
};
/**
 * A transaction is created for every change on the Yjs model. It is possible
 * to bundle changes on the Yjs model in a single transaction to
 * minimize the number on messages sent and the number of observer calls.
 * If possible the user of this library should bundle as many changes as
 * possible. Here is an example to illustrate the advantages of bundling:
 *
 * @example
 * const map = y.define('map', YMap)
 * // Log content when change is triggered
 * map.observe(() => {
 *   console.log('change triggered')
 * })
 * // Each change on the map type triggers a log message:
 * map.set('a', 0) // => "change triggered"
 * map.set('b', 0) // => "change triggered"
 * // When put in a transaction, it will trigger the log after the transaction:
 * y.transact(() => {
 *   map.set('a', 1)
 *   map.set('b', 1)
 * }) // => "change triggered"
 *
 * @public
 */ class Transaction {
    /**
   * @param {Doc} doc
   * @param {any} origin
   * @param {boolean} local
   */ constructor(doc, origin, local){
        /**
     * The Yjs instance.
     * @type {Doc}
     */ this.doc = doc;
        /**
     * Describes the set of deleted items by ids
     * @type {DeleteSet}
     */ this.deleteSet = new DeleteSet();
        /**
     * Holds the state before the transaction started.
     * @type {Map<Number,Number>}
     */ this.beforeState = getStateVector(doc.store);
        /**
     * Holds the state after the transaction.
     * @type {Map<Number,Number>}
     */ this.afterState = new Map();
        /**
     * All types that were directly modified (property added or child
     * inserted/deleted). New types are not included in this Set.
     * Maps from type to parentSubs (`item.parentSub = null` for YArray)
     * @type {Map<AbstractType<YEvent<any>>,Set<String|null>>}
     */ this.changed = new Map();
        /**
     * Stores the events for the types that observe also child elements.
     * It is mainly used by `observeDeep`.
     * @type {Map<AbstractType<YEvent<any>>,Array<YEvent<any>>>}
     */ this.changedParentTypes = new Map();
        /**
     * @type {Array<AbstractStruct>}
     */ this._mergeStructs = [];
        /**
     * @type {any}
     */ this.origin = origin;
        /**
     * Stores meta information on the transaction
     * @type {Map<any,any>}
     */ this.meta = new Map();
        /**
     * Whether this change originates from this doc.
     * @type {boolean}
     */ this.local = local;
        /**
     * @type {Set<Doc>}
     */ this.subdocsAdded = new Set();
        /**
     * @type {Set<Doc>}
     */ this.subdocsRemoved = new Set();
        /**
     * @type {Set<Doc>}
     */ this.subdocsLoaded = new Set();
    }
}
/**
 * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
 * @param {Transaction} transaction
 * @return {boolean} Whether data was written.
 */ const writeUpdateMessageFromTransaction = (encoder, transaction)=>{
    if (transaction.deleteSet.clients.size === 0 && !map__namespace.any(transaction.afterState, (clock, client)=>transaction.beforeState.get(client) !== clock)) return false;
    sortAndMergeDeleteSet(transaction.deleteSet);
    writeStructsFromTransaction(encoder, transaction);
    writeDeleteSet(encoder, transaction.deleteSet);
    return true;
};
/**
 * If `type.parent` was added in current transaction, `type` technically
 * did not change, it was just added and we should not fire events for `type`.
 *
 * @param {Transaction} transaction
 * @param {AbstractType<YEvent<any>>} type
 * @param {string|null} parentSub
 */ const addChangedTypeToTransaction = (transaction, type, parentSub)=>{
    const item = type._item;
    if (item === null || item.id.clock < (transaction.beforeState.get(item.id.client) || 0) && !item.deleted) map__namespace.setIfUndefined(transaction.changed, type, set__namespace.create).add(parentSub);
};
/**
 * @param {Array<AbstractStruct>} structs
 * @param {number} pos
 */ const tryToMergeWithLeft = (structs, pos)=>{
    const left = structs[pos - 1];
    const right = structs[pos];
    if (left.deleted === right.deleted && left.constructor === right.constructor) {
        if (left.mergeWith(right)) {
            structs.splice(pos, 1);
            if (right instanceof Item && right.parentSub !== null && /** @type {AbstractType<any>} */ right.parent._map.get(right.parentSub) === right) /** @type {AbstractType<any>} */ right.parent._map.set(right.parentSub, /** @type {Item} */ left);
        }
    }
};
/**
 * @param {DeleteSet} ds
 * @param {StructStore} store
 * @param {function(Item):boolean} gcFilter
 */ const tryGcDeleteSet = (ds, store, gcFilter)=>{
    for (const [client, deleteItems] of ds.clients.entries()){
        const structs = /** @type {Array<GC|Item>} */ store.clients.get(client);
        for(let di = deleteItems.length - 1; di >= 0; di--){
            const deleteItem = deleteItems[di];
            const endDeleteItemClock = deleteItem.clock + deleteItem.len;
            for(let si = findIndexSS(structs, deleteItem.clock), struct = structs[si]; si < structs.length && struct.id.clock < endDeleteItemClock; struct = structs[++si]){
                const struct1 = structs[si];
                if (deleteItem.clock + deleteItem.len <= struct1.id.clock) break;
                if (struct1 instanceof Item && struct1.deleted && !struct1.keep && gcFilter(struct1)) struct1.gc(store, false);
            }
        }
    }
};
/**
 * @param {DeleteSet} ds
 * @param {StructStore} store
 */ const tryMergeDeleteSet = (ds, store)=>{
    // try to merge deleted / gc'd items
    // merge from right to left for better efficiecy and so we don't miss any merge targets
    ds.clients.forEach((deleteItems, client)=>{
        const structs = /** @type {Array<GC|Item>} */ store.clients.get(client);
        for(let di = deleteItems.length - 1; di >= 0; di--){
            const deleteItem = deleteItems[di];
            // start with merging the item next to the last deleted item
            const mostRightIndexToCheck = math__namespace.min(structs.length - 1, 1 + findIndexSS(structs, deleteItem.clock + deleteItem.len - 1));
            for(let si = mostRightIndexToCheck, struct = structs[si]; si > 0 && struct.id.clock >= deleteItem.clock; struct = structs[--si])tryToMergeWithLeft(structs, si);
        }
    });
};
/**
 * @param {DeleteSet} ds
 * @param {StructStore} store
 * @param {function(Item):boolean} gcFilter
 */ const tryGc = (ds, store, gcFilter)=>{
    tryGcDeleteSet(ds, store, gcFilter);
    tryMergeDeleteSet(ds, store);
};
/**
 * @param {Array<Transaction>} transactionCleanups
 * @param {number} i
 */ const cleanupTransactions = (transactionCleanups, i)=>{
    if (i < transactionCleanups.length) {
        const transaction = transactionCleanups[i];
        const doc = transaction.doc;
        const store = doc.store;
        const ds = transaction.deleteSet;
        const mergeStructs = transaction._mergeStructs;
        try {
            sortAndMergeDeleteSet(ds);
            transaction.afterState = getStateVector(transaction.doc.store);
            doc.emit("beforeObserverCalls", [
                transaction,
                doc
            ]);
            /**
       * An array of event callbacks.
       *
       * Each callback is called even if the other ones throw errors.
       *
       * @type {Array<function():void>}
       */ const fs = [];
            // observe events on changed types
            transaction.changed.forEach((subs, itemtype)=>fs.push(()=>{
                    if (itemtype._item === null || !itemtype._item.deleted) itemtype._callObserver(transaction, subs);
                }));
            fs.push(()=>{
                // deep observe events
                transaction.changedParentTypes.forEach((events, type)=>fs.push(()=>{
                        // We need to think about the possibility that the user transforms the
                        // Y.Doc in the event.
                        if (type._item === null || !type._item.deleted) {
                            events = events.filter((event)=>event.target._item === null || !event.target._item.deleted);
                            events.forEach((event)=>{
                                event.currentTarget = type;
                            });
                            // sort events by path length so that top-level events are fired first.
                            events.sort((event1, event2)=>event1.path.length - event2.path.length);
                            // We don't need to check for events.length
                            // because we know it has at least one element
                            callEventHandlerListeners(type._dEH, events, transaction);
                        }
                    }));
                fs.push(()=>doc.emit("afterTransaction", [
                        transaction,
                        doc
                    ]));
            });
            f.callAll(fs, []);
        } finally{
            // Replace deleted items with ItemDeleted / GC.
            // This is where content is actually remove from the Yjs Doc.
            if (doc.gc) tryGcDeleteSet(ds, store, doc.gcFilter);
            tryMergeDeleteSet(ds, store);
            // on all affected store.clients props, try to merge
            transaction.afterState.forEach((clock, client)=>{
                const beforeClock = transaction.beforeState.get(client) || 0;
                if (beforeClock !== clock) {
                    const structs = /** @type {Array<GC|Item>} */ store.clients.get(client);
                    // we iterate from right to left so we can safely remove entries
                    const firstChangePos = math__namespace.max(findIndexSS(structs, beforeClock), 1);
                    for(let i = structs.length - 1; i >= firstChangePos; i--)tryToMergeWithLeft(structs, i);
                }
            });
            // try to merge mergeStructs
            // @todo: it makes more sense to transform mergeStructs to a DS, sort it, and merge from right to left
            //        but at the moment DS does not handle duplicates
            for(let i1 = 0; i1 < mergeStructs.length; i1++){
                const { client , clock  } = mergeStructs[i1].id;
                const structs = /** @type {Array<GC|Item>} */ store.clients.get(client);
                const replacedStructPos = findIndexSS(structs, clock);
                if (replacedStructPos + 1 < structs.length) tryToMergeWithLeft(structs, replacedStructPos + 1);
                if (replacedStructPos > 0) tryToMergeWithLeft(structs, replacedStructPos);
            }
            if (!transaction.local && transaction.afterState.get(doc.clientID) !== transaction.beforeState.get(doc.clientID)) {
                logging__namespace.print(logging__namespace.ORANGE, logging__namespace.BOLD, "[yjs] ", logging__namespace.UNBOLD, logging__namespace.RED, "Changed the client-id because another client seems to be using it.");
                doc.clientID = generateNewClientId();
            }
            // @todo Merge all the transactions into one and provide send the data as a single update message
            doc.emit("afterTransactionCleanup", [
                transaction,
                doc
            ]);
            if (doc._observers.has("update")) {
                const encoder = new UpdateEncoderV1();
                const hasContent = writeUpdateMessageFromTransaction(encoder, transaction);
                if (hasContent) doc.emit("update", [
                    encoder.toUint8Array(),
                    transaction.origin,
                    doc,
                    transaction
                ]);
            }
            if (doc._observers.has("updateV2")) {
                const encoder1 = new UpdateEncoderV2();
                const hasContent1 = writeUpdateMessageFromTransaction(encoder1, transaction);
                if (hasContent1) doc.emit("updateV2", [
                    encoder1.toUint8Array(),
                    transaction.origin,
                    doc,
                    transaction
                ]);
            }
            const { subdocsAdded , subdocsLoaded , subdocsRemoved  } = transaction;
            if (subdocsAdded.size > 0 || subdocsRemoved.size > 0 || subdocsLoaded.size > 0) {
                subdocsAdded.forEach((subdoc)=>{
                    subdoc.clientID = doc.clientID;
                    if (subdoc.collectionid == null) subdoc.collectionid = doc.collectionid;
                    doc.subdocs.add(subdoc);
                });
                subdocsRemoved.forEach((subdoc)=>doc.subdocs.delete(subdoc));
                doc.emit("subdocs", [
                    {
                        loaded: subdocsLoaded,
                        added: subdocsAdded,
                        removed: subdocsRemoved
                    },
                    doc,
                    transaction
                ]);
                subdocsRemoved.forEach((subdoc)=>subdoc.destroy());
            }
            if (transactionCleanups.length <= i + 1) {
                doc._transactionCleanups = [];
                doc.emit("afterAllTransactions", [
                    doc,
                    transactionCleanups
                ]);
            } else cleanupTransactions(transactionCleanups, i + 1);
        }
    }
};
/**
 * Implements the functionality of `y.transact(()=>{..})`
 *
 * @param {Doc} doc
 * @param {function(Transaction):void} f
 * @param {any} [origin=true]
 *
 * @function
 */ const transact = (doc, f, origin = null, local = true)=>{
    const transactionCleanups = doc._transactionCleanups;
    let initialCall = false;
    if (doc._transaction === null) {
        initialCall = true;
        doc._transaction = new Transaction(doc, origin, local);
        transactionCleanups.push(doc._transaction);
        if (transactionCleanups.length === 1) doc.emit("beforeAllTransactions", [
            doc
        ]);
        doc.emit("beforeTransaction", [
            doc._transaction,
            doc
        ]);
    }
    try {
        f(doc._transaction);
    } finally{
        if (initialCall) {
            const finishCleanup = doc._transaction === transactionCleanups[0];
            doc._transaction = null;
            if (finishCleanup) // The first transaction ended, now process observer calls.
            // Observer call may create new transactions for which we need to call the observers and do cleanup.
            // We don't want to nest these calls, so we execute these calls one after
            // another.
            // Also we need to ensure that all cleanups are called, even if the
            // observes throw errors.
            // This file is full of hacky try {} finally {} blocks to ensure that an
            // event can throw errors and also that the cleanup is called.
            cleanupTransactions(transactionCleanups, 0);
        }
    }
};
class StackItem {
    /**
   * @param {DeleteSet} deletions
   * @param {DeleteSet} insertions
   */ constructor(deletions, insertions){
        this.insertions = insertions;
        this.deletions = deletions;
        /**
     * Use this to save and restore metadata like selection range
     */ this.meta = new Map();
    }
}
/**
 * @param {Transaction} tr
 * @param {UndoManager} um
 * @param {StackItem} stackItem
 */ const clearUndoManagerStackItem = (tr, um, stackItem)=>{
    iterateDeletedStructs(tr, stackItem.deletions, (item)=>{
        if (item instanceof Item && um.scope.some((type)=>isParentOf(type, item))) keepItem(item, false);
    });
};
/**
 * @param {UndoManager} undoManager
 * @param {Array<StackItem>} stack
 * @param {string} eventType
 * @return {StackItem?}
 */ const popStackItem = (undoManager, stack, eventType)=>{
    /**
   * Whether a change happened
   * @type {StackItem?}
   */ let result = null;
    /**
   * Keep a reference to the transaction so we can fire the event with the changedParentTypes
   * @type {any}
   */ let _tr = null;
    const doc = undoManager.doc;
    const scope = undoManager.scope;
    transact(doc, (transaction)=>{
        while(stack.length > 0 && result === null){
            const store = doc.store;
            const stackItem = /** @type {StackItem} */ stack.pop();
            /**
       * @type {Set<Item>}
       */ const itemsToRedo = new Set();
            /**
       * @type {Array<Item>}
       */ const itemsToDelete = [];
            let performedChange = false;
            iterateDeletedStructs(transaction, stackItem.insertions, (struct)=>{
                if (struct instanceof Item) {
                    if (struct.redone !== null) {
                        let { item , diff  } = followRedone(store, struct.id);
                        if (diff > 0) item = getItemCleanStart(transaction, createID(item.id.client, item.id.clock + diff));
                        struct = item;
                    }
                    if (!struct.deleted && scope.some((type)=>isParentOf(type, /** @type {Item} */ struct))) itemsToDelete.push(struct);
                }
            });
            iterateDeletedStructs(transaction, stackItem.deletions, (struct)=>{
                if (struct instanceof Item && scope.some((type)=>isParentOf(type, struct)) && // Never redo structs in stackItem.insertions because they were created and deleted in the same capture interval.
                !isDeleted(stackItem.insertions, struct.id)) itemsToRedo.add(struct);
            });
            itemsToRedo.forEach((struct)=>{
                performedChange = redoItem(transaction, struct, itemsToRedo, stackItem.insertions, undoManager.ignoreRemoteMapChanges) !== null || performedChange;
            });
            // We want to delete in reverse order so that children are deleted before
            // parents, so we have more information available when items are filtered.
            for(let i = itemsToDelete.length - 1; i >= 0; i--){
                const item = itemsToDelete[i];
                if (undoManager.deleteFilter(item)) {
                    item.delete(transaction);
                    performedChange = true;
                }
            }
            result = performedChange ? stackItem : null;
        }
        transaction.changed.forEach((subProps, type)=>{
            // destroy search marker if necessary
            if (subProps.has(null) && type._searchMarker) type._searchMarker.length = 0;
        });
        _tr = transaction;
    }, undoManager);
    if (result != null) {
        const changedParentTypes = _tr.changedParentTypes;
        undoManager.emit("stack-item-popped", [
            {
                stackItem: result,
                type: eventType,
                changedParentTypes
            },
            undoManager
        ]);
    }
    return result;
};
/**
 * @typedef {Object} UndoManagerOptions
 * @property {number} [UndoManagerOptions.captureTimeout=500]
 * @property {function(Transaction):boolean} [UndoManagerOptions.captureTransaction] Do not capture changes of a Transaction if result false.
 * @property {function(Item):boolean} [UndoManagerOptions.deleteFilter=()=>true] Sometimes
 * it is necessary to filter what an Undo/Redo operation can delete. If this
 * filter returns false, the type/item won't be deleted even it is in the
 * undo/redo scope.
 * @property {Set<any>} [UndoManagerOptions.trackedOrigins=new Set([null])]
 * @property {boolean} [ignoreRemoteMapChanges] Experimental. By default, the UndoManager will never overwrite remote changes. Enable this property to enable overwriting remote changes on key-value changes (Y.Map, properties on Y.Xml, etc..).
 * @property {Doc} [doc] The document that this UndoManager operates on. Only needed if typeScope is empty.
 */ /**
 * Fires 'stack-item-added' event when a stack item was added to either the undo- or
 * the redo-stack. You may store additional stack information via the
 * metadata property on `event.stackItem.meta` (it is a `Map` of metadata properties).
 * Fires 'stack-item-popped' event when a stack item was popped from either the
 * undo- or the redo-stack. You may restore the saved stack information from `event.stackItem.meta`.
 *
 * @extends {Observable<'stack-item-added'|'stack-item-popped'|'stack-cleared'|'stack-item-updated'>}
 */ class UndoManager extends observable.Observable {
    /**
   * @param {AbstractType<any>|Array<AbstractType<any>>} typeScope Accepts either a single type, or an array of types
   * @param {UndoManagerOptions} options
   */ constructor(typeScope, { captureTimeout =500 , captureTransaction =(tr)=>true , deleteFilter =()=>true , trackedOrigins =new Set([
        null
    ]) , ignoreRemoteMapChanges =false , doc =/** @type {Doc} */ array__namespace.isArray(typeScope) ? typeScope[0].doc : typeScope.doc  } = {}){
        super();
        /**
     * @type {Array<AbstractType<any>>}
     */ this.scope = [];
        this.addToScope(typeScope);
        this.deleteFilter = deleteFilter;
        trackedOrigins.add(this);
        this.trackedOrigins = trackedOrigins;
        this.captureTransaction = captureTransaction;
        /**
     * @type {Array<StackItem>}
     */ this.undoStack = [];
        /**
     * @type {Array<StackItem>}
     */ this.redoStack = [];
        /**
     * Whether the client is currently undoing (calling UndoManager.undo)
     *
     * @type {boolean}
     */ this.undoing = false;
        this.redoing = false;
        this.doc = doc;
        this.lastChange = 0;
        this.ignoreRemoteMapChanges = ignoreRemoteMapChanges;
        this.captureTimeout = captureTimeout;
        /**
     * @param {Transaction} transaction
     */ this.afterTransactionHandler = (transaction)=>{
            // Only track certain transactions
            if (!this.captureTransaction(transaction) || !this.scope.some((type)=>transaction.changedParentTypes.has(type)) || !this.trackedOrigins.has(transaction.origin) && (!transaction.origin || !this.trackedOrigins.has(transaction.origin.constructor))) return;
            const undoing = this.undoing;
            const redoing = this.redoing;
            const stack = undoing ? this.redoStack : this.undoStack;
            if (undoing) this.stopCapturing(); // next undo should not be appended to last stack item
            else if (!redoing) // neither undoing nor redoing: delete redoStack
            this.clear(false, true);
            const insertions = new DeleteSet();
            transaction.afterState.forEach((endClock, client)=>{
                const startClock = transaction.beforeState.get(client) || 0;
                const len = endClock - startClock;
                if (len > 0) addToDeleteSet(insertions, client, startClock, len);
            });
            const now = time__namespace.getUnixTime();
            let didAdd = false;
            if (this.lastChange > 0 && now - this.lastChange < this.captureTimeout && stack.length > 0 && !undoing && !redoing) {
                // append change to last stack op
                const lastOp = stack[stack.length - 1];
                lastOp.deletions = mergeDeleteSets([
                    lastOp.deletions,
                    transaction.deleteSet
                ]);
                lastOp.insertions = mergeDeleteSets([
                    lastOp.insertions,
                    insertions
                ]);
            } else {
                // create a new stack op
                stack.push(new StackItem(transaction.deleteSet, insertions));
                didAdd = true;
            }
            if (!undoing && !redoing) this.lastChange = now;
            // make sure that deleted structs are not gc'd
            iterateDeletedStructs(transaction, transaction.deleteSet, /** @param {Item|GC} item */ (item)=>{
                if (item instanceof Item && this.scope.some((type)=>isParentOf(type, item))) keepItem(item, true);
            });
            const changeEvent = [
                {
                    stackItem: stack[stack.length - 1],
                    origin: transaction.origin,
                    type: undoing ? "redo" : "undo",
                    changedParentTypes: transaction.changedParentTypes
                },
                this
            ];
            if (didAdd) this.emit("stack-item-added", changeEvent);
            else this.emit("stack-item-updated", changeEvent);
        };
        this.doc.on("afterTransaction", this.afterTransactionHandler);
        this.doc.on("destroy", ()=>{
            this.destroy();
        });
    }
    /**
   * @param {Array<AbstractType<any>> | AbstractType<any>} ytypes
   */ addToScope(ytypes) {
        ytypes = array__namespace.isArray(ytypes) ? ytypes : [
            ytypes
        ];
        ytypes.forEach((ytype)=>{
            if (this.scope.every((yt)=>yt !== ytype)) this.scope.push(ytype);
        });
    }
    /**
   * @param {any} origin
   */ addTrackedOrigin(origin) {
        this.trackedOrigins.add(origin);
    }
    /**
   * @param {any} origin
   */ removeTrackedOrigin(origin) {
        this.trackedOrigins.delete(origin);
    }
    clear(clearUndoStack = true, clearRedoStack = true) {
        if (clearUndoStack && this.canUndo() || clearRedoStack && this.canRedo()) this.doc.transact((tr)=>{
            if (clearUndoStack) {
                this.undoStack.forEach((item)=>clearUndoManagerStackItem(tr, this, item));
                this.undoStack = [];
            }
            if (clearRedoStack) {
                this.redoStack.forEach((item)=>clearUndoManagerStackItem(tr, this, item));
                this.redoStack = [];
            }
            this.emit("stack-cleared", [
                {
                    undoStackCleared: clearUndoStack,
                    redoStackCleared: clearRedoStack
                }
            ]);
        });
    }
    /**
   * UndoManager merges Undo-StackItem if they are created within time-gap
   * smaller than `options.captureTimeout`. Call `um.stopCapturing()` so that the next
   * StackItem won't be merged.
   *
   *
   * @example
   *     // without stopCapturing
   *     ytext.insert(0, 'a')
   *     ytext.insert(1, 'b')
   *     um.undo()
   *     ytext.toString() // => '' (note that 'ab' was removed)
   *     // with stopCapturing
   *     ytext.insert(0, 'a')
   *     um.stopCapturing()
   *     ytext.insert(0, 'b')
   *     um.undo()
   *     ytext.toString() // => 'a' (note that only 'b' was removed)
   *
   */ stopCapturing() {
        this.lastChange = 0;
    }
    /**
   * Undo last changes on type.
   *
   * @return {StackItem?} Returns StackItem if a change was applied
   */ undo() {
        this.undoing = true;
        let res;
        try {
            res = popStackItem(this, this.undoStack, "undo");
        } finally{
            this.undoing = false;
        }
        return res;
    }
    /**
   * Redo last undo operation.
   *
   * @return {StackItem?} Returns StackItem if a change was applied
   */ redo() {
        this.redoing = true;
        let res;
        try {
            res = popStackItem(this, this.redoStack, "redo");
        } finally{
            this.redoing = false;
        }
        return res;
    }
    /**
   * Are undo steps available?
   *
   * @return {boolean} `true` if undo is possible
   */ canUndo() {
        return this.undoStack.length > 0;
    }
    /**
   * Are redo steps available?
   *
   * @return {boolean} `true` if redo is possible
   */ canRedo() {
        return this.redoStack.length > 0;
    }
    destroy() {
        this.trackedOrigins.delete(this);
        this.doc.off("afterTransaction", this.afterTransactionHandler);
        super.destroy();
    }
}
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 */ function* lazyStructReaderGenerator(decoder) {
    const numOfStateUpdates = decoding__namespace.readVarUint(decoder.restDecoder);
    for(let i = 0; i < numOfStateUpdates; i++){
        const numberOfStructs = decoding__namespace.readVarUint(decoder.restDecoder);
        const client = decoder.readClient();
        let clock = decoding__namespace.readVarUint(decoder.restDecoder);
        for(let i1 = 0; i1 < numberOfStructs; i1++){
            const info = decoder.readInfo();
            // @todo use switch instead of ifs
            if (info === 10) {
                const len = decoding__namespace.readVarUint(decoder.restDecoder);
                yield new Skip(createID(client, clock), len);
                clock += len;
            } else if ((binary__namespace.BITS5 & info) !== 0) {
                const cantCopyParentInfo = (info & (binary__namespace.BIT7 | binary__namespace.BIT8)) === 0;
                // If parent = null and neither left nor right are defined, then we know that `parent` is child of `y`
                // and we read the next string as parentYKey.
                // It indicates how we store/retrieve parent from `y.share`
                // @type {string|null}
                const struct = new Item(createID(client, clock), null, (info & binary__namespace.BIT8) === binary__namespace.BIT8 ? decoder.readLeftID() : null, null, (info & binary__namespace.BIT7) === binary__namespace.BIT7 ? decoder.readRightID() : null, // @ts-ignore Force writing a string here.
                cantCopyParentInfo ? decoder.readParentInfo() ? decoder.readString() : decoder.readLeftID() : null, cantCopyParentInfo && (info & binary__namespace.BIT6) === binary__namespace.BIT6 ? decoder.readString() : null, readItemContent(decoder, info) // item content
                );
                yield struct;
                clock += struct.length;
            } else {
                const len1 = decoder.readLen();
                yield new GC(createID(client, clock), len1);
                clock += len1;
            }
        }
    }
}
class LazyStructReader {
    /**
   * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
   * @param {boolean} filterSkips
   */ constructor(decoder, filterSkips){
        this.gen = lazyStructReaderGenerator(decoder);
        /**
     * @type {null | Item | Skip | GC}
     */ this.curr = null;
        this.done = false;
        this.filterSkips = filterSkips;
        this.next();
    }
    /**
   * @return {Item | GC | Skip |null}
   */ next() {
        // ignore "Skip" structs
        do this.curr = this.gen.next().value || null;
        while (this.filterSkips && this.curr !== null && this.curr.constructor === Skip);
        return this.curr;
    }
}
/**
 * @param {Uint8Array} update
 *
 */ const logUpdate = (update)=>logUpdateV2(update, UpdateDecoderV1);
/**
 * @param {Uint8Array} update
 * @param {typeof UpdateDecoderV2 | typeof UpdateDecoderV1} [YDecoder]
 *
 */ const logUpdateV2 = (update, YDecoder = UpdateDecoderV2)=>{
    const structs = [];
    const updateDecoder = new YDecoder(decoding__namespace.createDecoder(update));
    const lazyDecoder = new LazyStructReader(updateDecoder, false);
    for(let curr = lazyDecoder.curr; curr !== null; curr = lazyDecoder.next())structs.push(curr);
    logging__namespace.print("Structs: ", structs);
    const ds = readDeleteSet(updateDecoder);
    logging__namespace.print("DeleteSet: ", ds);
};
/**
 * @param {Uint8Array} update
 *
 */ const decodeUpdate = (update)=>decodeUpdateV2(update, UpdateDecoderV1);
/**
 * @param {Uint8Array} update
 * @param {typeof UpdateDecoderV2 | typeof UpdateDecoderV1} [YDecoder]
 *
 */ const decodeUpdateV2 = (update, YDecoder = UpdateDecoderV2)=>{
    const structs = [];
    const updateDecoder = new YDecoder(decoding__namespace.createDecoder(update));
    const lazyDecoder = new LazyStructReader(updateDecoder, false);
    for(let curr = lazyDecoder.curr; curr !== null; curr = lazyDecoder.next())structs.push(curr);
    return {
        structs,
        ds: readDeleteSet(updateDecoder)
    };
};
class LazyStructWriter {
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */ constructor(encoder){
        this.currClient = 0;
        this.startClock = 0;
        this.written = 0;
        this.encoder = encoder;
        /**
     * We want to write operations lazily, but also we need to know beforehand how many operations we want to write for each client.
     *
     * This kind of meta-information (#clients, #structs-per-client-written) is written to the restEncoder.
     *
     * We fragment the restEncoder and store a slice of it per-client until we know how many clients there are.
     * When we flush (toUint8Array) we write the restEncoder using the fragments and the meta-information.
     *
     * @type {Array<{ written: number, restEncoder: Uint8Array }>}
     */ this.clientStructs = [];
    }
}
/**
 * @param {Array<Uint8Array>} updates
 * @return {Uint8Array}
 */ const mergeUpdates = (updates)=>mergeUpdatesV2(updates, UpdateDecoderV1, UpdateEncoderV1);
/**
 * @param {Uint8Array} update
 * @param {typeof DSEncoderV1 | typeof DSEncoderV2} YEncoder
 * @param {typeof UpdateDecoderV1 | typeof UpdateDecoderV2} YDecoder
 * @return {Uint8Array}
 */ const encodeStateVectorFromUpdateV2 = (update, YEncoder = DSEncoderV2, YDecoder = UpdateDecoderV2)=>{
    const encoder = new YEncoder();
    const updateDecoder = new LazyStructReader(new YDecoder(decoding__namespace.createDecoder(update)), false);
    let curr = updateDecoder.curr;
    if (curr !== null) {
        let size = 0;
        let currClient = curr.id.client;
        let stopCounting = curr.id.clock !== 0; // must start at 0
        let currClock = stopCounting ? 0 : curr.id.clock + curr.length;
        for(; curr !== null; curr = updateDecoder.next()){
            if (currClient !== curr.id.client) {
                if (currClock !== 0) {
                    size++;
                    // We found a new client
                    // write what we have to the encoder
                    encoding__namespace.writeVarUint(encoder.restEncoder, currClient);
                    encoding__namespace.writeVarUint(encoder.restEncoder, currClock);
                }
                currClient = curr.id.client;
                currClock = 0;
                stopCounting = curr.id.clock !== 0;
            }
            // we ignore skips
            if (curr.constructor === Skip) stopCounting = true;
            if (!stopCounting) currClock = curr.id.clock + curr.length;
        }
        // write what we have
        if (currClock !== 0) {
            size++;
            encoding__namespace.writeVarUint(encoder.restEncoder, currClient);
            encoding__namespace.writeVarUint(encoder.restEncoder, currClock);
        }
        // prepend the size of the state vector
        const enc = encoding__namespace.createEncoder();
        encoding__namespace.writeVarUint(enc, size);
        encoding__namespace.writeBinaryEncoder(enc, encoder.restEncoder);
        encoder.restEncoder = enc;
        return encoder.toUint8Array();
    } else {
        encoding__namespace.writeVarUint(encoder.restEncoder, 0);
        return encoder.toUint8Array();
    }
};
/**
 * @param {Uint8Array} update
 * @return {Uint8Array}
 */ const encodeStateVectorFromUpdate = (update)=>encodeStateVectorFromUpdateV2(update, DSEncoderV1, UpdateDecoderV1);
/**
 * @param {Uint8Array} update
 * @param {typeof UpdateDecoderV1 | typeof UpdateDecoderV2} YDecoder
 * @return {{ from: Map<number,number>, to: Map<number,number> }}
 */ const parseUpdateMetaV2 = (update, YDecoder = UpdateDecoderV2)=>{
    /**
   * @type {Map<number, number>}
   */ const from = new Map();
    /**
   * @type {Map<number, number>}
   */ const to = new Map();
    const updateDecoder = new LazyStructReader(new YDecoder(decoding__namespace.createDecoder(update)), false);
    let curr = updateDecoder.curr;
    if (curr !== null) {
        let currClient = curr.id.client;
        let currClock = curr.id.clock;
        // write the beginning to `from`
        from.set(currClient, currClock);
        for(; curr !== null; curr = updateDecoder.next()){
            if (currClient !== curr.id.client) {
                // We found a new client
                // write the end to `to`
                to.set(currClient, currClock);
                // write the beginning to `from`
                from.set(curr.id.client, curr.id.clock);
                // update currClient
                currClient = curr.id.client;
            }
            currClock = curr.id.clock + curr.length;
        }
        // write the end to `to`
        to.set(currClient, currClock);
    }
    return {
        from,
        to
    };
};
/**
 * @param {Uint8Array} update
 * @return {{ from: Map<number,number>, to: Map<number,number> }}
 */ const parseUpdateMeta = (update)=>parseUpdateMetaV2(update, UpdateDecoderV1);
/**
 * This method is intended to slice any kind of struct and retrieve the right part.
 * It does not handle side-effects, so it should only be used by the lazy-encoder.
 *
 * @param {Item | GC | Skip} left
 * @param {number} diff
 * @return {Item | GC}
 */ const sliceStruct = (left, diff)=>{
    if (left.constructor === GC) {
        const { client , clock  } = left.id;
        return new GC(createID(client, clock + diff), left.length - diff);
    } else if (left.constructor === Skip) {
        const { client: client1 , clock: clock1  } = left.id;
        return new Skip(createID(client1, clock1 + diff), left.length - diff);
    } else {
        const leftItem = /** @type {Item} */ left;
        const { client: client2 , clock: clock2  } = leftItem.id;
        return new Item(createID(client2, clock2 + diff), null, createID(client2, clock2 + diff - 1), null, leftItem.rightOrigin, leftItem.parent, leftItem.parentSub, leftItem.content.splice(diff));
    }
};
/**
 *
 * This function works similarly to `readUpdateV2`.
 *
 * @param {Array<Uint8Array>} updates
 * @param {typeof UpdateDecoderV1 | typeof UpdateDecoderV2} [YDecoder]
 * @param {typeof UpdateEncoderV1 | typeof UpdateEncoderV2} [YEncoder]
 * @return {Uint8Array}
 */ const mergeUpdatesV2 = (updates, YDecoder = UpdateDecoderV2, YEncoder = UpdateEncoderV2)=>{
    if (updates.length === 1) return updates[0];
    const updateDecoders = updates.map((update)=>new YDecoder(decoding__namespace.createDecoder(update)));
    let lazyStructDecoders = updateDecoders.map((decoder)=>new LazyStructReader(decoder, true));
    /**
   * @todo we don't need offset because we always slice before
   * @type {null | { struct: Item | GC | Skip, offset: number }}
   */ let currWrite = null;
    const updateEncoder = new YEncoder();
    // write structs lazily
    const lazyStructEncoder = new LazyStructWriter(updateEncoder);
    // Note: We need to ensure that all lazyStructDecoders are fully consumed
    // Note: Should merge document updates whenever possible - even from different updates
    // Note: Should handle that some operations cannot be applied yet ()
    while(true){
        // Write higher clients first ⇒ sort by clientID & clock and remove decoders without content
        lazyStructDecoders = lazyStructDecoders.filter((dec)=>dec.curr !== null);
        lazyStructDecoders.sort(/** @type {function(any,any):number} */ (dec1, dec2)=>{
            if (dec1.curr.id.client === dec2.curr.id.client) {
                const clockDiff = dec1.curr.id.clock - dec2.curr.id.clock;
                if (clockDiff === 0) // @todo remove references to skip since the structDecoders must filter Skips.
                return dec1.curr.constructor === dec2.curr.constructor ? 0 : dec1.curr.constructor === Skip ? 1 : -1 // we are filtering skips anyway.
                ;
                else return clockDiff;
            } else return dec2.curr.id.client - dec1.curr.id.client;
        });
        if (lazyStructDecoders.length === 0) break;
        const currDecoder = lazyStructDecoders[0];
        // write from currDecoder until the next operation is from another client or if filler-struct
        // then we need to reorder the decoders and find the next operation to write
        const firstClient = /** @type {Item | GC} */ currDecoder.curr.id.client;
        if (currWrite !== null) {
            let curr = /** @type {Item | GC | null} */ currDecoder.curr;
            let iterated = false;
            // iterate until we find something that we haven't written already
            // remember: first the high client-ids are written
            while(curr !== null && curr.id.clock + curr.length <= currWrite.struct.id.clock + currWrite.struct.length && curr.id.client >= currWrite.struct.id.client){
                curr = currDecoder.next();
                iterated = true;
            }
            if (curr === null || // current decoder is empty
            curr.id.client !== firstClient || // check whether there is another decoder that has has updates from `firstClient`
            iterated && curr.id.clock > currWrite.struct.id.clock + currWrite.struct.length // the above while loop was used and we are potentially missing updates
            ) continue;
            if (firstClient !== currWrite.struct.id.client) {
                writeStructToLazyStructWriter(lazyStructEncoder, currWrite.struct, currWrite.offset);
                currWrite = {
                    struct: curr,
                    offset: 0
                };
                currDecoder.next();
            } else if (currWrite.struct.id.clock + currWrite.struct.length < curr.id.clock) {
                // @todo write currStruct & set currStruct = Skip(clock = currStruct.id.clock + currStruct.length, length = curr.id.clock - self.clock)
                if (currWrite.struct.constructor === Skip) // extend existing skip
                currWrite.struct.length = curr.id.clock + curr.length - currWrite.struct.id.clock;
                else {
                    writeStructToLazyStructWriter(lazyStructEncoder, currWrite.struct, currWrite.offset);
                    const diff = curr.id.clock - currWrite.struct.id.clock - currWrite.struct.length;
                    /**
             * @type {Skip}
             */ const struct = new Skip(createID(firstClient, currWrite.struct.id.clock + currWrite.struct.length), diff);
                    currWrite = {
                        struct,
                        offset: 0
                    };
                }
            } else {
                const diff1 = currWrite.struct.id.clock + currWrite.struct.length - curr.id.clock;
                if (diff1 > 0) {
                    if (currWrite.struct.constructor === Skip) // prefer to slice Skip because the other struct might contain more information
                    currWrite.struct.length -= diff1;
                    else curr = sliceStruct(curr, diff1);
                }
                if (!currWrite.struct.mergeWith(/** @type {any} */ curr)) {
                    writeStructToLazyStructWriter(lazyStructEncoder, currWrite.struct, currWrite.offset);
                    currWrite = {
                        struct: curr,
                        offset: 0
                    };
                    currDecoder.next();
                }
            }
        } else {
            currWrite = {
                struct: /** @type {Item | GC} */ currDecoder.curr,
                offset: 0
            };
            currDecoder.next();
        }
        for(let next = currDecoder.curr; next !== null && next.id.client === firstClient && next.id.clock === currWrite.struct.id.clock + currWrite.struct.length && next.constructor !== Skip; next = currDecoder.next()){
            writeStructToLazyStructWriter(lazyStructEncoder, currWrite.struct, currWrite.offset);
            currWrite = {
                struct: next,
                offset: 0
            };
        }
    }
    if (currWrite !== null) {
        writeStructToLazyStructWriter(lazyStructEncoder, currWrite.struct, currWrite.offset);
        currWrite = null;
    }
    finishLazyStructWriting(lazyStructEncoder);
    const dss = updateDecoders.map((decoder)=>readDeleteSet(decoder));
    const ds = mergeDeleteSets(dss);
    writeDeleteSet(updateEncoder, ds);
    return updateEncoder.toUint8Array();
};
/**
 * @param {Uint8Array} update
 * @param {Uint8Array} sv
 * @param {typeof UpdateDecoderV1 | typeof UpdateDecoderV2} [YDecoder]
 * @param {typeof UpdateEncoderV1 | typeof UpdateEncoderV2} [YEncoder]
 */ const diffUpdateV2 = (update, sv, YDecoder = UpdateDecoderV2, YEncoder = UpdateEncoderV2)=>{
    const state = decodeStateVector(sv);
    const encoder = new YEncoder();
    const lazyStructWriter = new LazyStructWriter(encoder);
    const decoder = new YDecoder(decoding__namespace.createDecoder(update));
    const reader = new LazyStructReader(decoder, false);
    while(reader.curr){
        const curr = reader.curr;
        const currClient = curr.id.client;
        const svClock = state.get(currClient) || 0;
        if (reader.curr.constructor === Skip) {
            // the first written struct shouldn't be a skip
            reader.next();
            continue;
        }
        if (curr.id.clock + curr.length > svClock) {
            writeStructToLazyStructWriter(lazyStructWriter, curr, math__namespace.max(svClock - curr.id.clock, 0));
            reader.next();
            while(reader.curr && reader.curr.id.client === currClient){
                writeStructToLazyStructWriter(lazyStructWriter, reader.curr, 0);
                reader.next();
            }
        } else // read until something new comes up
        while(reader.curr && reader.curr.id.client === currClient && reader.curr.id.clock + reader.curr.length <= svClock)reader.next();
    }
    finishLazyStructWriting(lazyStructWriter);
    // write ds
    const ds = readDeleteSet(decoder);
    writeDeleteSet(encoder, ds);
    return encoder.toUint8Array();
};
/**
 * @param {Uint8Array} update
 * @param {Uint8Array} sv
 */ const diffUpdate = (update, sv)=>diffUpdateV2(update, sv, UpdateDecoderV1, UpdateEncoderV1);
/**
 * @param {LazyStructWriter} lazyWriter
 */ const flushLazyStructWriter = (lazyWriter)=>{
    if (lazyWriter.written > 0) {
        lazyWriter.clientStructs.push({
            written: lazyWriter.written,
            restEncoder: encoding__namespace.toUint8Array(lazyWriter.encoder.restEncoder)
        });
        lazyWriter.encoder.restEncoder = encoding__namespace.createEncoder();
        lazyWriter.written = 0;
    }
};
/**
 * @param {LazyStructWriter} lazyWriter
 * @param {Item | GC} struct
 * @param {number} offset
 */ const writeStructToLazyStructWriter = (lazyWriter, struct, offset)=>{
    // flush curr if we start another client
    if (lazyWriter.written > 0 && lazyWriter.currClient !== struct.id.client) flushLazyStructWriter(lazyWriter);
    if (lazyWriter.written === 0) {
        lazyWriter.currClient = struct.id.client;
        // write next client
        lazyWriter.encoder.writeClient(struct.id.client);
        // write startClock
        encoding__namespace.writeVarUint(lazyWriter.encoder.restEncoder, struct.id.clock + offset);
    }
    struct.write(lazyWriter.encoder, offset);
    lazyWriter.written++;
};
/**
 * Call this function when we collected all parts and want to
 * put all the parts together. After calling this method,
 * you can continue using the UpdateEncoder.
 *
 * @param {LazyStructWriter} lazyWriter
 */ const finishLazyStructWriting = (lazyWriter)=>{
    flushLazyStructWriter(lazyWriter);
    // this is a fresh encoder because we called flushCurr
    const restEncoder = lazyWriter.encoder.restEncoder;
    /**
   * Now we put all the fragments together.
   * This works similarly to `writeClientsStructs`
   */ // write # states that were updated - i.e. the clients
    encoding__namespace.writeVarUint(restEncoder, lazyWriter.clientStructs.length);
    for(let i = 0; i < lazyWriter.clientStructs.length; i++){
        const partStructs = lazyWriter.clientStructs[i];
        /**
     * Works similarly to `writeStructs`
     */ // write # encoded structs
        encoding__namespace.writeVarUint(restEncoder, partStructs.written);
        // write the rest of the fragment
        encoding__namespace.writeUint8Array(restEncoder, partStructs.restEncoder);
    }
};
/**
 * @param {Uint8Array} update
 * @param {typeof UpdateDecoderV2 | typeof UpdateDecoderV1} YDecoder
 * @param {typeof UpdateEncoderV2 | typeof UpdateEncoderV1 } YEncoder
 */ const convertUpdateFormat = (update, YDecoder, YEncoder)=>{
    const updateDecoder = new YDecoder(decoding__namespace.createDecoder(update));
    const lazyDecoder = new LazyStructReader(updateDecoder, false);
    const updateEncoder = new YEncoder();
    const lazyWriter = new LazyStructWriter(updateEncoder);
    for(let curr = lazyDecoder.curr; curr !== null; curr = lazyDecoder.next())writeStructToLazyStructWriter(lazyWriter, curr, 0);
    finishLazyStructWriting(lazyWriter);
    const ds = readDeleteSet(updateDecoder);
    writeDeleteSet(updateEncoder, ds);
    return updateEncoder.toUint8Array();
};
/**
 * @param {Uint8Array} update
 */ const convertUpdateFormatV1ToV2 = (update)=>convertUpdateFormat(update, UpdateDecoderV1, UpdateEncoderV2);
/**
 * @param {Uint8Array} update
 */ const convertUpdateFormatV2ToV1 = (update)=>convertUpdateFormat(update, UpdateDecoderV2, UpdateEncoderV1);
/**
 * @template {AbstractType<any>} T
 * YEvent describes the changes on a YType.
 */ class YEvent {
    /**
   * @param {T} target The changed type.
   * @param {Transaction} transaction
   */ constructor(target, transaction){
        /**
     * The type on which this event was created on.
     * @type {T}
     */ this.target = target;
        /**
     * The current target on which the observe callback is called.
     * @type {AbstractType<any>}
     */ this.currentTarget = target;
        /**
     * The transaction that triggered this event.
     * @type {Transaction}
     */ this.transaction = transaction;
        /**
     * @type {Object|null}
     */ this._changes = null;
        /**
     * @type {null | Map<string, { action: 'add' | 'update' | 'delete', oldValue: any, newValue: any }>}
     */ this._keys = null;
        /**
     * @type {null | Array<{ insert?: string | Array<any> | object | AbstractType<any>, retain?: number, delete?: number, attributes?: Object<string, any> }>}
     */ this._delta = null;
    }
    /**
   * Computes the path from `y` to the changed type.
   *
   * @todo v14 should standardize on path: Array<{parent, index}> because that is easier to work with.
   *
   * The following property holds:
   * @example
   *   let type = y
   *   event.path.forEach(dir => {
   *     type = type.get(dir)
   *   })
   *   type === event.target // => true
   */ get path() {
        // @ts-ignore _item is defined because target is integrated
        return getPathTo(this.currentTarget, this.target);
    }
    /**
   * Check if a struct is deleted by this event.
   *
   * In contrast to change.deleted, this method also returns true if the struct was added and then deleted.
   *
   * @param {AbstractStruct} struct
   * @return {boolean}
   */ deletes(struct) {
        return isDeleted(this.transaction.deleteSet, struct.id);
    }
    /**
   * @type {Map<string, { action: 'add' | 'update' | 'delete', oldValue: any, newValue: any }>}
   */ get keys() {
        if (this._keys === null) {
            const keys = new Map();
            const target = this.target;
            const changed = /** @type Set<string|null> */ this.transaction.changed.get(target);
            changed.forEach((key)=>{
                if (key !== null) {
                    const item = /** @type {Item} */ target._map.get(key);
                    /**
           * @type {'delete' | 'add' | 'update'}
           */ let action;
                    let oldValue;
                    if (this.adds(item)) {
                        let prev = item.left;
                        while(prev !== null && this.adds(prev))prev = prev.left;
                        if (this.deletes(item)) {
                            if (prev !== null && this.deletes(prev)) {
                                action = "delete";
                                oldValue = array__namespace.last(prev.content.getContent());
                            } else return;
                        } else if (prev !== null && this.deletes(prev)) {
                            action = "update";
                            oldValue = array__namespace.last(prev.content.getContent());
                        } else {
                            action = "add";
                            oldValue = undefined;
                        }
                    } else {
                        if (this.deletes(item)) {
                            action = "delete";
                            oldValue = array__namespace.last(/** @type {Item} */ item.content.getContent());
                        } else return; // nop
                    }
                    keys.set(key, {
                        action,
                        oldValue
                    });
                }
            });
            this._keys = keys;
        }
        return this._keys;
    }
    /**
   * @type {Array<{insert?: string | Array<any> | object | AbstractType<any>, retain?: number, delete?: number, attributes?: Object<string, any>}>}
   */ get delta() {
        return this.changes.delta;
    }
    /**
   * Check if a struct is added by this event.
   *
   * In contrast to change.deleted, this method also returns true if the struct was added and then deleted.
   *
   * @param {AbstractStruct} struct
   * @return {boolean}
   */ adds(struct) {
        return struct.id.clock >= (this.transaction.beforeState.get(struct.id.client) || 0);
    }
    /**
   * @type {{added:Set<Item>,deleted:Set<Item>,keys:Map<string,{action:'add'|'update'|'delete',oldValue:any}>,delta:Array<{insert?:Array<any>|string, delete?:number, retain?:number}>}}
   */ get changes() {
        let changes = this._changes;
        if (changes === null) {
            const target = this.target;
            const added = set__namespace.create();
            const deleted = set__namespace.create();
            /**
       * @type {Array<{insert:Array<any>}|{delete:number}|{retain:number}>}
       */ const delta = [];
            changes = {
                added,
                deleted,
                delta,
                keys: this.keys
            };
            const changed = /** @type Set<string|null> */ this.transaction.changed.get(target);
            if (changed.has(null)) {
                /**
         * @type {any}
         */ let lastOp = null;
                const packOp = ()=>{
                    if (lastOp) delta.push(lastOp);
                };
                for(let item = target._start; item !== null; item = item.right){
                    if (item.deleted) {
                        if (this.deletes(item) && !this.adds(item)) {
                            if (lastOp === null || lastOp.delete === undefined) {
                                packOp();
                                lastOp = {
                                    delete: 0
                                };
                            }
                            lastOp.delete += item.length;
                            deleted.add(item);
                        } // else nop
                    } else if (this.adds(item)) {
                        if (lastOp === null || lastOp.insert === undefined) {
                            packOp();
                            lastOp = {
                                insert: []
                            };
                        }
                        lastOp.insert = lastOp.insert.concat(item.content.getContent());
                        added.add(item);
                    } else {
                        if (lastOp === null || lastOp.retain === undefined) {
                            packOp();
                            lastOp = {
                                retain: 0
                            };
                        }
                        lastOp.retain += item.length;
                    }
                }
                if (lastOp !== null && lastOp.retain === undefined) packOp();
            }
            this._changes = changes;
        }
        return /** @type {any} */ changes;
    }
}
/**
 * Compute the path from this type to the specified target.
 *
 * @example
 *   // `child` should be accessible via `type.get(path[0]).get(path[1])..`
 *   const path = type.getPathTo(child)
 *   // assuming `type instanceof YArray`
 *   console.log(path) // might look like => [2, 'key1']
 *   child === type.get(path[0]).get(path[1])
 *
 * @param {AbstractType<any>} parent
 * @param {AbstractType<any>} child target
 * @return {Array<string|number>} Path to the target
 *
 * @private
 * @function
 */ const getPathTo = (parent, child)=>{
    const path = [];
    while(child._item !== null && child !== parent){
        if (child._item.parentSub !== null) // parent is map-ish
        path.unshift(child._item.parentSub);
        else {
            // parent is array-ish
            let i = 0;
            let c = /** @type {AbstractType<any>} */ child._item.parent._start;
            while(c !== child._item && c !== null){
                if (!c.deleted) i++;
                c = c.right;
            }
            path.unshift(i);
        }
        child = /** @type {AbstractType<any>} */ child._item.parent;
    }
    return path;
};
const maxSearchMarker = 80;
/**
 * A unique timestamp that identifies each marker.
 *
 * Time is relative,.. this is more like an ever-increasing clock.
 *
 * @type {number}
 */ let globalSearchMarkerTimestamp = 0;
class ArraySearchMarker {
    /**
   * @param {Item} p
   * @param {number} index
   */ constructor(p, index){
        p.marker = true;
        this.p = p;
        this.index = index;
        this.timestamp = globalSearchMarkerTimestamp++;
    }
}
/**
 * @param {ArraySearchMarker} marker
 */ const refreshMarkerTimestamp = (marker)=>{
    marker.timestamp = globalSearchMarkerTimestamp++;
};
/**
 * This is rather complex so this function is the only thing that should overwrite a marker
 *
 * @param {ArraySearchMarker} marker
 * @param {Item} p
 * @param {number} index
 */ const overwriteMarker = (marker, p, index)=>{
    marker.p.marker = false;
    marker.p = p;
    p.marker = true;
    marker.index = index;
    marker.timestamp = globalSearchMarkerTimestamp++;
};
/**
 * @param {Array<ArraySearchMarker>} searchMarker
 * @param {Item} p
 * @param {number} index
 */ const markPosition = (searchMarker, p, index)=>{
    if (searchMarker.length >= maxSearchMarker) {
        // override oldest marker (we don't want to create more objects)
        const marker = searchMarker.reduce((a, b)=>a.timestamp < b.timestamp ? a : b);
        overwriteMarker(marker, p, index);
        return marker;
    } else {
        // create new marker
        const pm = new ArraySearchMarker(p, index);
        searchMarker.push(pm);
        return pm;
    }
};
/**
 * Search marker help us to find positions in the associative array faster.
 *
 * They speed up the process of finding a position without much bookkeeping.
 *
 * A maximum of `maxSearchMarker` objects are created.
 *
 * This function always returns a refreshed marker (updated timestamp)
 *
 * @param {AbstractType<any>} yarray
 * @param {number} index
 */ const findMarker = (yarray, index)=>{
    if (yarray._start === null || index === 0 || yarray._searchMarker === null) return null;
    const marker = yarray._searchMarker.length === 0 ? null : yarray._searchMarker.reduce((a, b)=>math__namespace.abs(index - a.index) < math__namespace.abs(index - b.index) ? a : b);
    let p = yarray._start;
    let pindex = 0;
    if (marker !== null) {
        p = marker.p;
        pindex = marker.index;
        refreshMarkerTimestamp(marker); // we used it, we might need to use it again
    }
    // iterate to right if possible
    while(p.right !== null && pindex < index){
        if (!p.deleted && p.countable) {
            if (index < pindex + p.length) break;
            pindex += p.length;
        }
        p = p.right;
    }
    // iterate to left if necessary (might be that pindex > index)
    while(p.left !== null && pindex > index){
        p = p.left;
        if (!p.deleted && p.countable) pindex -= p.length;
    }
    // we want to make sure that p can't be merged with left, because that would screw up everything
    // in that cas just return what we have (it is most likely the best marker anyway)
    // iterate to left until p can't be merged with left
    while(p.left !== null && p.left.id.client === p.id.client && p.left.id.clock + p.left.length === p.id.clock){
        p = p.left;
        if (!p.deleted && p.countable) pindex -= p.length;
    }
    // @todo remove!
    // assure position
    // {
    //   let start = yarray._start
    //   let pos = 0
    //   while (start !== p) {
    //     if (!start.deleted && start.countable) {
    //       pos += start.length
    //     }
    //     start = /** @type {Item} */ (start.right)
    //   }
    //   if (pos !== pindex) {
    //     debugger
    //     throw new Error('Gotcha position fail!')
    //   }
    // }
    // if (marker) {
    //   if (window.lengthes == null) {
    //     window.lengthes = []
    //     window.getLengthes = () => window.lengthes.sort((a, b) => a - b)
    //   }
    //   window.lengthes.push(marker.index - pindex)
    //   console.log('distance', marker.index - pindex, 'len', p && p.parent.length)
    // }
    if (marker !== null && math__namespace.abs(marker.index - pindex) < /** @type {YText|YArray<any>} */ p.parent.length / maxSearchMarker) {
        // adjust existing marker
        overwriteMarker(marker, p, pindex);
        return marker;
    } else // create new marker
    return markPosition(yarray._searchMarker, p, pindex);
};
/**
 * Update markers when a change happened.
 *
 * This should be called before doing a deletion!
 *
 * @param {Array<ArraySearchMarker>} searchMarker
 * @param {number} index
 * @param {number} len If insertion, len is positive. If deletion, len is negative.
 */ const updateMarkerChanges = (searchMarker, index, len)=>{
    for(let i = searchMarker.length - 1; i >= 0; i--){
        const m = searchMarker[i];
        if (len > 0) {
            /**
       * @type {Item|null}
       */ let p = m.p;
            p.marker = false;
            // Ideally we just want to do a simple position comparison, but this will only work if
            // search markers don't point to deleted items for formats.
            // Iterate marker to prev undeleted countable position so we know what to do when updating a position
            while(p && (p.deleted || !p.countable)){
                p = p.left;
                if (p && !p.deleted && p.countable) // adjust position. the loop should break now
                m.index -= p.length;
            }
            if (p === null || p.marker === true) {
                // remove search marker if updated position is null or if position is already marked
                searchMarker.splice(i, 1);
                continue;
            }
            m.p = p;
            p.marker = true;
        }
        if (index < m.index || len > 0 && index === m.index) m.index = math__namespace.max(index, m.index + len);
    }
};
/**
 * Accumulate all (list) children of a type and return them as an Array.
 *
 * @param {AbstractType<any>} t
 * @return {Array<Item>}
 */ const getTypeChildren = (t)=>{
    let s = t._start;
    const arr = [];
    while(s){
        arr.push(s);
        s = s.right;
    }
    return arr;
};
/**
 * Call event listeners with an event. This will also add an event to all
 * parents (for `.observeDeep` handlers).
 *
 * @template EventType
 * @param {AbstractType<EventType>} type
 * @param {Transaction} transaction
 * @param {EventType} event
 */ const callTypeObservers = (type, transaction, event)=>{
    const changedType = type;
    const changedParentTypes = transaction.changedParentTypes;
    while(true){
        // @ts-ignore
        map__namespace.setIfUndefined(changedParentTypes, type, ()=>[]).push(event);
        if (type._item === null) break;
        type = /** @type {AbstractType<any>} */ type._item.parent;
    }
    callEventHandlerListeners(changedType._eH, event, transaction);
};
/**
 * @template EventType
 * Abstract Yjs Type class
 */ class AbstractType {
    constructor(){
        /**
     * @type {Item|null}
     */ this._item = null;
        /**
     * @type {Map<string,Item>}
     */ this._map = new Map();
        /**
     * @type {Item|null}
     */ this._start = null;
        /**
     * @type {Doc|null}
     */ this.doc = null;
        this._length = 0;
        /**
     * Event handlers
     * @type {EventHandler<EventType,Transaction>}
     */ this._eH = createEventHandler();
        /**
     * Deep event handlers
     * @type {EventHandler<Array<YEvent<any>>,Transaction>}
     */ this._dEH = createEventHandler();
        /**
     * @type {null | Array<ArraySearchMarker>}
     */ this._searchMarker = null;
    }
    /**
   * @return {AbstractType<any>|null}
   */ get parent() {
        return this._item ? /** @type {AbstractType<any>} */ this._item.parent : null;
    }
    /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item|null} item
   */ _integrate(y, item) {
        this.doc = y;
        this._item = item;
    }
    /**
   * @return {AbstractType<EventType>}
   */ _copy() {
        throw error__namespace.methodUnimplemented();
    }
    /**
   * @return {AbstractType<EventType>}
   */ clone() {
        throw error__namespace.methodUnimplemented();
    }
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */ _write(encoder) {}
    /**
   * The first non-deleted item
   */ get _first() {
        let n = this._start;
        while(n !== null && n.deleted)n = n.right;
        return n;
    }
    /**
   * Creates YEvent and calls all type observers.
   * Must be implemented by each type.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */ _callObserver(transaction, parentSubs) {
        if (!transaction.local && this._searchMarker) this._searchMarker.length = 0;
    }
    /**
   * Observe all events that are created on this type.
   *
   * @param {function(EventType, Transaction):void} f Observer function
   */ observe(f) {
        addEventHandlerListener(this._eH, f);
    }
    /**
   * Observe all events that are created by this type and its children.
   *
   * @param {function(Array<YEvent<any>>,Transaction):void} f Observer function
   */ observeDeep(f) {
        addEventHandlerListener(this._dEH, f);
    }
    /**
   * Unregister an observer function.
   *
   * @param {function(EventType,Transaction):void} f Observer function
   */ unobserve(f) {
        removeEventHandlerListener(this._eH, f);
    }
    /**
   * Unregister an observer function.
   *
   * @param {function(Array<YEvent<any>>,Transaction):void} f Observer function
   */ unobserveDeep(f) {
        removeEventHandlerListener(this._dEH, f);
    }
    /**
   * @abstract
   * @return {any}
   */ toJSON() {}
}
/**
 * @param {AbstractType<any>} type
 * @param {number} start
 * @param {number} end
 * @return {Array<any>}
 *
 * @private
 * @function
 */ const typeListSlice = (type, start, end)=>{
    if (start < 0) start = type._length + start;
    if (end < 0) end = type._length + end;
    let len = end - start;
    const cs = [];
    let n = type._start;
    while(n !== null && len > 0){
        if (n.countable && !n.deleted) {
            const c = n.content.getContent();
            if (c.length <= start) start -= c.length;
            else {
                for(let i = start; i < c.length && len > 0; i++){
                    cs.push(c[i]);
                    len--;
                }
                start = 0;
            }
        }
        n = n.right;
    }
    return cs;
};
/**
 * @param {AbstractType<any>} type
 * @return {Array<any>}
 *
 * @private
 * @function
 */ const typeListToArray = (type)=>{
    const cs = [];
    let n = type._start;
    while(n !== null){
        if (n.countable && !n.deleted) {
            const c = n.content.getContent();
            for(let i = 0; i < c.length; i++)cs.push(c[i]);
        }
        n = n.right;
    }
    return cs;
};
/**
 * @param {AbstractType<any>} type
 * @param {Snapshot} snapshot
 * @return {Array<any>}
 *
 * @private
 * @function
 */ const typeListToArraySnapshot = (type, snapshot)=>{
    const cs = [];
    let n = type._start;
    while(n !== null){
        if (n.countable && isVisible(n, snapshot)) {
            const c = n.content.getContent();
            for(let i = 0; i < c.length; i++)cs.push(c[i]);
        }
        n = n.right;
    }
    return cs;
};
/**
 * Executes a provided function on once on overy element of this YArray.
 *
 * @param {AbstractType<any>} type
 * @param {function(any,number,any):void} f A function to execute on every element of this YArray.
 *
 * @private
 * @function
 */ const typeListForEach = (type, f)=>{
    let index = 0;
    let n = type._start;
    while(n !== null){
        if (n.countable && !n.deleted) {
            const c = n.content.getContent();
            for(let i = 0; i < c.length; i++)f(c[i], index++, type);
        }
        n = n.right;
    }
};
/**
 * @template C,R
 * @param {AbstractType<any>} type
 * @param {function(C,number,AbstractType<any>):R} f
 * @return {Array<R>}
 *
 * @private
 * @function
 */ const typeListMap = (type, f)=>{
    /**
   * @type {Array<any>}
   */ const result = [];
    typeListForEach(type, (c, i)=>{
        result.push(f(c, i, type));
    });
    return result;
};
/**
 * @param {AbstractType<any>} type
 * @return {IterableIterator<any>}
 *
 * @private
 * @function
 */ const typeListCreateIterator = (type)=>{
    let n = type._start;
    /**
   * @type {Array<any>|null}
   */ let currentContent = null;
    let currentContentIndex = 0;
    return {
        [Symbol.iterator] () {
            return this;
        },
        next: ()=>{
            // find some content
            if (currentContent === null) {
                while(n !== null && n.deleted)n = n.right;
                // check if we reached the end, no need to check currentContent, because it does not exist
                if (n === null) return {
                    done: true,
                    value: undefined
                };
                // we found n, so we can set currentContent
                currentContent = n.content.getContent();
                currentContentIndex = 0;
                n = n.right; // we used the content of n, now iterate to next
            }
            const value = currentContent[currentContentIndex++];
            // check if we need to empty currentContent
            if (currentContent.length <= currentContentIndex) currentContent = null;
            return {
                done: false,
                value
            };
        }
    };
};
/**
 * @param {AbstractType<any>} type
 * @param {number} index
 * @return {any}
 *
 * @private
 * @function
 */ const typeListGet = (type, index)=>{
    const marker = findMarker(type, index);
    let n = type._start;
    if (marker !== null) {
        n = marker.p;
        index -= marker.index;
    }
    for(; n !== null; n = n.right)if (!n.deleted && n.countable) {
        if (index < n.length) return n.content.getContent()[index];
        index -= n.length;
    }
};
/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {Item?} referenceItem
 * @param {Array<Object<string,any>|Array<any>|boolean|number|null|string|Uint8Array>} content
 *
 * @private
 * @function
 */ const typeListInsertGenericsAfter = (transaction, parent, referenceItem, content)=>{
    let left = referenceItem;
    const doc = transaction.doc;
    const ownClientId = doc.clientID;
    const store = doc.store;
    const right = referenceItem === null ? parent._start : referenceItem.right;
    /**
   * @type {Array<Object|Array<any>|number|null>}
   */ let jsonContent = [];
    const packJsonContent = ()=>{
        if (jsonContent.length > 0) {
            left = new Item(createID(ownClientId, getState(store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new ContentAny(jsonContent));
            left.integrate(transaction, 0);
            jsonContent = [];
        }
    };
    content.forEach((c)=>{
        if (c === null) jsonContent.push(c);
        else switch(c.constructor){
            case Number:
            case Object:
            case Boolean:
            case Array:
            case String:
                jsonContent.push(c);
                break;
            default:
                packJsonContent();
                switch(c.constructor){
                    case Uint8Array:
                    case ArrayBuffer:
                        left = new Item(createID(ownClientId, getState(store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new ContentBinary(new Uint8Array(/** @type {Uint8Array} */ c)));
                        left.integrate(transaction, 0);
                        break;
                    case Doc:
                        left = new Item(createID(ownClientId, getState(store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new ContentDoc(/** @type {Doc} */ c));
                        left.integrate(transaction, 0);
                        break;
                    default:
                        if (c instanceof AbstractType) {
                            left = new Item(createID(ownClientId, getState(store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new ContentType(c));
                            left.integrate(transaction, 0);
                        } else throw new Error("Unexpected content type in insert operation");
                }
        }
    });
    packJsonContent();
};
const lengthExceeded = error__namespace.create("Length exceeded!");
/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {number} index
 * @param {Array<Object<string,any>|Array<any>|number|null|string|Uint8Array>} content
 *
 * @private
 * @function
 */ const typeListInsertGenerics = (transaction, parent, index, content)=>{
    if (index > parent._length) throw lengthExceeded;
    if (index === 0) {
        if (parent._searchMarker) updateMarkerChanges(parent._searchMarker, index, content.length);
        return typeListInsertGenericsAfter(transaction, parent, null, content);
    }
    const startIndex = index;
    const marker = findMarker(parent, index);
    let n = parent._start;
    if (marker !== null) {
        n = marker.p;
        index -= marker.index;
        // we need to iterate one to the left so that the algorithm works
        if (index === 0) {
            // @todo refactor this as it actually doesn't consider formats
            n = n.prev; // important! get the left undeleted item so that we can actually decrease index
            index += n && n.countable && !n.deleted ? n.length : 0;
        }
    }
    for(; n !== null; n = n.right)if (!n.deleted && n.countable) {
        if (index <= n.length) {
            if (index < n.length) // insert in-between
            getItemCleanStart(transaction, createID(n.id.client, n.id.clock + index));
            break;
        }
        index -= n.length;
    }
    if (parent._searchMarker) updateMarkerChanges(parent._searchMarker, startIndex, content.length);
    return typeListInsertGenericsAfter(transaction, parent, n, content);
};
/**
 * Pushing content is special as we generally want to push after the last item. So we don't have to update
 * the serach marker.
 *
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {Array<Object<string,any>|Array<any>|number|null|string|Uint8Array>} content
 *
 * @private
 * @function
 */ const typeListPushGenerics = (transaction, parent, content)=>{
    // Use the marker with the highest index and iterate to the right.
    const marker = (parent._searchMarker || []).reduce((maxMarker, currMarker)=>currMarker.index > maxMarker.index ? currMarker : maxMarker, {
        index: 0,
        p: parent._start
    });
    let n = marker.p;
    if (n) while(n.right)n = n.right;
    return typeListInsertGenericsAfter(transaction, parent, n, content);
};
/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {number} index
 * @param {number} length
 *
 * @private
 * @function
 */ const typeListDelete = (transaction, parent, index, length)=>{
    if (length === 0) return;
    const startIndex = index;
    const startLength = length;
    const marker = findMarker(parent, index);
    let n = parent._start;
    if (marker !== null) {
        n = marker.p;
        index -= marker.index;
    }
    // compute the first item to be deleted
    for(; n !== null && index > 0; n = n.right)if (!n.deleted && n.countable) {
        if (index < n.length) getItemCleanStart(transaction, createID(n.id.client, n.id.clock + index));
        index -= n.length;
    }
    // delete all items until done
    while(length > 0 && n !== null){
        if (!n.deleted) {
            if (length < n.length) getItemCleanStart(transaction, createID(n.id.client, n.id.clock + length));
            n.delete(transaction);
            length -= n.length;
        }
        n = n.right;
    }
    if (length > 0) throw lengthExceeded;
    if (parent._searchMarker) updateMarkerChanges(parent._searchMarker, startIndex, -startLength + length /* in case we remove the above exception */ );
};
/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {string} key
 *
 * @private
 * @function
 */ const typeMapDelete = (transaction, parent, key)=>{
    const c = parent._map.get(key);
    if (c !== undefined) c.delete(transaction);
};
/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {string} key
 * @param {Object|number|null|Array<any>|string|Uint8Array|AbstractType<any>} value
 *
 * @private
 * @function
 */ const typeMapSet = (transaction, parent, key, value)=>{
    const left = parent._map.get(key) || null;
    const doc = transaction.doc;
    const ownClientId = doc.clientID;
    let content;
    if (value == null) content = new ContentAny([
        value
    ]);
    else switch(value.constructor){
        case Number:
        case Object:
        case Boolean:
        case Array:
        case String:
            content = new ContentAny([
                value
            ]);
            break;
        case Uint8Array:
            content = new ContentBinary(/** @type {Uint8Array} */ value);
            break;
        case Doc:
            content = new ContentDoc(/** @type {Doc} */ value);
            break;
        default:
            if (value instanceof AbstractType) content = new ContentType(value);
            else throw new Error("Unexpected content type");
    }
    new Item(createID(ownClientId, getState(doc.store, ownClientId)), left, left && left.lastId, null, null, parent, key, content).integrate(transaction, 0);
};
/**
 * @param {AbstractType<any>} parent
 * @param {string} key
 * @return {Object<string,any>|number|null|Array<any>|string|Uint8Array|AbstractType<any>|undefined}
 *
 * @private
 * @function
 */ const typeMapGet = (parent, key)=>{
    const val = parent._map.get(key);
    return val !== undefined && !val.deleted ? val.content.getContent()[val.length - 1] : undefined;
};
/**
 * @param {AbstractType<any>} parent
 * @return {Object<string,Object<string,any>|number|null|Array<any>|string|Uint8Array|AbstractType<any>|undefined>}
 *
 * @private
 * @function
 */ const typeMapGetAll = (parent)=>{
    /**
   * @type {Object<string,any>}
   */ const res = {};
    parent._map.forEach((value, key)=>{
        if (!value.deleted) res[key] = value.content.getContent()[value.length - 1];
    });
    return res;
};
/**
 * @param {AbstractType<any>} parent
 * @param {string} key
 * @return {boolean}
 *
 * @private
 * @function
 */ const typeMapHas = (parent, key)=>{
    const val = parent._map.get(key);
    return val !== undefined && !val.deleted;
};
/**
 * @param {AbstractType<any>} parent
 * @param {string} key
 * @param {Snapshot} snapshot
 * @return {Object<string,any>|number|null|Array<any>|string|Uint8Array|AbstractType<any>|undefined}
 *
 * @private
 * @function
 */ const typeMapGetSnapshot = (parent, key, snapshot)=>{
    let v = parent._map.get(key) || null;
    while(v !== null && (!snapshot.sv.has(v.id.client) || v.id.clock >= (snapshot.sv.get(v.id.client) || 0)))v = v.left;
    return v !== null && isVisible(v, snapshot) ? v.content.getContent()[v.length - 1] : undefined;
};
/**
 * @param {Map<string,Item>} map
 * @return {IterableIterator<Array<any>>}
 *
 * @private
 * @function
 */ const createMapIterator = (map)=>iterator__namespace.iteratorFilter(map.entries(), /** @param {any} entry */ (entry)=>!entry[1].deleted);
/**
 * @module YArray
 */ /**
 * Event that describes the changes on a YArray
 * @template T
 * @extends YEvent<YArray<T>>
 */ class YArrayEvent extends YEvent {
    /**
   * @param {YArray<T>} yarray The changed type
   * @param {Transaction} transaction The transaction object
   */ constructor(yarray, transaction){
        super(yarray, transaction);
        this._transaction = transaction;
    }
}
/**
 * A shared Array implementation.
 * @template T
 * @extends AbstractType<YArrayEvent<T>>
 * @implements {Iterable<T>}
 */ class YArray extends AbstractType {
    constructor(){
        super();
        /**
     * @type {Array<any>?}
     * @private
     */ this._prelimContent = [];
        /**
     * @type {Array<ArraySearchMarker>}
     */ this._searchMarker = [];
    }
    /**
   * Construct a new YArray containing the specified items.
   * @template T
   * @param {Array<T>} items
   * @return {YArray<T>}
   */ static from(items) {
        const a = new YArray();
        a.push(items);
        return a;
    }
    /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */ _integrate(y, item) {
        super._integrate(y, item);
        this.insert(0, /** @type {Array<any>} */ this._prelimContent);
        this._prelimContent = null;
    }
    _copy() {
        return new YArray();
    }
    /**
   * @return {YArray<T>}
   */ clone() {
        const arr = new YArray();
        arr.insert(0, this.toArray().map((el)=>el instanceof AbstractType ? el.clone() : el));
        return arr;
    }
    get length() {
        return this._prelimContent === null ? this._length : this._prelimContent.length;
    }
    /**
   * Creates YArrayEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */ _callObserver(transaction, parentSubs) {
        super._callObserver(transaction, parentSubs);
        callTypeObservers(this, transaction, new YArrayEvent(this, transaction));
    }
    /**
   * Inserts new content at an index.
   *
   * Important: This function expects an array of content. Not just a content
   * object. The reason for this "weirdness" is that inserting several elements
   * is very efficient when it is done as a single operation.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  yarray.insert(0, ['a'])
   *  // Insert numbers 1, 2 at position 1
   *  yarray.insert(1, [1, 2])
   *
   * @param {number} index The index to insert content at.
   * @param {Array<T>} content The array of content
   */ insert(index, content) {
        if (this.doc !== null) transact(this.doc, (transaction)=>{
            typeListInsertGenerics(transaction, this, index, content);
        });
        else /** @type {Array<any>} */ this._prelimContent.splice(index, 0, ...content);
    }
    /**
   * Appends content to this YArray.
   *
   * @param {Array<T>} content Array of content to append.
   *
   * @todo Use the following implementation in all types.
   */ push(content) {
        if (this.doc !== null) transact(this.doc, (transaction)=>{
            typeListPushGenerics(transaction, this, content);
        });
        else /** @type {Array<any>} */ this._prelimContent.push(...content);
    }
    /**
   * Preppends content to this YArray.
   *
   * @param {Array<T>} content Array of content to preppend.
   */ unshift(content) {
        this.insert(0, content);
    }
    /**
   * Deletes elements starting from an index.
   *
   * @param {number} index Index at which to start deleting elements
   * @param {number} length The number of elements to remove. Defaults to 1.
   */ delete(index, length = 1) {
        if (this.doc !== null) transact(this.doc, (transaction)=>{
            typeListDelete(transaction, this, index, length);
        });
        else /** @type {Array<any>} */ this._prelimContent.splice(index, length);
    }
    /**
   * Returns the i-th element from a YArray.
   *
   * @param {number} index The index of the element to return from the YArray
   * @return {T}
   */ get(index) {
        return typeListGet(this, index);
    }
    /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @return {Array<T>}
   */ toArray() {
        return typeListToArray(this);
    }
    /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @param {number} [start]
   * @param {number} [end]
   * @return {Array<T>}
   */ slice(start = 0, end = this.length) {
        return typeListSlice(this, start, end);
    }
    /**
   * Transforms this Shared Type to a JSON object.
   *
   * @return {Array<any>}
   */ toJSON() {
        return this.map((c)=>c instanceof AbstractType ? c.toJSON() : c);
    }
    /**
   * Returns an Array with the result of calling a provided function on every
   * element of this YArray.
   *
   * @template M
   * @param {function(T,number,YArray<T>):M} f Function that produces an element of the new Array
   * @return {Array<M>} A new array with each element being the result of the
   *                 callback function
   */ map(f) {
        return typeListMap(this, /** @type {any} */ f);
    }
    /**
   * Executes a provided function on once on overy element of this YArray.
   *
   * @param {function(T,number,YArray<T>):void} f A function to execute on every element of this YArray.
   */ forEach(f) {
        typeListForEach(this, f);
    }
    /**
   * @return {IterableIterator<T>}
   */ [Symbol.iterator]() {
        return typeListCreateIterator(this);
    }
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */ _write(encoder) {
        encoder.writeTypeRef(YArrayRefID);
    }
}
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 *
 * @private
 * @function
 */ const readYArray = (decoder)=>new YArray();
/**
 * @template T
 * @extends YEvent<YMap<T>>
 * Event that describes the changes on a YMap.
 */ class YMapEvent extends YEvent {
    /**
   * @param {YMap<T>} ymap The YArray that changed.
   * @param {Transaction} transaction
   * @param {Set<any>} subs The keys that changed.
   */ constructor(ymap, transaction, subs){
        super(ymap, transaction);
        this.keysChanged = subs;
    }
}
/**
 * @template MapType
 * A shared Map implementation.
 *
 * @extends AbstractType<YMapEvent<MapType>>
 * @implements {Iterable<MapType>}
 */ class YMap extends AbstractType {
    /**
   *
   * @param {Iterable<readonly [string, any]>=} entries - an optional iterable to initialize the YMap
   */ constructor(entries){
        super();
        /**
     * @type {Map<string,any>?}
     * @private
     */ this._prelimContent = null;
        if (entries === undefined) this._prelimContent = new Map();
        else this._prelimContent = new Map(entries);
    }
    /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */ _integrate(y, item) {
        super._integrate(y, item); /** @type {Map<string, any>} */ 
        this._prelimContent.forEach((value, key)=>{
            this.set(key, value);
        });
        this._prelimContent = null;
    }
    _copy() {
        return new YMap();
    }
    /**
   * @return {YMap<MapType>}
   */ clone() {
        const map = new YMap();
        this.forEach((value, key)=>{
            map.set(key, value instanceof AbstractType ? value.clone() : value);
        });
        return map;
    }
    /**
   * Creates YMapEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */ _callObserver(transaction, parentSubs) {
        callTypeObservers(this, transaction, new YMapEvent(this, transaction, parentSubs));
    }
    /**
   * Transforms this Shared Type to a JSON object.
   *
   * @return {Object<string,any>}
   */ toJSON() {
        /**
     * @type {Object<string,MapType>}
     */ const map = {};
        this._map.forEach((item, key)=>{
            if (!item.deleted) {
                const v = item.content.getContent()[item.length - 1];
                map[key] = v instanceof AbstractType ? v.toJSON() : v;
            }
        });
        return map;
    }
    /**
   * Returns the size of the YMap (count of key/value pairs)
   *
   * @return {number}
   */ get size() {
        return [
            ...createMapIterator(this._map)
        ].length;
    }
    /**
   * Returns the keys for each element in the YMap Type.
   *
   * @return {IterableIterator<string>}
   */ keys() {
        return iterator__namespace.iteratorMap(createMapIterator(this._map), /** @param {any} v */ (v)=>v[0]);
    }
    /**
   * Returns the values for each element in the YMap Type.
   *
   * @return {IterableIterator<any>}
   */ values() {
        return iterator__namespace.iteratorMap(createMapIterator(this._map), /** @param {any} v */ (v)=>v[1].content.getContent()[v[1].length - 1]);
    }
    /**
   * Returns an Iterator of [key, value] pairs
   *
   * @return {IterableIterator<any>}
   */ entries() {
        return iterator__namespace.iteratorMap(createMapIterator(this._map), /** @param {any} v */ (v)=>[
                v[0],
                v[1].content.getContent()[v[1].length - 1]
            ]);
    }
    /**
   * Executes a provided function on once on every key-value pair.
   *
   * @param {function(MapType,string,YMap<MapType>):void} f A function to execute on every element of this YArray.
   */ forEach(f) {
        this._map.forEach((item, key)=>{
            if (!item.deleted) f(item.content.getContent()[item.length - 1], key, this);
        });
    }
    /**
   * Returns an Iterator of [key, value] pairs
   *
   * @return {IterableIterator<any>}
   */ [Symbol.iterator]() {
        return this.entries();
    }
    /**
   * Remove a specified element from this YMap.
   *
   * @param {string} key The key of the element to remove.
   */ delete(key) {
        if (this.doc !== null) transact(this.doc, (transaction)=>{
            typeMapDelete(transaction, this, key);
        });
        else /** @type {Map<string, any>} */ this._prelimContent.delete(key);
    }
    /**
   * Adds or updates an element with a specified key and value.
   *
   * @param {string} key The key of the element to add to this YMap
   * @param {MapType} value The value of the element to add
   */ set(key, value) {
        if (this.doc !== null) transact(this.doc, (transaction)=>{
            typeMapSet(transaction, this, key, value);
        });
        else /** @type {Map<string, any>} */ this._prelimContent.set(key, value);
        return value;
    }
    /**
   * Returns a specified element from this YMap.
   *
   * @param {string} key
   * @return {MapType|undefined}
   */ get(key) {
        return /** @type {any} */ typeMapGet(this, key);
    }
    /**
   * Returns a boolean indicating whether the specified key exists or not.
   *
   * @param {string} key The key to test.
   * @return {boolean}
   */ has(key) {
        return typeMapHas(this, key);
    }
    /**
   * Removes all elements from this YMap.
   */ clear() {
        if (this.doc !== null) transact(this.doc, (transaction)=>{
            this.forEach(function(value, key, map) {
                typeMapDelete(transaction, map, key);
            });
        });
        else /** @type {Map<string, any>} */ this._prelimContent.clear();
    }
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */ _write(encoder) {
        encoder.writeTypeRef(YMapRefID);
    }
}
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 *
 * @private
 * @function
 */ const readYMap = (decoder)=>new YMap();
/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */ const equalAttrs = (a, b)=>a === b || typeof a === "object" && typeof b === "object" && a && b && object__namespace.equalFlat(a, b);
class ItemTextListPosition {
    /**
   * @param {Item|null} left
   * @param {Item|null} right
   * @param {number} index
   * @param {Map<string,any>} currentAttributes
   */ constructor(left, right, index, currentAttributes){
        this.left = left;
        this.right = right;
        this.index = index;
        this.currentAttributes = currentAttributes;
    }
    /**
   * Only call this if you know that this.right is defined
   */ forward() {
        if (this.right === null) error__namespace.unexpectedCase();
        switch(this.right.content.constructor){
            case ContentFormat:
                if (!this.right.deleted) updateCurrentAttributes(this.currentAttributes, /** @type {ContentFormat} */ this.right.content);
                break;
            default:
                if (!this.right.deleted) this.index += this.right.length;
                break;
        }
        this.left = this.right;
        this.right = this.right.right;
    }
}
/**
 * @param {Transaction} transaction
 * @param {ItemTextListPosition} pos
 * @param {number} count steps to move forward
 * @return {ItemTextListPosition}
 *
 * @private
 * @function
 */ const findNextPosition = (transaction, pos, count)=>{
    while(pos.right !== null && count > 0){
        switch(pos.right.content.constructor){
            case ContentFormat:
                if (!pos.right.deleted) updateCurrentAttributes(pos.currentAttributes, /** @type {ContentFormat} */ pos.right.content);
                break;
            default:
                if (!pos.right.deleted) {
                    if (count < pos.right.length) // split right
                    getItemCleanStart(transaction, createID(pos.right.id.client, pos.right.id.clock + count));
                    pos.index += pos.right.length;
                    count -= pos.right.length;
                }
                break;
        }
        pos.left = pos.right;
        pos.right = pos.right.right;
    // pos.forward() - we don't forward because that would halve the performance because we already do the checks above
    }
    return pos;
};
/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {number} index
 * @return {ItemTextListPosition}
 *
 * @private
 * @function
 */ const findPosition = (transaction, parent, index)=>{
    const currentAttributes = new Map();
    const marker = findMarker(parent, index);
    if (marker) {
        const pos = new ItemTextListPosition(marker.p.left, marker.p, marker.index, currentAttributes);
        return findNextPosition(transaction, pos, index - marker.index);
    } else {
        const pos1 = new ItemTextListPosition(null, parent._start, 0, currentAttributes);
        return findNextPosition(transaction, pos1, index);
    }
};
/**
 * Negate applied formats
 *
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {ItemTextListPosition} currPos
 * @param {Map<string,any>} negatedAttributes
 *
 * @private
 * @function
 */ const insertNegatedAttributes = (transaction, parent, currPos, negatedAttributes)=>{
    // check if we really need to remove attributes
    while(currPos.right !== null && (currPos.right.deleted === true || currPos.right.content.constructor === ContentFormat && equalAttrs(negatedAttributes.get(/** @type {ContentFormat} */ currPos.right.content.key), /** @type {ContentFormat} */ currPos.right.content.value))){
        if (!currPos.right.deleted) negatedAttributes.delete(/** @type {ContentFormat} */ currPos.right.content.key);
        currPos.forward();
    }
    const doc = transaction.doc;
    const ownClientId = doc.clientID;
    negatedAttributes.forEach((val, key)=>{
        const left = currPos.left;
        const right = currPos.right;
        const nextFormat = new Item(createID(ownClientId, getState(doc.store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new ContentFormat(key, val));
        nextFormat.integrate(transaction, 0);
        currPos.right = nextFormat;
        currPos.forward();
    });
};
/**
 * @param {Map<string,any>} currentAttributes
 * @param {ContentFormat} format
 *
 * @private
 * @function
 */ const updateCurrentAttributes = (currentAttributes, format)=>{
    const { key , value  } = format;
    if (value === null) currentAttributes.delete(key);
    else currentAttributes.set(key, value);
};
/**
 * @param {ItemTextListPosition} currPos
 * @param {Object<string,any>} attributes
 *
 * @private
 * @function
 */ const minimizeAttributeChanges = (currPos, attributes)=>{
    // go right while attributes[right.key] === right.value (or right is deleted)
    while(true){
        if (currPos.right === null) break;
        else if (currPos.right.deleted || currPos.right.content.constructor === ContentFormat && equalAttrs(attributes[/** @type {ContentFormat} */ currPos.right.content.key] || null, /** @type {ContentFormat} */ currPos.right.content.value)) ;
        else break;
        currPos.forward();
    }
};
/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {ItemTextListPosition} currPos
 * @param {Object<string,any>} attributes
 * @return {Map<string,any>}
 *
 * @private
 * @function
 **/ const insertAttributes = (transaction, parent, currPos, attributes)=>{
    const doc = transaction.doc;
    const ownClientId = doc.clientID;
    const negatedAttributes = new Map();
    // insert format-start items
    for(const key in attributes){
        const val = attributes[key];
        const currentVal = currPos.currentAttributes.get(key) || null;
        if (!equalAttrs(currentVal, val)) {
            // save negated attribute (set null if currentVal undefined)
            negatedAttributes.set(key, currentVal);
            const { left , right  } = currPos;
            currPos.right = new Item(createID(ownClientId, getState(doc.store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new ContentFormat(key, val));
            currPos.right.integrate(transaction, 0);
            currPos.forward();
        }
    }
    return negatedAttributes;
};
/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {ItemTextListPosition} currPos
 * @param {string|object|AbstractType<any>} text
 * @param {Object<string,any>} attributes
 *
 * @private
 * @function
 **/ const insertText = (transaction, parent, currPos, text, attributes)=>{
    currPos.currentAttributes.forEach((val, key)=>{
        if (attributes[key] === undefined) attributes[key] = null;
    });
    const doc = transaction.doc;
    const ownClientId = doc.clientID;
    minimizeAttributeChanges(currPos, attributes);
    const negatedAttributes = insertAttributes(transaction, parent, currPos, attributes);
    // insert content
    const content = text.constructor === String ? new ContentString(/** @type {string} */ text) : text instanceof AbstractType ? new ContentType(text) : new ContentEmbed(text);
    let { left , right , index  } = currPos;
    if (parent._searchMarker) updateMarkerChanges(parent._searchMarker, currPos.index, content.getLength());
    right = new Item(createID(ownClientId, getState(doc.store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, content);
    right.integrate(transaction, 0);
    currPos.right = right;
    currPos.index = index;
    currPos.forward();
    insertNegatedAttributes(transaction, parent, currPos, negatedAttributes);
};
/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {ItemTextListPosition} currPos
 * @param {number} length
 * @param {Object<string,any>} attributes
 *
 * @private
 * @function
 */ const formatText = (transaction, parent, currPos, length, attributes)=>{
    const doc = transaction.doc;
    const ownClientId = doc.clientID;
    minimizeAttributeChanges(currPos, attributes);
    const negatedAttributes = insertAttributes(transaction, parent, currPos, attributes);
    // iterate until first non-format or null is found
    // delete all formats with attributes[format.key] != null
    // also check the attributes after the first non-format as we do not want to insert redundant negated attributes there
    // eslint-disable-next-line no-labels
    iterationLoop: while(currPos.right !== null && (length > 0 || negatedAttributes.size > 0 && (currPos.right.deleted || currPos.right.content.constructor === ContentFormat))){
        if (!currPos.right.deleted) switch(currPos.right.content.constructor){
            case ContentFormat:
                {
                    const { key , value  } = /** @type {ContentFormat} */ currPos.right.content;
                    const attr = attributes[key];
                    if (attr !== undefined) {
                        if (equalAttrs(attr, value)) negatedAttributes.delete(key);
                        else {
                            if (length === 0) break iterationLoop;
                            negatedAttributes.set(key, value);
                        }
                        currPos.right.delete(transaction);
                    } else currPos.currentAttributes.set(key, value);
                    break;
                }
            default:
                if (length < currPos.right.length) getItemCleanStart(transaction, createID(currPos.right.id.client, currPos.right.id.clock + length));
                length -= currPos.right.length;
                break;
        }
        currPos.forward();
    }
    // Quill just assumes that the editor starts with a newline and that it always
    // ends with a newline. We only insert that newline when a new newline is
    // inserted - i.e when length is bigger than type.length
    if (length > 0) {
        let newlines = "";
        for(; length > 0; length--)newlines += "\n";
        currPos.right = new Item(createID(ownClientId, getState(doc.store, ownClientId)), currPos.left, currPos.left && currPos.left.lastId, currPos.right, currPos.right && currPos.right.id, parent, null, new ContentString(newlines));
        currPos.right.integrate(transaction, 0);
        currPos.forward();
    }
    insertNegatedAttributes(transaction, parent, currPos, negatedAttributes);
};
/**
 * Call this function after string content has been deleted in order to
 * clean up formatting Items.
 *
 * @param {Transaction} transaction
 * @param {Item} start
 * @param {Item|null} curr exclusive end, automatically iterates to the next Content Item
 * @param {Map<string,any>} startAttributes
 * @param {Map<string,any>} currAttributes
 * @return {number} The amount of formatting Items deleted.
 *
 * @function
 */ const cleanupFormattingGap = (transaction, start, curr, startAttributes, currAttributes)=>{
    let end = curr;
    const endAttributes = map__namespace.copy(currAttributes);
    while(end && (!end.countable || end.deleted)){
        if (!end.deleted && end.content.constructor === ContentFormat) updateCurrentAttributes(endAttributes, /** @type {ContentFormat} */ end.content);
        end = end.right;
    }
    let cleanups = 0;
    let reachedEndOfCurr = false;
    while(start !== end){
        if (curr === start) reachedEndOfCurr = true;
        if (!start.deleted) {
            const content = start.content;
            switch(content.constructor){
                case ContentFormat:
                    {
                        const { key , value  } = /** @type {ContentFormat} */ content;
                        if ((endAttributes.get(key) || null) !== value || (startAttributes.get(key) || null) === value) {
                            // Either this format is overwritten or it is not necessary because the attribute already existed.
                            start.delete(transaction);
                            cleanups++;
                            if (!reachedEndOfCurr && (currAttributes.get(key) || null) === value && (startAttributes.get(key) || null) !== value) currAttributes.delete(key);
                        }
                        break;
                    }
            }
        }
        start = /** @type {Item} */ start.right;
    }
    return cleanups;
};
/**
 * @param {Transaction} transaction
 * @param {Item | null} item
 */ const cleanupContextlessFormattingGap = (transaction, item)=>{
    // iterate until item.right is null or content
    while(item && item.right && (item.right.deleted || !item.right.countable))item = item.right;
    const attrs = new Set();
    // iterate back until a content item is found
    while(item && (item.deleted || !item.countable)){
        if (!item.deleted && item.content.constructor === ContentFormat) {
            const key = /** @type {ContentFormat} */ item.content.key;
            if (attrs.has(key)) item.delete(transaction);
            else attrs.add(key);
        }
        item = item.left;
    }
};
/**
 * This function is experimental and subject to change / be removed.
 *
 * Ideally, we don't need this function at all. Formatting attributes should be cleaned up
 * automatically after each change. This function iterates twice over the complete YText type
 * and removes unnecessary formatting attributes. This is also helpful for testing.
 *
 * This function won't be exported anymore as soon as there is confidence that the YText type works as intended.
 *
 * @param {YText} type
 * @return {number} How many formatting attributes have been cleaned up.
 */ const cleanupYTextFormatting = (type)=>{
    let res = 0;
    transact(/** @type {Doc} */ type.doc, (transaction)=>{
        let start = /** @type {Item} */ type._start;
        let end = type._start;
        let startAttributes = map__namespace.create();
        const currentAttributes = map__namespace.copy(startAttributes);
        while(end){
            if (end.deleted === false) switch(end.content.constructor){
                case ContentFormat:
                    updateCurrentAttributes(currentAttributes, /** @type {ContentFormat} */ end.content);
                    break;
                default:
                    res += cleanupFormattingGap(transaction, start, end, startAttributes, currentAttributes);
                    startAttributes = map__namespace.copy(currentAttributes);
                    start = end;
                    break;
            }
            end = end.right;
        }
    });
    return res;
};
/**
 * @param {Transaction} transaction
 * @param {ItemTextListPosition} currPos
 * @param {number} length
 * @return {ItemTextListPosition}
 *
 * @private
 * @function
 */ const deleteText = (transaction, currPos, length)=>{
    const startLength = length;
    const startAttrs = map__namespace.copy(currPos.currentAttributes);
    const start = currPos.right;
    while(length > 0 && currPos.right !== null){
        if (currPos.right.deleted === false) switch(currPos.right.content.constructor){
            case ContentType:
            case ContentEmbed:
            case ContentString:
                if (length < currPos.right.length) getItemCleanStart(transaction, createID(currPos.right.id.client, currPos.right.id.clock + length));
                length -= currPos.right.length;
                currPos.right.delete(transaction);
                break;
        }
        currPos.forward();
    }
    if (start) cleanupFormattingGap(transaction, start, currPos.right, startAttrs, currPos.currentAttributes);
    const parent = /** @type {AbstractType<any>} */ /** @type {Item} */ (currPos.left || currPos.right).parent;
    if (parent._searchMarker) updateMarkerChanges(parent._searchMarker, currPos.index, -startLength + length);
    return currPos;
};
/**
 * The Quill Delta format represents changes on a text document with
 * formatting information. For mor information visit {@link https://quilljs.com/docs/delta/|Quill Delta}
 *
 * @example
 *   {
 *     ops: [
 *       { insert: 'Gandalf', attributes: { bold: true } },
 *       { insert: ' the ' },
 *       { insert: 'Grey', attributes: { color: '#cccccc' } }
 *     ]
 *   }
 *
 */ /**
  * Attributes that can be assigned to a selection of text.
  *
  * @example
  *   {
  *     bold: true,
  *     font-size: '40px'
  *   }
  *
  * @typedef {Object} TextAttributes
  */ /**
 * @extends YEvent<YText>
 * Event that describes the changes on a YText type.
 */ class YTextEvent extends YEvent {
    /**
   * @param {YText} ytext
   * @param {Transaction} transaction
   * @param {Set<any>} subs The keys that changed
   */ constructor(ytext, transaction, subs){
        super(ytext, transaction);
        /**
     * Whether the children changed.
     * @type {Boolean}
     * @private
     */ this.childListChanged = false;
        /**
     * Set of all changed attributes.
     * @type {Set<string>}
     */ this.keysChanged = new Set();
        subs.forEach((sub)=>{
            if (sub === null) this.childListChanged = true;
            else this.keysChanged.add(sub);
        });
    }
    /**
   * @type {{added:Set<Item>,deleted:Set<Item>,keys:Map<string,{action:'add'|'update'|'delete',oldValue:any}>,delta:Array<{insert?:Array<any>|string, delete?:number, retain?:number}>}}
   */ get changes() {
        if (this._changes === null) {
            /**
       * @type {{added:Set<Item>,deleted:Set<Item>,keys:Map<string,{action:'add'|'update'|'delete',oldValue:any}>,delta:Array<{insert?:Array<any>|string|AbstractType<any>|object, delete?:number, retain?:number}>}}
       */ const changes = {
                keys: this.keys,
                delta: this.delta,
                added: new Set(),
                deleted: new Set()
            };
            this._changes = changes;
        }
        return /** @type {any} */ this._changes;
    }
    /**
   * Compute the changes in the delta format.
   * A {@link https://quilljs.com/docs/delta/|Quill Delta}) that represents the changes on the document.
   *
   * @type {Array<{insert?:string|object|AbstractType<any>, delete?:number, retain?:number, attributes?: Object<string,any>}>}
   *
   * @public
   */ get delta() {
        if (this._delta === null) {
            const y = /** @type {Doc} */ this.target.doc;
            /**
       * @type {Array<{insert?:string|object|AbstractType<any>, delete?:number, retain?:number, attributes?: Object<string,any>}>}
       */ const delta = [];
            transact(y, (transaction)=>{
                const currentAttributes = new Map(); // saves all current attributes for insert
                const oldAttributes = new Map();
                let item = this.target._start;
                /**
         * @type {string?}
         */ let action = null;
                /**
         * @type {Object<string,any>}
         */ const attributes = {}; // counts added or removed new attributes for retain
                /**
         * @type {string|object}
         */ let insert = "";
                let retain = 0;
                let deleteLen = 0;
                const addOp = ()=>{
                    if (action !== null) {
                        /**
             * @type {any}
             */ let op;
                        switch(action){
                            case "delete":
                                op = {
                                    delete: deleteLen
                                };
                                deleteLen = 0;
                                break;
                            case "insert":
                                op = {
                                    insert
                                };
                                if (currentAttributes.size > 0) {
                                    op.attributes = {};
                                    currentAttributes.forEach((value, key)=>{
                                        if (value !== null) op.attributes[key] = value;
                                    });
                                }
                                insert = "";
                                break;
                            case "retain":
                                op = {
                                    retain
                                };
                                if (Object.keys(attributes).length > 0) {
                                    op.attributes = {};
                                    for(const key in attributes)op.attributes[key] = attributes[key];
                                }
                                retain = 0;
                                break;
                        }
                        delta.push(op);
                        action = null;
                    }
                };
                while(item !== null){
                    switch(item.content.constructor){
                        case ContentType:
                        case ContentEmbed:
                            if (this.adds(item)) {
                                if (!this.deletes(item)) {
                                    addOp();
                                    action = "insert";
                                    insert = item.content.getContent()[0];
                                    addOp();
                                }
                            } else if (this.deletes(item)) {
                                if (action !== "delete") {
                                    addOp();
                                    action = "delete";
                                }
                                deleteLen += 1;
                            } else if (!item.deleted) {
                                if (action !== "retain") {
                                    addOp();
                                    action = "retain";
                                }
                                retain += 1;
                            }
                            break;
                        case ContentString:
                            if (this.adds(item)) {
                                if (!this.deletes(item)) {
                                    if (action !== "insert") {
                                        addOp();
                                        action = "insert";
                                    }
                                    insert += /** @type {ContentString} */ item.content.str;
                                }
                            } else if (this.deletes(item)) {
                                if (action !== "delete") {
                                    addOp();
                                    action = "delete";
                                }
                                deleteLen += item.length;
                            } else if (!item.deleted) {
                                if (action !== "retain") {
                                    addOp();
                                    action = "retain";
                                }
                                retain += item.length;
                            }
                            break;
                        case ContentFormat:
                            {
                                const { key , value  } = /** @type {ContentFormat} */ item.content;
                                if (this.adds(item)) {
                                    if (!this.deletes(item)) {
                                        const curVal = currentAttributes.get(key) || null;
                                        if (!equalAttrs(curVal, value)) {
                                            if (action === "retain") addOp();
                                            if (equalAttrs(value, oldAttributes.get(key) || null)) delete attributes[key];
                                            else attributes[key] = value;
                                        } else if (value !== null) item.delete(transaction);
                                    }
                                } else if (this.deletes(item)) {
                                    oldAttributes.set(key, value);
                                    const curVal1 = currentAttributes.get(key) || null;
                                    if (!equalAttrs(curVal1, value)) {
                                        if (action === "retain") addOp();
                                        attributes[key] = curVal1;
                                    }
                                } else if (!item.deleted) {
                                    oldAttributes.set(key, value);
                                    const attr = attributes[key];
                                    if (attr !== undefined) {
                                        if (!equalAttrs(attr, value)) {
                                            if (action === "retain") addOp();
                                            if (value === null) delete attributes[key];
                                            else attributes[key] = value;
                                        } else if (attr !== null) item.delete(transaction);
                                    }
                                }
                                if (!item.deleted) {
                                    if (action === "insert") addOp();
                                    updateCurrentAttributes(currentAttributes, /** @type {ContentFormat} */ item.content);
                                }
                                break;
                            }
                    }
                    item = item.right;
                }
                addOp();
                while(delta.length > 0){
                    const lastOp = delta[delta.length - 1];
                    if (lastOp.retain !== undefined && lastOp.attributes === undefined) // retain delta's if they don't assign attributes
                    delta.pop();
                    else break;
                }
            });
            this._delta = delta;
        }
        return /** @type {any} */ this._delta;
    }
}
/**
 * Type that represents text with formatting information.
 *
 * This type replaces y-richtext as this implementation is able to handle
 * block formats (format information on a paragraph), embeds (complex elements
 * like pictures and videos), and text formats (**bold**, *italic*).
 *
 * @extends AbstractType<YTextEvent>
 */ class YText extends AbstractType {
    /**
   * @param {String} [string] The initial value of the YText.
   */ constructor(string){
        super();
        /**
     * Array of pending operations on this type
     * @type {Array<function():void>?}
     */ this._pending = string !== undefined ? [
            ()=>this.insert(0, string)
        ] : [];
        /**
     * @type {Array<ArraySearchMarker>}
     */ this._searchMarker = [];
    }
    /**
   * Number of characters of this text type.
   *
   * @type {number}
   */ get length() {
        return this._length;
    }
    /**
   * @param {Doc} y
   * @param {Item} item
   */ _integrate(y, item) {
        super._integrate(y, item);
        try {
            /** @type {Array<function>} */ this._pending.forEach((f)=>f());
        } catch (e) {
            console.error(e);
        }
        this._pending = null;
    }
    _copy() {
        return new YText();
    }
    /**
   * @return {YText}
   */ clone() {
        const text = new YText();
        text.applyDelta(this.toDelta());
        return text;
    }
    /**
   * Creates YTextEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */ _callObserver(transaction, parentSubs) {
        super._callObserver(transaction, parentSubs);
        const event = new YTextEvent(this, transaction, parentSubs);
        const doc = transaction.doc;
        callTypeObservers(this, transaction, event);
        // If a remote change happened, we try to cleanup potential formatting duplicates.
        if (!transaction.local) {
            // check if another formatting item was inserted
            let foundFormattingItem = false;
            for (const [client, afterClock] of transaction.afterState.entries()){
                const clock = transaction.beforeState.get(client) || 0;
                if (afterClock === clock) continue;
                iterateStructs(transaction, /** @type {Array<Item|GC>} */ doc.store.clients.get(client), clock, afterClock, (item)=>{
                    if (!item.deleted && /** @type {Item} */ item.content.constructor === ContentFormat) foundFormattingItem = true;
                });
                if (foundFormattingItem) break;
            }
            if (!foundFormattingItem) iterateDeletedStructs(transaction, transaction.deleteSet, (item)=>{
                if (item instanceof GC || foundFormattingItem) return;
                if (item.parent === this && item.content.constructor === ContentFormat) foundFormattingItem = true;
            });
            transact(doc, (t)=>{
                if (foundFormattingItem) // If a formatting item was inserted, we simply clean the whole type.
                // We need to compute currentAttributes for the current position anyway.
                cleanupYTextFormatting(this);
                else // If no formatting attribute was inserted, we can make due with contextless
                // formatting cleanups.
                // Contextless: it is not necessary to compute currentAttributes for the affected position.
                iterateDeletedStructs(t, t.deleteSet, (item)=>{
                    if (item instanceof GC) return;
                    if (item.parent === this) cleanupContextlessFormattingGap(t, item);
                });
            });
        }
    }
    /**
   * Returns the unformatted string representation of this YText type.
   *
   * @public
   */ toString() {
        let str = "";
        /**
     * @type {Item|null}
     */ let n = this._start;
        while(n !== null){
            if (!n.deleted && n.countable && n.content.constructor === ContentString) str += /** @type {ContentString} */ n.content.str;
            n = n.right;
        }
        return str;
    }
    /**
   * Returns the unformatted string representation of this YText type.
   *
   * @return {string}
   * @public
   */ toJSON() {
        return this.toString();
    }
    /**
   * Apply a {@link Delta} on this shared YText type.
   *
   * @param {any} delta The changes to apply on this element.
   * @param {object}  [opts]
   * @param {boolean} [opts.sanitize] Sanitize input delta. Removes ending newlines if set to true.
   *
   *
   * @public
   */ applyDelta(delta, { sanitize =true  } = {}) {
        if (this.doc !== null) transact(this.doc, (transaction)=>{
            const currPos = new ItemTextListPosition(null, this._start, 0, new Map());
            for(let i = 0; i < delta.length; i++){
                const op = delta[i];
                if (op.insert !== undefined) {
                    // Quill assumes that the content starts with an empty paragraph.
                    // Yjs/Y.Text assumes that it starts empty. We always hide that
                    // there is a newline at the end of the content.
                    // If we omit this step, clients will see a different number of
                    // paragraphs, but nothing bad will happen.
                    const ins = !sanitize && typeof op.insert === "string" && i === delta.length - 1 && currPos.right === null && op.insert.slice(-1) === "\n" ? op.insert.slice(0, -1) : op.insert;
                    if (typeof ins !== "string" || ins.length > 0) insertText(transaction, this, currPos, ins, op.attributes || {});
                } else if (op.retain !== undefined) formatText(transaction, this, currPos, op.retain, op.attributes || {});
                else if (op.delete !== undefined) deleteText(transaction, currPos, op.delete);
            }
        });
        else /** @type {Array<function>} */ this._pending.push(()=>this.applyDelta(delta));
    }
    /**
   * Returns the Delta representation of this YText type.
   *
   * @param {Snapshot} [snapshot]
   * @param {Snapshot} [prevSnapshot]
   * @param {function('removed' | 'added', ID):any} [computeYChange]
   * @return {any} The Delta representation of this type.
   *
   * @public
   */ toDelta(snapshot, prevSnapshot, computeYChange) {
        /**
     * @type{Array<any>}
     */ const ops = [];
        const currentAttributes = new Map();
        const doc = /** @type {Doc} */ this.doc;
        let str = "";
        let n = this._start;
        function packStr() {
            if (str.length > 0) {
                // pack str with attributes to ops
                /**
         * @type {Object<string,any>}
         */ const attributes = {};
                let addAttributes = false;
                currentAttributes.forEach((value, key)=>{
                    addAttributes = true;
                    attributes[key] = value;
                });
                /**
         * @type {Object<string,any>}
         */ const op = {
                    insert: str
                };
                if (addAttributes) op.attributes = attributes;
                ops.push(op);
                str = "";
            }
        }
        // snapshots are merged again after the transaction, so we need to keep the
        // transalive until we are done
        transact(doc, (transaction)=>{
            if (snapshot) splitSnapshotAffectedStructs(transaction, snapshot);
            if (prevSnapshot) splitSnapshotAffectedStructs(transaction, prevSnapshot);
            while(n !== null){
                if (isVisible(n, snapshot) || prevSnapshot !== undefined && isVisible(n, prevSnapshot)) switch(n.content.constructor){
                    case ContentString:
                        {
                            const cur = currentAttributes.get("ychange");
                            if (snapshot !== undefined && !isVisible(n, snapshot)) {
                                if (cur === undefined || cur.user !== n.id.client || cur.type !== "removed") {
                                    packStr();
                                    currentAttributes.set("ychange", computeYChange ? computeYChange("removed", n.id) : {
                                        type: "removed"
                                    });
                                }
                            } else if (prevSnapshot !== undefined && !isVisible(n, prevSnapshot)) {
                                if (cur === undefined || cur.user !== n.id.client || cur.type !== "added") {
                                    packStr();
                                    currentAttributes.set("ychange", computeYChange ? computeYChange("added", n.id) : {
                                        type: "added"
                                    });
                                }
                            } else if (cur !== undefined) {
                                packStr();
                                currentAttributes.delete("ychange");
                            }
                            str += /** @type {ContentString} */ n.content.str;
                            break;
                        }
                    case ContentType:
                    case ContentEmbed:
                        {
                            packStr();
                            /**
               * @type {Object<string,any>}
               */ const op = {
                                insert: n.content.getContent()[0]
                            };
                            if (currentAttributes.size > 0) {
                                const attrs = /** @type {Object<string,any>} */ {};
                                op.attributes = attrs;
                                currentAttributes.forEach((value, key)=>{
                                    attrs[key] = value;
                                });
                            }
                            ops.push(op);
                            break;
                        }
                    case ContentFormat:
                        if (isVisible(n, snapshot)) {
                            packStr();
                            updateCurrentAttributes(currentAttributes, /** @type {ContentFormat} */ n.content);
                        }
                        break;
                }
                n = n.right;
            }
            packStr();
        }, "cleanup");
        return ops;
    }
    /**
   * Insert text at a given index.
   *
   * @param {number} index The index at which to start inserting.
   * @param {String} text The text to insert at the specified position.
   * @param {TextAttributes} [attributes] Optionally define some formatting
   *                                    information to apply on the inserted
   *                                    Text.
   * @public
   */ insert(index, text, attributes) {
        if (text.length <= 0) return;
        const y = this.doc;
        if (y !== null) transact(y, (transaction)=>{
            const pos = findPosition(transaction, this, index);
            if (!attributes) {
                attributes = {};
                // @ts-ignore
                pos.currentAttributes.forEach((v, k)=>{
                    attributes[k] = v;
                });
            }
            insertText(transaction, this, pos, text, attributes);
        });
        else /** @type {Array<function>} */ this._pending.push(()=>this.insert(index, text, attributes));
    }
    /**
   * Inserts an embed at a index.
   *
   * @param {number} index The index to insert the embed at.
   * @param {Object | AbstractType<any>} embed The Object that represents the embed.
   * @param {TextAttributes} attributes Attribute information to apply on the
   *                                    embed
   *
   * @public
   */ insertEmbed(index, embed, attributes = {}) {
        const y = this.doc;
        if (y !== null) transact(y, (transaction)=>{
            const pos = findPosition(transaction, this, index);
            insertText(transaction, this, pos, embed, attributes);
        });
        else /** @type {Array<function>} */ this._pending.push(()=>this.insertEmbed(index, embed, attributes));
    }
    /**
   * Deletes text starting from an index.
   *
   * @param {number} index Index at which to start deleting.
   * @param {number} length The number of characters to remove. Defaults to 1.
   *
   * @public
   */ delete(index, length) {
        if (length === 0) return;
        const y = this.doc;
        if (y !== null) transact(y, (transaction)=>{
            deleteText(transaction, findPosition(transaction, this, index), length);
        });
        else /** @type {Array<function>} */ this._pending.push(()=>this.delete(index, length));
    }
    /**
   * Assigns properties to a range of text.
   *
   * @param {number} index The position where to start formatting.
   * @param {number} length The amount of characters to assign properties to.
   * @param {TextAttributes} attributes Attribute information to apply on the
   *                                    text.
   *
   * @public
   */ format(index, length, attributes) {
        if (length === 0) return;
        const y = this.doc;
        if (y !== null) transact(y, (transaction)=>{
            const pos = findPosition(transaction, this, index);
            if (pos.right === null) return;
            formatText(transaction, this, pos, length, attributes);
        });
        else /** @type {Array<function>} */ this._pending.push(()=>this.format(index, length, attributes));
    }
    /**
   * Removes an attribute.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that is to be removed.
   *
   * @public
   */ removeAttribute(attributeName) {
        if (this.doc !== null) transact(this.doc, (transaction)=>{
            typeMapDelete(transaction, this, attributeName);
        });
        else /** @type {Array<function>} */ this._pending.push(()=>this.removeAttribute(attributeName));
    }
    /**
   * Sets or updates an attribute.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that is to be set.
   * @param {any} attributeValue The attribute value that is to be set.
   *
   * @public
   */ setAttribute(attributeName, attributeValue) {
        if (this.doc !== null) transact(this.doc, (transaction)=>{
            typeMapSet(transaction, this, attributeName, attributeValue);
        });
        else /** @type {Array<function>} */ this._pending.push(()=>this.setAttribute(attributeName, attributeValue));
    }
    /**
   * Returns an attribute value that belongs to the attribute name.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that identifies the
   *                               queried value.
   * @return {any} The queried attribute value.
   *
   * @public
   */ getAttribute(attributeName) {
        return /** @type {any} */ typeMapGet(this, attributeName);
    }
    /**
   * Returns all attribute name/value pairs in a JSON Object.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {Snapshot} [snapshot]
   * @return {Object<string, any>} A JSON Object that describes the attributes.
   *
   * @public
   */ getAttributes(snapshot) {
        return typeMapGetAll(this);
    }
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */ _write(encoder) {
        encoder.writeTypeRef(YTextRefID);
    }
}
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 * @return {YText}
 *
 * @private
 * @function
 */ const readYText = (decoder)=>new YText();
/**
 * @module YXml
 */ /**
 * Define the elements to which a set of CSS queries apply.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors|CSS_Selectors}
 *
 * @example
 *   query = '.classSelector'
 *   query = 'nodeSelector'
 *   query = '#idSelector'
 *
 * @typedef {string} CSS_Selector
 */ /**
 * Dom filter function.
 *
 * @callback domFilter
 * @param {string} nodeName The nodeName of the element
 * @param {Map} attributes The map of attributes.
 * @return {boolean} Whether to include the Dom node in the YXmlElement.
 */ /**
 * Represents a subset of the nodes of a YXmlElement / YXmlFragment and a
 * position within them.
 *
 * Can be created with {@link YXmlFragment#createTreeWalker}
 *
 * @public
 * @implements {Iterable<YXmlElement|YXmlText|YXmlElement|YXmlHook>}
 */ class YXmlTreeWalker {
    /**
   * @param {YXmlFragment | YXmlElement} root
   * @param {function(AbstractType<any>):boolean} [f]
   */ constructor(root, f = ()=>true){
        this._filter = f;
        this._root = root;
        /**
     * @type {Item}
     */ this._currentNode = /** @type {Item} */ root._start;
        this._firstCall = true;
    }
    [Symbol.iterator]() {
        return this;
    }
    /**
   * Get the next node.
   *
   * @return {IteratorResult<YXmlElement|YXmlText|YXmlHook>} The next node.
   *
   * @public
   */ next() {
        /**
     * @type {Item|null}
     */ let n = this._currentNode;
        let type = n && n.content && /** @type {any} */ n.content.type;
        if (n !== null && (!this._firstCall || n.deleted || !this._filter(type))) do {
            type = /** @type {any} */ n.content.type;
            if (!n.deleted && (type.constructor === YXmlElement || type.constructor === YXmlFragment) && type._start !== null) // walk down in the tree
            n = type._start;
            else // walk right or up in the tree
            while(n !== null){
                if (n.right !== null) {
                    n = n.right;
                    break;
                } else if (n.parent === this._root) n = null;
                else n = /** @type {AbstractType<any>} */ n.parent._item;
            }
        }while (n !== null && (n.deleted || !this._filter(/** @type {ContentType} */ n.content.type)));
        this._firstCall = false;
        if (n === null) // @ts-ignore
        return {
            value: undefined,
            done: true
        };
        this._currentNode = n;
        return {
            value: /** @type {any} */ n.content.type,
            done: false
        };
    }
}
/**
 * Represents a list of {@link YXmlElement}.and {@link YXmlText} types.
 * A YxmlFragment is similar to a {@link YXmlElement}, but it does not have a
 * nodeName and it does not have attributes. Though it can be bound to a DOM
 * element - in this case the attributes and the nodeName are not shared.
 *
 * @public
 * @extends AbstractType<YXmlEvent>
 */ class YXmlFragment extends AbstractType {
    constructor(){
        super();
        /**
     * @type {Array<any>|null}
     */ this._prelimContent = [];
    }
    /**
   * @type {YXmlElement|YXmlText|null}
   */ get firstChild() {
        const first = this._first;
        return first ? first.content.getContent()[0] : null;
    }
    /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */ _integrate(y, item) {
        super._integrate(y, item);
        this.insert(0, /** @type {Array<any>} */ this._prelimContent);
        this._prelimContent = null;
    }
    _copy() {
        return new YXmlFragment();
    }
    /**
   * @return {YXmlFragment}
   */ clone() {
        const el = new YXmlFragment();
        // @ts-ignore
        el.insert(0, this.toArray().map((item)=>item instanceof AbstractType ? item.clone() : item));
        return el;
    }
    get length() {
        return this._prelimContent === null ? this._length : this._prelimContent.length;
    }
    /**
   * Create a subtree of childNodes.
   *
   * @example
   * const walker = elem.createTreeWalker(dom => dom.nodeName === 'div')
   * for (let node in walker) {
   *   // `node` is a div node
   *   nop(node)
   * }
   *
   * @param {function(AbstractType<any>):boolean} filter Function that is called on each child element and
   *                          returns a Boolean indicating whether the child
   *                          is to be included in the subtree.
   * @return {YXmlTreeWalker} A subtree and a position within it.
   *
   * @public
   */ createTreeWalker(filter) {
        return new YXmlTreeWalker(this, filter);
    }
    /**
   * Returns the first YXmlElement that matches the query.
   * Similar to DOM's {@link querySelector}.
   *
   * Query support:
   *   - tagname
   * TODO:
   *   - id
   *   - attribute
   *
   * @param {CSS_Selector} query The query on the children.
   * @return {YXmlElement|YXmlText|YXmlHook|null} The first element that matches the query or null.
   *
   * @public
   */ querySelector(query) {
        query = query.toUpperCase();
        // @ts-ignore
        const iterator = new YXmlTreeWalker(this, (element)=>element.nodeName && element.nodeName.toUpperCase() === query);
        const next = iterator.next();
        if (next.done) return null;
        else return next.value;
    }
    /**
   * Returns all YXmlElements that match the query.
   * Similar to Dom's {@link querySelectorAll}.
   *
   * @todo Does not yet support all queries. Currently only query by tagName.
   *
   * @param {CSS_Selector} query The query on the children
   * @return {Array<YXmlElement|YXmlText|YXmlHook|null>} The elements that match this query.
   *
   * @public
   */ querySelectorAll(query) {
        query = query.toUpperCase();
        // @ts-ignore
        return Array.from(new YXmlTreeWalker(this, (element)=>element.nodeName && element.nodeName.toUpperCase() === query));
    }
    /**
   * Creates YXmlEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */ _callObserver(transaction, parentSubs) {
        callTypeObservers(this, transaction, new YXmlEvent(this, parentSubs, transaction));
    }
    /**
   * Get the string representation of all the children of this YXmlFragment.
   *
   * @return {string} The string representation of all children.
   */ toString() {
        return typeListMap(this, (xml)=>xml.toString()).join("");
    }
    /**
   * @return {string}
   */ toJSON() {
        return this.toString();
    }
    /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks={}] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Node} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */ toDOM(_document = document, hooks = {}, binding) {
        const fragment = _document.createDocumentFragment();
        if (binding !== undefined) binding._createAssociation(fragment, this);
        typeListForEach(this, (xmlType)=>{
            fragment.insertBefore(xmlType.toDOM(_document, hooks, binding), null);
        });
        return fragment;
    }
    /**
   * Inserts new content at an index.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  xml.insert(0, [new Y.XmlText('text')])
   *
   * @param {number} index The index to insert content at
   * @param {Array<YXmlElement|YXmlText>} content The array of content
   */ insert(index, content) {
        if (this.doc !== null) transact(this.doc, (transaction)=>{
            typeListInsertGenerics(transaction, this, index, content);
        });
        else // @ts-ignore _prelimContent is defined because this is not yet integrated
        this._prelimContent.splice(index, 0, ...content);
    }
    /**
   * Inserts new content at an index.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  xml.insert(0, [new Y.XmlText('text')])
   *
   * @param {null|Item|YXmlElement|YXmlText} ref The index to insert content at
   * @param {Array<YXmlElement|YXmlText>} content The array of content
   */ insertAfter(ref, content) {
        if (this.doc !== null) transact(this.doc, (transaction)=>{
            const refItem = ref && ref instanceof AbstractType ? ref._item : ref;
            typeListInsertGenericsAfter(transaction, this, refItem, content);
        });
        else {
            const pc = /** @type {Array<any>} */ this._prelimContent;
            const index = ref === null ? 0 : pc.findIndex((el)=>el === ref) + 1;
            if (index === 0 && ref !== null) throw error__namespace.create("Reference item not found");
            pc.splice(index, 0, ...content);
        }
    }
    /**
   * Deletes elements starting from an index.
   *
   * @param {number} index Index at which to start deleting elements
   * @param {number} [length=1] The number of elements to remove. Defaults to 1.
   */ delete(index, length = 1) {
        if (this.doc !== null) transact(this.doc, (transaction)=>{
            typeListDelete(transaction, this, index, length);
        });
        else // @ts-ignore _prelimContent is defined because this is not yet integrated
        this._prelimContent.splice(index, length);
    }
    /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @return {Array<YXmlElement|YXmlText|YXmlHook>}
   */ toArray() {
        return typeListToArray(this);
    }
    /**
   * Appends content to this YArray.
   *
   * @param {Array<YXmlElement|YXmlText>} content Array of content to append.
   */ push(content) {
        this.insert(this.length, content);
    }
    /**
   * Preppends content to this YArray.
   *
   * @param {Array<YXmlElement|YXmlText>} content Array of content to preppend.
   */ unshift(content) {
        this.insert(0, content);
    }
    /**
   * Returns the i-th element from a YArray.
   *
   * @param {number} index The index of the element to return from the YArray
   * @return {YXmlElement|YXmlText}
   */ get(index) {
        return typeListGet(this, index);
    }
    /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @param {number} [start]
   * @param {number} [end]
   * @return {Array<YXmlElement|YXmlText>}
   */ slice(start = 0, end = this.length) {
        return typeListSlice(this, start, end);
    }
    /**
   * Executes a provided function on once on overy child element.
   *
   * @param {function(YXmlElement|YXmlText,number, typeof this):void} f A function to execute on every element of this YArray.
   */ forEach(f) {
        typeListForEach(this, f);
    }
    /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   */ _write(encoder) {
        encoder.writeTypeRef(YXmlFragmentRefID);
    }
}
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 * @return {YXmlFragment}
 *
 * @private
 * @function
 */ const readYXmlFragment = (decoder)=>new YXmlFragment();
/**
 * An YXmlElement imitates the behavior of a
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}.
 *
 * * An YXmlElement has attributes (key value pairs)
 * * An YXmlElement has childElements that must inherit from YXmlElement
 */ class YXmlElement extends YXmlFragment {
    constructor(nodeName = "UNDEFINED"){
        super();
        this.nodeName = nodeName;
        /**
     * @type {Map<string, any>|null}
     */ this._prelimAttrs = new Map();
    }
    /**
   * @type {YXmlElement|YXmlText|null}
   */ get nextSibling() {
        const n = this._item ? this._item.next : null;
        return n ? /** @type {YXmlElement|YXmlText} */ /** @type {ContentType} */ n.content.type : null;
    }
    /**
   * @type {YXmlElement|YXmlText|null}
   */ get prevSibling() {
        const n = this._item ? this._item.prev : null;
        return n ? /** @type {YXmlElement|YXmlText} */ /** @type {ContentType} */ n.content.type : null;
    }
    /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */ _integrate(y, item) {
        super._integrate(y, item);
        /** @type {Map<string, any>} */ this._prelimAttrs.forEach((value, key)=>{
            this.setAttribute(key, value);
        });
        this._prelimAttrs = null;
    }
    /**
   * Creates an Item with the same effect as this Item (without position effect)
   *
   * @return {YXmlElement}
   */ _copy() {
        return new YXmlElement(this.nodeName);
    }
    /**
   * @return {YXmlElement}
   */ clone() {
        const el = new YXmlElement(this.nodeName);
        const attrs = this.getAttributes();
        for(const key in attrs)el.setAttribute(key, attrs[key]);
        // @ts-ignore
        el.insert(0, this.toArray().map((item)=>item instanceof AbstractType ? item.clone() : item));
        return el;
    }
    /**
   * Returns the XML serialization of this YXmlElement.
   * The attributes are ordered by attribute-name, so you can easily use this
   * method to compare YXmlElements
   *
   * @return {string} The string representation of this type.
   *
   * @public
   */ toString() {
        const attrs = this.getAttributes();
        const stringBuilder = [];
        const keys = [];
        for(const key in attrs)keys.push(key);
        keys.sort();
        const keysLen = keys.length;
        for(let i = 0; i < keysLen; i++){
            const key1 = keys[i];
            stringBuilder.push(key1 + '="' + attrs[key1] + '"');
        }
        const nodeName = this.nodeName.toLocaleLowerCase();
        const attrsString = stringBuilder.length > 0 ? " " + stringBuilder.join(" ") : "";
        return `<${nodeName}${attrsString}>${super.toString()}</${nodeName}>`;
    }
    /**
   * Removes an attribute from this YXmlElement.
   *
   * @param {String} attributeName The attribute name that is to be removed.
   *
   * @public
   */ removeAttribute(attributeName) {
        if (this.doc !== null) transact(this.doc, (transaction)=>{
            typeMapDelete(transaction, this, attributeName);
        });
        else /** @type {Map<string,any>} */ this._prelimAttrs.delete(attributeName);
    }
    /**
   * Sets or updates an attribute.
   *
   * @param {String} attributeName The attribute name that is to be set.
   * @param {String} attributeValue The attribute value that is to be set.
   *
   * @public
   */ setAttribute(attributeName, attributeValue) {
        if (this.doc !== null) transact(this.doc, (transaction)=>{
            typeMapSet(transaction, this, attributeName, attributeValue);
        });
        else /** @type {Map<string, any>} */ this._prelimAttrs.set(attributeName, attributeValue);
    }
    /**
   * Returns an attribute value that belongs to the attribute name.
   *
   * @param {String} attributeName The attribute name that identifies the
   *                               queried value.
   * @return {String} The queried attribute value.
   *
   * @public
   */ getAttribute(attributeName) {
        return /** @type {any} */ typeMapGet(this, attributeName);
    }
    /**
   * Returns whether an attribute exists
   *
   * @param {String} attributeName The attribute name to check for existence.
   * @return {boolean} whether the attribute exists.
   *
   * @public
   */ hasAttribute(attributeName) {
        return /** @type {any} */ typeMapHas(this, attributeName);
    }
    /**
   * Returns all attribute name/value pairs in a JSON Object.
   *
   * @return {Object<string, any>} A JSON Object that describes the attributes.
   *
   * @public
   */ getAttributes() {
        return typeMapGetAll(this);
    }
    /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks={}] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Node} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */ toDOM(_document = document, hooks = {}, binding) {
        const dom = _document.createElement(this.nodeName);
        const attrs = this.getAttributes();
        for(const key in attrs)dom.setAttribute(key, attrs[key]);
        typeListForEach(this, (yxml)=>{
            dom.appendChild(yxml.toDOM(_document, hooks, binding));
        });
        if (binding !== undefined) binding._createAssociation(dom, this);
        return dom;
    }
    /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   */ _write(encoder) {
        encoder.writeTypeRef(YXmlElementRefID);
        encoder.writeKey(this.nodeName);
    }
}
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 * @return {YXmlElement}
 *
 * @function
 */ const readYXmlElement = (decoder)=>new YXmlElement(decoder.readKey());
/**
 * @extends YEvent<YXmlElement|YXmlText|YXmlFragment>
 * An Event that describes changes on a YXml Element or Yxml Fragment
 */ class YXmlEvent extends YEvent {
    /**
   * @param {YXmlElement|YXmlText|YXmlFragment} target The target on which the event is created.
   * @param {Set<string|null>} subs The set of changed attributes. `null` is included if the
   *                   child list changed.
   * @param {Transaction} transaction The transaction instance with wich the
   *                                  change was created.
   */ constructor(target, subs, transaction){
        super(target, transaction);
        /**
     * Whether the children changed.
     * @type {Boolean}
     * @private
     */ this.childListChanged = false;
        /**
     * Set of all changed attributes.
     * @type {Set<string>}
     */ this.attributesChanged = new Set();
        subs.forEach((sub)=>{
            if (sub === null) this.childListChanged = true;
            else this.attributesChanged.add(sub);
        });
    }
}
/**
 * You can manage binding to a custom type with YXmlHook.
 *
 * @extends {YMap<any>}
 */ class YXmlHook extends YMap {
    /**
   * @param {string} hookName nodeName of the Dom Node.
   */ constructor(hookName){
        super();
        /**
     * @type {string}
     */ this.hookName = hookName;
    }
    /**
   * Creates an Item with the same effect as this Item (without position effect)
   */ _copy() {
        return new YXmlHook(this.hookName);
    }
    /**
   * @return {YXmlHook}
   */ clone() {
        const el = new YXmlHook(this.hookName);
        this.forEach((value, key)=>{
            el.set(key, value);
        });
        return el;
    }
    /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object.<string, any>} [hooks] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type
   * @return {Element} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */ toDOM(_document = document, hooks = {}, binding) {
        const hook = hooks[this.hookName];
        let dom;
        if (hook !== undefined) dom = hook.createDom(this);
        else dom = document.createElement(this.hookName);
        dom.setAttribute("data-yjs-hook", this.hookName);
        if (binding !== undefined) binding._createAssociation(dom, this);
        return dom;
    }
    /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   */ _write(encoder) {
        encoder.writeTypeRef(YXmlHookRefID);
        encoder.writeKey(this.hookName);
    }
}
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 * @return {YXmlHook}
 *
 * @private
 * @function
 */ const readYXmlHook = (decoder)=>new YXmlHook(decoder.readKey());
/**
 * Represents text in a Dom Element. In the future this type will also handle
 * simple formatting information like bold and italic.
 */ class YXmlText extends YText {
    /**
   * @type {YXmlElement|YXmlText|null}
   */ get nextSibling() {
        const n = this._item ? this._item.next : null;
        return n ? /** @type {YXmlElement|YXmlText} */ /** @type {ContentType} */ n.content.type : null;
    }
    /**
   * @type {YXmlElement|YXmlText|null}
   */ get prevSibling() {
        const n = this._item ? this._item.prev : null;
        return n ? /** @type {YXmlElement|YXmlText} */ /** @type {ContentType} */ n.content.type : null;
    }
    _copy() {
        return new YXmlText();
    }
    /**
   * @return {YXmlText}
   */ clone() {
        const text = new YXmlText();
        text.applyDelta(this.toDelta());
        return text;
    }
    /**
   * Creates a Dom Element that mirrors this YXmlText.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Text} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */ toDOM(_document = document, hooks, binding) {
        const dom = _document.createTextNode(this.toString());
        if (binding !== undefined) binding._createAssociation(dom, this);
        return dom;
    }
    toString() {
        // @ts-ignore
        return this.toDelta().map((delta)=>{
            const nestedNodes = [];
            for(const nodeName in delta.attributes){
                const attrs = [];
                for(const key in delta.attributes[nodeName])attrs.push({
                    key,
                    value: delta.attributes[nodeName][key]
                });
                // sort attributes to get a unique order
                attrs.sort((a, b)=>a.key < b.key ? -1 : 1);
                nestedNodes.push({
                    nodeName,
                    attrs
                });
            }
            // sort node order to get a unique order
            nestedNodes.sort((a, b)=>a.nodeName < b.nodeName ? -1 : 1);
            // now convert to dom string
            let str = "";
            for(let i = 0; i < nestedNodes.length; i++){
                const node = nestedNodes[i];
                str += `<${node.nodeName}`;
                for(let j = 0; j < node.attrs.length; j++){
                    const attr = node.attrs[j];
                    str += ` ${attr.key}="${attr.value}"`;
                }
                str += ">";
            }
            str += delta.insert;
            for(let i1 = nestedNodes.length - 1; i1 >= 0; i1--)str += `</${nestedNodes[i1].nodeName}>`;
            return str;
        }).join("");
    }
    /**
   * @return {string}
   */ toJSON() {
        return this.toString();
    }
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */ _write(encoder) {
        encoder.writeTypeRef(YXmlTextRefID);
    }
}
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 * @return {YXmlText}
 *
 * @private
 * @function
 */ const readYXmlText = (decoder)=>new YXmlText();
class AbstractStruct {
    /**
   * @param {ID} id
   * @param {number} length
   */ constructor(id, length){
        this.id = id;
        this.length = length;
    }
    /**
   * @type {boolean}
   */ get deleted() {
        throw error__namespace.methodUnimplemented();
    }
    /**
   * Merge this struct with the item to the right.
   * This method is already assuming that `this.id.clock + this.length === this.id.clock`.
   * Also this method does *not* remove right from StructStore!
   * @param {AbstractStruct} right
   * @return {boolean} wether this merged with right
   */ mergeWith(right) {
        return false;
    }
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   * @param {number} offset
   * @param {number} encodingRef
   */ write(encoder, offset, encodingRef) {
        throw error__namespace.methodUnimplemented();
    }
    /**
   * @param {Transaction} transaction
   * @param {number} offset
   */ integrate(transaction, offset) {
        throw error__namespace.methodUnimplemented();
    }
}
const structGCRefNumber = 0;
/**
 * @private
 */ class GC extends AbstractStruct {
    get deleted() {
        return true;
    }
    delete() {}
    /**
   * @param {GC} right
   * @return {boolean}
   */ mergeWith(right) {
        if (this.constructor !== right.constructor) return false;
        this.length += right.length;
        return true;
    }
    /**
   * @param {Transaction} transaction
   * @param {number} offset
   */ integrate(transaction, offset) {
        if (offset > 0) {
            this.id.clock += offset;
            this.length -= offset;
        }
        addStruct(transaction.doc.store, this);
    }
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */ write(encoder, offset) {
        encoder.writeInfo(structGCRefNumber);
        encoder.writeLen(this.length - offset);
    }
    /**
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @return {null | number}
   */ getMissing(transaction, store) {
        return null;
    }
}
class ContentBinary {
    /**
   * @param {Uint8Array} content
   */ constructor(content){
        this.content = content;
    }
    /**
   * @return {number}
   */ getLength() {
        return 1;
    }
    /**
   * @return {Array<any>}
   */ getContent() {
        return [
            this.content
        ];
    }
    /**
   * @return {boolean}
   */ isCountable() {
        return true;
    }
    /**
   * @return {ContentBinary}
   */ copy() {
        return new ContentBinary(this.content);
    }
    /**
   * @param {number} offset
   * @return {ContentBinary}
   */ splice(offset) {
        throw error__namespace.methodUnimplemented();
    }
    /**
   * @param {ContentBinary} right
   * @return {boolean}
   */ mergeWith(right) {
        return false;
    }
    /**
   * @param {Transaction} transaction
   * @param {Item} item
   */ integrate(transaction, item) {}
    /**
   * @param {Transaction} transaction
   */ delete(transaction) {}
    /**
   * @param {StructStore} store
   */ gc(store) {}
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */ write(encoder, offset) {
        encoder.writeBuf(this.content);
    }
    /**
   * @return {number}
   */ getRef() {
        return 3;
    }
}
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2 } decoder
 * @return {ContentBinary}
 */ const readContentBinary = (decoder)=>new ContentBinary(decoder.readBuf());
class ContentDeleted {
    /**
   * @param {number} len
   */ constructor(len){
        this.len = len;
    }
    /**
   * @return {number}
   */ getLength() {
        return this.len;
    }
    /**
   * @return {Array<any>}
   */ getContent() {
        return [];
    }
    /**
   * @return {boolean}
   */ isCountable() {
        return false;
    }
    /**
   * @return {ContentDeleted}
   */ copy() {
        return new ContentDeleted(this.len);
    }
    /**
   * @param {number} offset
   * @return {ContentDeleted}
   */ splice(offset) {
        const right = new ContentDeleted(this.len - offset);
        this.len = offset;
        return right;
    }
    /**
   * @param {ContentDeleted} right
   * @return {boolean}
   */ mergeWith(right) {
        this.len += right.len;
        return true;
    }
    /**
   * @param {Transaction} transaction
   * @param {Item} item
   */ integrate(transaction, item) {
        addToDeleteSet(transaction.deleteSet, item.id.client, item.id.clock, this.len);
        item.markDeleted();
    }
    /**
   * @param {Transaction} transaction
   */ delete(transaction) {}
    /**
   * @param {StructStore} store
   */ gc(store) {}
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */ write(encoder, offset) {
        encoder.writeLen(this.len - offset);
    }
    /**
   * @return {number}
   */ getRef() {
        return 1;
    }
}
/**
 * @private
 *
 * @param {UpdateDecoderV1 | UpdateDecoderV2 } decoder
 * @return {ContentDeleted}
 */ const readContentDeleted = (decoder)=>new ContentDeleted(decoder.readLen());
/**
 * @param {string} guid
 * @param {Object<string, any>} opts
 */ const createDocFromOpts = (guid, opts)=>new Doc({
        guid,
        ...opts,
        shouldLoad: opts.shouldLoad || opts.autoLoad || false
    });
/**
 * @private
 */ class ContentDoc {
    /**
   * @param {Doc} doc
   */ constructor(doc){
        if (doc._item) console.error("This document was already integrated as a sub-document. You should create a second instance instead with the same guid.");
        /**
     * @type {Doc}
     */ this.doc = doc;
        /**
     * @type {any}
     */ const opts = {};
        this.opts = opts;
        if (!doc.gc) opts.gc = false;
        if (doc.autoLoad) opts.autoLoad = true;
        if (doc.meta !== null) opts.meta = doc.meta;
    }
    /**
   * @return {number}
   */ getLength() {
        return 1;
    }
    /**
   * @return {Array<any>}
   */ getContent() {
        return [
            this.doc
        ];
    }
    /**
   * @return {boolean}
   */ isCountable() {
        return true;
    }
    /**
   * @return {ContentDoc}
   */ copy() {
        return new ContentDoc(createDocFromOpts(this.doc.guid, this.opts));
    }
    /**
   * @param {number} offset
   * @return {ContentDoc}
   */ splice(offset) {
        throw error__namespace.methodUnimplemented();
    }
    /**
   * @param {ContentDoc} right
   * @return {boolean}
   */ mergeWith(right) {
        return false;
    }
    /**
   * @param {Transaction} transaction
   * @param {Item} item
   */ integrate(transaction, item) {
        // this needs to be reflected in doc.destroy as well
        this.doc._item = item;
        transaction.subdocsAdded.add(this.doc);
        if (this.doc.shouldLoad) transaction.subdocsLoaded.add(this.doc);
    }
    /**
   * @param {Transaction} transaction
   */ delete(transaction) {
        if (transaction.subdocsAdded.has(this.doc)) transaction.subdocsAdded.delete(this.doc);
        else transaction.subdocsRemoved.add(this.doc);
    }
    /**
   * @param {StructStore} store
   */ gc(store) {}
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */ write(encoder, offset) {
        encoder.writeString(this.doc.guid);
        encoder.writeAny(this.opts);
    }
    /**
   * @return {number}
   */ getRef() {
        return 9;
    }
}
/**
 * @private
 *
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 * @return {ContentDoc}
 */ const readContentDoc = (decoder)=>new ContentDoc(createDocFromOpts(decoder.readString(), decoder.readAny()));
/**
 * @private
 */ class ContentEmbed {
    /**
   * @param {Object} embed
   */ constructor(embed){
        this.embed = embed;
    }
    /**
   * @return {number}
   */ getLength() {
        return 1;
    }
    /**
   * @return {Array<any>}
   */ getContent() {
        return [
            this.embed
        ];
    }
    /**
   * @return {boolean}
   */ isCountable() {
        return true;
    }
    /**
   * @return {ContentEmbed}
   */ copy() {
        return new ContentEmbed(this.embed);
    }
    /**
   * @param {number} offset
   * @return {ContentEmbed}
   */ splice(offset) {
        throw error__namespace.methodUnimplemented();
    }
    /**
   * @param {ContentEmbed} right
   * @return {boolean}
   */ mergeWith(right) {
        return false;
    }
    /**
   * @param {Transaction} transaction
   * @param {Item} item
   */ integrate(transaction, item) {}
    /**
   * @param {Transaction} transaction
   */ delete(transaction) {}
    /**
   * @param {StructStore} store
   */ gc(store) {}
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */ write(encoder, offset) {
        encoder.writeJSON(this.embed);
    }
    /**
   * @return {number}
   */ getRef() {
        return 5;
    }
}
/**
 * @private
 *
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 * @return {ContentEmbed}
 */ const readContentEmbed = (decoder)=>new ContentEmbed(decoder.readJSON());
/**
 * @private
 */ class ContentFormat {
    /**
   * @param {string} key
   * @param {Object} value
   */ constructor(key, value){
        this.key = key;
        this.value = value;
    }
    /**
   * @return {number}
   */ getLength() {
        return 1;
    }
    /**
   * @return {Array<any>}
   */ getContent() {
        return [];
    }
    /**
   * @return {boolean}
   */ isCountable() {
        return false;
    }
    /**
   * @return {ContentFormat}
   */ copy() {
        return new ContentFormat(this.key, this.value);
    }
    /**
   * @param {number} offset
   * @return {ContentFormat}
   */ splice(offset) {
        throw error__namespace.methodUnimplemented();
    }
    /**
   * @param {ContentFormat} right
   * @return {boolean}
   */ mergeWith(right) {
        return false;
    }
    /**
   * @param {Transaction} transaction
   * @param {Item} item
   */ integrate(transaction, item) {
        // @todo searchmarker are currently unsupported for rich text documents
        /** @type {AbstractType<any>} */ item.parent._searchMarker = null;
    }
    /**
   * @param {Transaction} transaction
   */ delete(transaction) {}
    /**
   * @param {StructStore} store
   */ gc(store) {}
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */ write(encoder, offset) {
        encoder.writeKey(this.key);
        encoder.writeJSON(this.value);
    }
    /**
   * @return {number}
   */ getRef() {
        return 6;
    }
}
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 * @return {ContentFormat}
 */ const readContentFormat = (decoder)=>new ContentFormat(decoder.readKey(), decoder.readJSON());
/**
 * @private
 */ class ContentJSON {
    /**
   * @param {Array<any>} arr
   */ constructor(arr){
        /**
     * @type {Array<any>}
     */ this.arr = arr;
    }
    /**
   * @return {number}
   */ getLength() {
        return this.arr.length;
    }
    /**
   * @return {Array<any>}
   */ getContent() {
        return this.arr;
    }
    /**
   * @return {boolean}
   */ isCountable() {
        return true;
    }
    /**
   * @return {ContentJSON}
   */ copy() {
        return new ContentJSON(this.arr);
    }
    /**
   * @param {number} offset
   * @return {ContentJSON}
   */ splice(offset) {
        const right = new ContentJSON(this.arr.slice(offset));
        this.arr = this.arr.slice(0, offset);
        return right;
    }
    /**
   * @param {ContentJSON} right
   * @return {boolean}
   */ mergeWith(right) {
        this.arr = this.arr.concat(right.arr);
        return true;
    }
    /**
   * @param {Transaction} transaction
   * @param {Item} item
   */ integrate(transaction, item) {}
    /**
   * @param {Transaction} transaction
   */ delete(transaction) {}
    /**
   * @param {StructStore} store
   */ gc(store) {}
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */ write(encoder, offset) {
        const len = this.arr.length;
        encoder.writeLen(len - offset);
        for(let i = offset; i < len; i++){
            const c = this.arr[i];
            encoder.writeString(c === undefined ? "undefined" : JSON.stringify(c));
        }
    }
    /**
   * @return {number}
   */ getRef() {
        return 2;
    }
}
/**
 * @private
 *
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 * @return {ContentJSON}
 */ const readContentJSON = (decoder)=>{
    const len = decoder.readLen();
    const cs = [];
    for(let i = 0; i < len; i++){
        const c = decoder.readString();
        if (c === "undefined") cs.push(undefined);
        else cs.push(JSON.parse(c));
    }
    return new ContentJSON(cs);
};
class ContentAny {
    /**
   * @param {Array<any>} arr
   */ constructor(arr){
        /**
     * @type {Array<any>}
     */ this.arr = arr;
    }
    /**
   * @return {number}
   */ getLength() {
        return this.arr.length;
    }
    /**
   * @return {Array<any>}
   */ getContent() {
        return this.arr;
    }
    /**
   * @return {boolean}
   */ isCountable() {
        return true;
    }
    /**
   * @return {ContentAny}
   */ copy() {
        return new ContentAny(this.arr);
    }
    /**
   * @param {number} offset
   * @return {ContentAny}
   */ splice(offset) {
        const right = new ContentAny(this.arr.slice(offset));
        this.arr = this.arr.slice(0, offset);
        return right;
    }
    /**
   * @param {ContentAny} right
   * @return {boolean}
   */ mergeWith(right) {
        this.arr = this.arr.concat(right.arr);
        return true;
    }
    /**
   * @param {Transaction} transaction
   * @param {Item} item
   */ integrate(transaction, item) {}
    /**
   * @param {Transaction} transaction
   */ delete(transaction) {}
    /**
   * @param {StructStore} store
   */ gc(store) {}
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */ write(encoder, offset) {
        const len = this.arr.length;
        encoder.writeLen(len - offset);
        for(let i = offset; i < len; i++){
            const c = this.arr[i];
            encoder.writeAny(c);
        }
    }
    /**
   * @return {number}
   */ getRef() {
        return 8;
    }
}
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 * @return {ContentAny}
 */ const readContentAny = (decoder)=>{
    const len = decoder.readLen();
    const cs = [];
    for(let i = 0; i < len; i++)cs.push(decoder.readAny());
    return new ContentAny(cs);
};
/**
 * @private
 */ class ContentString {
    /**
   * @param {string} str
   */ constructor(str){
        /**
     * @type {string}
     */ this.str = str;
    }
    /**
   * @return {number}
   */ getLength() {
        return this.str.length;
    }
    /**
   * @return {Array<any>}
   */ getContent() {
        return this.str.split("");
    }
    /**
   * @return {boolean}
   */ isCountable() {
        return true;
    }
    /**
   * @return {ContentString}
   */ copy() {
        return new ContentString(this.str);
    }
    /**
   * @param {number} offset
   * @return {ContentString}
   */ splice(offset) {
        const right = new ContentString(this.str.slice(offset));
        this.str = this.str.slice(0, offset);
        // Prevent encoding invalid documents because of splitting of surrogate pairs: https://github.com/yjs/yjs/issues/248
        const firstCharCode = this.str.charCodeAt(offset - 1);
        if (firstCharCode >= 0xD800 && firstCharCode <= 0xDBFF) {
            // Last character of the left split is the start of a surrogate utf16/ucs2 pair.
            // We don't support splitting of surrogate pairs because this may lead to invalid documents.
            // Replace the invalid character with a unicode replacement character (� / U+FFFD)
            this.str = this.str.slice(0, offset - 1) + "�";
            // replace right as well
            right.str = "�" + right.str.slice(1);
        }
        return right;
    }
    /**
   * @param {ContentString} right
   * @return {boolean}
   */ mergeWith(right) {
        this.str += right.str;
        return true;
    }
    /**
   * @param {Transaction} transaction
   * @param {Item} item
   */ integrate(transaction, item) {}
    /**
   * @param {Transaction} transaction
   */ delete(transaction) {}
    /**
   * @param {StructStore} store
   */ gc(store) {}
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */ write(encoder, offset) {
        encoder.writeString(offset === 0 ? this.str : this.str.slice(offset));
    }
    /**
   * @return {number}
   */ getRef() {
        return 4;
    }
}
/**
 * @private
 *
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 * @return {ContentString}
 */ const readContentString = (decoder)=>new ContentString(decoder.readString());
/**
 * @type {Array<function(UpdateDecoderV1 | UpdateDecoderV2):AbstractType<any>>}
 * @private
 */ const typeRefs = [
    readYArray,
    readYMap,
    readYText,
    readYXmlElement,
    readYXmlFragment,
    readYXmlHook,
    readYXmlText
];
const YArrayRefID = 0;
const YMapRefID = 1;
const YTextRefID = 2;
const YXmlElementRefID = 3;
const YXmlFragmentRefID = 4;
const YXmlHookRefID = 5;
const YXmlTextRefID = 6;
/**
 * @private
 */ class ContentType {
    /**
   * @param {AbstractType<any>} type
   */ constructor(type){
        /**
     * @type {AbstractType<any>}
     */ this.type = type;
    }
    /**
   * @return {number}
   */ getLength() {
        return 1;
    }
    /**
   * @return {Array<any>}
   */ getContent() {
        return [
            this.type
        ];
    }
    /**
   * @return {boolean}
   */ isCountable() {
        return true;
    }
    /**
   * @return {ContentType}
   */ copy() {
        return new ContentType(this.type._copy());
    }
    /**
   * @param {number} offset
   * @return {ContentType}
   */ splice(offset) {
        throw error__namespace.methodUnimplemented();
    }
    /**
   * @param {ContentType} right
   * @return {boolean}
   */ mergeWith(right) {
        return false;
    }
    /**
   * @param {Transaction} transaction
   * @param {Item} item
   */ integrate(transaction, item) {
        this.type._integrate(transaction.doc, item);
    }
    /**
   * @param {Transaction} transaction
   */ delete(transaction) {
        let item = this.type._start;
        while(item !== null){
            if (!item.deleted) item.delete(transaction);
            else // This will be gc'd later and we want to merge it if possible
            // We try to merge all deleted items after each transaction,
            // but we have no knowledge about that this needs to be merged
            // since it is not in transaction.ds. Hence we add it to transaction._mergeStructs
            transaction._mergeStructs.push(item);
            item = item.right;
        }
        this.type._map.forEach((item)=>{
            if (!item.deleted) item.delete(transaction);
            else // same as above
            transaction._mergeStructs.push(item);
        });
        transaction.changed.delete(this.type);
    }
    /**
   * @param {StructStore} store
   */ gc(store) {
        let item = this.type._start;
        while(item !== null){
            item.gc(store, true);
            item = item.right;
        }
        this.type._start = null;
        this.type._map.forEach(/** @param {Item | null} item */ (item)=>{
            while(item !== null){
                item.gc(store, true);
                item = item.left;
            }
        });
        this.type._map = new Map();
    }
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */ write(encoder, offset) {
        this.type._write(encoder);
    }
    /**
   * @return {number}
   */ getRef() {
        return 7;
    }
}
/**
 * @private
 *
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 * @return {ContentType}
 */ const readContentType = (decoder)=>new ContentType(typeRefs[decoder.readTypeRef()](decoder));
/**
 * @todo This should return several items
 *
 * @param {StructStore} store
 * @param {ID} id
 * @return {{item:Item, diff:number}}
 */ const followRedone = (store, id)=>{
    /**
   * @type {ID|null}
   */ let nextID = id;
    let diff = 0;
    let item;
    do {
        if (diff > 0) nextID = createID(nextID.client, nextID.clock + diff);
        item = getItem(store, nextID);
        diff = nextID.clock - item.id.clock;
        nextID = item.redone;
    }while (nextID !== null && item instanceof Item);
    return {
        item,
        diff
    };
};
/**
 * Make sure that neither item nor any of its parents is ever deleted.
 *
 * This property does not persist when storing it into a database or when
 * sending it to other peers
 *
 * @param {Item|null} item
 * @param {boolean} keep
 */ const keepItem = (item, keep)=>{
    while(item !== null && item.keep !== keep){
        item.keep = keep;
        item = /** @type {AbstractType<any>} */ item.parent._item;
    }
};
/**
 * Split leftItem into two items
 * @param {Transaction} transaction
 * @param {Item} leftItem
 * @param {number} diff
 * @return {Item}
 *
 * @function
 * @private
 */ const splitItem = (transaction, leftItem, diff)=>{
    // create rightItem
    const { client , clock  } = leftItem.id;
    const rightItem = new Item(createID(client, clock + diff), leftItem, createID(client, clock + diff - 1), leftItem.right, leftItem.rightOrigin, leftItem.parent, leftItem.parentSub, leftItem.content.splice(diff));
    if (leftItem.deleted) rightItem.markDeleted();
    if (leftItem.keep) rightItem.keep = true;
    if (leftItem.redone !== null) rightItem.redone = createID(leftItem.redone.client, leftItem.redone.clock + diff);
    // update left (do not set leftItem.rightOrigin as it will lead to problems when syncing)
    leftItem.right = rightItem;
    // update right
    if (rightItem.right !== null) rightItem.right.left = rightItem;
    // right is more specific.
    transaction._mergeStructs.push(rightItem);
    // update parent._map
    if (rightItem.parentSub !== null && rightItem.right === null) /** @type {AbstractType<any>} */ rightItem.parent._map.set(rightItem.parentSub, rightItem);
    leftItem.length = diff;
    return rightItem;
};
/**
 * Redoes the effect of this operation.
 *
 * @param {Transaction} transaction The Yjs instance.
 * @param {Item} item
 * @param {Set<Item>} redoitems
 * @param {DeleteSet} itemsToDelete
 * @param {boolean} ignoreRemoteMapChanges
 *
 * @return {Item|null}
 *
 * @private
 */ const redoItem = (transaction, item, redoitems, itemsToDelete, ignoreRemoteMapChanges)=>{
    const doc = transaction.doc;
    const store = doc.store;
    const ownClientID = doc.clientID;
    const redone = item.redone;
    if (redone !== null) return getItemCleanStart(transaction, redone);
    let parentItem = /** @type {AbstractType<any>} */ item.parent._item;
    /**
   * @type {Item|null}
   */ let left = null;
    /**
   * @type {Item|null}
   */ let right;
    // make sure that parent is redone
    if (parentItem !== null && parentItem.deleted === true) {
        // try to undo parent if it will be undone anyway
        if (parentItem.redone === null && (!redoitems.has(parentItem) || redoItem(transaction, parentItem, redoitems, itemsToDelete, ignoreRemoteMapChanges) === null)) return null;
        while(parentItem.redone !== null)parentItem = getItemCleanStart(transaction, parentItem.redone);
    }
    const parentType = parentItem === null ? /** @type {AbstractType<any>} */ item.parent : /** @type {ContentType} */ parentItem.content.type;
    if (item.parentSub === null) {
        // Is an array item. Insert at the old position
        left = item.left;
        right = item;
        // find next cloned_redo items
        while(left !== null){
            /**
       * @type {Item|null}
       */ let leftTrace = left;
            // trace redone until parent matches
            while(leftTrace !== null && /** @type {AbstractType<any>} */ leftTrace.parent._item !== parentItem)leftTrace = leftTrace.redone === null ? null : getItemCleanStart(transaction, leftTrace.redone);
            if (leftTrace !== null && /** @type {AbstractType<any>} */ leftTrace.parent._item === parentItem) {
                left = leftTrace;
                break;
            }
            left = left.left;
        }
        while(right !== null){
            /**
       * @type {Item|null}
       */ let rightTrace = right;
            // trace redone until parent matches
            while(rightTrace !== null && /** @type {AbstractType<any>} */ rightTrace.parent._item !== parentItem)rightTrace = rightTrace.redone === null ? null : getItemCleanStart(transaction, rightTrace.redone);
            if (rightTrace !== null && /** @type {AbstractType<any>} */ rightTrace.parent._item === parentItem) {
                right = rightTrace;
                break;
            }
            right = right.right;
        }
    } else {
        right = null;
        if (item.right && !ignoreRemoteMapChanges) {
            left = item;
            // Iterate right while right is in itemsToDelete
            // If it is intended to delete right while item is redone, we can expect that item should replace right.
            while(left !== null && left.right !== null && isDeleted(itemsToDelete, left.right.id))left = left.right;
            // follow redone
            // trace redone until parent matches
            while(left !== null && left.redone !== null)left = getItemCleanStart(transaction, left.redone);
            if (left && left.right !== null) // It is not possible to redo this item because it conflicts with a
            // change from another client
            return null;
        } else left = parentType._map.get(item.parentSub) || null;
    }
    const nextClock = getState(store, ownClientID);
    const nextId = createID(ownClientID, nextClock);
    const redoneItem = new Item(nextId, left, left && left.lastId, right, right && right.id, parentType, item.parentSub, item.content.copy());
    item.redone = nextId;
    keepItem(redoneItem, true);
    redoneItem.integrate(transaction, 0);
    return redoneItem;
};
/**
 * Abstract class that represents any content.
 */ class Item extends AbstractStruct {
    /**
   * @param {ID} id
   * @param {Item | null} left
   * @param {ID | null} origin
   * @param {Item | null} right
   * @param {ID | null} rightOrigin
   * @param {AbstractType<any>|ID|null} parent Is a type if integrated, is null if it is possible to copy parent from left or right, is ID before integration to search for it.
   * @param {string | null} parentSub
   * @param {AbstractContent} content
   */ constructor(id, left, origin, right, rightOrigin, parent, parentSub, content){
        super(id, content.getLength());
        /**
     * The item that was originally to the left of this item.
     * @type {ID | null}
     */ this.origin = origin;
        /**
     * The item that is currently to the left of this item.
     * @type {Item | null}
     */ this.left = left;
        /**
     * The item that is currently to the right of this item.
     * @type {Item | null}
     */ this.right = right;
        /**
     * The item that was originally to the right of this item.
     * @type {ID | null}
     */ this.rightOrigin = rightOrigin;
        /**
     * @type {AbstractType<any>|ID|null}
     */ this.parent = parent;
        /**
     * If the parent refers to this item with some kind of key (e.g. YMap, the
     * key is specified here. The key is then used to refer to the list in which
     * to insert this item. If `parentSub = null` type._start is the list in
     * which to insert to. Otherwise it is `parent._map`.
     * @type {String | null}
     */ this.parentSub = parentSub;
        /**
     * If this type's effect is redone this type refers to the type that undid
     * this operation.
     * @type {ID | null}
     */ this.redone = null;
        /**
     * @type {AbstractContent}
     */ this.content = content;
        /**
     * bit1: keep
     * bit2: countable
     * bit3: deleted
     * bit4: mark - mark node as fast-search-marker
     * @type {number} byte
     */ this.info = this.content.isCountable() ? binary__namespace.BIT2 : 0;
    }
    /**
   * This is used to mark the item as an indexed fast-search marker
   *
   * @type {boolean}
   */ set marker(isMarked) {
        if ((this.info & binary__namespace.BIT4) > 0 !== isMarked) this.info ^= binary__namespace.BIT4;
    }
    get marker() {
        return (this.info & binary__namespace.BIT4) > 0;
    }
    /**
   * If true, do not garbage collect this Item.
   */ get keep() {
        return (this.info & binary__namespace.BIT1) > 0;
    }
    set keep(doKeep) {
        if (this.keep !== doKeep) this.info ^= binary__namespace.BIT1;
    }
    get countable() {
        return (this.info & binary__namespace.BIT2) > 0;
    }
    /**
   * Whether this item was deleted or not.
   * @type {Boolean}
   */ get deleted() {
        return (this.info & binary__namespace.BIT3) > 0;
    }
    set deleted(doDelete) {
        if (this.deleted !== doDelete) this.info ^= binary__namespace.BIT3;
    }
    markDeleted() {
        this.info |= binary__namespace.BIT3;
    }
    /**
   * Return the creator clientID of the missing op or define missing items and return null.
   *
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @return {null | number}
   */ getMissing(transaction, store) {
        if (this.origin && this.origin.client !== this.id.client && this.origin.clock >= getState(store, this.origin.client)) return this.origin.client;
        if (this.rightOrigin && this.rightOrigin.client !== this.id.client && this.rightOrigin.clock >= getState(store, this.rightOrigin.client)) return this.rightOrigin.client;
        if (this.parent && this.parent.constructor === ID && this.id.client !== this.parent.client && this.parent.clock >= getState(store, this.parent.client)) return this.parent.client;
        // We have all missing ids, now find the items
        if (this.origin) {
            this.left = getItemCleanEnd(transaction, store, this.origin);
            this.origin = this.left.lastId;
        }
        if (this.rightOrigin) {
            this.right = getItemCleanStart(transaction, this.rightOrigin);
            this.rightOrigin = this.right.id;
        }
        if (this.left && this.left.constructor === GC || this.right && this.right.constructor === GC) this.parent = null;
        // only set parent if this shouldn't be garbage collected
        if (!this.parent) {
            if (this.left && this.left.constructor === Item) {
                this.parent = this.left.parent;
                this.parentSub = this.left.parentSub;
            }
            if (this.right && this.right.constructor === Item) {
                this.parent = this.right.parent;
                this.parentSub = this.right.parentSub;
            }
        } else if (this.parent.constructor === ID) {
            const parentItem = getItem(store, this.parent);
            if (parentItem.constructor === GC) this.parent = null;
            else this.parent = /** @type {ContentType} */ parentItem.content.type;
        }
        return null;
    }
    /**
   * @param {Transaction} transaction
   * @param {number} offset
   */ integrate(transaction, offset) {
        if (offset > 0) {
            this.id.clock += offset;
            this.left = getItemCleanEnd(transaction, transaction.doc.store, createID(this.id.client, this.id.clock - 1));
            this.origin = this.left.lastId;
            this.content = this.content.splice(offset);
            this.length -= offset;
        }
        if (this.parent) {
            if (!this.left && (!this.right || this.right.left !== null) || this.left && this.left.right !== this.right) {
                /**
         * @type {Item|null}
         */ let left = this.left;
                /**
         * @type {Item|null}
         */ let o;
                // set o to the first conflicting item
                if (left !== null) o = left.right;
                else if (this.parentSub !== null) {
                    o = /** @type {AbstractType<any>} */ this.parent._map.get(this.parentSub) || null;
                    while(o !== null && o.left !== null)o = o.left;
                } else o = /** @type {AbstractType<any>} */ this.parent._start;
                // TODO: use something like DeleteSet here (a tree implementation would be best)
                // @todo use global set definitions
                /**
         * @type {Set<Item>}
         */ const conflictingItems = new Set();
                /**
         * @type {Set<Item>}
         */ const itemsBeforeOrigin = new Set();
                // Let c in conflictingItems, b in itemsBeforeOrigin
                // ***{origin}bbbb{this}{c,b}{c,b}{o}***
                // Note that conflictingItems is a subset of itemsBeforeOrigin
                while(o !== null && o !== this.right){
                    itemsBeforeOrigin.add(o);
                    conflictingItems.add(o);
                    if (compareIDs(this.origin, o.origin)) {
                        // case 1
                        if (o.id.client < this.id.client) {
                            left = o;
                            conflictingItems.clear();
                        } else if (compareIDs(this.rightOrigin, o.rightOrigin)) break;
                         // else, o might be integrated before an item that this conflicts with. If so, we will find it in the next iterations
                    } else if (o.origin !== null && itemsBeforeOrigin.has(getItem(transaction.doc.store, o.origin))) // case 2
                    {
                        if (!conflictingItems.has(getItem(transaction.doc.store, o.origin))) {
                            left = o;
                            conflictingItems.clear();
                        }
                    } else break;
                    o = o.right;
                }
                this.left = left;
            }
            // reconnect left/right + update parent map/start if necessary
            if (this.left !== null) {
                const right = this.left.right;
                this.right = right;
                this.left.right = this;
            } else {
                let r;
                if (this.parentSub !== null) {
                    r = /** @type {AbstractType<any>} */ this.parent._map.get(this.parentSub) || null;
                    while(r !== null && r.left !== null)r = r.left;
                } else {
                    r = /** @type {AbstractType<any>} */ this.parent._start; /** @type {AbstractType<any>} */ 
                    this.parent._start = this;
                }
                this.right = r;
            }
            if (this.right !== null) this.right.left = this;
            else if (this.parentSub !== null) {
                // set as current parent value if right === null and this is parentSub
                /** @type {AbstractType<any>} */ this.parent._map.set(this.parentSub, this);
                if (this.left !== null) // this is the current attribute value of parent. delete right
                this.left.delete(transaction);
            }
            // adjust length of parent
            if (this.parentSub === null && this.countable && !this.deleted) /** @type {AbstractType<any>} */ this.parent._length += this.length;
            addStruct(transaction.doc.store, this);
            this.content.integrate(transaction, this);
            // add parent to transaction.changed
            addChangedTypeToTransaction(transaction, /** @type {AbstractType<any>} */ this.parent, this.parentSub);
            if (/** @type {AbstractType<any>} */ this.parent._item !== null && /** @type {AbstractType<any>} */ this.parent._item.deleted || this.parentSub !== null && this.right !== null) // delete if parent is deleted or if this is not the current attribute value of parent
            this.delete(transaction);
        } else // parent is not defined. Integrate GC struct instead
        new GC(this.id, this.length).integrate(transaction, 0);
    }
    /**
   * Returns the next non-deleted item
   */ get next() {
        let n = this.right;
        while(n !== null && n.deleted)n = n.right;
        return n;
    }
    /**
   * Returns the previous non-deleted item
   */ get prev() {
        let n = this.left;
        while(n !== null && n.deleted)n = n.left;
        return n;
    }
    /**
   * Computes the last content address of this Item.
   */ get lastId() {
        // allocating ids is pretty costly because of the amount of ids created, so we try to reuse whenever possible
        return this.length === 1 ? this.id : createID(this.id.client, this.id.clock + this.length - 1);
    }
    /**
   * Try to merge two items
   *
   * @param {Item} right
   * @return {boolean}
   */ mergeWith(right) {
        if (this.constructor === right.constructor && compareIDs(right.origin, this.lastId) && this.right === right && compareIDs(this.rightOrigin, right.rightOrigin) && this.id.client === right.id.client && this.id.clock + this.length === right.id.clock && this.deleted === right.deleted && this.redone === null && right.redone === null && this.content.constructor === right.content.constructor && this.content.mergeWith(right.content)) {
            const searchMarker = /** @type {AbstractType<any>} */ this.parent._searchMarker;
            if (searchMarker) searchMarker.forEach((marker)=>{
                if (marker.p === right) {
                    // right is going to be "forgotten" so we need to update the marker
                    marker.p = this;
                    // adjust marker index
                    if (!this.deleted && this.countable) marker.index -= this.length;
                }
            });
            if (right.keep) this.keep = true;
            this.right = right.right;
            if (this.right !== null) this.right.left = this;
            this.length += right.length;
            return true;
        }
        return false;
    }
    /**
   * Mark this Item as deleted.
   *
   * @param {Transaction} transaction
   */ delete(transaction) {
        if (!this.deleted) {
            const parent = /** @type {AbstractType<any>} */ this.parent;
            // adjust the length of parent
            if (this.countable && this.parentSub === null) parent._length -= this.length;
            this.markDeleted();
            addToDeleteSet(transaction.deleteSet, this.id.client, this.id.clock, this.length);
            addChangedTypeToTransaction(transaction, parent, this.parentSub);
            this.content.delete(transaction);
        }
    }
    /**
   * @param {StructStore} store
   * @param {boolean} parentGCd
   */ gc(store, parentGCd) {
        if (!this.deleted) throw error__namespace.unexpectedCase();
        this.content.gc(store);
        if (parentGCd) replaceStruct(store, this, new GC(this.id, this.length));
        else this.content = new ContentDeleted(this.length);
    }
    /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   * @param {number} offset
   */ write(encoder, offset) {
        const origin = offset > 0 ? createID(this.id.client, this.id.clock + offset - 1) : this.origin;
        const rightOrigin = this.rightOrigin;
        const parentSub = this.parentSub;
        const info = this.content.getRef() & binary__namespace.BITS5 | (origin === null ? 0 : binary__namespace.BIT8) | // origin is defined
        (rightOrigin === null ? 0 : binary__namespace.BIT7) | // right origin is defined
        (parentSub === null ? 0 : binary__namespace.BIT6); // parentSub is non-null
        encoder.writeInfo(info);
        if (origin !== null) encoder.writeLeftID(origin);
        if (rightOrigin !== null) encoder.writeRightID(rightOrigin);
        if (origin === null && rightOrigin === null) {
            const parent = /** @type {AbstractType<any>} */ this.parent;
            if (parent._item !== undefined) {
                const parentItem = parent._item;
                if (parentItem === null) {
                    // parent type on y._map
                    // find the correct key
                    const ykey = findRootTypeKey(parent);
                    encoder.writeParentInfo(true); // write parentYKey
                    encoder.writeString(ykey);
                } else {
                    encoder.writeParentInfo(false); // write parent id
                    encoder.writeLeftID(parentItem.id);
                }
            } else if (parent.constructor === String) {
                encoder.writeParentInfo(true); // write parentYKey
                encoder.writeString(parent);
            } else if (parent.constructor === ID) {
                encoder.writeParentInfo(false); // write parent id
                encoder.writeLeftID(parent);
            } else error__namespace.unexpectedCase();
            if (parentSub !== null) encoder.writeString(parentSub);
        }
        this.content.write(encoder, offset);
    }
}
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 * @param {number} info
 */ const readItemContent = (decoder, info)=>contentRefs[info & binary__namespace.BITS5](decoder);
/**
 * A lookup map for reading Item content.
 *
 * @type {Array<function(UpdateDecoderV1 | UpdateDecoderV2):AbstractContent>}
 */ const contentRefs = [
    ()=>{
        error__namespace.unexpectedCase();
    },
    readContentDeleted,
    readContentJSON,
    readContentBinary,
    readContentString,
    readContentEmbed,
    readContentFormat,
    readContentType,
    readContentAny,
    readContentDoc,
    ()=>{
        error__namespace.unexpectedCase();
    } // 10 - Skip is not ItemContent
];
const structSkipRefNumber = 10;
/**
 * @private
 */ class Skip extends AbstractStruct {
    get deleted() {
        return true;
    }
    delete() {}
    /**
   * @param {Skip} right
   * @return {boolean}
   */ mergeWith(right) {
        if (this.constructor !== right.constructor) return false;
        this.length += right.length;
        return true;
    }
    /**
   * @param {Transaction} transaction
   * @param {number} offset
   */ integrate(transaction, offset) {
        // skip structs cannot be integrated
        error__namespace.unexpectedCase();
    }
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */ write(encoder, offset) {
        encoder.writeInfo(structSkipRefNumber);
        // write as VarUint because Skips can't make use of predictable length-encoding
        encoding__namespace.writeVarUint(encoder.restEncoder, this.length - offset);
    }
    /**
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @return {null | number}
   */ getMissing(transaction, store) {
        return null;
    }
}
/** eslint-env browser */ const glo = /** @type {any} */ typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
const importIdentifier = "__ $YJS$ __";
if (glo[importIdentifier] === true) /**
   * Dear reader of this message. Please take this seriously.
   *
   * If you see this message, make sure that you only import one version of Yjs. In many cases,
   * your package manager installs two versions of Yjs that are used by different packages within your project.
   * Another reason for this message is that some parts of your project use the commonjs version of Yjs
   * and others use the EcmaScript version of Yjs.
   *
   * This often leads to issues that are hard to debug. We often need to perform constructor checks,
   * e.g. `struct instanceof GC`. If you imported different versions of Yjs, it is impossible for us to
   * do the constructor checks anymore - which might break the CRDT algorithm.
   *
   * https://github.com/yjs/yjs/issues/438
   */ console.error("Yjs was already imported. This breaks constructor checks and will lead to issues! - https://github.com/yjs/yjs/issues/438");
glo[importIdentifier] = true;
exports.AbsolutePosition = AbsolutePosition;
exports.AbstractConnector = AbstractConnector;
exports.AbstractStruct = AbstractStruct;
exports.AbstractType = AbstractType;
exports.Array = YArray;
exports.ContentAny = ContentAny;
exports.ContentBinary = ContentBinary;
exports.ContentDeleted = ContentDeleted;
exports.ContentEmbed = ContentEmbed;
exports.ContentFormat = ContentFormat;
exports.ContentJSON = ContentJSON;
exports.ContentString = ContentString;
exports.ContentType = ContentType;
exports.Doc = Doc;
exports.GC = GC;
exports.ID = ID;
exports.Item = Item;
exports.Map = YMap;
exports.PermanentUserData = PermanentUserData;
exports.RelativePosition = RelativePosition;
exports.Snapshot = Snapshot;
exports.Text = YText;
exports.Transaction = Transaction;
exports.UndoManager = UndoManager;
exports.UpdateEncoderV1 = UpdateEncoderV1;
exports.XmlElement = YXmlElement;
exports.XmlFragment = YXmlFragment;
exports.XmlHook = YXmlHook;
exports.XmlText = YXmlText;
exports.YArrayEvent = YArrayEvent;
exports.YEvent = YEvent;
exports.YMapEvent = YMapEvent;
exports.YTextEvent = YTextEvent;
exports.YXmlEvent = YXmlEvent;
exports.applyUpdate = applyUpdate;
exports.applyUpdateV2 = applyUpdateV2;
exports.cleanupYTextFormatting = cleanupYTextFormatting;
exports.compareIDs = compareIDs;
exports.compareRelativePositions = compareRelativePositions;
exports.convertUpdateFormatV1ToV2 = convertUpdateFormatV1ToV2;
exports.convertUpdateFormatV2ToV1 = convertUpdateFormatV2ToV1;
exports.createAbsolutePositionFromRelativePosition = createAbsolutePositionFromRelativePosition;
exports.createDeleteSet = createDeleteSet;
exports.createDeleteSetFromStructStore = createDeleteSetFromStructStore;
exports.createDocFromSnapshot = createDocFromSnapshot;
exports.createID = createID;
exports.createRelativePositionFromJSON = createRelativePositionFromJSON;
exports.createRelativePositionFromTypeIndex = createRelativePositionFromTypeIndex;
exports.createSnapshot = createSnapshot;
exports.decodeRelativePosition = decodeRelativePosition;
exports.decodeSnapshot = decodeSnapshot;
exports.decodeSnapshotV2 = decodeSnapshotV2;
exports.decodeStateVector = decodeStateVector;
exports.decodeUpdate = decodeUpdate;
exports.decodeUpdateV2 = decodeUpdateV2;
exports.diffUpdate = diffUpdate;
exports.diffUpdateV2 = diffUpdateV2;
exports.emptySnapshot = emptySnapshot;
exports.encodeRelativePosition = encodeRelativePosition;
exports.encodeSnapshot = encodeSnapshot;
exports.encodeSnapshotV2 = encodeSnapshotV2;
exports.encodeStateAsUpdate = encodeStateAsUpdate;
exports.encodeStateAsUpdateV2 = encodeStateAsUpdateV2;
exports.encodeStateVector = encodeStateVector;
exports.encodeStateVectorFromUpdate = encodeStateVectorFromUpdate;
exports.encodeStateVectorFromUpdateV2 = encodeStateVectorFromUpdateV2;
exports.equalSnapshots = equalSnapshots;
exports.findIndexSS = findIndexSS;
exports.findRootTypeKey = findRootTypeKey;
exports.getItem = getItem;
exports.getState = getState;
exports.getTypeChildren = getTypeChildren;
exports.isDeleted = isDeleted;
exports.isParentOf = isParentOf;
exports.iterateDeletedStructs = iterateDeletedStructs;
exports.logType = logType;
exports.logUpdate = logUpdate;
exports.logUpdateV2 = logUpdateV2;
exports.mergeUpdates = mergeUpdates;
exports.mergeUpdatesV2 = mergeUpdatesV2;
exports.parseUpdateMeta = parseUpdateMeta;
exports.parseUpdateMetaV2 = parseUpdateMetaV2;
exports.readUpdate = readUpdate;
exports.readUpdateV2 = readUpdateV2;
exports.relativePositionToJSON = relativePositionToJSON;
exports.snapshot = snapshot;
exports.transact = transact;
exports.tryGc = tryGc;
exports.typeListToArraySnapshot = typeListToArraySnapshot;
exports.typeMapGetSnapshot = typeMapGetSnapshot; //# sourceMappingURL=yjs.cjs.map

},{"lib0/dist/observable.cjs":"aDF2P","lib0/dist/array.cjs":"48P6T","lib0/dist/math.cjs":"6pe7G","lib0/dist/map.cjs":"bTbOS","lib0/dist/encoding.cjs":"7qhyQ","lib0/dist/decoding.cjs":"bYuts","lib0/dist/random.cjs":"1BFL3","lib0/dist/promise.cjs":"cO2tw","lib0/dist/buffer.cjs":"gAFuh","lib0/dist/error.cjs":"WM5PR","lib0/dist/binary.cjs":"2dCvB","lib0/dist/function.cjs":"2k98A","lib0/dist/set.cjs":"bbpDQ","lib0/dist/logging.cjs":"jiMbd","lib0/dist/time.cjs":"lpHcg","lib0/dist/iterator.cjs":"lcvAP","lib0/dist/object.cjs":"dixik"}],"aDF2P":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var map = require("./map-28a001c9.cjs");
var set = require("./set-b596ef38.cjs");
var array = require("./array-acefe0f2.cjs");
/**
 * Observable class prototype.
 *
 * @module observable
 */ /**
 * Handles named events.
 *
 * @template N
 */ class Observable {
    constructor(){
        /**
     * Some desc.
     * @type {Map<N, any>}
     */ this._observers = map.create();
    }
    /**
   * @param {N} name
   * @param {function} f
   */ on(name, f) {
        map.setIfUndefined(this._observers, name, set.create).add(f);
    }
    /**
   * @param {N} name
   * @param {function} f
   */ once(name, f) {
        /**
     * @param  {...any} args
     */ const _f = (...args)=>{
            this.off(name, _f);
            f(...args);
        };
        this.on(name, _f);
    }
    /**
   * @param {N} name
   * @param {function} f
   */ off(name, f) {
        const observers = this._observers.get(name);
        if (observers !== undefined) {
            observers.delete(f);
            if (observers.size === 0) this._observers.delete(name);
        }
    }
    /**
   * Emit a named event. All registered event listeners that listen to the
   * specified name will receive the event.
   *
   * @todo This should catch exceptions
   *
   * @param {N} name The event name.
   * @param {Array<any>} args The arguments that are applied to the event listener.
   */ emit(name, args) {
        // copy all listeners to an array first to make sure that no event is emitted to listeners that are subscribed while the event handler is called.
        return array.from((this._observers.get(name) || map.create()).values()).forEach((f)=>f(...args));
    }
    destroy() {
        this._observers = map.create();
    }
}
exports.Observable = Observable; //# sourceMappingURL=observable.cjs.map

},{"./map-28a001c9.cjs":"lrupf","./set-b596ef38.cjs":"afyOf","./array-acefe0f2.cjs":"dz9mo"}],"lrupf":[function(require,module,exports) {
"use strict";
/**
 * Utility module to work with key-value stores.
 *
 * @module map
 */ /**
 * Creates a new Map instance.
 *
 * @function
 * @return {Map<any, any>}
 *
 * @function
 */ const create = ()=>new Map();
/**
 * Copy a Map object into a fresh Map object.
 *
 * @function
 * @template X,Y
 * @param {Map<X,Y>} m
 * @return {Map<X,Y>}
 */ const copy = (m)=>{
    const r = create();
    m.forEach((v, k)=>{
        r.set(k, v);
    });
    return r;
};
/**
 * Get map property. Create T if property is undefined and set T on map.
 *
 * ```js
 * const listeners = map.setIfUndefined(events, 'eventName', set.create)
 * listeners.add(listener)
 * ```
 *
 * @function
 * @template T,K
 * @param {Map<K, T>} map
 * @param {K} key
 * @param {function():T} createT
 * @return {T}
 */ const setIfUndefined = (map, key, createT)=>{
    let set = map.get(key);
    if (set === undefined) map.set(key, set = createT());
    return set;
};
/**
 * Creates an Array and populates it with the content of all key-value pairs using the `f(value, key)` function.
 *
 * @function
 * @template K
 * @template V
 * @template R
 * @param {Map<K,V>} m
 * @param {function(V,K):R} f
 * @return {Array<R>}
 */ const map = (m, f)=>{
    const res = [];
    for (const [key, value] of m)res.push(f(value, key));
    return res;
};
/**
 * Tests whether any key-value pairs pass the test implemented by `f(value, key)`.
 *
 * @todo should rename to some - similarly to Array.some
 *
 * @function
 * @template K
 * @template V
 * @param {Map<K,V>} m
 * @param {function(V,K):boolean} f
 * @return {boolean}
 */ const any = (m, f)=>{
    for (const [key, value] of m){
        if (f(value, key)) return true;
    }
    return false;
};
/**
 * Tests whether all key-value pairs pass the test implemented by `f(value, key)`.
 *
 * @function
 * @template K
 * @template V
 * @param {Map<K,V>} m
 * @param {function(V,K):boolean} f
 * @return {boolean}
 */ const all = (m, f)=>{
    for (const [key, value] of m){
        if (!f(value, key)) return false;
    }
    return true;
};
var map$1 = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    create: create,
    copy: copy,
    setIfUndefined: setIfUndefined,
    map: map,
    any: any,
    all: all
});
exports.all = all;
exports.any = any;
exports.copy = copy;
exports.create = create;
exports.map = map;
exports.map$1 = map$1;
exports.setIfUndefined = setIfUndefined; //# sourceMappingURL=map-28a001c9.cjs.map

},{}],"afyOf":[function(require,module,exports) {
"use strict";
/**
 * Utility module to work with sets.
 *
 * @module set
 */ const create = ()=>new Set();
/**
 * @template T
 * @param {Set<T>} set
 * @return {Array<T>}
 */ const toArray = (set)=>Array.from(set);
/**
 * @template T
 * @param {Set<T>} set
 * @return {T}
 */ const first = (set)=>{
    return set.values().next().value || undefined;
};
/**
 * @template T
 * @param {Iterable<T>} entries
 * @return {Set<T>}
 */ const from = (entries)=>{
    return new Set(entries);
};
var set = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    create: create,
    toArray: toArray,
    first: first,
    from: from
});
exports.create = create;
exports.first = first;
exports.from = from;
exports.set = set;
exports.toArray = toArray; //# sourceMappingURL=set-b596ef38.cjs.map

},{}],"dz9mo":[function(require,module,exports) {
"use strict";
/**
 * Utility module to work with Arrays.
 *
 * @module array
 */ /**
 * Return the last element of an array. The element must exist
 *
 * @template L
 * @param {Array<L>} arr
 * @return {L}
 */ const last = (arr)=>arr[arr.length - 1];
/**
 * @template C
 * @return {Array<C>}
 */ const create = ()=>/** @type {Array<C>} */ [];
/**
 * @template D
 * @param {Array<D>} a
 * @return {Array<D>}
 */ const copy = (a)=>/** @type {Array<D>} */ a.slice();
/**
 * Append elements from src to dest
 *
 * @template M
 * @param {Array<M>} dest
 * @param {Array<M>} src
 */ const appendTo = (dest, src)=>{
    for(let i = 0; i < src.length; i++)dest.push(src[i]);
};
/**
 * Transforms something array-like to an actual Array.
 *
 * @function
 * @template T
 * @param {ArrayLike<T>|Iterable<T>} arraylike
 * @return {T}
 */ const from = Array.from;
/**
 * True iff condition holds on every element in the Array.
 *
 * @function
 * @template ITEM
 *
 * @param {Array<ITEM>} arr
 * @param {function(ITEM, number, Array<ITEM>):boolean} f
 * @return {boolean}
 */ const every = (arr, f)=>arr.every(f);
/**
 * True iff condition holds on some element in the Array.
 *
 * @function
 * @template S
 * @param {Array<S>} arr
 * @param {function(S, number, Array<S>):boolean} f
 * @return {boolean}
 */ const some = (arr, f)=>arr.some(f);
/**
 * @template ELEM
 *
 * @param {Array<ELEM>} a
 * @param {Array<ELEM>} b
 * @return {boolean}
 */ const equalFlat = (a, b)=>a.length === b.length && every(a, (item, index)=>item === b[index]);
/**
 * @template ELEM
 * @param {Array<Array<ELEM>>} arr
 * @return {Array<ELEM>}
 */ const flatten = (arr)=>arr.reduce((acc, val)=>acc.concat(val), []);
const isArray = Array.isArray;
var array = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    last: last,
    create: create,
    copy: copy,
    appendTo: appendTo,
    from: from,
    every: every,
    some: some,
    equalFlat: equalFlat,
    flatten: flatten,
    isArray: isArray
});
exports.appendTo = appendTo;
exports.array = array;
exports.copy = copy;
exports.create = create;
exports.equalFlat = equalFlat;
exports.every = every;
exports.flatten = flatten;
exports.from = from;
exports.isArray = isArray;
exports.last = last;
exports.some = some; //# sourceMappingURL=array-acefe0f2.cjs.map

},{}],"48P6T":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var array = require("./array-acefe0f2.cjs");
exports.appendTo = array.appendTo;
exports.copy = array.copy;
exports.create = array.create;
exports.equalFlat = array.equalFlat;
exports.every = array.every;
exports.flatten = array.flatten;
exports.from = array.from;
exports.isArray = array.isArray;
exports.last = array.last;
exports.some = array.some; //# sourceMappingURL=array.cjs.map

},{"./array-acefe0f2.cjs":"dz9mo"}],"6pe7G":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var math = require("./math-08e068f9.cjs");
exports.abs = math.abs;
exports.add = math.add;
exports.ceil = math.ceil;
exports.exp10 = math.exp10;
exports.floor = math.floor;
exports.imul = math.imul;
exports.isNaN = math.isNaN;
exports.isNegativeZero = math.isNegativeZero;
exports.log = math.log;
exports.log10 = math.log10;
exports.log2 = math.log2;
exports.max = math.max;
exports.min = math.min;
exports.pow = math.pow;
exports.round = math.round;
exports.sign = math.sign;
exports.sqrt = math.sqrt; //# sourceMappingURL=math.cjs.map

},{"./math-08e068f9.cjs":"lb1Mp"}],"lb1Mp":[function(require,module,exports) {
"use strict";
/**
 * Common Math expressions.
 *
 * @module math
 */ const floor = Math.floor;
const ceil = Math.ceil;
const abs = Math.abs;
const imul = Math.imul;
const round = Math.round;
const log10 = Math.log10;
const log2 = Math.log2;
const log = Math.log;
const sqrt = Math.sqrt;
/**
 * @function
 * @param {number} a
 * @param {number} b
 * @return {number} The sum of a and b
 */ const add = (a, b)=>a + b;
/**
 * @function
 * @param {number} a
 * @param {number} b
 * @return {number} The smaller element of a and b
 */ const min = (a, b)=>a < b ? a : b;
/**
 * @function
 * @param {number} a
 * @param {number} b
 * @return {number} The bigger element of a and b
 */ const max = (a, b)=>a > b ? a : b;
const isNaN = Number.isNaN;
const pow = Math.pow;
/**
 * Base 10 exponential function. Returns the value of 10 raised to the power of pow.
 *
 * @param {number} exp
 * @return {number}
 */ const exp10 = (exp)=>Math.pow(10, exp);
const sign = Math.sign;
/**
 * @param {number} n
 * @return {boolean} Wether n is negative. This function also differentiates between -0 and +0
 */ const isNegativeZero = (n)=>n !== 0 ? n < 0 : 1 / n < 0;
var math = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    floor: floor,
    ceil: ceil,
    abs: abs,
    imul: imul,
    round: round,
    log10: log10,
    log2: log2,
    log: log,
    sqrt: sqrt,
    add: add,
    min: min,
    max: max,
    isNaN: isNaN,
    pow: pow,
    exp10: exp10,
    sign: sign,
    isNegativeZero: isNegativeZero
});
exports.abs = abs;
exports.add = add;
exports.ceil = ceil;
exports.exp10 = exp10;
exports.floor = floor;
exports.imul = imul;
exports.isNaN = isNaN;
exports.isNegativeZero = isNegativeZero;
exports.log = log;
exports.log10 = log10;
exports.log2 = log2;
exports.math = math;
exports.max = max;
exports.min = min;
exports.pow = pow;
exports.round = round;
exports.sign = sign;
exports.sqrt = sqrt; //# sourceMappingURL=math-08e068f9.cjs.map

},{}],"bTbOS":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var map = require("./map-28a001c9.cjs");
exports.all = map.all;
exports.any = map.any;
exports.copy = map.copy;
exports.create = map.create;
exports.map = map.map;
exports.setIfUndefined = map.setIfUndefined; //# sourceMappingURL=map.cjs.map

},{"./map-28a001c9.cjs":"lrupf"}],"7qhyQ":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var encoding = require("./buffer-c98f67d5.cjs");
require("./math-08e068f9.cjs");
require("./number-e62129bc.cjs");
require("./binary-ac8e39e2.cjs");
require("./string-ad04f734.cjs");
require("./environment-60b83194.cjs");
require("./map-28a001c9.cjs");
require("./conditions-fb475c70.cjs");
require("./storage.cjs");
exports.Encoder = encoding.Encoder;
exports.IncUintOptRleEncoder = encoding.IncUintOptRleEncoder;
exports.IntDiffEncoder = encoding.IntDiffEncoder;
exports.IntDiffOptRleEncoder = encoding.IntDiffOptRleEncoder;
exports.RleEncoder = encoding.RleEncoder;
exports.RleIntDiffEncoder = encoding.RleIntDiffEncoder;
exports.StringEncoder = encoding.StringEncoder;
exports.UintOptRleEncoder = encoding.UintOptRleEncoder;
exports.createEncoder = encoding.createEncoder;
exports.length = encoding.length;
exports.set = encoding.set;
exports.setUint16 = encoding.setUint16;
exports.setUint32 = encoding.setUint32;
exports.setUint8 = encoding.setUint8;
exports.toUint8Array = encoding.toUint8Array;
exports.write = encoding.write;
exports.writeAny = encoding.writeAny;
exports.writeBigInt64 = encoding.writeBigInt64;
exports.writeBigUint64 = encoding.writeBigUint64;
exports.writeBinaryEncoder = encoding.writeBinaryEncoder;
exports.writeFloat32 = encoding.writeFloat32;
exports.writeFloat64 = encoding.writeFloat64;
exports.writeOnDataView = encoding.writeOnDataView;
exports.writeUint16 = encoding.writeUint16;
exports.writeUint32 = encoding.writeUint32;
exports.writeUint32BigEndian = encoding.writeUint32BigEndian;
exports.writeUint8 = encoding.writeUint8;
exports.writeUint8Array = encoding.writeUint8Array;
exports.writeVarInt = encoding.writeVarInt;
exports.writeVarString = encoding.writeVarString;
exports.writeVarUint = encoding.writeVarUint;
exports.writeVarUint8Array = encoding.writeVarUint8Array; //# sourceMappingURL=encoding.cjs.map

},{"./buffer-c98f67d5.cjs":"fOSLt","./math-08e068f9.cjs":"lb1Mp","./number-e62129bc.cjs":"cOZT7","./binary-ac8e39e2.cjs":"fxH3h","./string-ad04f734.cjs":"ajWKc","./environment-60b83194.cjs":"byYnb","./map-28a001c9.cjs":"lrupf","./conditions-fb475c70.cjs":"la0gY","./storage.cjs":"98sVq"}],"fOSLt":[function(require,module,exports) {
var Buffer = require("buffer").Buffer;
"use strict";
var string = require("./string-ad04f734.cjs");
var environment = require("./environment-60b83194.cjs");
var binary = require("./binary-ac8e39e2.cjs");
var math = require("./math-08e068f9.cjs");
var number = require("./number-e62129bc.cjs");
/**
 * Efficient schema-less binary encoding with support for variable length encoding.
 *
 * Use [lib0/encoding] with [lib0/decoding]. Every encoding function has a corresponding decoding function.
 *
 * Encodes numbers in little-endian order (least to most significant byte order)
 * and is compatible with Golang's binary encoding (https://golang.org/pkg/encoding/binary/)
 * which is also used in Protocol Buffers.
 *
 * ```js
 * // encoding step
 * const encoder = new encoding.createEncoder()
 * encoding.writeVarUint(encoder, 256)
 * encoding.writeVarString(encoder, 'Hello world!')
 * const buf = encoding.toUint8Array(encoder)
 * ```
 *
 * ```js
 * // decoding step
 * const decoder = new decoding.createDecoder(buf)
 * decoding.readVarUint(decoder) // => 256
 * decoding.readVarString(decoder) // => 'Hello world!'
 * decoding.hasContent(decoder) // => false - all data is read
 * ```
 *
 * @module encoding
 */ /**
 * A BinaryEncoder handles the encoding to an Uint8Array.
 */ class Encoder {
    constructor(){
        this.cpos = 0;
        this.cbuf = new Uint8Array(100);
        /**
     * @type {Array<Uint8Array>}
     */ this.bufs = [];
    }
}
/**
 * @function
 * @return {Encoder}
 */ const createEncoder = ()=>new Encoder();
/**
 * The current length of the encoded data.
 *
 * @function
 * @param {Encoder} encoder
 * @return {number}
 */ const length = (encoder)=>{
    let len = encoder.cpos;
    for(let i = 0; i < encoder.bufs.length; i++)len += encoder.bufs[i].length;
    return len;
};
/**
 * Transform to Uint8Array.
 *
 * @function
 * @param {Encoder} encoder
 * @return {Uint8Array} The created ArrayBuffer.
 */ const toUint8Array = (encoder)=>{
    const uint8arr = new Uint8Array(length(encoder));
    let curPos = 0;
    for(let i = 0; i < encoder.bufs.length; i++){
        const d = encoder.bufs[i];
        uint8arr.set(d, curPos);
        curPos += d.length;
    }
    uint8arr.set(createUint8ArrayViewFromArrayBuffer(encoder.cbuf.buffer, 0, encoder.cpos), curPos);
    return uint8arr;
};
/**
 * Verify that it is possible to write `len` bytes wtihout checking. If
 * necessary, a new Buffer with the required length is attached.
 *
 * @param {Encoder} encoder
 * @param {number} len
 */ const verifyLen = (encoder, len)=>{
    const bufferLen = encoder.cbuf.length;
    if (bufferLen - encoder.cpos < len) {
        encoder.bufs.push(createUint8ArrayViewFromArrayBuffer(encoder.cbuf.buffer, 0, encoder.cpos));
        encoder.cbuf = new Uint8Array(math.max(bufferLen, len) * 2);
        encoder.cpos = 0;
    }
};
/**
 * Write one byte to the encoder.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The byte that is to be encoded.
 */ const write = (encoder, num)=>{
    const bufferLen = encoder.cbuf.length;
    if (encoder.cpos === bufferLen) {
        encoder.bufs.push(encoder.cbuf);
        encoder.cbuf = new Uint8Array(bufferLen * 2);
        encoder.cpos = 0;
    }
    encoder.cbuf[encoder.cpos++] = num;
};
/**
 * Write one byte at a specific position.
 * Position must already be written (i.e. encoder.length > pos)
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} pos Position to which to write data
 * @param {number} num Unsigned 8-bit integer
 */ const set = (encoder, pos, num)=>{
    let buffer = null;
    // iterate all buffers and adjust position
    for(let i = 0; i < encoder.bufs.length && buffer === null; i++){
        const b = encoder.bufs[i];
        if (pos < b.length) buffer = b; // found buffer
        else pos -= b.length;
    }
    if (buffer === null) // use current buffer
    buffer = encoder.cbuf;
    buffer[pos] = num;
};
/**
 * Write one byte as an unsigned integer.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The number that is to be encoded.
 */ const writeUint8 = write;
/**
 * Write one byte as an unsigned Integer at a specific location.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} pos The location where the data will be written.
 * @param {number} num The number that is to be encoded.
 */ const setUint8 = set;
/**
 * Write two bytes as an unsigned integer.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The number that is to be encoded.
 */ const writeUint16 = (encoder, num)=>{
    write(encoder, num & binary.BITS8);
    write(encoder, num >>> 8 & binary.BITS8);
};
/**
 * Write two bytes as an unsigned integer at a specific location.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} pos The location where the data will be written.
 * @param {number} num The number that is to be encoded.
 */ const setUint16 = (encoder, pos, num)=>{
    set(encoder, pos, num & binary.BITS8);
    set(encoder, pos + 1, num >>> 8 & binary.BITS8);
};
/**
 * Write two bytes as an unsigned integer
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The number that is to be encoded.
 */ const writeUint32 = (encoder, num)=>{
    for(let i = 0; i < 4; i++){
        write(encoder, num & binary.BITS8);
        num >>>= 8;
    }
};
/**
 * Write two bytes as an unsigned integer in big endian order.
 * (most significant byte first)
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The number that is to be encoded.
 */ const writeUint32BigEndian = (encoder, num)=>{
    for(let i = 3; i >= 0; i--)write(encoder, num >>> 8 * i & binary.BITS8);
};
/**
 * Write two bytes as an unsigned integer at a specific location.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} pos The location where the data will be written.
 * @param {number} num The number that is to be encoded.
 */ const setUint32 = (encoder, pos, num)=>{
    for(let i = 0; i < 4; i++){
        set(encoder, pos + i, num & binary.BITS8);
        num >>>= 8;
    }
};
/**
 * Write a variable length unsigned integer.
 *
 * Encodes integers in the range from [0, 4294967295] / [0, 0xffffffff]. (max 32 bit unsigned integer)
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The number that is to be encoded.
 */ const writeVarUint = (encoder, num)=>{
    while(num > binary.BITS7){
        write(encoder, binary.BIT8 | binary.BITS7 & num);
        num >>>= 7;
    }
    write(encoder, binary.BITS7 & num);
};
/**
 * Write a variable length integer.
 *
 * Encodes integers in the range from [-2147483648, -2147483647].
 *
 * We don't use zig-zag encoding because we want to keep the option open
 * to use the same function for BigInt and 53bit integers (doubles).
 *
 * We use the 7th bit instead for signaling that this is a negative number.
 *
 * @function
 * @param {Encoder} encoder
 * @param {number} num The number that is to be encoded.
 */ const writeVarInt = (encoder, num)=>{
    const isNegative = math.isNegativeZero(num);
    if (isNegative) num = -num;
    //             |- whether to continue reading         |- whether is negative     |- number
    write(encoder, (num > binary.BITS6 ? binary.BIT8 : 0) | (isNegative ? binary.BIT7 : 0) | binary.BITS6 & num);
    num >>>= 6;
    // We don't need to consider the case of num === 0 so we can use a different
    // pattern here than above.
    while(num > 0){
        write(encoder, (num > binary.BITS7 ? binary.BIT8 : 0) | binary.BITS7 & num);
        num >>>= 7;
    }
};
/**
 * Write a variable length string.
 *
 * @function
 * @param {Encoder} encoder
 * @param {String} str The string that is to be encoded.
 */ const writeVarString = (encoder, str)=>{
    const encodedString = unescape(encodeURIComponent(str));
    const len = encodedString.length;
    writeVarUint(encoder, len);
    for(let i = 0; i < len; i++)write(encoder, /** @type {number} */ encodedString.codePointAt(i));
};
/**
 * Write the content of another Encoder.
 *
 * @TODO: can be improved!
 *        - Note: Should consider that when appending a lot of small Encoders, we should rather clone than referencing the old structure.
 *                Encoders start with a rather big initial buffer.
 *
 * @function
 * @param {Encoder} encoder The enUint8Arr
 * @param {Encoder} append The BinaryEncoder to be written.
 */ const writeBinaryEncoder = (encoder, append)=>writeUint8Array(encoder, toUint8Array(append));
/**
 * Append fixed-length Uint8Array to the encoder.
 *
 * @function
 * @param {Encoder} encoder
 * @param {Uint8Array} uint8Array
 */ const writeUint8Array = (encoder, uint8Array)=>{
    const bufferLen = encoder.cbuf.length;
    const cpos = encoder.cpos;
    const leftCopyLen = math.min(bufferLen - cpos, uint8Array.length);
    const rightCopyLen = uint8Array.length - leftCopyLen;
    encoder.cbuf.set(uint8Array.subarray(0, leftCopyLen), cpos);
    encoder.cpos += leftCopyLen;
    if (rightCopyLen > 0) {
        // Still something to write, write right half..
        // Append new buffer
        encoder.bufs.push(encoder.cbuf);
        // must have at least size of remaining buffer
        encoder.cbuf = new Uint8Array(math.max(bufferLen * 2, rightCopyLen));
        // copy array
        encoder.cbuf.set(uint8Array.subarray(leftCopyLen));
        encoder.cpos = rightCopyLen;
    }
};
/**
 * Append an Uint8Array to Encoder.
 *
 * @function
 * @param {Encoder} encoder
 * @param {Uint8Array} uint8Array
 */ const writeVarUint8Array = (encoder, uint8Array)=>{
    writeVarUint(encoder, uint8Array.byteLength);
    writeUint8Array(encoder, uint8Array);
};
/**
 * Create an DataView of the next `len` bytes. Use it to write data after
 * calling this function.
 *
 * ```js
 * // write float32 using DataView
 * const dv = writeOnDataView(encoder, 4)
 * dv.setFloat32(0, 1.1)
 * // read float32 using DataView
 * const dv = readFromDataView(encoder, 4)
 * dv.getFloat32(0) // => 1.100000023841858 (leaving it to the reader to find out why this is the correct result)
 * ```
 *
 * @param {Encoder} encoder
 * @param {number} len
 * @return {DataView}
 */ const writeOnDataView = (encoder, len)=>{
    verifyLen(encoder, len);
    const dview = new DataView(encoder.cbuf.buffer, encoder.cpos, len);
    encoder.cpos += len;
    return dview;
};
/**
 * @param {Encoder} encoder
 * @param {number} num
 */ const writeFloat32 = (encoder, num)=>writeOnDataView(encoder, 4).setFloat32(0, num, false);
/**
 * @param {Encoder} encoder
 * @param {number} num
 */ const writeFloat64 = (encoder, num)=>writeOnDataView(encoder, 8).setFloat64(0, num, false);
/**
 * @param {Encoder} encoder
 * @param {bigint} num
 */ const writeBigInt64 = (encoder, num)=>/** @type {any} */ writeOnDataView(encoder, 8).setBigInt64(0, num, false);
/**
 * @param {Encoder} encoder
 * @param {bigint} num
 */ const writeBigUint64 = (encoder, num)=>/** @type {any} */ writeOnDataView(encoder, 8).setBigUint64(0, num, false);
const floatTestBed = new DataView(new ArrayBuffer(4));
/**
 * Check if a number can be encoded as a 32 bit float.
 *
 * @param {number} num
 * @return {boolean}
 */ const isFloat32 = (num)=>{
    floatTestBed.setFloat32(0, num);
    return floatTestBed.getFloat32(0) === num;
};
/**
 * Encode data with efficient binary format.
 *
 * Differences to JSON:
 * • Transforms data to a binary format (not to a string)
 * • Encodes undefined, NaN, and ArrayBuffer (these can't be represented in JSON)
 * • Numbers are efficiently encoded either as a variable length integer, as a
 *   32 bit float, as a 64 bit float, or as a 64 bit bigint.
 *
 * Encoding table:
 *
 * | Data Type           | Prefix   | Encoding Method    | Comment |
 * | ------------------- | -------- | ------------------ | ------- |
 * | undefined           | 127      |                    | Functions, symbol, and everything that cannot be identified is encoded as undefined |
 * | null                | 126      |                    | |
 * | integer             | 125      | writeVarInt        | Only encodes 32 bit signed integers |
 * | float32             | 124      | writeFloat32       | |
 * | float64             | 123      | writeFloat64       | |
 * | bigint              | 122      | writeBigInt64      | |
 * | boolean (false)     | 121      |                    | True and false are different data types so we save the following byte |
 * | boolean (true)      | 120      |                    | - 0b01111000 so the last bit determines whether true or false |
 * | string              | 119      | writeVarString     | |
 * | object<string,any>  | 118      | custom             | Writes {length} then {length} key-value pairs |
 * | array<any>          | 117      | custom             | Writes {length} then {length} json values |
 * | Uint8Array          | 116      | writeVarUint8Array | We use Uint8Array for any kind of binary data |
 *
 * Reasons for the decreasing prefix:
 * We need the first bit for extendability (later we may want to encode the
 * prefix with writeVarUint). The remaining 7 bits are divided as follows:
 * [0-30]   the beginning of the data range is used for custom purposes
 *          (defined by the function that uses this library)
 * [31-127] the end of the data range is used for data encoding by
 *          lib0/encoding.js
 *
 * @param {Encoder} encoder
 * @param {undefined|null|number|bigint|boolean|string|Object<string,any>|Array<any>|Uint8Array} data
 */ const writeAny = (encoder, data)=>{
    switch(typeof data){
        case "string":
            // TYPE 119: STRING
            write(encoder, 119);
            writeVarString(encoder, data);
            break;
        case "number":
            if (number.isInteger(data) && math.abs(data) <= binary.BITS31) {
                // TYPE 125: INTEGER
                write(encoder, 125);
                writeVarInt(encoder, data);
            } else if (isFloat32(data)) {
                // TYPE 124: FLOAT32
                write(encoder, 124);
                writeFloat32(encoder, data);
            } else {
                // TYPE 123: FLOAT64
                write(encoder, 123);
                writeFloat64(encoder, data);
            }
            break;
        case "bigint":
            // TYPE 122: BigInt
            write(encoder, 122);
            writeBigInt64(encoder, data);
            break;
        case "object":
            if (data === null) // TYPE 126: null
            write(encoder, 126);
            else if (data instanceof Array) {
                // TYPE 117: Array
                write(encoder, 117);
                writeVarUint(encoder, data.length);
                for(let i = 0; i < data.length; i++)writeAny(encoder, data[i]);
            } else if (data instanceof Uint8Array) {
                // TYPE 116: ArrayBuffer
                write(encoder, 116);
                writeVarUint8Array(encoder, data);
            } else {
                // TYPE 118: Object
                write(encoder, 118);
                const keys = Object.keys(data);
                writeVarUint(encoder, keys.length);
                for(let i1 = 0; i1 < keys.length; i1++){
                    const key = keys[i1];
                    writeVarString(encoder, key);
                    writeAny(encoder, data[key]);
                }
            }
            break;
        case "boolean":
            // TYPE 120/121: boolean (true/false)
            write(encoder, data ? 120 : 121);
            break;
        default:
            // TYPE 127: undefined
            write(encoder, 127);
    }
};
/**
 * Now come a few stateful encoder that have their own classes.
 */ /**
 * Basic Run Length Encoder - a basic compression implementation.
 *
 * Encodes [1,1,1,7] to [1,3,7,1] (3 times 1, 1 time 7). This encoder might do more harm than good if there are a lot of values that are not repeated.
 *
 * It was originally used for image compression. Cool .. article http://csbruce.com/cbm/transactor/pdfs/trans_v7_i06.pdf
 *
 * @note T must not be null!
 *
 * @template T
 */ class RleEncoder extends Encoder {
    /**
   * @param {function(Encoder, T):void} writer
   */ constructor(writer){
        super();
        /**
     * The writer
     */ this.w = writer;
        /**
     * Current state
     * @type {T|null}
     */ this.s = null;
        this.count = 0;
    }
    /**
   * @param {T} v
   */ write(v) {
        if (this.s === v) this.count++;
        else {
            if (this.count > 0) // flush counter, unless this is the first value (count = 0)
            writeVarUint(this, this.count - 1); // since count is always > 0, we can decrement by one. non-standard encoding ftw
            this.count = 1;
            // write first value
            this.w(this, v);
            this.s = v;
        }
    }
}
/**
 * Basic diff decoder using variable length encoding.
 *
 * Encodes the values [3, 1100, 1101, 1050, 0] to [3, 1097, 1, -51, -1050] using writeVarInt.
 */ class IntDiffEncoder extends Encoder {
    /**
   * @param {number} start
   */ constructor(start){
        super();
        /**
     * Current state
     * @type {number}
     */ this.s = start;
    }
    /**
   * @param {number} v
   */ write(v) {
        writeVarInt(this, v - this.s);
        this.s = v;
    }
}
/**
 * A combination of IntDiffEncoder and RleEncoder.
 *
 * Basically first writes the IntDiffEncoder and then counts duplicate diffs using RleEncoding.
 *
 * Encodes the values [1,1,1,2,3,4,5,6] as [1,1,0,2,1,5] (RLE([1,0,0,1,1,1,1,1]) ⇒ RleIntDiff[1,1,0,2,1,5])
 */ class RleIntDiffEncoder extends Encoder {
    /**
   * @param {number} start
   */ constructor(start){
        super();
        /**
     * Current state
     * @type {number}
     */ this.s = start;
        this.count = 0;
    }
    /**
   * @param {number} v
   */ write(v) {
        if (this.s === v && this.count > 0) this.count++;
        else {
            if (this.count > 0) // flush counter, unless this is the first value (count = 0)
            writeVarUint(this, this.count - 1); // since count is always > 0, we can decrement by one. non-standard encoding ftw
            this.count = 1;
            // write first value
            writeVarInt(this, v - this.s);
            this.s = v;
        }
    }
}
/**
 * @param {UintOptRleEncoder} encoder
 */ const flushUintOptRleEncoder = (encoder)=>{
    /* istanbul ignore else */ if (encoder.count > 0) {
        // flush counter, unless this is the first value (count = 0)
        // case 1: just a single value. set sign to positive
        // case 2: write several values. set sign to negative to indicate that there is a length coming
        writeVarInt(encoder.encoder, encoder.count === 1 ? encoder.s : -encoder.s);
        if (encoder.count > 1) writeVarUint(encoder.encoder, encoder.count - 2); // since count is always > 1, we can decrement by one. non-standard encoding ftw
    }
};
/**
 * Optimized Rle encoder that does not suffer from the mentioned problem of the basic Rle encoder.
 *
 * Internally uses VarInt encoder to write unsigned integers. If the input occurs multiple times, we write
 * write it as a negative number. The UintOptRleDecoder then understands that it needs to read a count.
 *
 * Encodes [1,2,3,3,3] as [1,2,-3,3] (once 1, once 2, three times 3)
 */ class UintOptRleEncoder {
    constructor(){
        this.encoder = new Encoder();
        /**
     * @type {number}
     */ this.s = 0;
        this.count = 0;
    }
    /**
   * @param {number} v
   */ write(v) {
        if (this.s === v) this.count++;
        else {
            flushUintOptRleEncoder(this);
            this.count = 1;
            this.s = v;
        }
    }
    toUint8Array() {
        flushUintOptRleEncoder(this);
        return toUint8Array(this.encoder);
    }
}
/**
 * Increasing Uint Optimized RLE Encoder
 *
 * The RLE encoder counts the number of same occurences of the same value.
 * The IncUintOptRle encoder counts if the value increases.
 * I.e. 7, 8, 9, 10 will be encoded as [-7, 4]. 1, 3, 5 will be encoded
 * as [1, 3, 5].
 */ class IncUintOptRleEncoder {
    constructor(){
        this.encoder = new Encoder();
        /**
     * @type {number}
     */ this.s = 0;
        this.count = 0;
    }
    /**
   * @param {number} v
   */ write(v) {
        if (this.s + this.count === v) this.count++;
        else {
            flushUintOptRleEncoder(this);
            this.count = 1;
            this.s = v;
        }
    }
    toUint8Array() {
        flushUintOptRleEncoder(this);
        return toUint8Array(this.encoder);
    }
}
/**
 * @param {IntDiffOptRleEncoder} encoder
 */ const flushIntDiffOptRleEncoder = (encoder)=>{
    if (encoder.count > 0) {
        //          31 bit making up the diff | wether to write the counter
        const encodedDiff = encoder.diff << 1 | (encoder.count === 1 ? 0 : 1);
        // flush counter, unless this is the first value (count = 0)
        // case 1: just a single value. set first bit to positive
        // case 2: write several values. set first bit to negative to indicate that there is a length coming
        writeVarInt(encoder.encoder, encodedDiff);
        if (encoder.count > 1) writeVarUint(encoder.encoder, encoder.count - 2); // since count is always > 1, we can decrement by one. non-standard encoding ftw
    }
};
/**
 * A combination of the IntDiffEncoder and the UintOptRleEncoder.
 *
 * The count approach is similar to the UintDiffOptRleEncoder, but instead of using the negative bitflag, it encodes
 * in the LSB whether a count is to be read. Therefore this Encoder only supports 31 bit integers!
 *
 * Encodes [1, 2, 3, 2] as [3, 1, 6, -1] (more specifically [(1 << 1) | 1, (3 << 0) | 0, -1])
 *
 * Internally uses variable length encoding. Contrary to normal UintVar encoding, the first byte contains:
 * * 1 bit that denotes whether the next value is a count (LSB)
 * * 1 bit that denotes whether this value is negative (MSB - 1)
 * * 1 bit that denotes whether to continue reading the variable length integer (MSB)
 *
 * Therefore, only five bits remain to encode diff ranges.
 *
 * Use this Encoder only when appropriate. In most cases, this is probably a bad idea.
 */ class IntDiffOptRleEncoder {
    constructor(){
        this.encoder = new Encoder();
        /**
     * @type {number}
     */ this.s = 0;
        this.count = 0;
        this.diff = 0;
    }
    /**
   * @param {number} v
   */ write(v) {
        if (this.diff === v - this.s) {
            this.s = v;
            this.count++;
        } else {
            flushIntDiffOptRleEncoder(this);
            this.count = 1;
            this.diff = v - this.s;
            this.s = v;
        }
    }
    toUint8Array() {
        flushIntDiffOptRleEncoder(this);
        return toUint8Array(this.encoder);
    }
}
/**
 * Optimized String Encoder.
 *
 * Encoding many small strings in a simple Encoder is not very efficient. The function call to decode a string takes some time and creates references that must be eventually deleted.
 * In practice, when decoding several million small strings, the GC will kick in more and more often to collect orphaned string objects (or maybe there is another reason?).
 *
 * This string encoder solves the above problem. All strings are concatenated and written as a single string using a single encoding call.
 *
 * The lengths are encoded using a UintOptRleEncoder.
 */ class StringEncoder {
    constructor(){
        /**
     * @type {Array<string>}
     */ this.sarr = [];
        this.s = "";
        this.lensE = new UintOptRleEncoder();
    }
    /**
   * @param {string} string
   */ write(string) {
        this.s += string;
        if (this.s.length > 19) {
            this.sarr.push(this.s);
            this.s = "";
        }
        this.lensE.write(string.length);
    }
    toUint8Array() {
        const encoder = new Encoder();
        this.sarr.push(this.s);
        this.s = "";
        writeVarString(encoder, this.sarr.join(""));
        writeUint8Array(encoder, this.lensE.toUint8Array());
        return toUint8Array(encoder);
    }
}
var encoding = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    Encoder: Encoder,
    createEncoder: createEncoder,
    length: length,
    toUint8Array: toUint8Array,
    write: write,
    set: set,
    writeUint8: writeUint8,
    setUint8: setUint8,
    writeUint16: writeUint16,
    setUint16: setUint16,
    writeUint32: writeUint32,
    writeUint32BigEndian: writeUint32BigEndian,
    setUint32: setUint32,
    writeVarUint: writeVarUint,
    writeVarInt: writeVarInt,
    writeVarString: writeVarString,
    writeBinaryEncoder: writeBinaryEncoder,
    writeUint8Array: writeUint8Array,
    writeVarUint8Array: writeVarUint8Array,
    writeOnDataView: writeOnDataView,
    writeFloat32: writeFloat32,
    writeFloat64: writeFloat64,
    writeBigInt64: writeBigInt64,
    writeBigUint64: writeBigUint64,
    writeAny: writeAny,
    RleEncoder: RleEncoder,
    IntDiffEncoder: IntDiffEncoder,
    RleIntDiffEncoder: RleIntDiffEncoder,
    UintOptRleEncoder: UintOptRleEncoder,
    IncUintOptRleEncoder: IncUintOptRleEncoder,
    IntDiffOptRleEncoder: IntDiffOptRleEncoder,
    StringEncoder: StringEncoder
});
/**
 * Efficient schema-less binary decoding with support for variable length encoding.
 *
 * Use [lib0/decoding] with [lib0/encoding]. Every encoding function has a corresponding decoding function.
 *
 * Encodes numbers in little-endian order (least to most significant byte order)
 * and is compatible with Golang's binary encoding (https://golang.org/pkg/encoding/binary/)
 * which is also used in Protocol Buffers.
 *
 * ```js
 * // encoding step
 * const encoder = new encoding.createEncoder()
 * encoding.writeVarUint(encoder, 256)
 * encoding.writeVarString(encoder, 'Hello world!')
 * const buf = encoding.toUint8Array(encoder)
 * ```
 *
 * ```js
 * // decoding step
 * const decoder = new decoding.createDecoder(buf)
 * decoding.readVarUint(decoder) // => 256
 * decoding.readVarString(decoder) // => 'Hello world!'
 * decoding.hasContent(decoder) // => false - all data is read
 * ```
 *
 * @module decoding
 */ /**
 * A Decoder handles the decoding of an Uint8Array.
 */ class Decoder {
    /**
   * @param {Uint8Array} uint8Array Binary data to decode
   */ constructor(uint8Array){
        /**
     * Decoding target.
     *
     * @type {Uint8Array}
     */ this.arr = uint8Array;
        /**
     * Current decoding position.
     *
     * @type {number}
     */ this.pos = 0;
    }
}
/**
 * @function
 * @param {Uint8Array} uint8Array
 * @return {Decoder}
 */ const createDecoder = (uint8Array)=>new Decoder(uint8Array);
/**
 * @function
 * @param {Decoder} decoder
 * @return {boolean}
 */ const hasContent = (decoder)=>decoder.pos !== decoder.arr.length;
/**
 * Clone a decoder instance.
 * Optionally set a new position parameter.
 *
 * @function
 * @param {Decoder} decoder The decoder instance
 * @param {number} [newPos] Defaults to current position
 * @return {Decoder} A clone of `decoder`
 */ const clone = (decoder, newPos = decoder.pos)=>{
    const _decoder = createDecoder(decoder.arr);
    _decoder.pos = newPos;
    return _decoder;
};
/**
 * Create an Uint8Array view of the next `len` bytes and advance the position by `len`.
 *
 * Important: The Uint8Array still points to the underlying ArrayBuffer. Make sure to discard the result as soon as possible to prevent any memory leaks.
 *            Use `buffer.copyUint8Array` to copy the result into a new Uint8Array.
 *
 * @function
 * @param {Decoder} decoder The decoder instance
 * @param {number} len The length of bytes to read
 * @return {Uint8Array}
 */ const readUint8Array = (decoder, len)=>{
    const view = createUint8ArrayViewFromArrayBuffer(decoder.arr.buffer, decoder.pos + decoder.arr.byteOffset, len);
    decoder.pos += len;
    return view;
};
/**
 * Read variable length Uint8Array.
 *
 * Important: The Uint8Array still points to the underlying ArrayBuffer. Make sure to discard the result as soon as possible to prevent any memory leaks.
 *            Use `buffer.copyUint8Array` to copy the result into a new Uint8Array.
 *
 * @function
 * @param {Decoder} decoder
 * @return {Uint8Array}
 */ const readVarUint8Array = (decoder)=>readUint8Array(decoder, readVarUint(decoder));
/**
 * Read the rest of the content as an ArrayBuffer
 * @function
 * @param {Decoder} decoder
 * @return {Uint8Array}
 */ const readTailAsUint8Array = (decoder)=>readUint8Array(decoder, decoder.arr.length - decoder.pos);
/**
 * Skip one byte, jump to the next position.
 * @function
 * @param {Decoder} decoder The decoder instance
 * @return {number} The next position
 */ const skip8 = (decoder)=>decoder.pos++;
/**
 * Read one byte as unsigned integer.
 * @function
 * @param {Decoder} decoder The decoder instance
 * @return {number} Unsigned 8-bit integer
 */ const readUint8 = (decoder)=>decoder.arr[decoder.pos++];
/**
 * Read 2 bytes as unsigned integer.
 *
 * @function
 * @param {Decoder} decoder
 * @return {number} An unsigned integer.
 */ const readUint16 = (decoder)=>{
    const uint = decoder.arr[decoder.pos] + (decoder.arr[decoder.pos + 1] << 8);
    decoder.pos += 2;
    return uint;
};
/**
 * Read 4 bytes as unsigned integer.
 *
 * @function
 * @param {Decoder} decoder
 * @return {number} An unsigned integer.
 */ const readUint32 = (decoder)=>{
    const uint = decoder.arr[decoder.pos] + (decoder.arr[decoder.pos + 1] << 8) + (decoder.arr[decoder.pos + 2] << 16) + (decoder.arr[decoder.pos + 3] << 24) >>> 0;
    decoder.pos += 4;
    return uint;
};
/**
 * Read 4 bytes as unsigned integer in big endian order.
 * (most significant byte first)
 *
 * @function
 * @param {Decoder} decoder
 * @return {number} An unsigned integer.
 */ const readUint32BigEndian = (decoder)=>{
    const uint = decoder.arr[decoder.pos + 3] + (decoder.arr[decoder.pos + 2] << 8) + (decoder.arr[decoder.pos + 1] << 16) + (decoder.arr[decoder.pos] << 24) >>> 0;
    decoder.pos += 4;
    return uint;
};
/**
 * Look ahead without incrementing the position
 * to the next byte and read it as unsigned integer.
 *
 * @function
 * @param {Decoder} decoder
 * @return {number} An unsigned integer.
 */ const peekUint8 = (decoder)=>decoder.arr[decoder.pos];
/**
 * Look ahead without incrementing the position
 * to the next byte and read it as unsigned integer.
 *
 * @function
 * @param {Decoder} decoder
 * @return {number} An unsigned integer.
 */ const peekUint16 = (decoder)=>decoder.arr[decoder.pos] + (decoder.arr[decoder.pos + 1] << 8);
/**
 * Look ahead without incrementing the position
 * to the next byte and read it as unsigned integer.
 *
 * @function
 * @param {Decoder} decoder
 * @return {number} An unsigned integer.
 */ const peekUint32 = (decoder)=>decoder.arr[decoder.pos] + (decoder.arr[decoder.pos + 1] << 8) + (decoder.arr[decoder.pos + 2] << 16) + (decoder.arr[decoder.pos + 3] << 24) >>> 0;
/**
 * Read unsigned integer (32bit) with variable length.
 * 1/8th of the storage is used as encoding overhead.
 *  * numbers < 2^7 is stored in one bytlength
 *  * numbers < 2^14 is stored in two bylength
 *
 * @function
 * @param {Decoder} decoder
 * @return {number} An unsigned integer.length
 */ const readVarUint = (decoder)=>{
    let num = 0;
    let len = 0;
    while(true){
        const r = decoder.arr[decoder.pos++];
        num = num | (r & binary.BITS7) << len;
        len += 7;
        if (r < binary.BIT8) return num >>> 0 // return unsigned number!
        ;
        /* istanbul ignore if */ if (len > 53) throw new Error("Integer out of range!");
    }
};
/**
 * Read signed integer (32bit) with variable length.
 * 1/8th of the storage is used as encoding overhead.
 *  * numbers < 2^7 is stored in one bytlength
 *  * numbers < 2^14 is stored in two bylength
 * @todo This should probably create the inverse ~num if number is negative - but this would be a breaking change.
 *
 * @function
 * @param {Decoder} decoder
 * @return {number} An unsigned integer.length
 */ const readVarInt = (decoder)=>{
    let r = decoder.arr[decoder.pos++];
    let num = r & binary.BITS6;
    let len = 6;
    const sign = (r & binary.BIT7) > 0 ? -1 : 1;
    if ((r & binary.BIT8) === 0) // don't continue reading
    return sign * num;
    while(true){
        r = decoder.arr[decoder.pos++];
        num = num | (r & binary.BITS7) << len;
        len += 7;
        if (r < binary.BIT8) return sign * (num >>> 0);
        /* istanbul ignore if */ if (len > 53) throw new Error("Integer out of range!");
    }
};
/**
 * Look ahead and read varUint without incrementing position
 *
 * @function
 * @param {Decoder} decoder
 * @return {number}
 */ const peekVarUint = (decoder)=>{
    const pos = decoder.pos;
    const s = readVarUint(decoder);
    decoder.pos = pos;
    return s;
};
/**
 * Look ahead and read varUint without incrementing position
 *
 * @function
 * @param {Decoder} decoder
 * @return {number}
 */ const peekVarInt = (decoder)=>{
    const pos = decoder.pos;
    const s = readVarInt(decoder);
    decoder.pos = pos;
    return s;
};
/**
 * Read string of variable length
 * * varUint is used to store the length of the string
 *
 * Transforming utf8 to a string is pretty expensive. The code performs 10x better
 * when String.fromCodePoint is fed with all characters as arguments.
 * But most environments have a maximum number of arguments per functions.
 * For effiency reasons we apply a maximum of 10000 characters at once.
 *
 * @function
 * @param {Decoder} decoder
 * @return {String} The read String.
 */ const readVarString = (decoder)=>{
    let remainingLen = readVarUint(decoder);
    if (remainingLen === 0) return "";
    else {
        let encodedString = String.fromCodePoint(readUint8(decoder)); // remember to decrease remainingLen
        if (--remainingLen < 100) while(remainingLen--)encodedString += String.fromCodePoint(readUint8(decoder));
        else while(remainingLen > 0){
            const nextLen = remainingLen < 10000 ? remainingLen : 10000;
            // this is dangerous, we create a fresh array view from the existing buffer
            const bytes = decoder.arr.subarray(decoder.pos, decoder.pos + nextLen);
            decoder.pos += nextLen;
            // Starting with ES5.1 we can supply a generic array-like object as arguments
            encodedString += String.fromCodePoint.apply(null, /** @type {any} */ bytes);
            remainingLen -= nextLen;
        }
        return decodeURIComponent(escape(encodedString));
    }
};
/**
 * Look ahead and read varString without incrementing position
 *
 * @function
 * @param {Decoder} decoder
 * @return {string}
 */ const peekVarString = (decoder)=>{
    const pos = decoder.pos;
    const s = readVarString(decoder);
    decoder.pos = pos;
    return s;
};
/**
 * @param {Decoder} decoder
 * @param {number} len
 * @return {DataView}
 */ const readFromDataView = (decoder, len)=>{
    const dv = new DataView(decoder.arr.buffer, decoder.arr.byteOffset + decoder.pos, len);
    decoder.pos += len;
    return dv;
};
/**
 * @param {Decoder} decoder
 */ const readFloat32 = (decoder)=>readFromDataView(decoder, 4).getFloat32(0, false);
/**
 * @param {Decoder} decoder
 */ const readFloat64 = (decoder)=>readFromDataView(decoder, 8).getFloat64(0, false);
/**
 * @param {Decoder} decoder
 */ const readBigInt64 = (decoder)=>/** @type {any} */ readFromDataView(decoder, 8).getBigInt64(0, false);
/**
 * @param {Decoder} decoder
 */ const readBigUint64 = (decoder)=>/** @type {any} */ readFromDataView(decoder, 8).getBigUint64(0, false);
/**
 * @type {Array<function(Decoder):any>}
 */ const readAnyLookupTable = [
    (decoder)=>undefined,
    (decoder)=>null,
    readVarInt,
    readFloat32,
    readFloat64,
    readBigInt64,
    (decoder)=>false,
    (decoder)=>true,
    readVarString,
    (decoder)=>{
        const len = readVarUint(decoder);
        /**
     * @type {Object<string,any>}
     */ const obj = {};
        for(let i = 0; i < len; i++){
            const key = readVarString(decoder);
            obj[key] = readAny(decoder);
        }
        return obj;
    },
    (decoder)=>{
        const len = readVarUint(decoder);
        const arr = [];
        for(let i = 0; i < len; i++)arr.push(readAny(decoder));
        return arr;
    },
    readVarUint8Array // CASE 116: Uint8Array
];
/**
 * @param {Decoder} decoder
 */ const readAny = (decoder)=>readAnyLookupTable[127 - readUint8(decoder)](decoder);
/**
 * T must not be null.
 *
 * @template T
 */ class RleDecoder extends Decoder {
    /**
   * @param {Uint8Array} uint8Array
   * @param {function(Decoder):T} reader
   */ constructor(uint8Array, reader){
        super(uint8Array);
        /**
     * The reader
     */ this.reader = reader;
        /**
     * Current state
     * @type {T|null}
     */ this.s = null;
        this.count = 0;
    }
    read() {
        if (this.count === 0) {
            this.s = this.reader(this);
            if (hasContent(this)) this.count = readVarUint(this) + 1; // see encoder implementation for the reason why this is incremented
            else this.count = -1; // read the current value forever
        }
        this.count--;
        return /** @type {T} */ this.s;
    }
}
class IntDiffDecoder extends Decoder {
    /**
   * @param {Uint8Array} uint8Array
   * @param {number} start
   */ constructor(uint8Array, start){
        super(uint8Array);
        /**
     * Current state
     * @type {number}
     */ this.s = start;
    }
    /**
   * @return {number}
   */ read() {
        this.s += readVarInt(this);
        return this.s;
    }
}
class RleIntDiffDecoder extends Decoder {
    /**
   * @param {Uint8Array} uint8Array
   * @param {number} start
   */ constructor(uint8Array, start){
        super(uint8Array);
        /**
     * Current state
     * @type {number}
     */ this.s = start;
        this.count = 0;
    }
    /**
   * @return {number}
   */ read() {
        if (this.count === 0) {
            this.s += readVarInt(this);
            if (hasContent(this)) this.count = readVarUint(this) + 1; // see encoder implementation for the reason why this is incremented
            else this.count = -1; // read the current value forever
        }
        this.count--;
        return /** @type {number} */ this.s;
    }
}
class UintOptRleDecoder extends Decoder {
    /**
   * @param {Uint8Array} uint8Array
   */ constructor(uint8Array){
        super(uint8Array);
        /**
     * @type {number}
     */ this.s = 0;
        this.count = 0;
    }
    read() {
        if (this.count === 0) {
            this.s = readVarInt(this);
            // if the sign is negative, we read the count too, otherwise count is 1
            const isNegative = math.isNegativeZero(this.s);
            this.count = 1;
            if (isNegative) {
                this.s = -this.s;
                this.count = readVarUint(this) + 2;
            }
        }
        this.count--;
        return /** @type {number} */ this.s;
    }
}
class IncUintOptRleDecoder extends Decoder {
    /**
   * @param {Uint8Array} uint8Array
   */ constructor(uint8Array){
        super(uint8Array);
        /**
     * @type {number}
     */ this.s = 0;
        this.count = 0;
    }
    read() {
        if (this.count === 0) {
            this.s = readVarInt(this);
            // if the sign is negative, we read the count too, otherwise count is 1
            const isNegative = math.isNegativeZero(this.s);
            this.count = 1;
            if (isNegative) {
                this.s = -this.s;
                this.count = readVarUint(this) + 2;
            }
        }
        this.count--;
        return /** @type {number} */ this.s++;
    }
}
class IntDiffOptRleDecoder extends Decoder {
    /**
   * @param {Uint8Array} uint8Array
   */ constructor(uint8Array){
        super(uint8Array);
        /**
     * @type {number}
     */ this.s = 0;
        this.count = 0;
        this.diff = 0;
    }
    /**
   * @return {number}
   */ read() {
        if (this.count === 0) {
            const diff = readVarInt(this);
            // if the first bit is set, we read more data
            const hasCount = diff & 1;
            this.diff = diff >> 1;
            this.count = 1;
            if (hasCount) this.count = readVarUint(this) + 2;
        }
        this.s += this.diff;
        this.count--;
        return this.s;
    }
}
class StringDecoder {
    /**
   * @param {Uint8Array} uint8Array
   */ constructor(uint8Array){
        this.decoder = new UintOptRleDecoder(uint8Array);
        this.str = readVarString(this.decoder);
        /**
     * @type {number}
     */ this.spos = 0;
    }
    /**
   * @return {string}
   */ read() {
        const end = this.spos + this.decoder.read();
        const res = this.str.slice(this.spos, end);
        this.spos = end;
        return res;
    }
}
var decoding = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    Decoder: Decoder,
    createDecoder: createDecoder,
    hasContent: hasContent,
    clone: clone,
    readUint8Array: readUint8Array,
    readVarUint8Array: readVarUint8Array,
    readTailAsUint8Array: readTailAsUint8Array,
    skip8: skip8,
    readUint8: readUint8,
    readUint16: readUint16,
    readUint32: readUint32,
    readUint32BigEndian: readUint32BigEndian,
    peekUint8: peekUint8,
    peekUint16: peekUint16,
    peekUint32: peekUint32,
    readVarUint: readVarUint,
    readVarInt: readVarInt,
    peekVarUint: peekVarUint,
    peekVarInt: peekVarInt,
    readVarString: readVarString,
    peekVarString: peekVarString,
    readFromDataView: readFromDataView,
    readFloat32: readFloat32,
    readFloat64: readFloat64,
    readBigInt64: readBigInt64,
    readBigUint64: readBigUint64,
    readAny: readAny,
    RleDecoder: RleDecoder,
    IntDiffDecoder: IntDiffDecoder,
    RleIntDiffDecoder: RleIntDiffDecoder,
    UintOptRleDecoder: UintOptRleDecoder,
    IncUintOptRleDecoder: IncUintOptRleDecoder,
    IntDiffOptRleDecoder: IntDiffOptRleDecoder,
    StringDecoder: StringDecoder
});
/**
 * Utility functions to work with buffers (Uint8Array).
 *
 * @module buffer
 */ /**
 * @param {number} len
 */ const createUint8ArrayFromLen = (len)=>new Uint8Array(len);
/**
 * Create Uint8Array with initial content from buffer
 *
 * @param {ArrayBuffer} buffer
 * @param {number} byteOffset
 * @param {number} length
 */ const createUint8ArrayViewFromArrayBuffer = (buffer, byteOffset, length)=>new Uint8Array(buffer, byteOffset, length);
/**
 * Create Uint8Array with initial content from buffer
 *
 * @param {ArrayBuffer} buffer
 */ const createUint8ArrayFromArrayBuffer = (buffer)=>new Uint8Array(buffer);
/* istanbul ignore next */ /**
 * @param {Uint8Array} bytes
 * @return {string}
 */ const toBase64Browser = (bytes)=>{
    let s = "";
    for(let i = 0; i < bytes.byteLength; i++)s += string.fromCharCode(bytes[i]);
    // eslint-disable-next-line no-undef
    return btoa(s);
};
/**
 * @param {Uint8Array} bytes
 * @return {string}
 */ const toBase64Node = (bytes)=>Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength).toString("base64");
/* istanbul ignore next */ /**
 * @param {string} s
 * @return {Uint8Array}
 */ const fromBase64Browser = (s)=>{
    // eslint-disable-next-line no-undef
    const a = atob(s);
    const bytes = createUint8ArrayFromLen(a.length);
    for(let i = 0; i < a.length; i++)bytes[i] = a.charCodeAt(i);
    return bytes;
};
/**
 * @param {string} s
 */ const fromBase64Node = (s)=>{
    const buf = Buffer.from(s, "base64");
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
};
/* istanbul ignore next */ const toBase64 = environment.isBrowser ? toBase64Browser : toBase64Node;
/* istanbul ignore next */ const fromBase64 = environment.isBrowser ? fromBase64Browser : fromBase64Node;
/**
 * Copy the content of an Uint8Array view to a new ArrayBuffer.
 *
 * @param {Uint8Array} uint8Array
 * @return {Uint8Array}
 */ const copyUint8Array = (uint8Array)=>{
    const newBuf = createUint8ArrayFromLen(uint8Array.byteLength);
    newBuf.set(uint8Array);
    return newBuf;
};
/**
 * Encode anything as a UInt8Array. It's a pun on typescripts's `any` type.
 * See encoding.writeAny for more information.
 *
 * @param {any} data
 * @return {Uint8Array}
 */ const encodeAny = (data)=>{
    const encoder = createEncoder();
    writeAny(encoder, data);
    return toUint8Array(encoder);
};
/**
 * Decode an any-encoded value.
 *
 * @param {Uint8Array} buf
 * @return {any}
 */ const decodeAny = (buf)=>readAny(createDecoder(buf));
var buffer = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    createUint8ArrayFromLen: createUint8ArrayFromLen,
    createUint8ArrayViewFromArrayBuffer: createUint8ArrayViewFromArrayBuffer,
    createUint8ArrayFromArrayBuffer: createUint8ArrayFromArrayBuffer,
    toBase64: toBase64,
    fromBase64: fromBase64,
    copyUint8Array: copyUint8Array,
    encodeAny: encodeAny,
    decodeAny: decodeAny
});
exports.Decoder = Decoder;
exports.Encoder = Encoder;
exports.IncUintOptRleDecoder = IncUintOptRleDecoder;
exports.IncUintOptRleEncoder = IncUintOptRleEncoder;
exports.IntDiffDecoder = IntDiffDecoder;
exports.IntDiffEncoder = IntDiffEncoder;
exports.IntDiffOptRleDecoder = IntDiffOptRleDecoder;
exports.IntDiffOptRleEncoder = IntDiffOptRleEncoder;
exports.RleDecoder = RleDecoder;
exports.RleEncoder = RleEncoder;
exports.RleIntDiffDecoder = RleIntDiffDecoder;
exports.RleIntDiffEncoder = RleIntDiffEncoder;
exports.StringDecoder = StringDecoder;
exports.StringEncoder = StringEncoder;
exports.UintOptRleDecoder = UintOptRleDecoder;
exports.UintOptRleEncoder = UintOptRleEncoder;
exports.buffer = buffer;
exports.clone = clone;
exports.copyUint8Array = copyUint8Array;
exports.createDecoder = createDecoder;
exports.createEncoder = createEncoder;
exports.createUint8ArrayFromArrayBuffer = createUint8ArrayFromArrayBuffer;
exports.createUint8ArrayFromLen = createUint8ArrayFromLen;
exports.createUint8ArrayViewFromArrayBuffer = createUint8ArrayViewFromArrayBuffer;
exports.decodeAny = decodeAny;
exports.decoding = decoding;
exports.encodeAny = encodeAny;
exports.encoding = encoding;
exports.fromBase64 = fromBase64;
exports.hasContent = hasContent;
exports.length = length;
exports.peekUint16 = peekUint16;
exports.peekUint32 = peekUint32;
exports.peekUint8 = peekUint8;
exports.peekVarInt = peekVarInt;
exports.peekVarString = peekVarString;
exports.peekVarUint = peekVarUint;
exports.readAny = readAny;
exports.readBigInt64 = readBigInt64;
exports.readBigUint64 = readBigUint64;
exports.readFloat32 = readFloat32;
exports.readFloat64 = readFloat64;
exports.readFromDataView = readFromDataView;
exports.readTailAsUint8Array = readTailAsUint8Array;
exports.readUint16 = readUint16;
exports.readUint32 = readUint32;
exports.readUint32BigEndian = readUint32BigEndian;
exports.readUint8 = readUint8;
exports.readUint8Array = readUint8Array;
exports.readVarInt = readVarInt;
exports.readVarString = readVarString;
exports.readVarUint = readVarUint;
exports.readVarUint8Array = readVarUint8Array;
exports.set = set;
exports.setUint16 = setUint16;
exports.setUint32 = setUint32;
exports.setUint8 = setUint8;
exports.skip8 = skip8;
exports.toBase64 = toBase64;
exports.toUint8Array = toUint8Array;
exports.write = write;
exports.writeAny = writeAny;
exports.writeBigInt64 = writeBigInt64;
exports.writeBigUint64 = writeBigUint64;
exports.writeBinaryEncoder = writeBinaryEncoder;
exports.writeFloat32 = writeFloat32;
exports.writeFloat64 = writeFloat64;
exports.writeOnDataView = writeOnDataView;
exports.writeUint16 = writeUint16;
exports.writeUint32 = writeUint32;
exports.writeUint32BigEndian = writeUint32BigEndian;
exports.writeUint8 = writeUint8;
exports.writeUint8Array = writeUint8Array;
exports.writeVarInt = writeVarInt;
exports.writeVarString = writeVarString;
exports.writeVarUint = writeVarUint;
exports.writeVarUint8Array = writeVarUint8Array; //# sourceMappingURL=buffer-c98f67d5.cjs.map

},{"buffer":"6Ias3","./string-ad04f734.cjs":"ajWKc","./environment-60b83194.cjs":"byYnb","./binary-ac8e39e2.cjs":"fxH3h","./math-08e068f9.cjs":"lb1Mp","./number-e62129bc.cjs":"cOZT7"}],"6Ias3":[function(require,module,exports) {
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ /* eslint-disable no-proto */ "use strict";
var base64 = require("base64-js");
var ieee754 = require("ieee754");
var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" // eslint-disable-line dot-notation
 ? Symbol["for"]("nodejs.util.inspect.custom") // eslint-disable-line dot-notation
 : null;
exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;
var K_MAX_LENGTH = 0x7fffffff;
exports.kMaxLength = K_MAX_LENGTH;
/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */ Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
function typedArraySupport() {
    // Can typed array instances can be augmented?
    try {
        var arr = new Uint8Array(1);
        var proto = {
            foo: function() {
                return 42;
            }
        };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
    } catch (e) {
        return false;
    }
}
Object.defineProperty(Buffer.prototype, "parent", {
    enumerable: true,
    get: function() {
        if (!Buffer.isBuffer(this)) return undefined;
        return this.buffer;
    }
});
Object.defineProperty(Buffer.prototype, "offset", {
    enumerable: true,
    get: function() {
        if (!Buffer.isBuffer(this)) return undefined;
        return this.byteOffset;
    }
});
function createBuffer(length) {
    if (length > K_MAX_LENGTH) throw new RangeError('The value "' + length + '" is invalid for option "size"');
    // Return an augmented `Uint8Array` instance
    var buf = new Uint8Array(length);
    Object.setPrototypeOf(buf, Buffer.prototype);
    return buf;
}
/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */ function Buffer(arg, encodingOrOffset, length) {
    // Common case.
    if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") throw new TypeError('The "string" argument must be of type string. Received type number');
        return allocUnsafe(arg);
    }
    return from(arg, encodingOrOffset, length);
}
Buffer.poolSize = 8192 // not used by this implementation
;
function from(value, encodingOrOffset, length) {
    if (typeof value === "string") return fromString(value, encodingOrOffset);
    if (ArrayBuffer.isView(value)) return fromArrayView(value);
    if (value == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) return fromArrayBuffer(value, encodingOrOffset, length);
    if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) return fromArrayBuffer(value, encodingOrOffset, length);
    if (typeof value === "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    var valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value) return Buffer.from(valueOf, encodingOrOffset, length);
    var b = fromObject(value);
    if (b) return b;
    if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") return Buffer.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
}
/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/ Buffer.from = function(value, encodingOrOffset, length) {
    return from(value, encodingOrOffset, length);
};
// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
Object.setPrototypeOf(Buffer, Uint8Array);
function assertSize(size) {
    if (typeof size !== "number") throw new TypeError('"size" argument must be of type number');
    else if (size < 0) throw new RangeError('The value "' + size + '" is invalid for option "size"');
}
function alloc(size, fill, encoding) {
    assertSize(size);
    if (size <= 0) return createBuffer(size);
    if (fill !== undefined) // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
    return createBuffer(size);
}
/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/ Buffer.alloc = function(size, fill, encoding) {
    return alloc(size, fill, encoding);
};
function allocUnsafe(size) {
    assertSize(size);
    return createBuffer(size < 0 ? 0 : checked(size) | 0);
}
/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */ Buffer.allocUnsafe = function(size) {
    return allocUnsafe(size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */ Buffer.allocUnsafeSlow = function(size) {
    return allocUnsafe(size);
};
function fromString(string, encoding) {
    if (typeof encoding !== "string" || encoding === "") encoding = "utf8";
    if (!Buffer.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
    var length = byteLength(string, encoding) | 0;
    var buf = createBuffer(length);
    var actual = buf.write(string, encoding);
    if (actual !== length) // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual);
    return buf;
}
function fromArrayLike(array) {
    var length = array.length < 0 ? 0 : checked(array.length) | 0;
    var buf = createBuffer(length);
    for(var i = 0; i < length; i += 1)buf[i] = array[i] & 255;
    return buf;
}
function fromArrayView(arrayView) {
    if (isInstance(arrayView, Uint8Array)) {
        var copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
    }
    return fromArrayLike(arrayView);
}
function fromArrayBuffer(array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) throw new RangeError('"offset" is outside of buffer bounds');
    if (array.byteLength < byteOffset + (length || 0)) throw new RangeError('"length" is outside of buffer bounds');
    var buf;
    if (byteOffset === undefined && length === undefined) buf = new Uint8Array(array);
    else if (length === undefined) buf = new Uint8Array(array, byteOffset);
    else buf = new Uint8Array(array, byteOffset, length);
    // Return an augmented `Uint8Array` instance
    Object.setPrototypeOf(buf, Buffer.prototype);
    return buf;
}
function fromObject(obj) {
    if (Buffer.isBuffer(obj)) {
        var len = checked(obj.length) | 0;
        var buf = createBuffer(len);
        if (buf.length === 0) return buf;
        obj.copy(buf, 0, 0, len);
        return buf;
    }
    if (obj.length !== undefined) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) return createBuffer(0);
        return fromArrayLike(obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) return fromArrayLike(obj.data);
}
function checked(length) {
    // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
    // length is NaN (which is otherwise coerced to zero.)
    if (length >= K_MAX_LENGTH) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
    return length | 0;
}
function SlowBuffer(length) {
    if (+length != length) length = 0;
    return Buffer.alloc(+length);
}
Buffer.isBuffer = function isBuffer(b) {
    return b != null && b._isBuffer === true && b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
    ;
};
Buffer.compare = function compare(a, b) {
    if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength);
    if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength);
    if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (a === b) return 0;
    var x = a.length;
    var y = b.length;
    for(var i = 0, len = Math.min(x, y); i < len; ++i)if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
};
Buffer.isEncoding = function isEncoding(encoding) {
    switch(String(encoding).toLowerCase()){
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return true;
        default:
            return false;
    }
};
Buffer.concat = function concat(list, length) {
    if (!Array.isArray(list)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (list.length === 0) return Buffer.alloc(0);
    var i;
    if (length === undefined) {
        length = 0;
        for(i = 0; i < list.length; ++i)length += list[i].length;
    }
    var buffer = Buffer.allocUnsafe(length);
    var pos = 0;
    for(i = 0; i < list.length; ++i){
        var buf = list[i];
        if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) Buffer.from(buf).copy(buffer, pos);
            else Uint8Array.prototype.set.call(buffer, buf, pos);
        } else if (!Buffer.isBuffer(buf)) throw new TypeError('"list" argument must be an Array of Buffers');
        else buf.copy(buffer, pos);
        pos += buf.length;
    }
    return buffer;
};
function byteLength(string, encoding) {
    if (Buffer.isBuffer(string)) return string.length;
    if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) return string.byteLength;
    if (typeof string !== "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
    var len = string.length;
    var mustMatch = arguments.length > 2 && arguments[2] === true;
    if (!mustMatch && len === 0) return 0;
    // Use a for loop to avoid recursion
    var loweredCase = false;
    for(;;)switch(encoding){
        case "ascii":
        case "latin1":
        case "binary":
            return len;
        case "utf8":
        case "utf-8":
            return utf8ToBytes(string).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return len * 2;
        case "hex":
            return len >>> 1;
        case "base64":
            return base64ToBytes(string).length;
        default:
            if (loweredCase) return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
            ;
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
    }
}
Buffer.byteLength = byteLength;
function slowToString(encoding, start, end) {
    var loweredCase = false;
    // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
    // property of a typed array.
    // This behaves neither like String nor Uint8Array in that we set start/end
    // to their upper/lower bounds if the value passed is out of range.
    // undefined is handled specially as per ECMA-262 6th Edition,
    // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
    if (start === undefined || start < 0) start = 0;
    // Return early if start > this.length. Done here to prevent potential uint32
    // coercion fail below.
    if (start > this.length) return "";
    if (end === undefined || end > this.length) end = this.length;
    if (end <= 0) return "";
    // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
    end >>>= 0;
    start >>>= 0;
    if (end <= start) return "";
    if (!encoding) encoding = "utf8";
    while(true)switch(encoding){
        case "hex":
            return hexSlice(this, start, end);
        case "utf8":
        case "utf-8":
            return utf8Slice(this, start, end);
        case "ascii":
            return asciiSlice(this, start, end);
        case "latin1":
        case "binary":
            return latin1Slice(this, start, end);
        case "base64":
            return base64Slice(this, start, end);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return utf16leSlice(this, start, end);
        default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
    }
}
// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true;
function swap(b, n, m) {
    var i = b[n];
    b[n] = b[m];
    b[m] = i;
}
Buffer.prototype.swap16 = function swap16() {
    var len = this.length;
    if (len % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for(var i = 0; i < len; i += 2)swap(this, i, i + 1);
    return this;
};
Buffer.prototype.swap32 = function swap32() {
    var len = this.length;
    if (len % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for(var i = 0; i < len; i += 4){
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
    }
    return this;
};
Buffer.prototype.swap64 = function swap64() {
    var len = this.length;
    if (len % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for(var i = 0; i < len; i += 8){
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
    }
    return this;
};
Buffer.prototype.toString = function toString() {
    var length = this.length;
    if (length === 0) return "";
    if (arguments.length === 0) return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
};
Buffer.prototype.toLocaleString = Buffer.prototype.toString;
Buffer.prototype.equals = function equals(b) {
    if (!Buffer.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
    if (this === b) return true;
    return Buffer.compare(this, b) === 0;
};
Buffer.prototype.inspect = function inspect() {
    var str = "";
    var max = exports.INSPECT_MAX_BYTES;
    str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
    if (this.length > max) str += " ... ";
    return "<Buffer " + str + ">";
};
if (customInspectSymbol) Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect;
Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (isInstance(target, Uint8Array)) target = Buffer.from(target, target.offset, target.byteLength);
    if (!Buffer.isBuffer(target)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
    if (start === undefined) start = 0;
    if (end === undefined) end = target ? target.length : 0;
    if (thisStart === undefined) thisStart = 0;
    if (thisEnd === undefined) thisEnd = this.length;
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) throw new RangeError("out of range index");
    if (thisStart >= thisEnd && start >= end) return 0;
    if (thisStart >= thisEnd) return -1;
    if (start >= end) return 1;
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target) return 0;
    var x = thisEnd - thisStart;
    var y = end - start;
    var len = Math.min(x, y);
    var thisCopy = this.slice(thisStart, thisEnd);
    var targetCopy = target.slice(start, end);
    for(var i = 0; i < len; ++i)if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break;
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
};
// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    // Empty buffer means no match
    if (buffer.length === 0) return -1;
    // Normalize byteOffset
    if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
    } else if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff;
    else if (byteOffset < -2147483648) byteOffset = -2147483648;
    byteOffset = +byteOffset // Coerce to Number.
    ;
    if (numberIsNaN(byteOffset)) // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
    // Normalize byteOffset: negative offsets start from the end of the buffer
    if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
        if (dir) return -1;
        else byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
    }
    // Normalize val
    if (typeof val === "string") val = Buffer.from(val, encoding);
    // Finally, search either indexOf (if dir is true) or lastIndexOf
    if (Buffer.isBuffer(val)) {
        // Special case: looking for empty string/buffer always fails
        if (val.length === 0) return -1;
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
    } else if (typeof val === "number") {
        val = val & 0xFF // Search for a byte value [0-255]
        ;
        if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            else return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
        }
        return arrayIndexOf(buffer, [
            val
        ], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
}
function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    var indexSize = 1;
    var arrLength = arr.length;
    var valLength = val.length;
    if (encoding !== undefined) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) return -1;
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
        }
    }
    function read(buf, i) {
        if (indexSize === 1) return buf[i];
        else return buf.readUInt16BE(i * indexSize);
    }
    var i;
    if (dir) {
        var foundIndex = -1;
        for(i = byteOffset; i < arrLength; i++)if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
        } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
        }
    } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for(i = byteOffset; i >= 0; i--){
            var found = true;
            for(var j = 0; j < valLength; j++)if (read(arr, i + j) !== read(val, j)) {
                found = false;
                break;
            }
            if (found) return i;
        }
    }
    return -1;
}
Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
};
Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};
Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};
function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    var remaining = buf.length - offset;
    if (!length) length = remaining;
    else {
        length = Number(length);
        if (length > remaining) length = remaining;
    }
    var strLen = string.length;
    if (length > strLen / 2) length = strLen / 2;
    for(var i = 0; i < length; ++i){
        var parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
    }
    return i;
}
function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}
function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
}
function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
}
function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}
Buffer.prototype.write = function write(string, offset, length, encoding) {
    // Buffer#write(string)
    if (offset === undefined) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
    // Buffer#write(string, encoding)
    } else if (length === undefined && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
    } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === undefined) encoding = "utf8";
        } else {
            encoding = length;
            length = undefined;
        }
    } else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    var remaining = this.length - offset;
    if (length === undefined || length > remaining) length = remaining;
    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    if (!encoding) encoding = "utf8";
    var loweredCase = false;
    for(;;)switch(encoding){
        case "hex":
            return hexWrite(this, string, offset, length);
        case "utf8":
        case "utf-8":
            return utf8Write(this, string, offset, length);
        case "ascii":
        case "latin1":
        case "binary":
            return asciiWrite(this, string, offset, length);
        case "base64":
            // Warning: maxLength not taken into account in base64Write
            return base64Write(this, string, offset, length);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return ucs2Write(this, string, offset, length);
        default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
    }
};
Buffer.prototype.toJSON = function toJSON() {
    return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
    };
};
function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) return base64.fromByteArray(buf);
    else return base64.fromByteArray(buf.slice(start, end));
}
function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    var res = [];
    var i = start;
    while(i < end){
        var firstByte = buf[i];
        var codePoint = null;
        var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;
        if (i + bytesPerSequence <= end) {
            var secondByte, thirdByte, fourthByte, tempCodePoint;
            switch(bytesPerSequence){
                case 1:
                    if (firstByte < 0x80) codePoint = firstByte;
                    break;
                case 2:
                    secondByte = buf[i + 1];
                    if ((secondByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
                        if (tempCodePoint > 0x7F) codePoint = tempCodePoint;
                    }
                    break;
                case 3:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
                        if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) codePoint = tempCodePoint;
                    }
                    break;
                case 4:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    fourthByte = buf[i + 3];
                    if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
                        if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) codePoint = tempCodePoint;
                    }
            }
        }
        if (codePoint === null) {
            // we did not generate a valid codePoint so insert a
            // replacement char (U+FFFD) and advance only 1 byte
            codePoint = 0xFFFD;
            bytesPerSequence = 1;
        } else if (codePoint > 0xFFFF) {
            // encode to utf16 (surrogate pair dance)
            codePoint -= 0x10000;
            res.push(codePoint >>> 10 & 0x3FF | 0xD800);
            codePoint = 0xDC00 | codePoint & 0x3FF;
        }
        res.push(codePoint);
        i += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
}
// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;
function decodeCodePointsArray(codePoints) {
    var len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
    ;
    // Decode in chunks to avoid "call stack size exceeded".
    var res = "";
    var i = 0;
    while(i < len)res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
    return res;
}
function asciiSlice(buf, start, end) {
    var ret = "";
    end = Math.min(buf.length, end);
    for(var i = start; i < end; ++i)ret += String.fromCharCode(buf[i] & 0x7F);
    return ret;
}
function latin1Slice(buf, start, end) {
    var ret = "";
    end = Math.min(buf.length, end);
    for(var i = start; i < end; ++i)ret += String.fromCharCode(buf[i]);
    return ret;
}
function hexSlice(buf, start, end) {
    var len = buf.length;
    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;
    var out = "";
    for(var i = start; i < end; ++i)out += hexSliceLookupTable[buf[i]];
    return out;
}
function utf16leSlice(buf, start, end) {
    var bytes = buf.slice(start, end);
    var res = "";
    // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
    for(var i = 0; i < bytes.length - 1; i += 2)res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    return res;
}
Buffer.prototype.slice = function slice(start, end) {
    var len = this.length;
    start = ~~start;
    end = end === undefined ? len : ~~end;
    if (start < 0) {
        start += len;
        if (start < 0) start = 0;
    } else if (start > len) start = len;
    if (end < 0) {
        end += len;
        if (end < 0) end = 0;
    } else if (end > len) end = len;
    if (end < start) end = start;
    var newBuf = this.subarray(start, end);
    // Return an augmented `Uint8Array` instance
    Object.setPrototypeOf(newBuf, Buffer.prototype);
    return newBuf;
};
/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */ function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
    if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
}
Buffer.prototype.readUintLE = Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    var val = this[offset];
    var mul = 1;
    var i = 0;
    while(++i < byteLength && (mul *= 0x100))val += this[offset + i] * mul;
    return val;
};
Buffer.prototype.readUintBE = Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    var val = this[offset + --byteLength];
    var mul = 1;
    while(byteLength > 0 && (mul *= 0x100))val += this[offset + --byteLength] * mul;
    return val;
};
Buffer.prototype.readUint8 = Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    return this[offset];
};
Buffer.prototype.readUint16LE = Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
};
Buffer.prototype.readUint16BE = Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
};
Buffer.prototype.readUint32LE = Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};
Buffer.prototype.readUint32BE = Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};
Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    var val = this[offset];
    var mul = 1;
    var i = 0;
    while(++i < byteLength && (mul *= 0x100))val += this[offset + i] * mul;
    mul *= 0x80;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength);
    return val;
};
Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    var i = byteLength;
    var mul = 1;
    var val = this[offset + --i];
    while(i > 0 && (mul *= 0x100))val += this[offset + --i] * mul;
    mul *= 0x80;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength);
    return val;
};
Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    if (!(this[offset] & 0x80)) return this[offset];
    return (0xff - this[offset] + 1) * -1;
};
Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    var val = this[offset] | this[offset + 1] << 8;
    return val & 0x8000 ? val | 0xFFFF0000 : val;
};
Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    var val = this[offset + 1] | this[offset] << 8;
    return val & 0x8000 ? val | 0xFFFF0000 : val;
};
Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};
Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};
Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, true, 23, 4);
};
Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, false, 23, 4);
};
Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, true, 52, 8);
};
Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, false, 52, 8);
};
function checkInt(buf, value, offset, ext, max, min) {
    if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
}
Buffer.prototype.writeUintLE = Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
    }
    var mul = 1;
    var i = 0;
    this[offset] = value & 0xFF;
    while(++i < byteLength && (mul *= 0x100))this[offset + i] = value / mul & 0xFF;
    return offset + byteLength;
};
Buffer.prototype.writeUintBE = Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
    }
    var i = byteLength - 1;
    var mul = 1;
    this[offset + i] = value & 0xFF;
    while(--i >= 0 && (mul *= 0x100))this[offset + i] = value / mul & 0xFF;
    return offset + byteLength;
};
Buffer.prototype.writeUint8 = Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
    this[offset] = value & 0xff;
    return offset + 1;
};
Buffer.prototype.writeUint16LE = Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    return offset + 2;
};
Buffer.prototype.writeUint16BE = Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
    return offset + 2;
};
Buffer.prototype.writeUint32LE = Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
    return offset + 4;
};
Buffer.prototype.writeUint32BE = Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
    return offset + 4;
};
Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    var i = 0;
    var mul = 1;
    var sub = 0;
    this[offset] = value & 0xFF;
    while(++i < byteLength && (mul *= 0x100)){
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) sub = 1;
        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
    }
    return offset + byteLength;
};
Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    var i = byteLength - 1;
    var mul = 1;
    var sub = 0;
    this[offset + i] = value & 0xFF;
    while(--i >= 0 && (mul *= 0x100)){
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) sub = 1;
        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
    }
    return offset + byteLength;
};
Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -128);
    if (value < 0) value = 0xff + value + 1;
    this[offset] = value & 0xff;
    return offset + 1;
};
Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -32768);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    return offset + 2;
};
Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -32768);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
    return offset + 2;
};
Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -2147483648);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
    return offset + 4;
};
Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -2147483648);
    if (value < 0) value = 0xffffffff + value + 1;
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
    return offset + 4;
};
function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
    if (offset < 0) throw new RangeError("Index out of range");
}
function writeFloat(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -340282346638528860000000000000000000000);
    ieee754.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
}
Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
};
Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
};
function writeDouble(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000);
    ieee754.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
}
Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
};
Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
};
// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy(target, targetStart, start, end) {
    if (!Buffer.isBuffer(target)) throw new TypeError("argument should be a Buffer");
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;
    // Copy 0 bytes; we're done
    if (end === start) return 0;
    if (target.length === 0 || this.length === 0) return 0;
    // Fatal error conditions
    if (targetStart < 0) throw new RangeError("targetStart out of bounds");
    if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
    if (end < 0) throw new RangeError("sourceEnd out of bounds");
    // Are we oob?
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) end = target.length - targetStart + start;
    var len = end - start;
    if (this === target && typeof Uint8Array.prototype.copyWithin === "function") // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end);
    else Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
    return len;
};
// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill(val, start, end, encoding) {
    // Handle string cases:
    if (typeof val === "string") {
        if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
        } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
        }
        if (encoding !== undefined && typeof encoding !== "string") throw new TypeError("encoding must be a string");
        if (typeof encoding === "string" && !Buffer.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
        if (val.length === 1) {
            var code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") // Fast path: If `val` fits into a single byte, use that numeric value.
            val = code;
        }
    } else if (typeof val === "number") val = val & 255;
    else if (typeof val === "boolean") val = Number(val);
    // Invalid ranges are not set to a default, so can range check early.
    if (start < 0 || this.length < start || this.length < end) throw new RangeError("Out of range index");
    if (end <= start) return this;
    start = start >>> 0;
    end = end === undefined ? this.length : end >>> 0;
    if (!val) val = 0;
    var i;
    if (typeof val === "number") for(i = start; i < end; ++i)this[i] = val;
    else {
        var bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);
        var len = bytes.length;
        if (len === 0) throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        for(i = 0; i < end - start; ++i)this[i + start] = bytes[i % len];
    }
    return this;
};
// HELPER FUNCTIONS
// ================
var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
function base64clean(str) {
    // Node takes equal signs as end of the Base64 encoding
    str = str.split("=")[0];
    // Node strips out invalid characters like \n and \t from the string, base64-js does not
    str = str.trim().replace(INVALID_BASE64_RE, "");
    // Node converts strings with length < 2 to ''
    if (str.length < 2) return "";
    // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
    while(str.length % 4 !== 0)str = str + "=";
    return str;
}
function utf8ToBytes(string, units) {
    units = units || Infinity;
    var codePoint;
    var length = string.length;
    var leadSurrogate = null;
    var bytes = [];
    for(var i = 0; i < length; ++i){
        codePoint = string.charCodeAt(i);
        // is surrogate component
        if (codePoint > 0xD7FF && codePoint < 0xE000) {
            // last char was a lead
            if (!leadSurrogate) {
                // no lead yet
                if (codePoint > 0xDBFF) {
                    // unexpected trail
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                } else if (i + 1 === length) {
                    // unpaired lead
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                }
                // valid lead
                leadSurrogate = codePoint;
                continue;
            }
            // 2 leads in a row
            if (codePoint < 0xDC00) {
                if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                leadSurrogate = codePoint;
                continue;
            }
            // valid surrogate pair
            codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
        } else if (leadSurrogate) // valid bmp char, but last char was a lead
        {
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        }
        leadSurrogate = null;
        // encode utf8
        if (codePoint < 0x80) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
        } else if (codePoint < 0x800) {
            if ((units -= 2) < 0) break;
            bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x10000) {
            if ((units -= 3) < 0) break;
            bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x110000) {
            if ((units -= 4) < 0) break;
            bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else throw new Error("Invalid code point");
    }
    return bytes;
}
function asciiToBytes(str) {
    var byteArray = [];
    for(var i = 0; i < str.length; ++i)// Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
    return byteArray;
}
function utf16leToBytes(str, units) {
    var c, hi, lo;
    var byteArray = [];
    for(var i = 0; i < str.length; ++i){
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
    }
    return byteArray;
}
function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
}
function blitBuffer(src, dst, offset, length) {
    for(var i = 0; i < length; ++i){
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
    }
    return i;
}
// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance(obj, type) {
    return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
}
function numberIsNaN(obj) {
    // For IE11 support
    return obj !== obj // eslint-disable-line no-self-compare
    ;
}
// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
var hexSliceLookupTable = function() {
    var alphabet = "0123456789abcdef";
    var table = new Array(256);
    for(var i = 0; i < 16; ++i){
        var i16 = i * 16;
        for(var j = 0; j < 16; ++j)table[i16 + j] = alphabet[i] + alphabet[j];
    }
    return table;
}();

},{"base64-js":"an3cZ","ieee754":"2IJg7"}],"an3cZ":[function(require,module,exports) {
"use strict";
exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for(var i = 0, len = code.length; i < len; ++i){
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
}
// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
function getLens(b64) {
    var len = b64.length;
    if (len % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    // Trim off extra bytes after placeholder bytes are found
    // See: https://github.com/beatgammit/base64-js/issues/42
    var validLen = b64.indexOf("=");
    if (validLen === -1) validLen = len;
    var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
    return [
        validLen,
        placeHoldersLen
    ];
}
// base64 is 4/3 + up to two characters of the original data
function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    // if there are placeholders, only get up to the last complete 4 chars
    var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i;
    for(i = 0; i < len; i += 4){
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[curByte++] = tmp >> 16 & 0xFF;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    return arr;
}
function tripletToBase64(num) {
    return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}
function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for(var i = start; i < end; i += 3){
        tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
        output.push(tripletToBase64(tmp));
    }
    return output.join("");
}
function fromByteArray(uint8) {
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
    ;
    var parts = [];
    var maxChunkLength = 16383 // must be multiple of 3
    ;
    // go through the array every three bytes, we'll deal with trailing stuff later
    for(var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength)parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
    // pad the end with zeros, but make sure to not forget the extra bytes
    if (extraBytes === 1) {
        tmp = uint8[len - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + "==");
    } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + "=");
    }
    return parts.join("");
}

},{}],"2IJg7":[function(require,module,exports) {
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ exports.read = function(buffer, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? nBytes - 1 : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];
    i += d;
    e = s & (1 << -nBits) - 1;
    s >>= -nBits;
    nBits += eLen;
    for(; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);
    m = e & (1 << -nBits) - 1;
    e >>= -nBits;
    nBits += mLen;
    for(; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);
    if (e === 0) e = 1 - eBias;
    else if (e === eMax) return m ? NaN : (s ? -1 : 1) * Infinity;
    else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};
exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
    } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
        }
        if (e + eBias >= 1) value += rt / c;
        else value += rt * Math.pow(2, 1 - eBias);
        if (value * c >= 2) {
            e++;
            c /= 2;
        }
        if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
        } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
        } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
        }
    }
    for(; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);
    e = e << mLen | m;
    eLen += mLen;
    for(; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);
    buffer[offset + i - d] |= s * 128;
};

},{}],"ajWKc":[function(require,module,exports) {
"use strict";
/**
 * Utility module to work with strings.
 *
 * @module string
 */ const fromCharCode = String.fromCharCode;
const fromCodePoint = String.fromCodePoint;
/**
 * @param {string} s
 * @return {string}
 */ const toLowerCase = (s)=>s.toLowerCase();
const trimLeftRegex = /^\s*/g;
/**
 * @param {string} s
 * @return {string}
 */ const trimLeft = (s)=>s.replace(trimLeftRegex, "");
const fromCamelCaseRegex = /([A-Z])/g;
/**
 * @param {string} s
 * @param {string} separator
 * @return {string}
 */ const fromCamelCase = (s, separator)=>trimLeft(s.replace(fromCamelCaseRegex, (match)=>`${separator}${toLowerCase(match)}`));
/**
 * Compute the utf8ByteLength
 * @param {string} str
 * @return {number}
 */ const utf8ByteLength = (str)=>unescape(encodeURIComponent(str)).length;
/**
 * @param {string} str
 * @return {Uint8Array}
 */ const _encodeUtf8Polyfill = (str)=>{
    const encodedString = unescape(encodeURIComponent(str));
    const len = encodedString.length;
    const buf = new Uint8Array(len);
    for(let i = 0; i < len; i++)buf[i] = /** @type {number} */ encodedString.codePointAt(i);
    return buf;
};
/* istanbul ignore next */ const utf8TextEncoder = /** @type {TextEncoder} */ typeof TextEncoder !== "undefined" ? new TextEncoder() : null;
/**
 * @param {string} str
 * @return {Uint8Array}
 */ const _encodeUtf8Native = (str)=>utf8TextEncoder.encode(str);
/**
 * @param {string} str
 * @return {Uint8Array}
 */ /* istanbul ignore next */ const encodeUtf8 = utf8TextEncoder ? _encodeUtf8Native : _encodeUtf8Polyfill;
/**
 * @param {Uint8Array} buf
 * @return {string}
 */ const _decodeUtf8Polyfill = (buf)=>{
    let remainingLen = buf.length;
    let encodedString = "";
    let bufPos = 0;
    while(remainingLen > 0){
        const nextLen = remainingLen < 10000 ? remainingLen : 10000;
        const bytes = buf.subarray(bufPos, bufPos + nextLen);
        bufPos += nextLen;
        // Starting with ES5.1 we can supply a generic array-like object as arguments
        encodedString += String.fromCodePoint.apply(null, /** @type {any} */ bytes);
        remainingLen -= nextLen;
    }
    return decodeURIComponent(escape(encodedString));
};
/* istanbul ignore next */ exports.utf8TextDecoder = typeof TextDecoder === "undefined" ? null : new TextDecoder("utf-8", {
    fatal: true,
    ignoreBOM: true
});
/* istanbul ignore next */ if (exports.utf8TextDecoder && exports.utf8TextDecoder.decode(new Uint8Array()).length === 1) // Safari doesn't handle BOM correctly.
// This fixes a bug in Safari 13.0.5 where it produces a BOM the first time it is called.
// utf8TextDecoder.decode(new Uint8Array()).length === 1 on the first call and
// utf8TextDecoder.decode(new Uint8Array()).length === 1 on the second call
// Another issue is that from then on no BOM chars are recognized anymore
/* istanbul ignore next */ exports.utf8TextDecoder = null;
/**
 * @param {Uint8Array} buf
 * @return {string}
 */ const _decodeUtf8Native = (buf)=>/** @type {TextDecoder} */ exports.utf8TextDecoder.decode(buf);
/**
 * @param {Uint8Array} buf
 * @return {string}
 */ /* istanbul ignore next */ const decodeUtf8 = exports.utf8TextDecoder ? _decodeUtf8Native : _decodeUtf8Polyfill;
/**
 * @param {string} str The initial string
 * @param {number} index Starting position
 * @param {number} remove Number of characters to remove
 * @param {string} insert New content to insert
 */ const splice = (str, index, remove, insert = "")=>str.slice(0, index) + insert + str.slice(index + remove);
var string = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    fromCharCode: fromCharCode,
    fromCodePoint: fromCodePoint,
    trimLeft: trimLeft,
    fromCamelCase: fromCamelCase,
    utf8ByteLength: utf8ByteLength,
    _encodeUtf8Polyfill: _encodeUtf8Polyfill,
    utf8TextEncoder: utf8TextEncoder,
    _encodeUtf8Native: _encodeUtf8Native,
    encodeUtf8: encodeUtf8,
    _decodeUtf8Polyfill: _decodeUtf8Polyfill,
    get utf8TextDecoder () {
        return exports.utf8TextDecoder;
    },
    _decodeUtf8Native: _decodeUtf8Native,
    decodeUtf8: decodeUtf8,
    splice: splice
});
exports._decodeUtf8Native = _decodeUtf8Native;
exports._decodeUtf8Polyfill = _decodeUtf8Polyfill;
exports._encodeUtf8Native = _encodeUtf8Native;
exports._encodeUtf8Polyfill = _encodeUtf8Polyfill;
exports.decodeUtf8 = decodeUtf8;
exports.encodeUtf8 = encodeUtf8;
exports.fromCamelCase = fromCamelCase;
exports.fromCharCode = fromCharCode;
exports.fromCodePoint = fromCodePoint;
exports.splice = splice;
exports.string = string;
exports.trimLeft = trimLeft;
exports.utf8ByteLength = utf8ByteLength;
exports.utf8TextEncoder = utf8TextEncoder; //# sourceMappingURL=string-ad04f734.cjs.map

},{}],"byYnb":[function(require,module,exports) {
var process = require("process");
"use strict";
var map = require("./map-28a001c9.cjs");
var string = require("./string-ad04f734.cjs");
var conditions = require("./conditions-fb475c70.cjs");
var storage = require("./storage.cjs");
/**
 * Isomorphic module to work access the environment (query params, env variables).
 *
 * @module map
 */ /* istanbul ignore next */ // @ts-ignore
const isNode = typeof process !== "undefined" && process.release && /node|io\.js/.test(process.release.name);
/* istanbul ignore next */ const isBrowser = typeof window !== "undefined" && !isNode;
/* istanbul ignore next */ const isMac = typeof navigator !== "undefined" ? /Mac/.test(navigator.platform) : false;
/**
 * @type {Map<string,string>}
 */ let params;
/* istanbul ignore next */ const computeParams = ()=>{
    if (params === undefined) {
        if (isNode) {
            params = map.create();
            const pargs = process.argv;
            let currParamName = null;
            /* istanbul ignore next */ for(let i = 0; i < pargs.length; i++){
                const parg = pargs[i];
                if (parg[0] === "-") {
                    if (currParamName !== null) params.set(currParamName, "");
                    currParamName = parg;
                } else if (currParamName !== null) {
                    params.set(currParamName, parg);
                    currParamName = null;
                }
            }
            if (currParamName !== null) params.set(currParamName, "");
        // in ReactNative for example this would not be true (unless connected to the Remote Debugger)
        } else if (typeof location === "object") {
            params = map.create();
            (location.search || "?").slice(1).split("&").forEach((kv)=>{
                if (kv.length !== 0) {
                    const [key, value] = kv.split("=");
                    params.set(`--${string.fromCamelCase(key, "-")}`, value);
                    params.set(`-${string.fromCamelCase(key, "-")}`, value);
                }
            });
        } else params = map.create();
    }
    return params;
};
/**
 * @param {string} name
 * @return {boolean}
 */ /* istanbul ignore next */ const hasParam = (name)=>computeParams().has(name);
/**
 * @param {string} name
 * @param {string} defaultVal
 * @return {string}
 */ /* istanbul ignore next */ const getParam = (name, defaultVal)=>computeParams().get(name) || defaultVal;
// export const getArgs = name => computeParams() && args
/**
 * @param {string} name
 * @return {string|null}
 */ /* istanbul ignore next */ const getVariable = (name)=>isNode ? conditions.undefinedToNull(process.env[name.toUpperCase()]) : conditions.undefinedToNull(storage.varStorage.getItem(name));
/**
 * @param {string} name
 * @return {string|null}
 */ const getConf = (name)=>computeParams().get("--" + name) || getVariable(name);
/**
 * @param {string} name
 * @return {boolean}
 */ /* istanbul ignore next */ const hasConf = (name)=>hasParam("--" + name) || getVariable(name) !== null;
/* istanbul ignore next */ const production = hasConf("production");
var environment = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    isNode: isNode,
    isBrowser: isBrowser,
    isMac: isMac,
    hasParam: hasParam,
    getParam: getParam,
    getVariable: getVariable,
    getConf: getConf,
    hasConf: hasConf,
    production: production
});
exports.environment = environment;
exports.getConf = getConf;
exports.getParam = getParam;
exports.getVariable = getVariable;
exports.hasConf = hasConf;
exports.hasParam = hasParam;
exports.isBrowser = isBrowser;
exports.isMac = isMac;
exports.isNode = isNode;
exports.production = production; //# sourceMappingURL=environment-60b83194.cjs.map

},{"process":"1E8m8","./map-28a001c9.cjs":"lrupf","./string-ad04f734.cjs":"ajWKc","./conditions-fb475c70.cjs":"la0gY","./storage.cjs":"98sVq"}],"1E8m8":[function(require,module,exports) {
// shim for using process in browser
var process = module.exports = {};
// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
    throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
    throw new Error("clearTimeout has not been defined");
}
(function() {
    try {
        if (typeof setTimeout === "function") cachedSetTimeout = setTimeout;
        else cachedSetTimeout = defaultSetTimout;
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === "function") cachedClearTimeout = clearTimeout;
        else cachedClearTimeout = defaultClearTimeout;
    } catch (e1) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) //normal enviroments in sane situations
    return setTimeout(fun, 0);
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e1) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) //normal enviroments in sane situations
    return clearTimeout(marker);
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e1) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
    if (!draining || !currentQueue) return;
    draining = false;
    if (currentQueue.length) queue = currentQueue.concat(queue);
    else queueIndex = -1;
    if (queue.length) drainQueue();
}
function drainQueue() {
    if (draining) return;
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while(len){
        currentQueue = queue;
        queue = [];
        while(++queueIndex < len)if (currentQueue) currentQueue[queueIndex].run();
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) for(var i = 1; i < arguments.length; i++)args[i - 1] = arguments[i];
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) runTimeout(drainQueue);
};
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function() {
    this.fun.apply(null, this.array);
};
process.title = "browser";
process.browser = true;
process.env = {};
process.argv = [];
process.version = ""; // empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function(name) {
    return [];
};
process.binding = function(name) {
    throw new Error("process.binding is not supported");
};
process.cwd = function() {
    return "/";
};
process.chdir = function(dir) {
    throw new Error("process.chdir is not supported");
};
process.umask = function() {
    return 0;
};

},{}],"la0gY":[function(require,module,exports) {
"use strict";
/**
 * Often used conditions.
 *
 * @module conditions
 */ /**
 * @template T
 * @param {T|null|undefined} v
 * @return {T|null}
 */ /* istanbul ignore next */ const undefinedToNull = (v)=>v === undefined ? null : v;
var conditions = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    undefinedToNull: undefinedToNull
});
exports.conditions = conditions;
exports.undefinedToNull = undefinedToNull; //# sourceMappingURL=conditions-fb475c70.cjs.map

},{}],"98sVq":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
/* global localStorage, addEventListener */ /**
 * Isomorphic variable storage.
 *
 * Uses LocalStorage in the browser and falls back to in-memory storage.
 *
 * @module storage
 */ /* istanbul ignore next */ class VarStoragePolyfill {
    constructor(){
        this.map = new Map();
    }
    /**
   * @param {string} key
   * @param {any} newValue
   */ setItem(key, newValue) {
        this.map.set(key, newValue);
    }
    /**
   * @param {string} key
   */ getItem(key) {
        return this.map.get(key);
    }
}
/* istanbul ignore next */ /**
 * @type {any}
 */ let _localStorage = new VarStoragePolyfill();
let usePolyfill = true;
try {
    // if the same-origin rule is violated, accessing localStorage might thrown an error
    /* istanbul ignore next */ if (typeof localStorage !== "undefined") {
        _localStorage = localStorage;
        usePolyfill = false;
    }
} catch (e) {}
/* istanbul ignore next */ /**
 * This is basically localStorage in browser, or a polyfill in nodejs
 */ const varStorage = _localStorage;
/* istanbul ignore next */ /**
 * A polyfill for `addEventListener('storage', event => {..})` that does nothing if the polyfill is being used.
 *
 * @param {function({ key: string, newValue: string, oldValue: string }): void} eventHandler
 * @function
 */ const onChange = (eventHandler)=>usePolyfill || addEventListener("storage", /** @type {any} */ eventHandler);
exports.onChange = onChange;
exports.varStorage = varStorage; //# sourceMappingURL=storage.cjs.map

},{}],"fxH3h":[function(require,module,exports) {
"use strict";
/* eslint-env browser */ /**
 * Binary data constants.
 *
 * @module binary
 */ /**
 * n-th bit activated.
 *
 * @type {number}
 */ const BIT1 = 1;
const BIT2 = 2;
const BIT3 = 4;
const BIT4 = 8;
const BIT5 = 16;
const BIT6 = 32;
const BIT7 = 64;
const BIT8 = 128;
const BIT9 = 256;
const BIT10 = 512;
const BIT11 = 1024;
const BIT12 = 2048;
const BIT13 = 4096;
const BIT14 = 8192;
const BIT15 = 16384;
const BIT16 = 32768;
const BIT17 = 65536;
const BIT18 = 131072;
const BIT19 = 262144;
const BIT20 = 524288;
const BIT21 = 1048576;
const BIT22 = 2097152;
const BIT23 = 4194304;
const BIT24 = 8388608;
const BIT25 = 16777216;
const BIT26 = 33554432;
const BIT27 = 67108864;
const BIT28 = 134217728;
const BIT29 = 268435456;
const BIT30 = 536870912;
const BIT31 = 1073741824;
const BIT32 = -2147483648;
/**
 * First n bits activated.
 *
 * @type {number}
 */ const BITS0 = 0;
const BITS1 = 1;
const BITS2 = 3;
const BITS3 = 7;
const BITS4 = 15;
const BITS5 = 31;
const BITS6 = 63;
const BITS7 = 127;
const BITS8 = 255;
const BITS9 = 511;
const BITS10 = 1023;
const BITS11 = 2047;
const BITS12 = 4095;
const BITS13 = 8191;
const BITS14 = 16383;
const BITS15 = 32767;
const BITS16 = 65535;
const BITS17 = BIT18 - 1;
const BITS18 = BIT19 - 1;
const BITS19 = BIT20 - 1;
const BITS20 = BIT21 - 1;
const BITS21 = BIT22 - 1;
const BITS22 = BIT23 - 1;
const BITS23 = BIT24 - 1;
const BITS24 = BIT25 - 1;
const BITS25 = BIT26 - 1;
const BITS26 = BIT27 - 1;
const BITS27 = BIT28 - 1;
const BITS28 = BIT29 - 1;
const BITS29 = BIT30 - 1;
const BITS30 = BIT31 - 1;
/**
 * @type {number}
 */ const BITS31 = 0x7FFFFFFF;
/**
 * @type {number}
 */ const BITS32 = 0xFFFFFFFF;
var binary = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    BIT1: BIT1,
    BIT2: BIT2,
    BIT3: BIT3,
    BIT4: BIT4,
    BIT5: BIT5,
    BIT6: BIT6,
    BIT7: BIT7,
    BIT8: BIT8,
    BIT9: BIT9,
    BIT10: BIT10,
    BIT11: BIT11,
    BIT12: BIT12,
    BIT13: BIT13,
    BIT14: BIT14,
    BIT15: BIT15,
    BIT16: BIT16,
    BIT17: BIT17,
    BIT18: BIT18,
    BIT19: BIT19,
    BIT20: BIT20,
    BIT21: BIT21,
    BIT22: BIT22,
    BIT23: BIT23,
    BIT24: BIT24,
    BIT25: BIT25,
    BIT26: BIT26,
    BIT27: BIT27,
    BIT28: BIT28,
    BIT29: BIT29,
    BIT30: BIT30,
    BIT31: BIT31,
    BIT32: BIT32,
    BITS0: BITS0,
    BITS1: BITS1,
    BITS2: BITS2,
    BITS3: BITS3,
    BITS4: BITS4,
    BITS5: BITS5,
    BITS6: BITS6,
    BITS7: BITS7,
    BITS8: BITS8,
    BITS9: BITS9,
    BITS10: BITS10,
    BITS11: BITS11,
    BITS12: BITS12,
    BITS13: BITS13,
    BITS14: BITS14,
    BITS15: BITS15,
    BITS16: BITS16,
    BITS17: BITS17,
    BITS18: BITS18,
    BITS19: BITS19,
    BITS20: BITS20,
    BITS21: BITS21,
    BITS22: BITS22,
    BITS23: BITS23,
    BITS24: BITS24,
    BITS25: BITS25,
    BITS26: BITS26,
    BITS27: BITS27,
    BITS28: BITS28,
    BITS29: BITS29,
    BITS30: BITS30,
    BITS31: BITS31,
    BITS32: BITS32
});
exports.BIT1 = BIT1;
exports.BIT10 = BIT10;
exports.BIT11 = BIT11;
exports.BIT12 = BIT12;
exports.BIT13 = BIT13;
exports.BIT14 = BIT14;
exports.BIT15 = BIT15;
exports.BIT16 = BIT16;
exports.BIT17 = BIT17;
exports.BIT18 = BIT18;
exports.BIT19 = BIT19;
exports.BIT2 = BIT2;
exports.BIT20 = BIT20;
exports.BIT21 = BIT21;
exports.BIT22 = BIT22;
exports.BIT23 = BIT23;
exports.BIT24 = BIT24;
exports.BIT25 = BIT25;
exports.BIT26 = BIT26;
exports.BIT27 = BIT27;
exports.BIT28 = BIT28;
exports.BIT29 = BIT29;
exports.BIT3 = BIT3;
exports.BIT30 = BIT30;
exports.BIT31 = BIT31;
exports.BIT32 = BIT32;
exports.BIT4 = BIT4;
exports.BIT5 = BIT5;
exports.BIT6 = BIT6;
exports.BIT7 = BIT7;
exports.BIT8 = BIT8;
exports.BIT9 = BIT9;
exports.BITS0 = BITS0;
exports.BITS1 = BITS1;
exports.BITS10 = BITS10;
exports.BITS11 = BITS11;
exports.BITS12 = BITS12;
exports.BITS13 = BITS13;
exports.BITS14 = BITS14;
exports.BITS15 = BITS15;
exports.BITS16 = BITS16;
exports.BITS17 = BITS17;
exports.BITS18 = BITS18;
exports.BITS19 = BITS19;
exports.BITS2 = BITS2;
exports.BITS20 = BITS20;
exports.BITS21 = BITS21;
exports.BITS22 = BITS22;
exports.BITS23 = BITS23;
exports.BITS24 = BITS24;
exports.BITS25 = BITS25;
exports.BITS26 = BITS26;
exports.BITS27 = BITS27;
exports.BITS28 = BITS28;
exports.BITS29 = BITS29;
exports.BITS3 = BITS3;
exports.BITS30 = BITS30;
exports.BITS31 = BITS31;
exports.BITS32 = BITS32;
exports.BITS4 = BITS4;
exports.BITS5 = BITS5;
exports.BITS6 = BITS6;
exports.BITS7 = BITS7;
exports.BITS8 = BITS8;
exports.BITS9 = BITS9;
exports.binary = binary; //# sourceMappingURL=binary-ac8e39e2.cjs.map

},{}],"cOZT7":[function(require,module,exports) {
"use strict";
var math = require("./math-08e068f9.cjs");
var binary = require("./binary-ac8e39e2.cjs");
/**
 * Utility helpers for working with numbers.
 *
 * @module number
 */ const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;
const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER;
const LOWEST_INT32 = -2147483648;
/**
 * @type {number}
 */ const HIGHEST_INT32 = binary.BITS31;
/**
 * @module number
 */ /* istanbul ignore next */ const isInteger = Number.isInteger || ((num)=>typeof num === "number" && isFinite(num) && math.floor(num) === num);
const isNaN = Number.isNaN;
const parseInt = Number.parseInt;
var number = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
    MIN_SAFE_INTEGER: MIN_SAFE_INTEGER,
    LOWEST_INT32: LOWEST_INT32,
    HIGHEST_INT32: HIGHEST_INT32,
    isInteger: isInteger,
    isNaN: isNaN,
    parseInt: parseInt
});
exports.HIGHEST_INT32 = HIGHEST_INT32;
exports.LOWEST_INT32 = LOWEST_INT32;
exports.MAX_SAFE_INTEGER = MAX_SAFE_INTEGER;
exports.MIN_SAFE_INTEGER = MIN_SAFE_INTEGER;
exports.isInteger = isInteger;
exports.isNaN = isNaN;
exports.number = number;
exports.parseInt = parseInt; //# sourceMappingURL=number-e62129bc.cjs.map

},{"./math-08e068f9.cjs":"lb1Mp","./binary-ac8e39e2.cjs":"fxH3h"}],"bYuts":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var encoding = require("./buffer-c98f67d5.cjs");
require("./binary-ac8e39e2.cjs");
require("./math-08e068f9.cjs");
require("./string-ad04f734.cjs");
require("./environment-60b83194.cjs");
require("./map-28a001c9.cjs");
require("./conditions-fb475c70.cjs");
require("./storage.cjs");
require("./number-e62129bc.cjs");
exports.Decoder = encoding.Decoder;
exports.IncUintOptRleDecoder = encoding.IncUintOptRleDecoder;
exports.IntDiffDecoder = encoding.IntDiffDecoder;
exports.IntDiffOptRleDecoder = encoding.IntDiffOptRleDecoder;
exports.RleDecoder = encoding.RleDecoder;
exports.RleIntDiffDecoder = encoding.RleIntDiffDecoder;
exports.StringDecoder = encoding.StringDecoder;
exports.UintOptRleDecoder = encoding.UintOptRleDecoder;
exports.clone = encoding.clone;
exports.createDecoder = encoding.createDecoder;
exports.hasContent = encoding.hasContent;
exports.peekUint16 = encoding.peekUint16;
exports.peekUint32 = encoding.peekUint32;
exports.peekUint8 = encoding.peekUint8;
exports.peekVarInt = encoding.peekVarInt;
exports.peekVarString = encoding.peekVarString;
exports.peekVarUint = encoding.peekVarUint;
exports.readAny = encoding.readAny;
exports.readBigInt64 = encoding.readBigInt64;
exports.readBigUint64 = encoding.readBigUint64;
exports.readFloat32 = encoding.readFloat32;
exports.readFloat64 = encoding.readFloat64;
exports.readFromDataView = encoding.readFromDataView;
exports.readTailAsUint8Array = encoding.readTailAsUint8Array;
exports.readUint16 = encoding.readUint16;
exports.readUint32 = encoding.readUint32;
exports.readUint32BigEndian = encoding.readUint32BigEndian;
exports.readUint8 = encoding.readUint8;
exports.readUint8Array = encoding.readUint8Array;
exports.readVarInt = encoding.readVarInt;
exports.readVarString = encoding.readVarString;
exports.readVarUint = encoding.readVarUint;
exports.readVarUint8Array = encoding.readVarUint8Array;
exports.skip8 = encoding.skip8; //# sourceMappingURL=decoding.cjs.map

},{"./buffer-c98f67d5.cjs":"fOSLt","./binary-ac8e39e2.cjs":"fxH3h","./math-08e068f9.cjs":"lb1Mp","./string-ad04f734.cjs":"ajWKc","./environment-60b83194.cjs":"byYnb","./map-28a001c9.cjs":"lrupf","./conditions-fb475c70.cjs":"la0gY","./storage.cjs":"98sVq","./number-e62129bc.cjs":"cOZT7"}],"1BFL3":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var math = require("./math-08e068f9.cjs");
var binary = require("./binary-ac8e39e2.cjs");
var isomorphic_js = require("isomorphic.js");
const rand = Math.random;
const uint32 = ()=>new Uint32Array(isomorphic_js.cryptoRandomBuffer(4))[0];
const uint53 = ()=>{
    const arr = new Uint32Array(isomorphic_js.cryptoRandomBuffer(8));
    return (arr[0] & binary.BITS21) * (binary.BITS32 + 1) + (arr[1] >>> 0);
};
/**
 * @template T
 * @param {Array<T>} arr
 * @return {T}
 */ const oneOf = (arr)=>arr[math.floor(rand() * arr.length)];
// @ts-ignore
const uuidv4Template = "10000000-1000-4000-8000-100000000000";
const uuidv4 = ()=>uuidv4Template.replace(/[018]/g, /** @param {number} c */ (c)=>(c ^ uint32() & 15 >> c / 4).toString(16));
exports.oneOf = oneOf;
exports.rand = rand;
exports.uint32 = uint32;
exports.uint53 = uint53;
exports.uuidv4 = uuidv4; //# sourceMappingURL=random.cjs.map

},{"./math-08e068f9.cjs":"lb1Mp","./binary-ac8e39e2.cjs":"fxH3h","isomorphic.js":"kkGo8"}],"kkGo8":[function(require,module,exports) {
/* eslint-env browser */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "performance", ()=>performance);
parcelHelpers.export(exports, "cryptoRandomBuffer", ()=>cryptoRandomBuffer);
const performance = typeof window === "undefined" ? null : typeof window.performance !== "undefined" && window.performance || null;
const isoCrypto = typeof crypto === "undefined" ? null : crypto;
const cryptoRandomBuffer = isoCrypto !== null ? (len)=>{
    // browser
    const buf = new ArrayBuffer(len);
    const arr = new Uint8Array(buf);
    isoCrypto.getRandomValues(arr);
    return buf;
} : (len)=>{
    // polyfill
    const buf = new ArrayBuffer(len);
    const arr = new Uint8Array(buf);
    for(let i = 0; i < len; i++)arr[i] = Math.ceil(Math.random() * 0xFFFFFFFF >>> 0);
    return buf;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"8QeL6"}],"8QeL6":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"cO2tw":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("./time-e00067da.cjs");
var promise = require("./promise-1a9fe712.cjs");
require("./metric.cjs");
require("./math-08e068f9.cjs");
exports.all = promise.all;
exports.create = promise.create;
exports.createEmpty = promise.createEmpty;
exports.isPromise = promise.isPromise;
exports.reject = promise.reject;
exports.resolve = promise.resolve;
exports.resolveWith = promise.resolveWith;
exports.until = promise.until;
exports.wait = promise.wait; //# sourceMappingURL=promise.cjs.map

},{"./time-e00067da.cjs":"1NaWj","./promise-1a9fe712.cjs":"iUIpD","./metric.cjs":"a5str","./math-08e068f9.cjs":"lb1Mp"}],"1NaWj":[function(require,module,exports) {
"use strict";
var metric = require("./metric.cjs");
var math = require("./math-08e068f9.cjs");
/**
 * Utility module to work with time.
 *
 * @module time
 */ /**
 * Return current time.
 *
 * @return {Date}
 */ const getDate = ()=>new Date();
/**
 * Return current unix time.
 *
 * @return {number}
 */ const getUnixTime = Date.now;
/**
 * Transform time (in ms) to a human readable format. E.g. 1100 => 1.1s. 60s => 1min. .001 => 10μs.
 *
 * @param {number} d duration in milliseconds
 * @return {string} humanized approximation of time
 */ const humanizeDuration = (d)=>{
    if (d < 60000) {
        const p = metric.prefix(d, -1);
        return math.round(p.n * 100) / 100 + p.prefix + "s";
    }
    d = math.floor(d / 1000);
    const seconds = d % 60;
    const minutes = math.floor(d / 60) % 60;
    const hours = math.floor(d / 3600) % 24;
    const days = math.floor(d / 86400);
    if (days > 0) return days + "d" + (hours > 0 || minutes > 30 ? " " + (minutes > 30 ? hours + 1 : hours) + "h" : "");
    if (hours > 0) /* istanbul ignore next */ return hours + "h" + (minutes > 0 || seconds > 30 ? " " + (seconds > 30 ? minutes + 1 : minutes) + "min" : "");
    return minutes + "min" + (seconds > 0 ? " " + seconds + "s" : "");
};
var time = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    getDate: getDate,
    getUnixTime: getUnixTime,
    humanizeDuration: humanizeDuration
});
exports.getDate = getDate;
exports.getUnixTime = getUnixTime;
exports.humanizeDuration = humanizeDuration;
exports.time = time; //# sourceMappingURL=time-e00067da.cjs.map

},{"./metric.cjs":"a5str","./math-08e068f9.cjs":"lb1Mp"}],"a5str":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var math = require("./math-08e068f9.cjs");
/**
 * Utility module to convert metric values.
 *
 * @module metric
 */ const yotta = 1e24;
const zetta = 1e21;
const exa = 1e18;
const peta = 1e15;
const tera = 1e12;
const giga = 1e9;
const mega = 1e6;
const kilo = 1e3;
const hecto = 1e2;
const deca = 10;
const deci = 0.1;
const centi = 0.01;
const milli = 1e-3;
const micro = 1e-6;
const nano = 1e-9;
const pico = 1e-12;
const femto = 1e-15;
const atto = 1e-18;
const zepto = 1e-21;
const yocto = 1e-24;
const prefixUp = [
    "",
    "k",
    "M",
    "G",
    "T",
    "P",
    "E",
    "Z",
    "Y"
];
const prefixDown = [
    "",
    "m",
    "μ",
    "n",
    "p",
    "f",
    "a",
    "z",
    "y"
];
/**
 * Calculate the metric prefix for a number. Assumes E.g. `prefix(1000) = { n: 1, prefix: 'k' }`
 *
 * @param {number} n
 * @param {number} [baseMultiplier] Multiplier of the base (10^(3*baseMultiplier)). E.g. `convert(time, -3)` if time is already in milli seconds
 * @return {{n:number,prefix:string}}
 */ const prefix = (n, baseMultiplier = 0)=>{
    const nPow = n === 0 ? 0 : math.log10(n);
    let mult = 0;
    while(nPow < mult * 3 && baseMultiplier > -8){
        baseMultiplier--;
        mult--;
    }
    while(nPow >= 3 + mult * 3 && baseMultiplier < 8){
        baseMultiplier++;
        mult++;
    }
    const prefix = baseMultiplier < 0 ? prefixDown[-baseMultiplier] : prefixUp[baseMultiplier];
    return {
        n: math.round((mult > 0 ? n / math.exp10(mult * 3) : n * math.exp10(mult * -3)) * 1e12) / 1e12,
        prefix
    };
};
exports.atto = atto;
exports.centi = centi;
exports.deca = deca;
exports.deci = deci;
exports.exa = exa;
exports.femto = femto;
exports.giga = giga;
exports.hecto = hecto;
exports.kilo = kilo;
exports.mega = mega;
exports.micro = micro;
exports.milli = milli;
exports.nano = nano;
exports.peta = peta;
exports.pico = pico;
exports.prefix = prefix;
exports.tera = tera;
exports.yocto = yocto;
exports.yotta = yotta;
exports.zepto = zepto;
exports.zetta = zetta; //# sourceMappingURL=metric.cjs.map

},{"./math-08e068f9.cjs":"lb1Mp"}],"iUIpD":[function(require,module,exports) {
"use strict";
var time = require("./time-e00067da.cjs");
/**
 * Utility helpers to work with promises.
 *
 * @module promise
 */ /**
 * @template T
 * @callback PromiseResolve
 * @param {T|PromiseLike<T>} [result]
 */ /**
 * @template T
 * @param {function(PromiseResolve<T>,function(Error):void):any} f
 * @return {Promise<T>}
 */ const create = (f)=>/** @type {Promise<T>} */ new Promise(f);
/**
 * @param {function(function():void,function(Error):void):void} f
 * @return {Promise<void>}
 */ const createEmpty = (f)=>new Promise(f);
/**
 * `Promise.all` wait for all promises in the array to resolve and return the result
 * @template T
 * @param {Array<Promise<T>>} arrp
 * @return {Promise<Array<T>>}
 */ const all = (arrp)=>Promise.all(arrp);
/**
 * @param {Error} [reason]
 * @return {Promise<never>}
 */ const reject = (reason)=>Promise.reject(reason);
/**
 * @template T
 * @param {T|void} res
 * @return {Promise<T|void>}
 */ const resolve = (res)=>Promise.resolve(res);
/**
 * @template T
 * @param {T} res
 * @return {Promise<T>}
 */ const resolveWith = (res)=>Promise.resolve(res);
/**
 * @todo Next version, reorder parameters: check, [timeout, [intervalResolution]]
 *
 * @param {number} timeout
 * @param {function():boolean} check
 * @param {number} [intervalResolution]
 * @return {Promise<void>}
 */ const until = (timeout, check, intervalResolution = 10)=>create((resolve, reject)=>{
        const startTime = time.getUnixTime();
        const hasTimeout = timeout > 0;
        const untilInterval = ()=>{
            if (check()) {
                clearInterval(intervalHandle);
                resolve();
            } else if (hasTimeout) /* istanbul ignore else */ {
                if (time.getUnixTime() - startTime > timeout) {
                    clearInterval(intervalHandle);
                    reject(new Error("Timeout"));
                }
            }
        };
        const intervalHandle = setInterval(untilInterval, intervalResolution);
    });
/**
 * @param {number} timeout
 * @return {Promise<undefined>}
 */ const wait = (timeout)=>create((resolve, reject)=>setTimeout(resolve, timeout));
/**
 * Checks if an object is a promise using ducktyping.
 *
 * Promises are often polyfilled, so it makes sense to add some additional guarantees if the user of this
 * library has some insane environment where global Promise objects are overwritten.
 *
 * @param {any} p
 * @return {boolean}
 */ const isPromise = (p)=>p instanceof Promise || p && p.then && p.catch && p.finally;
var promise = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    create: create,
    createEmpty: createEmpty,
    all: all,
    reject: reject,
    resolve: resolve,
    resolveWith: resolveWith,
    until: until,
    wait: wait,
    isPromise: isPromise
});
exports.all = all;
exports.create = create;
exports.createEmpty = createEmpty;
exports.isPromise = isPromise;
exports.promise = promise;
exports.reject = reject;
exports.resolve = resolve;
exports.resolveWith = resolveWith;
exports.until = until;
exports.wait = wait; //# sourceMappingURL=promise-1a9fe712.cjs.map

},{"./time-e00067da.cjs":"1NaWj"}],"gAFuh":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("./string-ad04f734.cjs");
require("./environment-60b83194.cjs");
var encoding = require("./buffer-c98f67d5.cjs");
require("./map-28a001c9.cjs");
require("./conditions-fb475c70.cjs");
require("./storage.cjs");
require("./binary-ac8e39e2.cjs");
require("./math-08e068f9.cjs");
require("./number-e62129bc.cjs");
exports.copyUint8Array = encoding.copyUint8Array;
exports.createUint8ArrayFromArrayBuffer = encoding.createUint8ArrayFromArrayBuffer;
exports.createUint8ArrayFromLen = encoding.createUint8ArrayFromLen;
exports.createUint8ArrayViewFromArrayBuffer = encoding.createUint8ArrayViewFromArrayBuffer;
exports.decodeAny = encoding.decodeAny;
exports.encodeAny = encoding.encodeAny;
exports.fromBase64 = encoding.fromBase64;
exports.toBase64 = encoding.toBase64; //# sourceMappingURL=buffer.cjs.map

},{"./string-ad04f734.cjs":"ajWKc","./environment-60b83194.cjs":"byYnb","./buffer-c98f67d5.cjs":"fOSLt","./map-28a001c9.cjs":"lrupf","./conditions-fb475c70.cjs":"la0gY","./storage.cjs":"98sVq","./binary-ac8e39e2.cjs":"fxH3h","./math-08e068f9.cjs":"lb1Mp","./number-e62129bc.cjs":"cOZT7"}],"WM5PR":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var error = require("./error-873c9cbf.cjs");
exports.create = error.create;
exports.methodUnimplemented = error.methodUnimplemented;
exports.unexpectedCase = error.unexpectedCase; //# sourceMappingURL=error.cjs.map

},{"./error-873c9cbf.cjs":"eAiX2"}],"eAiX2":[function(require,module,exports) {
"use strict";
/**
 * Error helpers.
 *
 * @module error
 */ /* istanbul ignore next */ /**
 * @param {string} s
 * @return {Error}
 */ const create = (s)=>new Error(s);
/* istanbul ignore next */ /**
 * @throws {Error}
 * @return {never}
 */ const methodUnimplemented = ()=>{
    throw create("Method unimplemented");
};
/* istanbul ignore next */ /**
 * @throws {Error}
 * @return {never}
 */ const unexpectedCase = ()=>{
    throw create("Unexpected case");
};
var error = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    create: create,
    methodUnimplemented: methodUnimplemented,
    unexpectedCase: unexpectedCase
});
exports.create = create;
exports.error = error;
exports.methodUnimplemented = methodUnimplemented;
exports.unexpectedCase = unexpectedCase; //# sourceMappingURL=error-873c9cbf.cjs.map

},{}],"2dCvB":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var binary = require("./binary-ac8e39e2.cjs");
exports.BIT1 = binary.BIT1;
exports.BIT10 = binary.BIT10;
exports.BIT11 = binary.BIT11;
exports.BIT12 = binary.BIT12;
exports.BIT13 = binary.BIT13;
exports.BIT14 = binary.BIT14;
exports.BIT15 = binary.BIT15;
exports.BIT16 = binary.BIT16;
exports.BIT17 = binary.BIT17;
exports.BIT18 = binary.BIT18;
exports.BIT19 = binary.BIT19;
exports.BIT2 = binary.BIT2;
exports.BIT20 = binary.BIT20;
exports.BIT21 = binary.BIT21;
exports.BIT22 = binary.BIT22;
exports.BIT23 = binary.BIT23;
exports.BIT24 = binary.BIT24;
exports.BIT25 = binary.BIT25;
exports.BIT26 = binary.BIT26;
exports.BIT27 = binary.BIT27;
exports.BIT28 = binary.BIT28;
exports.BIT29 = binary.BIT29;
exports.BIT3 = binary.BIT3;
exports.BIT30 = binary.BIT30;
exports.BIT31 = binary.BIT31;
exports.BIT32 = binary.BIT32;
exports.BIT4 = binary.BIT4;
exports.BIT5 = binary.BIT5;
exports.BIT6 = binary.BIT6;
exports.BIT7 = binary.BIT7;
exports.BIT8 = binary.BIT8;
exports.BIT9 = binary.BIT9;
exports.BITS0 = binary.BITS0;
exports.BITS1 = binary.BITS1;
exports.BITS10 = binary.BITS10;
exports.BITS11 = binary.BITS11;
exports.BITS12 = binary.BITS12;
exports.BITS13 = binary.BITS13;
exports.BITS14 = binary.BITS14;
exports.BITS15 = binary.BITS15;
exports.BITS16 = binary.BITS16;
exports.BITS17 = binary.BITS17;
exports.BITS18 = binary.BITS18;
exports.BITS19 = binary.BITS19;
exports.BITS2 = binary.BITS2;
exports.BITS20 = binary.BITS20;
exports.BITS21 = binary.BITS21;
exports.BITS22 = binary.BITS22;
exports.BITS23 = binary.BITS23;
exports.BITS24 = binary.BITS24;
exports.BITS25 = binary.BITS25;
exports.BITS26 = binary.BITS26;
exports.BITS27 = binary.BITS27;
exports.BITS28 = binary.BITS28;
exports.BITS29 = binary.BITS29;
exports.BITS3 = binary.BITS3;
exports.BITS30 = binary.BITS30;
exports.BITS31 = binary.BITS31;
exports.BITS32 = binary.BITS32;
exports.BITS4 = binary.BITS4;
exports.BITS5 = binary.BITS5;
exports.BITS6 = binary.BITS6;
exports.BITS7 = binary.BITS7;
exports.BITS8 = binary.BITS8;
exports.BITS9 = binary.BITS9; //# sourceMappingURL=binary.cjs.map

},{"./binary-ac8e39e2.cjs":"fxH3h"}],"2k98A":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("./array-acefe0f2.cjs");
require("./object-dcdd6eed.cjs");
var _function = require("./function-e4045b1d.cjs");
exports.apply = _function.apply;
exports.callAll = _function.callAll;
exports.equalityDeep = _function.equalityDeep;
exports.equalityFlat = _function.equalityFlat;
exports.equalityStrict = _function.equalityStrict;
exports.id = _function.id;
exports.nop = _function.nop; //# sourceMappingURL=function.cjs.map

},{"./array-acefe0f2.cjs":"dz9mo","./object-dcdd6eed.cjs":"a1rDy","./function-e4045b1d.cjs":"hU0i9"}],"a1rDy":[function(require,module,exports) {
"use strict";
/**
 * Utility functions for working with EcmaScript objects.
 *
 * @module object
 */ /**
 * @return {Object<string,any>} obj
 */ const create = ()=>Object.create(null);
/**
 * Object.assign
 */ const assign = Object.assign;
/**
 * @param {Object<string,any>} obj
 */ const keys = Object.keys;
/**
 * @param {Object<string,any>} obj
 * @param {function(any,string):any} f
 */ const forEach = (obj, f)=>{
    for(const key in obj)f(obj[key], key);
};
/**
 * @template R
 * @param {Object<string,any>} obj
 * @param {function(any,string):R} f
 * @return {Array<R>}
 */ const map = (obj, f)=>{
    const results = [];
    for(const key in obj)results.push(f(obj[key], key));
    return results;
};
/**
 * @param {Object<string,any>} obj
 * @return {number}
 */ const length = (obj)=>keys(obj).length;
/**
 * @param {Object<string,any>} obj
 * @param {function(any,string):boolean} f
 * @return {boolean}
 */ const some = (obj, f)=>{
    for(const key in obj){
        if (f(obj[key], key)) return true;
    }
    return false;
};
/**
 * @param {Object<string,any>} obj
 * @param {function(any,string):boolean} f
 * @return {boolean}
 */ const every = (obj, f)=>{
    for(const key in obj){
        if (!f(obj[key], key)) return false;
    }
    return true;
};
/**
 * Calls `Object.prototype.hasOwnProperty`.
 *
 * @param {any} obj
 * @param {string|symbol} key
 * @return {boolean}
 */ const hasProperty = (obj, key)=>Object.prototype.hasOwnProperty.call(obj, key);
/**
 * @param {Object<string,any>} a
 * @param {Object<string,any>} b
 * @return {boolean}
 */ const equalFlat = (a, b)=>a === b || length(a) === length(b) && every(a, (val, key)=>(val !== undefined || hasProperty(b, key)) && b[key] === val);
var object = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    create: create,
    assign: assign,
    keys: keys,
    forEach: forEach,
    map: map,
    length: length,
    some: some,
    every: every,
    hasProperty: hasProperty,
    equalFlat: equalFlat
});
exports.assign = assign;
exports.create = create;
exports.equalFlat = equalFlat;
exports.every = every;
exports.forEach = forEach;
exports.hasProperty = hasProperty;
exports.keys = keys;
exports.length = length;
exports.map = map;
exports.object = object;
exports.some = some; //# sourceMappingURL=object-dcdd6eed.cjs.map

},{}],"hU0i9":[function(require,module,exports) {
"use strict";
var array = require("./array-acefe0f2.cjs");
var object = require("./object-dcdd6eed.cjs");
/**
 * Common functions and function call helpers.
 *
 * @module function
 */ /**
 * Calls all functions in `fs` with args. Only throws after all functions were called.
 *
 * @param {Array<function>} fs
 * @param {Array<any>} args
 */ const callAll = (fs, args, i = 0)=>{
    try {
        for(; i < fs.length; i++)fs[i](...args);
    } finally{
        if (i < fs.length) callAll(fs, args, i + 1);
    }
};
const nop = ()=>{};
/**
 * @template T
 * @param {function():T} f
 * @return {T}
 */ const apply = (f)=>f();
/**
 * @template A
 *
 * @param {A} a
 * @return {A}
 */ const id = (a)=>a;
/**
 * @template T
 *
 * @param {T} a
 * @param {T} b
 * @return {boolean}
 */ const equalityStrict = (a, b)=>a === b;
/**
 * @template T
 *
 * @param {Array<T>|object} a
 * @param {Array<T>|object} b
 * @return {boolean}
 */ const equalityFlat = (a, b)=>a === b || a != null && b != null && a.constructor === b.constructor && (a instanceof Array && array.equalFlat(a, /** @type {Array<T>} */ b) || typeof a === "object" && object.equalFlat(a, b));
/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */ const equalityDeep = (a, b)=>{
    if (a == null || b == null) return equalityStrict(a, b);
    if (a.constructor !== b.constructor) return false;
    if (a === b) return true;
    switch(a.constructor){
        case ArrayBuffer:
            a = new Uint8Array(a);
            b = new Uint8Array(b);
        // eslint-disable-next-line no-fallthrough
        case Uint8Array:
            if (a.byteLength !== b.byteLength) return false;
            for(let i = 0; i < a.length; i++){
                if (a[i] !== b[i]) return false;
            }
            break;
        case Set:
            if (a.size !== b.size) return false;
            for (const value of a){
                if (!b.has(value)) return false;
            }
            break;
        case Map:
            if (a.size !== b.size) return false;
            for (const key of a.keys()){
                if (!b.has(key) || !equalityDeep(a.get(key), b.get(key))) return false;
            }
            break;
        case Object:
            if (object.length(a) !== object.length(b)) return false;
            for(const key1 in a){
                if (!object.hasProperty(a, key1) || !equalityDeep(a[key1], b[key1])) return false;
            }
            break;
        case Array:
            if (a.length !== b.length) return false;
            for(let i1 = 0; i1 < a.length; i1++){
                if (!equalityDeep(a[i1], b[i1])) return false;
            }
            break;
        default:
            return false;
    }
    return true;
};
var _function = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    callAll: callAll,
    nop: nop,
    apply: apply,
    id: id,
    equalityStrict: equalityStrict,
    equalityFlat: equalityFlat,
    equalityDeep: equalityDeep
});
exports._function = _function;
exports.apply = apply;
exports.callAll = callAll;
exports.equalityDeep = equalityDeep;
exports.equalityFlat = equalityFlat;
exports.equalityStrict = equalityStrict;
exports.id = id;
exports.nop = nop; //# sourceMappingURL=function-e4045b1d.cjs.map

},{"./array-acefe0f2.cjs":"dz9mo","./object-dcdd6eed.cjs":"a1rDy"}],"bbpDQ":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var set = require("./set-b596ef38.cjs");
exports.create = set.create;
exports.first = set.first;
exports.from = set.from;
exports.toArray = set.toArray; //# sourceMappingURL=set.cjs.map

},{"./set-b596ef38.cjs":"afyOf"}],"jiMbd":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("./environment-60b83194.cjs");
require("./symbol-c5caa724.cjs");
require("./pair-ab022bc3.cjs");
require("./dom-58958c04.cjs");
require("./json-092190a1.cjs");
require("./map-28a001c9.cjs");
require("./eventloop-c60b5658.cjs");
require("./math-08e068f9.cjs");
require("./time-e00067da.cjs");
require("./function-e4045b1d.cjs");
var logging = require("./logging-0a4d8595.cjs");
require("./string-ad04f734.cjs");
require("./conditions-fb475c70.cjs");
require("./storage.cjs");
require("./metric.cjs");
require("./array-acefe0f2.cjs");
require("./object-dcdd6eed.cjs");
exports.BLUE = logging.BLUE;
exports.BOLD = logging.BOLD;
exports.GREEN = logging.GREEN;
exports.GREY = logging.GREY;
exports.ORANGE = logging.ORANGE;
exports.PURPLE = logging.PURPLE;
exports.RED = logging.RED;
exports.UNBOLD = logging.UNBOLD;
exports.UNCOLOR = logging.UNCOLOR;
exports.VConsole = logging.VConsole;
exports.createModuleLogger = logging.createModuleLogger;
exports.createVConsole = logging.createVConsole;
exports.group = logging.group;
exports.groupCollapsed = logging.groupCollapsed;
exports.groupEnd = logging.groupEnd;
exports.print = logging.print;
exports.printCanvas = logging.printCanvas;
exports.printDom = logging.printDom;
exports.printError = logging.printError;
exports.printImg = logging.printImg;
exports.printImgBase64 = logging.printImgBase64;
exports.vconsoles = logging.vconsoles;
exports.warn = logging.warn; //# sourceMappingURL=logging.cjs.map

},{"./environment-60b83194.cjs":"byYnb","./symbol-c5caa724.cjs":"bBzPu","./pair-ab022bc3.cjs":"1DBV6","./dom-58958c04.cjs":"e2LPf","./json-092190a1.cjs":"9UeZa","./map-28a001c9.cjs":"lrupf","./eventloop-c60b5658.cjs":"7wBcy","./math-08e068f9.cjs":"lb1Mp","./time-e00067da.cjs":"1NaWj","./function-e4045b1d.cjs":"hU0i9","./logging-0a4d8595.cjs":"4SMel","./string-ad04f734.cjs":"ajWKc","./conditions-fb475c70.cjs":"la0gY","./storage.cjs":"98sVq","./metric.cjs":"a5str","./array-acefe0f2.cjs":"dz9mo","./object-dcdd6eed.cjs":"a1rDy"}],"bBzPu":[function(require,module,exports) {
"use strict";
/**
 * Utility module to work with EcmaScript Symbols.
 *
 * @module symbol
 */ /**
 * Return fresh symbol.
 *
 * @return {Symbol}
 */ const create = Symbol;
/**
 * @param {any} s
 * @return {boolean}
 */ const isSymbol = (s)=>typeof s === "symbol";
var symbol = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    create: create,
    isSymbol: isSymbol
});
exports.create = create;
exports.isSymbol = isSymbol;
exports.symbol = symbol; //# sourceMappingURL=symbol-c5caa724.cjs.map

},{}],"1DBV6":[function(require,module,exports) {
"use strict";
/**
 * Working with value pairs.
 *
 * @module pair
 */ /**
 * @template L,R
 */ class Pair {
    /**
   * @param {L} left
   * @param {R} right
   */ constructor(left, right){
        this.left = left;
        this.right = right;
    }
}
/**
 * @template L,R
 * @param {L} left
 * @param {R} right
 * @return {Pair<L,R>}
 */ const create = (left, right)=>new Pair(left, right);
/**
 * @template L,R
 * @param {R} right
 * @param {L} left
 * @return {Pair<L,R>}
 */ const createReversed = (right, left)=>new Pair(left, right);
/**
 * @template L,R
 * @param {Array<Pair<L,R>>} arr
 * @param {function(L, R):any} f
 */ const forEach = (arr, f)=>arr.forEach((p)=>f(p.left, p.right));
/**
 * @template L,R,X
 * @param {Array<Pair<L,R>>} arr
 * @param {function(L, R):X} f
 * @return {Array<X>}
 */ const map = (arr, f)=>arr.map((p)=>f(p.left, p.right));
var pair = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    Pair: Pair,
    create: create,
    createReversed: createReversed,
    forEach: forEach,
    map: map
});
exports.Pair = Pair;
exports.create = create;
exports.createReversed = createReversed;
exports.forEach = forEach;
exports.map = map;
exports.pair = pair; //# sourceMappingURL=pair-ab022bc3.cjs.map

},{}],"e2LPf":[function(require,module,exports) {
"use strict";
var pair = require("./pair-ab022bc3.cjs");
var map = require("./map-28a001c9.cjs");
/* eslint-env browser */ /* istanbul ignore next */ /**
 * @type {Document}
 */ const doc = /** @type {Document} */ typeof document !== "undefined" ? document : {};
/**
 * @param {string} name
 * @return {HTMLElement}
 */ /* istanbul ignore next */ const createElement = (name)=>doc.createElement(name);
/**
 * @return {DocumentFragment}
 */ /* istanbul ignore next */ const createDocumentFragment = ()=>doc.createDocumentFragment();
/**
 * @param {string} text
 * @return {Text}
 */ /* istanbul ignore next */ const createTextNode = (text)=>doc.createTextNode(text);
/* istanbul ignore next */ const domParser = /** @type {DOMParser} */ typeof DOMParser !== "undefined" ? new DOMParser() : null;
/**
 * @param {HTMLElement} el
 * @param {string} name
 * @param {Object} opts
 */ /* istanbul ignore next */ const emitCustomEvent = (el, name, opts)=>el.dispatchEvent(new CustomEvent(name, opts));
/**
 * @param {Element} el
 * @param {Array<pair.Pair<string,string|boolean>>} attrs Array of key-value pairs
 * @return {Element}
 */ /* istanbul ignore next */ const setAttributes = (el, attrs)=>{
    pair.forEach(attrs, (key, value)=>{
        if (value === false) el.removeAttribute(key);
        else if (value === true) el.setAttribute(key, "");
        else // @ts-ignore
        el.setAttribute(key, value);
    });
    return el;
};
/**
 * @param {Element} el
 * @param {Map<string, string>} attrs Array of key-value pairs
 * @return {Element}
 */ /* istanbul ignore next */ const setAttributesMap = (el, attrs)=>{
    attrs.forEach((value, key)=>{
        el.setAttribute(key, value);
    });
    return el;
};
/**
 * @param {Array<Node>|HTMLCollection} children
 * @return {DocumentFragment}
 */ /* istanbul ignore next */ const fragment = (children)=>{
    const fragment = createDocumentFragment();
    for(let i = 0; i < children.length; i++)appendChild(fragment, children[i]);
    return fragment;
};
/**
 * @param {Element} parent
 * @param {Array<Node>} nodes
 * @return {Element}
 */ /* istanbul ignore next */ const append = (parent, nodes)=>{
    appendChild(parent, fragment(nodes));
    return parent;
};
/**
 * @param {HTMLElement} el
 */ /* istanbul ignore next */ const remove = (el)=>el.remove();
/**
 * @param {EventTarget} el
 * @param {string} name
 * @param {EventListener} f
 */ /* istanbul ignore next */ const addEventListener = (el, name, f)=>el.addEventListener(name, f);
/**
 * @param {EventTarget} el
 * @param {string} name
 * @param {EventListener} f
 */ /* istanbul ignore next */ const removeEventListener = (el, name, f)=>el.removeEventListener(name, f);
/**
 * @param {Node} node
 * @param {Array<pair.Pair<string,EventListener>>} listeners
 * @return {Node}
 */ /* istanbul ignore next */ const addEventListeners = (node, listeners)=>{
    pair.forEach(listeners, (name, f)=>addEventListener(node, name, f));
    return node;
};
/**
 * @param {Node} node
 * @param {Array<pair.Pair<string,EventListener>>} listeners
 * @return {Node}
 */ /* istanbul ignore next */ const removeEventListeners = (node, listeners)=>{
    pair.forEach(listeners, (name, f)=>removeEventListener(node, name, f));
    return node;
};
/**
 * @param {string} name
 * @param {Array<pair.Pair<string,string>|pair.Pair<string,boolean>>} attrs Array of key-value pairs
 * @param {Array<Node>} children
 * @return {Element}
 */ /* istanbul ignore next */ const element = (name, attrs = [], children = [])=>append(setAttributes(createElement(name), attrs), children);
/**
 * @param {number} width
 * @param {number} height
 */ /* istanbul ignore next */ const canvas = (width, height)=>{
    const c = /** @type {HTMLCanvasElement} */ createElement("canvas");
    c.height = height;
    c.width = width;
    return c;
};
/**
 * @param {string} t
 * @return {Text}
 */ /* istanbul ignore next */ const text = createTextNode;
/**
 * @param {pair.Pair<string,string>} pair
 */ /* istanbul ignore next */ const pairToStyleString = (pair)=>`${pair.left}:${pair.right};`;
/**
 * @param {Array<pair.Pair<string,string>>} pairs
 * @return {string}
 */ /* istanbul ignore next */ const pairsToStyleString = (pairs)=>pairs.map(pairToStyleString).join("");
/**
 * @param {Map<string,string>} m
 * @return {string}
 */ /* istanbul ignore next */ const mapToStyleString = (m)=>map.map(m, (value, key)=>`${key}:${value};`).join("");
/**
 * @todo should always query on a dom element
 *
 * @param {HTMLElement|ShadowRoot} el
 * @param {string} query
 * @return {HTMLElement | null}
 */ /* istanbul ignore next */ const querySelector = (el, query)=>el.querySelector(query);
/**
 * @param {HTMLElement|ShadowRoot} el
 * @param {string} query
 * @return {NodeListOf<HTMLElement>}
 */ /* istanbul ignore next */ const querySelectorAll = (el, query)=>el.querySelectorAll(query);
/**
 * @param {string} id
 * @return {HTMLElement}
 */ /* istanbul ignore next */ const getElementById = (id)=>/** @type {HTMLElement} */ doc.getElementById(id);
/**
 * @param {string} html
 * @return {HTMLElement}
 */ /* istanbul ignore next */ const _parse = (html)=>domParser.parseFromString(`<html><body>${html}</body></html>`, "text/html").body;
/**
 * @param {string} html
 * @return {DocumentFragment}
 */ /* istanbul ignore next */ const parseFragment = (html)=>fragment(/** @type {any} */ _parse(html).childNodes);
/**
 * @param {string} html
 * @return {HTMLElement}
 */ /* istanbul ignore next */ const parseElement = (html)=>/** @type HTMLElement */ _parse(html).firstElementChild;
/**
 * @param {HTMLElement} oldEl
 * @param {HTMLElement|DocumentFragment} newEl
 */ /* istanbul ignore next */ const replaceWith = (oldEl, newEl)=>oldEl.replaceWith(newEl);
/**
 * @param {HTMLElement} parent
 * @param {HTMLElement} el
 * @param {Node|null} ref
 * @return {HTMLElement}
 */ /* istanbul ignore next */ const insertBefore = (parent, el, ref)=>parent.insertBefore(el, ref);
/**
 * @param {Node} parent
 * @param {Node} child
 * @return {Node}
 */ /* istanbul ignore next */ const appendChild = (parent, child)=>parent.appendChild(child);
const ELEMENT_NODE = doc.ELEMENT_NODE;
const TEXT_NODE = doc.TEXT_NODE;
const CDATA_SECTION_NODE = doc.CDATA_SECTION_NODE;
const COMMENT_NODE = doc.COMMENT_NODE;
const DOCUMENT_NODE = doc.DOCUMENT_NODE;
const DOCUMENT_TYPE_NODE = doc.DOCUMENT_TYPE_NODE;
const DOCUMENT_FRAGMENT_NODE = doc.DOCUMENT_FRAGMENT_NODE;
/**
 * @param {any} node
 * @param {number} type
 */ const checkNodeType = (node, type)=>node.nodeType === type;
/**
 * @param {Node} parent
 * @param {HTMLElement} child
 */ const isParentOf = (parent, child)=>{
    let p = child.parentNode;
    while(p && p !== parent)p = p.parentNode;
    return p === parent;
};
var dom = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    doc: doc,
    createElement: createElement,
    createDocumentFragment: createDocumentFragment,
    createTextNode: createTextNode,
    domParser: domParser,
    emitCustomEvent: emitCustomEvent,
    setAttributes: setAttributes,
    setAttributesMap: setAttributesMap,
    fragment: fragment,
    append: append,
    remove: remove,
    addEventListener: addEventListener,
    removeEventListener: removeEventListener,
    addEventListeners: addEventListeners,
    removeEventListeners: removeEventListeners,
    element: element,
    canvas: canvas,
    text: text,
    pairToStyleString: pairToStyleString,
    pairsToStyleString: pairsToStyleString,
    mapToStyleString: mapToStyleString,
    querySelector: querySelector,
    querySelectorAll: querySelectorAll,
    getElementById: getElementById,
    parseFragment: parseFragment,
    parseElement: parseElement,
    replaceWith: replaceWith,
    insertBefore: insertBefore,
    appendChild: appendChild,
    ELEMENT_NODE: ELEMENT_NODE,
    TEXT_NODE: TEXT_NODE,
    CDATA_SECTION_NODE: CDATA_SECTION_NODE,
    COMMENT_NODE: COMMENT_NODE,
    DOCUMENT_NODE: DOCUMENT_NODE,
    DOCUMENT_TYPE_NODE: DOCUMENT_TYPE_NODE,
    DOCUMENT_FRAGMENT_NODE: DOCUMENT_FRAGMENT_NODE,
    checkNodeType: checkNodeType,
    isParentOf: isParentOf
});
exports.CDATA_SECTION_NODE = CDATA_SECTION_NODE;
exports.COMMENT_NODE = COMMENT_NODE;
exports.DOCUMENT_FRAGMENT_NODE = DOCUMENT_FRAGMENT_NODE;
exports.DOCUMENT_NODE = DOCUMENT_NODE;
exports.DOCUMENT_TYPE_NODE = DOCUMENT_TYPE_NODE;
exports.ELEMENT_NODE = ELEMENT_NODE;
exports.TEXT_NODE = TEXT_NODE;
exports.addEventListener = addEventListener;
exports.addEventListeners = addEventListeners;
exports.append = append;
exports.appendChild = appendChild;
exports.canvas = canvas;
exports.checkNodeType = checkNodeType;
exports.createDocumentFragment = createDocumentFragment;
exports.createElement = createElement;
exports.createTextNode = createTextNode;
exports.doc = doc;
exports.dom = dom;
exports.domParser = domParser;
exports.element = element;
exports.emitCustomEvent = emitCustomEvent;
exports.fragment = fragment;
exports.getElementById = getElementById;
exports.insertBefore = insertBefore;
exports.isParentOf = isParentOf;
exports.mapToStyleString = mapToStyleString;
exports.pairToStyleString = pairToStyleString;
exports.pairsToStyleString = pairsToStyleString;
exports.parseElement = parseElement;
exports.parseFragment = parseFragment;
exports.querySelector = querySelector;
exports.querySelectorAll = querySelectorAll;
exports.remove = remove;
exports.removeEventListener = removeEventListener;
exports.removeEventListeners = removeEventListeners;
exports.replaceWith = replaceWith;
exports.setAttributes = setAttributes;
exports.setAttributesMap = setAttributesMap;
exports.text = text; //# sourceMappingURL=dom-58958c04.cjs.map

},{"./pair-ab022bc3.cjs":"1DBV6","./map-28a001c9.cjs":"lrupf"}],"9UeZa":[function(require,module,exports) {
"use strict";
/**
 * JSON utility functions.
 *
 * @module json
 */ /**
 * Transform JavaScript object to JSON.
 *
 * @param {any} object
 * @return {string}
 */ const stringify = JSON.stringify;
/**
 * Parse JSON object.
 *
 * @param {string} json
 * @return {any}
 */ const parse = JSON.parse;
var json = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    stringify: stringify,
    parse: parse
});
exports.json = json;
exports.parse = parse;
exports.stringify = stringify; //# sourceMappingURL=json-092190a1.cjs.map

},{}],"7wBcy":[function(require,module,exports) {
"use strict";
/* global requestIdleCallback, requestAnimationFrame, cancelIdleCallback, cancelAnimationFrame */ /**
 * Utility module to work with EcmaScript's event loop.
 *
 * @module eventloop
 */ /**
 * @type {Array<function>}
 */ let queue = [];
const _runQueue = ()=>{
    for(let i = 0; i < queue.length; i++)queue[i]();
    queue = [];
};
/**
 * @param {function():void} f
 */ const enqueue = (f)=>{
    queue.push(f);
    if (queue.length === 1) setTimeout(_runQueue, 0);
};
/**
 * @typedef {Object} TimeoutObject
 * @property {function} TimeoutObject.destroy
 */ /**
 * @param {function(number):void} clearFunction
 */ const createTimeoutClass = (clearFunction)=>class TT {
        /**
   * @param {number} timeoutId
   */ constructor(timeoutId){
            this._ = timeoutId;
        }
        destroy() {
            clearFunction(this._);
        }
    };
const Timeout = createTimeoutClass(clearTimeout);
/**
 * @param {number} timeout
 * @param {function} callback
 * @return {TimeoutObject}
 */ const timeout = (timeout, callback)=>new Timeout(setTimeout(callback, timeout));
const Interval = createTimeoutClass(clearInterval);
/**
 * @param {number} timeout
 * @param {function} callback
 * @return {TimeoutObject}
 */ const interval = (timeout, callback)=>new Interval(setInterval(callback, timeout));
/* istanbul ignore next */ const Animation = createTimeoutClass((arg)=>typeof requestAnimationFrame !== "undefined" && cancelAnimationFrame(arg));
/* istanbul ignore next */ /**
 * @param {function(number):void} cb
 * @return {TimeoutObject}
 */ const animationFrame = (cb)=>typeof requestAnimationFrame === "undefined" ? timeout(0, cb) : new Animation(requestAnimationFrame(cb));
/* istanbul ignore next */ // @ts-ignore
const Idle = createTimeoutClass((arg)=>typeof cancelIdleCallback !== "undefined" && cancelIdleCallback(arg));
/* istanbul ignore next */ /**
 * Note: this is experimental and is probably only useful in browsers.
 *
 * @param {function} cb
 * @return {TimeoutObject}
 */ // @ts-ignore
const idleCallback = (cb)=>typeof requestIdleCallback !== "undefined" ? new Idle(requestIdleCallback(cb)) : timeout(1000, cb);
/**
 * @param {number} timeout Timeout of the debounce action
 * @return {function(function():void):void}
 */ const createDebouncer = (timeout)=>{
    let timer = -1;
    return (f)=>{
        clearTimeout(timer);
        if (f) timer = /** @type {any} */ setTimeout(f, timeout);
    };
};
var eventloop = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    enqueue: enqueue,
    timeout: timeout,
    interval: interval,
    Animation: Animation,
    animationFrame: animationFrame,
    idleCallback: idleCallback,
    createDebouncer: createDebouncer
});
exports.Animation = Animation;
exports.animationFrame = animationFrame;
exports.createDebouncer = createDebouncer;
exports.enqueue = enqueue;
exports.eventloop = eventloop;
exports.idleCallback = idleCallback;
exports.interval = interval;
exports.timeout = timeout; //# sourceMappingURL=eventloop-c60b5658.cjs.map

},{}],"4SMel":[function(require,module,exports) {
"use strict";
var environment = require("./environment-60b83194.cjs");
var symbol = require("./symbol-c5caa724.cjs");
var pair = require("./pair-ab022bc3.cjs");
var dom = require("./dom-58958c04.cjs");
var json = require("./json-092190a1.cjs");
var map = require("./map-28a001c9.cjs");
var eventloop = require("./eventloop-c60b5658.cjs");
var math = require("./math-08e068f9.cjs");
var time = require("./time-e00067da.cjs");
var _function = require("./function-e4045b1d.cjs");
/**
 * Isomorphic logging module with support for colors!
 *
 * @module logging
 */ const BOLD = symbol.create();
const UNBOLD = symbol.create();
const BLUE = symbol.create();
const GREY = symbol.create();
const GREEN = symbol.create();
const RED = symbol.create();
const PURPLE = symbol.create();
const ORANGE = symbol.create();
const UNCOLOR = symbol.create();
/**
 * @type {Object<Symbol,pair.Pair<string,string>>}
 */ const _browserStyleMap = {
    [BOLD]: pair.create("font-weight", "bold"),
    [UNBOLD]: pair.create("font-weight", "normal"),
    [BLUE]: pair.create("color", "blue"),
    [GREEN]: pair.create("color", "green"),
    [GREY]: pair.create("color", "grey"),
    [RED]: pair.create("color", "red"),
    [PURPLE]: pair.create("color", "purple"),
    [ORANGE]: pair.create("color", "orange"),
    [UNCOLOR]: pair.create("color", "black")
};
const _nodeStyleMap = {
    [BOLD]: "\x1b[1m",
    [UNBOLD]: "\x1b[2m",
    [BLUE]: "\x1b[34m",
    [GREEN]: "\x1b[32m",
    [GREY]: "\x1b[37m",
    [RED]: "\x1b[31m",
    [PURPLE]: "\x1b[35m",
    [ORANGE]: "\x1b[38;5;208m",
    [UNCOLOR]: "\x1b[0m"
};
/* istanbul ignore next */ /**
 * @param {Array<string|Symbol|Object|number>} args
 * @return {Array<string|object|number>}
 */ const computeBrowserLoggingArgs = (args)=>{
    const strBuilder = [];
    const styles = [];
    const currentStyle = map.create();
    /**
   * @type {Array<string|Object|number>}
   */ let logArgs = [];
    // try with formatting until we find something unsupported
    let i = 0;
    for(; i < args.length; i++){
        const arg = args[i];
        // @ts-ignore
        const style = _browserStyleMap[arg];
        if (style !== undefined) currentStyle.set(style.left, style.right);
        else {
            if (arg.constructor === String || arg.constructor === Number) {
                const style1 = dom.mapToStyleString(currentStyle);
                if (i > 0 || style1.length > 0) {
                    strBuilder.push("%c" + arg);
                    styles.push(style1);
                } else strBuilder.push(arg);
            } else break;
        }
    }
    if (i > 0) {
        // create logArgs with what we have so far
        logArgs = styles;
        logArgs.unshift(strBuilder.join(""));
    }
    // append the rest
    for(; i < args.length; i++){
        const arg1 = args[i];
        if (!(arg1 instanceof Symbol)) logArgs.push(arg1);
    }
    return logArgs;
};
/**
 * @param {Array<string|Symbol|Object|number>} args
 * @return {Array<string|object|number>}
 */ const computeNodeLoggingArgs = (args)=>{
    const strBuilder = [];
    const logArgs = [];
    // try with formatting until we find something unsupported
    let i = 0;
    for(; i < args.length; i++){
        const arg = args[i];
        // @ts-ignore
        const style = _nodeStyleMap[arg];
        if (style !== undefined) strBuilder.push(style);
        else {
            if (arg.constructor === String || arg.constructor === Number) strBuilder.push(arg);
            else break;
        }
    }
    if (i > 0) {
        // create logArgs with what we have so far
        strBuilder.push("\x1b[0m");
        logArgs.push(strBuilder.join(""));
    }
    // append the rest
    for(; i < args.length; i++){
        const arg1 = args[i];
        /* istanbul ignore else */ if (!(arg1 instanceof Symbol)) logArgs.push(arg1);
    }
    return logArgs;
};
/* istanbul ignore next */ const computeLoggingArgs = environment.isNode ? computeNodeLoggingArgs : computeBrowserLoggingArgs;
/**
 * @param {Array<string|Symbol|Object|number>} args
 */ const print = (...args)=>{
    console.log(...computeLoggingArgs(args));
    /* istanbul ignore next */ vconsoles.forEach((vc)=>vc.print(args));
};
/* istanbul ignore next */ /**
 * @param {Array<string|Symbol|Object|number>} args
 */ const warn = (...args)=>{
    console.warn(...computeLoggingArgs(args));
    args.unshift(ORANGE);
    vconsoles.forEach((vc)=>vc.print(args));
};
/* istanbul ignore next */ /**
 * @param {Error} err
 */ const printError = (err)=>{
    console.error(err);
    vconsoles.forEach((vc)=>vc.printError(err));
};
/* istanbul ignore next */ /**
 * @param {string} url image location
 * @param {number} height height of the image in pixel
 */ const printImg = (url, height)=>{
    if (environment.isBrowser) console.log("%c                      ", `font-size: ${height}px; background-size: contain; background-repeat: no-repeat; background-image: url(${url})`);
    vconsoles.forEach((vc)=>vc.printImg(url, height));
};
/* istanbul ignore next */ /**
 * @param {string} base64
 * @param {number} height
 */ const printImgBase64 = (base64, height)=>printImg(`data:image/gif;base64,${base64}`, height);
/**
 * @param {Array<string|Symbol|Object|number>} args
 */ const group = (...args)=>{
    console.group(...computeLoggingArgs(args));
    /* istanbul ignore next */ vconsoles.forEach((vc)=>vc.group(args));
};
/**
 * @param {Array<string|Symbol|Object|number>} args
 */ const groupCollapsed = (...args)=>{
    console.groupCollapsed(...computeLoggingArgs(args));
    /* istanbul ignore next */ vconsoles.forEach((vc)=>vc.groupCollapsed(args));
};
const groupEnd = ()=>{
    console.groupEnd();
    /* istanbul ignore next */ vconsoles.forEach((vc)=>vc.groupEnd());
};
/* istanbul ignore next */ /**
 * @param {function():Node} createNode
 */ const printDom = (createNode)=>vconsoles.forEach((vc)=>vc.printDom(createNode()));
/* istanbul ignore next */ /**
 * @param {HTMLCanvasElement} canvas
 * @param {number} height
 */ const printCanvas = (canvas, height)=>printImg(canvas.toDataURL(), height);
const vconsoles = new Set();
/* istanbul ignore next */ /**
 * @param {Array<string|Symbol|Object|number>} args
 * @return {Array<Element>}
 */ const _computeLineSpans = (args)=>{
    const spans = [];
    const currentStyle = new Map();
    // try with formatting until we find something unsupported
    let i = 0;
    for(; i < args.length; i++){
        const arg = args[i];
        // @ts-ignore
        const style = _browserStyleMap[arg];
        if (style !== undefined) currentStyle.set(style.left, style.right);
        else {
            if (arg.constructor === String || arg.constructor === Number) {
                // @ts-ignore
                const span = dom.element("span", [
                    pair.create("style", dom.mapToStyleString(currentStyle))
                ], [
                    dom.text(arg)
                ]);
                if (span.innerHTML === "") span.innerHTML = "&nbsp;";
                spans.push(span);
            } else break;
        }
    }
    // append the rest
    for(; i < args.length; i++){
        let content = args[i];
        if (!(content instanceof Symbol)) {
            if (content.constructor !== String && content.constructor !== Number) content = " " + json.stringify(content) + " ";
            spans.push(dom.element("span", [], [
                dom.text(/** @type {string} */ content)
            ]));
        }
    }
    return spans;
};
const lineStyle = "font-family:monospace;border-bottom:1px solid #e2e2e2;padding:2px;";
/* istanbul ignore next */ class VConsole {
    /**
   * @param {Element} dom
   */ constructor(dom){
        this.dom = dom;
        /**
     * @type {Element}
     */ this.ccontainer = this.dom;
        this.depth = 0;
        vconsoles.add(this);
    }
    /**
   * @param {Array<string|Symbol|Object|number>} args
   * @param {boolean} collapsed
   */ group(args, collapsed = false) {
        eventloop.enqueue(()=>{
            const triangleDown = dom.element("span", [
                pair.create("hidden", collapsed),
                pair.create("style", "color:grey;font-size:120%;")
            ], [
                dom.text("▼")
            ]);
            const triangleRight = dom.element("span", [
                pair.create("hidden", !collapsed),
                pair.create("style", "color:grey;font-size:125%;")
            ], [
                dom.text("▶")
            ]);
            const content = dom.element("div", [
                pair.create("style", `${lineStyle};padding-left:${this.depth * 10}px`)
            ], [
                triangleDown,
                triangleRight,
                dom.text(" ")
            ].concat(_computeLineSpans(args)));
            const nextContainer = dom.element("div", [
                pair.create("hidden", collapsed)
            ]);
            const nextLine = dom.element("div", [], [
                content,
                nextContainer
            ]);
            dom.append(this.ccontainer, [
                nextLine
            ]);
            this.ccontainer = nextContainer;
            this.depth++;
            // when header is clicked, collapse/uncollapse container
            dom.addEventListener(content, "click", (event)=>{
                nextContainer.toggleAttribute("hidden");
                triangleDown.toggleAttribute("hidden");
                triangleRight.toggleAttribute("hidden");
            });
        });
    }
    /**
   * @param {Array<string|Symbol|Object|number>} args
   */ groupCollapsed(args) {
        this.group(args, true);
    }
    groupEnd() {
        eventloop.enqueue(()=>{
            if (this.depth > 0) {
                this.depth--;
                // @ts-ignore
                this.ccontainer = this.ccontainer.parentElement.parentElement;
            }
        });
    }
    /**
   * @param {Array<string|Symbol|Object|number>} args
   */ print(args) {
        eventloop.enqueue(()=>{
            dom.append(this.ccontainer, [
                dom.element("div", [
                    pair.create("style", `${lineStyle};padding-left:${this.depth * 10}px`)
                ], _computeLineSpans(args))
            ]);
        });
    }
    /**
   * @param {Error} err
   */ printError(err) {
        this.print([
            RED,
            BOLD,
            err.toString()
        ]);
    }
    /**
   * @param {string} url
   * @param {number} height
   */ printImg(url, height) {
        eventloop.enqueue(()=>{
            dom.append(this.ccontainer, [
                dom.element("img", [
                    pair.create("src", url),
                    pair.create("height", `${math.round(height * 1.5)}px`)
                ])
            ]);
        });
    }
    /**
   * @param {Node} node
   */ printDom(node) {
        eventloop.enqueue(()=>{
            dom.append(this.ccontainer, [
                node
            ]);
        });
    }
    destroy() {
        eventloop.enqueue(()=>{
            vconsoles.delete(this);
        });
    }
}
/* istanbul ignore next */ /**
 * @param {Element} dom
 */ const createVConsole = (dom)=>new VConsole(dom);
const loggingColors = [
    GREEN,
    PURPLE,
    ORANGE,
    BLUE
];
let nextColor = 0;
let lastLoggingTime = time.getUnixTime();
/**
 * @param {string} moduleName
 * @return {function(...any):void}
 */ const createModuleLogger = (moduleName)=>{
    const color = loggingColors[nextColor];
    const debugRegexVar = environment.getVariable("log");
    const doLogging = debugRegexVar !== null && (debugRegexVar === "*" || debugRegexVar === "true" || new RegExp(debugRegexVar, "gi").test(moduleName));
    nextColor = (nextColor + 1) % loggingColors.length;
    moduleName += ": ";
    return !doLogging ? _function.nop : (...args)=>{
        const timeNow = time.getUnixTime();
        const timeDiff = timeNow - lastLoggingTime;
        lastLoggingTime = timeNow;
        print(color, moduleName, UNCOLOR, ...args.map((arg)=>typeof arg === "string" || typeof arg === "symbol" ? arg : JSON.stringify(arg)), color, " +" + timeDiff + "ms");
    };
};
var logging = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    BOLD: BOLD,
    UNBOLD: UNBOLD,
    BLUE: BLUE,
    GREY: GREY,
    GREEN: GREEN,
    RED: RED,
    PURPLE: PURPLE,
    ORANGE: ORANGE,
    UNCOLOR: UNCOLOR,
    print: print,
    warn: warn,
    printError: printError,
    printImg: printImg,
    printImgBase64: printImgBase64,
    group: group,
    groupCollapsed: groupCollapsed,
    groupEnd: groupEnd,
    printDom: printDom,
    printCanvas: printCanvas,
    vconsoles: vconsoles,
    VConsole: VConsole,
    createVConsole: createVConsole,
    createModuleLogger: createModuleLogger
});
exports.BLUE = BLUE;
exports.BOLD = BOLD;
exports.GREEN = GREEN;
exports.GREY = GREY;
exports.ORANGE = ORANGE;
exports.PURPLE = PURPLE;
exports.RED = RED;
exports.UNBOLD = UNBOLD;
exports.UNCOLOR = UNCOLOR;
exports.VConsole = VConsole;
exports.createModuleLogger = createModuleLogger;
exports.createVConsole = createVConsole;
exports.group = group;
exports.groupCollapsed = groupCollapsed;
exports.groupEnd = groupEnd;
exports.logging = logging;
exports.print = print;
exports.printCanvas = printCanvas;
exports.printDom = printDom;
exports.printError = printError;
exports.printImg = printImg;
exports.printImgBase64 = printImgBase64;
exports.vconsoles = vconsoles;
exports.warn = warn; //# sourceMappingURL=logging-0a4d8595.cjs.map

},{"./environment-60b83194.cjs":"byYnb","./symbol-c5caa724.cjs":"bBzPu","./pair-ab022bc3.cjs":"1DBV6","./dom-58958c04.cjs":"e2LPf","./json-092190a1.cjs":"9UeZa","./map-28a001c9.cjs":"lrupf","./eventloop-c60b5658.cjs":"7wBcy","./math-08e068f9.cjs":"lb1Mp","./time-e00067da.cjs":"1NaWj","./function-e4045b1d.cjs":"hU0i9"}],"lpHcg":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("./metric.cjs");
require("./math-08e068f9.cjs");
var time = require("./time-e00067da.cjs");
exports.getDate = time.getDate;
exports.getUnixTime = time.getUnixTime;
exports.humanizeDuration = time.humanizeDuration; //# sourceMappingURL=time.cjs.map

},{"./metric.cjs":"a5str","./math-08e068f9.cjs":"lb1Mp","./time-e00067da.cjs":"1NaWj"}],"lcvAP":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var iterator = require("./iterator-9fc627c1.cjs");
exports.createIterator = iterator.createIterator;
exports.iteratorFilter = iterator.iteratorFilter;
exports.iteratorMap = iterator.iteratorMap;
exports.mapIterator = iterator.mapIterator; //# sourceMappingURL=iterator.cjs.map

},{"./iterator-9fc627c1.cjs":"7C0Dj"}],"7C0Dj":[function(require,module,exports) {
"use strict";
/**
 * Utility module to create and manipulate Iterators.
 *
 * @module iterator
 */ /**
 * @template T,R
 * @param {Iterator<T>} iterator
 * @param {function(T):R} f
 * @return {IterableIterator<R>}
 */ const mapIterator = (iterator, f)=>({
        [Symbol.iterator] () {
            return this;
        },
        // @ts-ignore
        next () {
            const r = iterator.next();
            return {
                value: r.done ? undefined : f(r.value),
                done: r.done
            };
        }
    });
/**
 * @template T
 * @param {function():IteratorResult<T>} next
 * @return {IterableIterator<T>}
 */ const createIterator = (next)=>({
        /**
   * @return {IterableIterator<T>}
   */ [Symbol.iterator] () {
            return this;
        },
        // @ts-ignore
        next
    });
/**
 * @template T
 * @param {Iterator<T>} iterator
 * @param {function(T):boolean} filter
 */ const iteratorFilter = (iterator, filter)=>createIterator(()=>{
        let res;
        do res = iterator.next();
        while (!res.done && !filter(res.value));
        return res;
    });
/**
 * @template T,M
 * @param {Iterator<T>} iterator
 * @param {function(T):M} fmap
 */ const iteratorMap = (iterator, fmap)=>createIterator(()=>{
        const { done , value  } = iterator.next();
        return {
            done,
            value: done ? undefined : fmap(value)
        };
    });
var iterator = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    mapIterator: mapIterator,
    createIterator: createIterator,
    iteratorFilter: iteratorFilter,
    iteratorMap: iteratorMap
});
exports.createIterator = createIterator;
exports.iterator = iterator;
exports.iteratorFilter = iteratorFilter;
exports.iteratorMap = iteratorMap;
exports.mapIterator = mapIterator; //# sourceMappingURL=iterator-9fc627c1.cjs.map

},{}],"dixik":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var object = require("./object-dcdd6eed.cjs");
exports.assign = object.assign;
exports.create = object.create;
exports.equalFlat = object.equalFlat;
exports.every = object.every;
exports.forEach = object.forEach;
exports.hasProperty = object.hasProperty;
exports.keys = object.keys;
exports.length = object.length;
exports.map = object.map;
exports.some = object.some; //# sourceMappingURL=object.cjs.map

},{"./object-dcdd6eed.cjs":"a1rDy"}]},["jq1Hk","gKhOL"], "gKhOL", "parcelRequire264e")

