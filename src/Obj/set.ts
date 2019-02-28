import { EmptyObject } from '../../interfaces/common'

/**
 * Fork: [2b9ec49](https://github.com/lukeed/dset/blob/master/src/index.js)
 */
export default function(obj: EmptyObject, keys: any, val: any): any {
  keys.split && (keys = keys.split('.'))

  const l = keys.length
  let t = obj
  let x: any

  for (let i = 0; i < l; ++i) {
    x = t[keys[i]]

    // only create property on object
    if (typeof t !== 'object') continue

    t = t[keys[i]] =
      i === l - 1
        ? val
        : x != null
        ? x
        : !!~keys[i + 1].indexOf('.') || !(+keys[i + 1] > -1)
        ? {}
        : []
  }
}
