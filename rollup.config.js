import clear from 'rollup-plugin-clear'
import filesize from 'rollup-plugin-filesize'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
import cleanup from 'rollup-plugin-cleanup'

const banner = `/*!
* suni v${pkg.version}
* (c) 2019-present ${pkg.author}
* Released under the ${pkg.license} License.
*/`

export default {
  input: 'src/index.ts',
  output: [
    { banner, file: pkg.main, format: 'cjs' },
    { banner, file: pkg.module, format: 'es' }
  ],
  plugins: [
    typescript(),
    clear({
      targets: ['dist']
    }),
    filesize(),
    cleanup()
  ]
}
