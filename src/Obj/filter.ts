import { EmptyObject } from '../../interfaces/common'

/**
 * Fork: [a8325b1](https://github.com/sindresorhus/filter-obj/blob/master/index.js)
 */
export default function filter(
  obj: EmptyObject,
  predicate: string[] | Function
): object {
  const ret: EmptyObject = {}
  const keys = Object.keys(obj)
  const isArray = Array.isArray(predicate)

  for (const key of keys) {
    const val = obj[key]

    if (
      isArray
        ? (<string[]>predicate).indexOf(key) !== -1
        : (<Function>predicate)(key, val, obj)
    ) {
      ret[key] = val
    }
  }

  return ret
}
