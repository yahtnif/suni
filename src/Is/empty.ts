/**
 * Fork: [bc757a0](https://github.com/ianstormtaylor/is-empty/blob/master/lib/index.js)
 * Merge: [#11](https://github.com/ianstormtaylor/is-empty/pull/11)
 */

const has = Object.prototype.hasOwnProperty
const getProperties = Object.getOwnPropertyNames
const toString = Object.prototype.toString

export default function(val?: any): boolean {
  // Null and Undefined...
  if (val == null) return true

  // Booleans...
  if ('boolean' === typeof val) return false

  // Numbers...
  if ('number' === typeof val) return false

  // Strings...
  if ('string' === typeof val) return val.length === 0

  // Functions...
  if ('function' === typeof val) return false

  // Arrays...
  if (Array.isArray(val)) return val.length === 0

  // Errors...
  if (val instanceof Error) return val.message === ''

  // Objects...
  if (val.toString == toString) {
    switch (val.toString()) {
      // Maps, Sets, Files and Errors...
      case '[object File]':
      case '[object Map]':
      case '[object Set]': {
        return val.size === 0
      }

      // Plain objects...
      case '[object Object]': {
        if (getProperties) return !getProperties(val).length

        for (var key in val) {
          if (has.call(val, key)) return false
        }

        return true
      }
    }
  }

  // Anything else...
  return false
}
