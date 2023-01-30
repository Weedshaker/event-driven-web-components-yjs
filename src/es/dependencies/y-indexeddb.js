import * as Y from './yjs.js';

/**
 * Utility helpers to work with promises.
 *
 * @module promise
 */

/**
 * @template T
 * @callback PromiseResolve
 * @param {T|PromiseLike<T>} [result]
 */

/**
 * @template T
 * @param {function(PromiseResolve<T>,function(Error):void):any} f
 * @return {Promise<T>}
 */
const create$3 = f => /** @type {Promise<T>} */ (new Promise(f));

/**
 * Error helpers.
 *
 * @module error
 */

/* istanbul ignore next */
/**
 * @param {string} s
 * @return {Error}
 */
const create$2 = s => new Error(s);

/* eslint-env browser */

/* istanbul ignore next */
/**
 * IDB Request to Promise transformer
 *
 * @param {IDBRequest} request
 * @return {Promise<any>}
 */
const rtop = request => create$3((resolve, reject) => {
  /* istanbul ignore next */
  // @ts-ignore
  request.onerror = event => reject(new Error(event.target.error));
  /* istanbul ignore next */
  // @ts-ignore
  request.onblocked = () => location.reload();
  // @ts-ignore
  request.onsuccess = event => resolve(event.target.result);
});

/* istanbul ignore next */
/**
 * @param {string} name
 * @param {function(IDBDatabase):any} initDB Called when the database is first created
 * @return {Promise<IDBDatabase>}
 */
const openDB = (name, initDB) => create$3((resolve, reject) => {
  const request = indexedDB.open(name);
  /**
   * @param {any} event
   */
  request.onupgradeneeded = event => initDB(event.target.result);
  /* istanbul ignore next */
  /**
   * @param {any} event
   */
  request.onerror = event => reject(create$2(event.target.error));
  /* istanbul ignore next */
  request.onblocked = () => location.reload();
  /**
   * @param {any} event
   */
  request.onsuccess = event => {
    /**
     * @type {IDBDatabase}
     */
    const db = event.target.result;
    /* istanbul ignore next */
    db.onversionchange = () => { db.close(); };
    /* istanbul ignore if */
    if (typeof addEventListener !== 'undefined') {
      addEventListener('unload', () => db.close());
    }
    resolve(db);
  };
});

/* istanbul ignore next */
/**
 * @param {string} name
 */
const deleteDB = name => rtop(indexedDB.deleteDatabase(name));

/* istanbul ignore next */
/**
 * @param {IDBDatabase} db
 * @param {Array<Array<string>|Array<string|IDBObjectStoreParameters|undefined>>} definitions
 */
const createStores = (db, definitions) => definitions.forEach(d =>
  // @ts-ignore
  db.createObjectStore.apply(db, d)
);

/**
 * @param {IDBDatabase} db
 * @param {Array<string>} stores
 * @param {"readwrite"|"readonly"} [access]
 * @return {Array<IDBObjectStore>}
 */
const transact = (db, stores, access = 'readwrite') => {
  const transaction = db.transaction(stores, access);
  return stores.map(store => getStore(transaction, store))
};

/* istanbul ignore next */
/**
 * @param {IDBObjectStore} store
 * @param {IDBKeyRange} [range]
 * @return {Promise<number>}
 */
const count = (store, range) =>
  rtop(store.count(range));

/* istanbul ignore next */
/**
 * @param {IDBObjectStore} store
 * @param {String | number | ArrayBuffer | Date | Array<any> } key
 * @return {Promise<String | number | ArrayBuffer | Date | Array<any>>}
 */
const get = (store, key) =>
  rtop(store.get(key));

/* istanbul ignore next */
/**
 * @param {IDBObjectStore} store
 * @param {String | number | ArrayBuffer | Date | IDBKeyRange | Array<any> } key
 */
const del = (store, key) =>
  rtop(store.delete(key));

/* istanbul ignore next */
/**
 * @param {IDBObjectStore} store
 * @param {String | number | ArrayBuffer | Date | boolean} item
 * @param {String | number | ArrayBuffer | Date | Array<any>} [key]
 */
const put = (store, item, key) =>
  rtop(store.put(item, key));

/* istanbul ignore next */
/**
 * @param {IDBObjectStore} store
 * @param {String | number | ArrayBuffer | Date}  item
 * @return {Promise<number>} Returns the generated key
 */
const addAutoKey = (store, item) =>
  rtop(store.add(item));

/* istanbul ignore next */
/**
 * @param {IDBObjectStore} store
 * @param {IDBKeyRange} [range]
 * @return {Promise<Array<any>>}
 */
const getAll = (store, range) =>
  rtop(store.getAll(range));

/**
 * @param {IDBObjectStore} store
 * @param {IDBKeyRange|null} query
 * @param {'next'|'prev'|'nextunique'|'prevunique'} direction
 * @return {Promise<any>}
 */
