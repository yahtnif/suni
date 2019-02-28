import { EmptyObject } from '../../interfaces/common'

/**
 * Fork: [6563ea1](https://github.com/sindresorhus/map-obj/blob/master/index.js)
 */

// Customized for this use-case
const isObject = (x: any): boolean =>
  typeof x === 'object' &&
  x !== null &&
  !(x instanceof RegExp) &&
  !(x instanceof Error) &&
  !(x instanceof Date)

export default function mapObj(
  object: EmptyObject,
  fn: Function,
  options?: EmptyObject,
  seen?: EmptyObject
): EmptyObject {
  options = Object.assign(
    {
      deep: false,
      target: {}
    },
    options
  )

  seen = seen || new WeakMap()

  if (seen.has(object)) {
    return seen.get(object)
  }

  seen.set(object, options.target)

  const { target } = options
  delete options.target

  const mapArray = (array: any[]) =>
    array.map(x => (isObject(x) ? mapObj(x, fn, options, seen) : x))
  if (Array.isArray(object)) {
    return mapArray(object)
  }

  /// TODO: Use `Object.entries()` when targeting Node.js 8
  for (const key of Object.keys(object)) {
    const value = object[key]
    let [newKey, newValue] = fn(key, value, object)

    if (options.deep && isObject(newValue)) {
      newValue = Array.isArray(newValue)
        ? mapArray(newValue)
        : mapObj(newValue, fn, options, seen)
    }

    target[newKey] = newValue
  }

  return target
}
