import { padLeft, padRight } from './pad'
import { digit, lowercase, uppercase, alphabet, url } from './string'

function replaceAll(
  target: string,
  search: string,
  replacement: string
): string {
  return target.replace(new RegExp(search, 'g'), replacement)
}

export default {
  digit,
  lowercase,
  uppercase,
  alphabet,
  url,
  pad: padLeft,
  padLeft,
  padRight,
  replaceAll
}
