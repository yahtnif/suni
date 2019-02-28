import { EmptyObject } from '../../interfaces/common'

/**
 * Fork: [f9e4465](https://github.com/developit/dlv/blob/master/index.js)
 */
export default function(obj: EmptyObject, key: any, def: any): any {
  let p = 0
  key = key.split ? key.split('.') : key
  while (obj && p < key.length) obj = obj[key[p++]]
  return obj === undefined || p < key.length ? def : obj
}
