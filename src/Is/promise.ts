/**
 * Fork: [ed0eaa4](https://github.com/then/is-promise/blob/master/index.js)
 */
export default function(obj: any): boolean {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  )
}
