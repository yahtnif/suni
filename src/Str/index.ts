const digit: string = '0123456789'

const uppercase: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const lowercase: string = 'abcdefghijklmnopqrstuvwxyz'

const alphabet: string = `${uppercase}${lowercase}`

const url: string = `${digit}_${uppercase}-${lowercase}`

function padLeft(str: string, num?: number, ch: string = ' ') {
  str = str.toString()

  if (typeof num === 'undefined') {
    return str
  }

  if (ch !== ' ') {
    ch = ch.toString()
  }

  return ch.repeat(num - str.length) + str
}

function padRight(str: string, num: number, ch: string = ' ') {
  return str + ch.repeat(num - str.length)
}

const Str = {
  digit,
  lowercase,
  uppercase,
  alphabet,
  url,
  pad: padLeft,
  padLeft,
  padRight
}

export default Str
