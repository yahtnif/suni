export function padLeft(str: string, num?: number, ch: string = ' ') {
  str = str.toString()

  if (typeof num === 'undefined') {
    return str
  }

  if (ch !== ' ') {
    ch = ch.toString()
  }

  return ch.repeat(num - str.length) + str
}

export function padRight(str: string, num: number, ch: string = ' ') {
  return str + ch.repeat(num - str.length)
}
