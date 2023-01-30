import nodeResolve from '@rollup/plugin-node-resolve'

export default [{
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
