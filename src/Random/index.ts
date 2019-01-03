/**
 * Fork: [cb87fc3](https://github.com/sindresorhus/park-miller/blob/master/index.js)
 */

import { EmptyObject } from '../interfaces/common'
import { Option } from '../interfaces/Random'
import Str from '../Str'

const MAX_INT32: number = 2147483647
const MINSTD: number = 16807

export default class Random {
  private seed: number
  private option: Option
  private prev: EmptyObject = {}

  constructor(option: Option = {}) {
    this.option = option

    if (!Number.isInteger(this.option.seed)) {
      this.option.seed = this.randomSeed()
    }

    this.seed = this.option.seed % MAX_INT32

    if (this.seed <= 0) {
      this.seed += MAX_INT32 - 1
    }
  }

  randomSeed() {
    return MAX_INT32 - Math.floor(Math.random() * 10000)
  }

  int(min?: number, max?: number): number {
    const num: number = Number.isInteger(min)
      ? this.integerInRange(min, max)
      : this.integer()

    this.prev.int =
      this.option.unique && num === this.prev.int ? this.int(min, max) : num

    return this.prev.int
  }

  integer(): number {
    this.seed *= MINSTD
    this.seed %= MAX_INT32
    return this.seed
  }

  integerInRange(min?: number, max?: number): number {
    return Math.round(this.floatInRange(min, max))
  }

  float(min?: number, max?: number): number {
    const num =
      typeof min !== 'number' ? this.randomFloat() : this.floatInRange(min, max)

    this.prev.float =
      this.option.unique && num === this.prev.float ? this.float(min, max) : num

    return this.prev.float
  }

  randomFloat(): number {
    return (this.integer() - 1) / (MAX_INT32 - 1)
  }

  floatInRange(min?: number, max?: number): number {
    if (typeof max !== 'number') {
      max = MAX_INT32
    }
    return min + (max - min) * this.randomFloat()
  }

  boolean(): boolean {
    return this.integer() % 2 === 0
  }

  randomSize() {
    return this.int(1, 32)
  }

  generate(alphabet: string, size: number): string {
    if (!Number.isInteger(size)) {
      size = this.randomSize()
    }

    let id: string = ''
    let randomMax: number = alphabet.length - 1
    while (true) {
      id += alphabet[this.int(0, randomMax)]
      if (id.length === size) break
    }

    const key = '_' + alphabet

    this.prev[key] =
      this.option.unique && id === this.prev[key]
        ? this.generate(alphabet, size)
        : id

    return this.prev[key] as string
  }

  string(str: string | number, size: number) {
    if (Number.isInteger(str as number)) {
      size = str as number
    }

    if (typeof str !== 'string') {
      str = Str.url
    }
    return this.generate(str, size)
  }

  lower(size?: number): string {
    return this.generate(Str.lower, size)
  }

  upper(size?: number): string {
    return this.generate(Str.upper, size)
  }

  alphabet(size?: number): string {
    return this.generate(Str.alphabet, size)
  }

  digit(size?: number): string {
    return this.generate(Str.digit, size)
  }

  array(arr: any[]): any {
    const item = arr[this.int(0, arr.length - 1)]

    this.prev.array =
      this.option.unique && item === this.prev.array ? this.array(arr) : item

    return this.prev.array
  }
}
