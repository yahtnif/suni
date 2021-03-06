/**
 *  Fork: [550a7d2](https://github.com/bevacqua/hash-sum/blob/master/hash-sum.js)
 */

function pad(hash: string, len: number): string {
  while (hash.length < len) {
    hash = '0' + hash
  }
  return hash
}

function fold(hash: number, text: string): number {
  if (text.length === 0) {
    return hash
  }

  for (let i = 0; i < text.length; i++) {
    const chr = text.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0
  }

  return hash < 0 ? hash * -2 : hash
}

function foldObject(hash: number, o: any, seen: any[]) {
  return Object.keys(o)
    .sort()
    .reduce(foldKey, hash)

  function foldKey(hash: number, key: string): number {
    return foldValue(hash, o[key], key, seen)
  }
}

function foldValue(
  input: number,
  value: any,
  key: string,
  seen: any[]
): number {
  let hash = fold(fold(fold(input, key), toString(value)), typeof value)

  if (value === null) {
    return fold(hash, 'null')
  }

  if (value === undefined) {
    return fold(hash, 'undefined')
  }

  if (typeof value === 'object') {
    if (seen.indexOf(value) !== -1) {
      return fold(hash, '[Circular]' + key)
    }
    seen.push(value)
    return foldObject(hash, value, seen)
  }

  return fold(hash, value.toString())
}

function toString(o: any) {
  return Object.prototype.toString.call(o)
}

export default function(o: any): string {
  return pad(foldValue(0, o, '', []).toString(16), 8)
}
