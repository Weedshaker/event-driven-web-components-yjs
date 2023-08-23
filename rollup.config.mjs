import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import nodeResolvePlugin from '@rollup/plugin-node-resolve'
import jsonPlugin from '@rollup/plugin-json'
import typescriptPlugin from '@rollup/plugin-typescript'
import terserPlugin from '@rollup/plugin-terser'

export default [{
  input: './src/y-indexeddb/src/y-indexeddb.js',
  external: id => /^(\.\/yjs\.js|yjs)/.test(id),
  output: {
    name: 'Y-INDEXEDDB',
    file: './src/es/dependencies/y-indexeddb.js',
    format: 'es',
    sourcemap: false
  },
  plugins: [
    replace({
      values: {
        yjs: './yjs.js'
      },
      preventAssignment: true
    }),
    nodeResolve()
  ]
},
{
  input: './src/y-webrtc/src/y-webrtc.js',
  external: id => /^(\.\/yjs\.js|yjs)/.test(id),
  output: {
    name: 'Y-WEBRTC',
    file: './src/es/dependencies/y-webrtc.js',
    format: 'es',
    sourcemap: false
  },
  plugins: [
    commonjs(),
    nodeResolve()
  ]
},
{
  input: './src/y-p2pt/src/es/y-p2pt.js',
  external: id => /^(\.\/yjs\.js|yjs)/.test(id),
  output: {
    name: 'Y-P2PT',
    file: './src/es/dependencies/y-p2pt.js',
    format: 'es',
    sourcemap: false
  },
  plugins: [
    replace({
      values: {
        yjs: './yjs.js'
      },
      preventAssignment: true
    }),
    commonjs(),
    nodeResolve()
  ],
  watch: {
    include: './src/y-p2pt/src/es/y-p2pt.js'
  }
},
{
  input: './src/y-websocket/src/y-websocket.js',
  external: id => /^(\.\/yjs\.js|yjs)/.test(id),
  output: {
    name: 'Y-WEBSOCKET',
    file: './src/es/dependencies/y-websocket.js',
    format: 'es',
    sourcemap: false
  },
  plugins: [
    nodeResolve()
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
},
{
  input: './src/fingerprint/src/index.ts',
  plugins: [nodeResolvePlugin(), jsonPlugin(), typescriptPlugin()],
  output: {
    exports: 'named',
    file: './src/es/dependencies/fp.min.js',
    format: 'esm',
    name: 'FingerprintJS',
    plugins: [
      terserPlugin({
        format: {
          comments: false,
        },
        safari10: true,
      }),
    ],
  }
}]