const queryFirst = (store, query, direction) => {
  /**
   * @type {any}
   */
  let first = null;
  return iterateKeys(store, query, key => {
    first = key;
    return false
  }, direction).then(() => first)
};

/**
 * @param {IDBObjectStore} store
 * @param {IDBKeyRange?} [range]
 * @return {Promise<any>}
 */
const getLastKey = (store, range = null) => queryFirst(store, range, 'prev');

/* istanbul ignore next */
/**
 * @param {any} request
 * @param {function(IDBCursorWithValue):void|boolean} f
 * @return {Promise<void>}
 */
const iterateOnRequest = (request, f) => create$3((resolve, reject) => {
  /* istanbul ignore next */
  request.onerror = reject;
  /**
   * @param {any} event
   */
  request.onsuccess = event => {
    const cursor = event.target.result;
    if (cursor === null || f(cursor) === false) {
      return resolve()
    }
    cursor.continue();
  };
});

/* istanbul ignore next */
/**
 * Iterate on the keys (no values)
 *
 * @param {IDBObjectStore} store
 * @param {IDBKeyRange|null} keyrange
 * @param {function(any):void|boolean} f callback that receives the key
 * @param {'next'|'prev'|'nextunique'|'prevunique'} direction
 */
const iterateKeys = (store, keyrange, f, direction = 'next') =>
  iterateOnRequest(store.openKeyCursor(keyrange, direction), cursor => f(cursor.key));

/* istanbul ignore next */
/**
 * Open store from transaction
 * @param {IDBTransaction} t
 * @param {String} store
 * @returns {IDBObjectStore}
 */
const getStore = (t, store) => t.objectStore(store);

/* istanbul ignore next */
/**
 * @param {any} upper
 * @param {boolean} upperOpen
 */
const createIDBKeyRangeUpperBound = (upper, upperOpen) => IDBKeyRange.upperBound(upper, upperOpen);

/* istanbul ignore next */
/**
 * @param {any} lower
 * @param {boolean} lowerOpen
 */
const createIDBKeyRangeLowerBound = (lower, lowerOpen) => IDBKeyRange.lowerBound(lower, lowerOpen);

/**
 * Utility module to work with key-value stores.
 *
 * @module map
 */

/**
 * Creates a new Map instance.
 *
 * @function
 * @return {Map<any, any>}
 *
 * @function
 */
const create$1 = () => new Map();

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
 */
const setIfUndefined = (map, key, createT) => {
  let set = map.get(key);
  if (set === undefined) {
    map.set(key, set = createT());
  }
  return set
};

/**
 * Utility module to work with sets.
 *
 * @module set
 */

const create = () => new Set();

/**
 * Utility module to work with Arrays.
 *
 * @module array
 */

/**
 * Transforms something array-like to an actual Array.
 *
 * @function
 * @template T
 * @param {ArrayLike<T>|Iterable<T>} arraylike
 * @return {T}
 */
const from = Array.from;

/**
 * Observable class prototype.
 *
 * @module observable
 */

/**
 * Handles named events.
 *
 * @template N
 */
class Observable {
  constructor () {
    /**
     * Some desc.
     * @type {Map<N, any>}
     */
    this._observers = create$1();
  }

  /**
   * @param {N} name
   * @param {function} f
   */
  on (name, f) {
    setIfUndefined(this._observers, name, create).add(f);
  }

  /**
   * @param {N} name
   * @param {function} f
   */
  once (name, f) {
    /**
     * @param  {...any} args
     */
    const _f = (...args) => {
      this.off(name, _f);
      f(...args);
    };
    this.on(name, _f);
  }

