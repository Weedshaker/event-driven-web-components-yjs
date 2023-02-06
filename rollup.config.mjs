import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'

export default [{
  input: './src/y-indexeddb/src/y-indexeddb.js',
  external: id => /^(yjs)/.test(id),
  output: {
    name: 'Y-INDEXEDDB',
    file: './src/es/dependencies/y-indexeddb.js',
    format: 'es',
    sourcemap: false
  },
  plugins: [
    nodeResolve(),
    replace({
      values: {
        'yjs': 'yjs.js'
      }
    })
  ]
},
{
  input: './src/y-webrtc/src/y-webrtc.js',
  external: id => /^(yjs)/.test(id),
  output: {
    name: 'Y-WEBRTC',
    file: './src/es/dependencies/y-webrtc.js',
    format: 'es',
    sourcemap: false
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    replace({
      values: {
        'yjs': 'yjs.js'
      }
    })
  ]
},
{
  input: './src/y-p2pt/src/es/y-p2pt.js',
  external: id => /^(yjs)/.test(id),
  output: {
    name: 'Y-P2PT',
    file: './src/es/dependencies/y-p2pt.js',
    format: 'es',
    sourcemap: false
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    replace({
      values: {
        'yjs': 'yjs.js'
      }
    })
  ]
},
{
  input: './src/y-websocket/src/y-websocket.js',
  external: id => /^(yjs)/.test(id),
  output: {
    name: 'Y-WEBSOCKET',
    file: './src/es/dependencies/y-websocket.js',
    format: 'es',
    sourcemap: false
  },
  plugins: [
    nodeResolve(),
    replace({
      values: {
        'yjs': 'yjs.js'
      }
    })
  ]
},
{
  input: './src/yjs/src/index.js',
  output: {
    name: 'Y',
    file: './src/es/dependencies/yjs.js',
    format: 'es',
    sourcemap: false
  },
  plugins: [
    nodeResolve()
  ]
}]