  /**
   * @param {N} name
   * @param {function} f
   */
  off (name, f) {
    const observers = this._observers.get(name);
    if (observers !== undefined) {
      observers.delete(f);
      if (observers.size === 0) {
        this._observers.delete(name);
      }
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
   */
  emit (name, args) {
    // copy all listeners to an array first to make sure that no event is emitted to listeners that are subscribed while the event handler is called.
    return from((this._observers.get(name) || create$1()).values()).forEach(f => f(...args))
  }

  destroy () {
    this._observers = create$1();
  }
}

const customStoreName = 'custom';
const updatesStoreName = 'updates';

const PREFERRED_TRIM_SIZE = 500;

/**
 * @param {IndexeddbPersistence} idbPersistence
 * @param {function(IDBObjectStore):void} [beforeApplyUpdatesCallback]
 */
const fetchUpdates = (idbPersistence, beforeApplyUpdatesCallback = () => {}) => {
  const [updatesStore] = transact(/** @type {IDBDatabase} */ (idbPersistence.db), [updatesStoreName]); // , 'readonly')
  return getAll(updatesStore, createIDBKeyRangeLowerBound(idbPersistence._dbref, false)).then(updates => {
    beforeApplyUpdatesCallback(updatesStore);
    Y.transact(idbPersistence.doc, () => {
      updates.forEach(val => Y.applyUpdate(idbPersistence.doc, val));
    }, idbPersistence, false);
  })
    .then(() => getLastKey(updatesStore).then(lastKey => { idbPersistence._dbref = lastKey + 1; }))
    .then(() => count(updatesStore).then(cnt => { idbPersistence._dbsize = cnt; }))
    .then(() => updatesStore)
};

/**
 * @param {IndexeddbPersistence} idbPersistence
 * @param {boolean} forceStore
 */
const storeState = (idbPersistence, forceStore = true) =>
  fetchUpdates(idbPersistence)
    .then(updatesStore => {
      if (forceStore || idbPersistence._dbsize >= PREFERRED_TRIM_SIZE) {
        addAutoKey(updatesStore, Y.encodeStateAsUpdate(idbPersistence.doc))
          .then(() => del(updatesStore, createIDBKeyRangeUpperBound(idbPersistence._dbref, true)))
          .then(() => count(updatesStore).then(cnt => { idbPersistence._dbsize = cnt; }));
      }
    });

/**
 * @param {string} name
 */
const clearDocument = name => deleteDB(name);

/**
 * @extends Observable<string>
 */
class IndexeddbPersistence extends Observable {
  /**
   * @param {string} name
   * @param {Y.Doc} doc
   */
  constructor (name, doc) {
    super();
    this.doc = doc;
    this.name = name;
    this._dbref = 0;
    this._dbsize = 0;
    this._destroyed = false;
    /**
     * @type {IDBDatabase|null}
     */
    this.db = null;
    this.synced = false;
    this._db = openDB(name, db =>
      createStores(db, [
        ['updates', { autoIncrement: true }],
        ['custom']
      ])
    );
    /**
     * @type {Promise<IndexeddbPersistence>}
     */
    this.whenSynced = this._db.then(db => {
      this.db = db;
      /**
       * @param {IDBObjectStore} updatesStore
       */
      const beforeApplyUpdatesCallback = (updatesStore) => addAutoKey(updatesStore, Y.encodeStateAsUpdate(doc));
      return fetchUpdates(this, beforeApplyUpdatesCallback).then(() => {
        if (this._destroyed) return this
        this.emit('synced', [this]);
        this.synced = true;
        return this
      })
    });
    /**
     * Timeout in ms untill data is merged and persisted in idb.
     */
    this._storeTimeout = 1000;
    /**
     * @type {any}
     */
    this._storeTimeoutId = null;
    /**
     * @param {Uint8Array} update
     * @param {any} origin
     */
    this._storeUpdate = (update, origin) => {
      if (this.db && origin !== this) {
        const [updatesStore] = transact(/** @type {IDBDatabase} */ (this.db), [updatesStoreName]);
        addAutoKey(updatesStore, update);
        if (++this._dbsize >= PREFERRED_TRIM_SIZE) {
          // debounce store call
          if (this._storeTimeoutId !== null) {
            clearTimeout(this._storeTimeoutId);
          }
          this._storeTimeoutId = setTimeout(() => {
            storeState(this, false);
            this._storeTimeoutId = null;
          }, this._storeTimeout);
        }
      }
    };
    doc.on('update', this._storeUpdate);
    this.destroy = this.destroy.bind(this);
    doc.on('destroy', this.destroy);
  }

  destroy () {
    if (this._storeTimeoutId) {
      clearTimeout(this._storeTimeoutId);
    }
    this.doc.off('update', this._storeUpdate);
    this.doc.off('destroy', this.destroy);
    this._destroyed = true;
    return this._db.then(db => {
      db.close();
    })
  }

  /**
   * Destroys this instance and removes all data from indexeddb.
   *
   * @return {Promise<void>}
   */
  clearData () {
    return this.destroy().then(() => {
      deleteDB(this.name);
    })
  }

  /**
   * @param {String | number | ArrayBuffer | Date} key
   * @return {Promise<String | number | ArrayBuffer | Date | any>}
   */
  get (key) {
    return this._db.then(db => {
      const [custom] = transact(db, [customStoreName], 'readonly');
      return get(custom, key)
    })
  }

  /**
   * @param {String | number | ArrayBuffer | Date} key
   * @param {String | number | ArrayBuffer | Date} value
   * @return {Promise<String | number | ArrayBuffer | Date>}
   */
  set (key, value) {
    return this._db.then(db => {
      const [custom] = transact(db, [customStoreName]);
      return put(custom, value, key)
    })
  }

  /**
   * @param {String | number | ArrayBuffer | Date} key
   * @return {Promise<undefined>}
   */
  del (key) {
    return this._db.then(db => {
      const [custom] = transact(db, [customStoreName]);
      return del(custom, key)
    })
  }
}

export { IndexeddbPersistence, PREFERRED_TRIM_SIZE, clearDocument, fetchUpdates, storeState };
