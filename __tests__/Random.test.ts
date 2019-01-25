import { Random } from '../src'
import { Str } from '../src'

const random = new Random()
const uniRandom = new Random({
  unique: true
})
const TEST_TIMES = 100

describe('Random', () => {
  it('int', () => {
    for (let i = 0; i < TEST_TIMES; i++) {
      expect(random.int()).toBeGreaterThan(0)
      expect(random.int(1)).toBeGreaterThan(0)
      expect(random.int(1, 99)).toBeLessThan(100)
    }
  })

  it('int - unique', () => {
    let prev: number

    for (let i = 0; i < TEST_TIMES; i++) {
      const r = uniRandom.int()
      expect(r).not.toEqual(prev)
      prev = r
    }
  })

  it('float', () => {
    for (let i = 0; i < TEST_TIMES; i++) {
      expect(random.float()).toBeGreaterThan(0)
      expect(random.float(1)).toBeGreaterThan(0)
      expect(random.float(1, 99)).toBeLessThan(100)
    }
  })

  it('float - unique', () => {
    let prev: number

    for (let i = 0; i < TEST_TIMES; i++) {
      const r = uniRandom.float()
      expect(r).not.toEqual(prev)
      prev = r
    }
  })

  it('lower', () => {
    for (let i = 0; i < TEST_TIMES; i++) {
      expect(uniRandom.lower()).toMatch(/^[a-z]+$/)
    }
  })

  it('upper', () => {
    for (let i = 0; i < TEST_TIMES; i++) {
      expect(uniRandom.upper()).toMatch(/^[A-Z]+$/)
    }
  })

  it('alphabet', () => {
    for (let i = 0; i < TEST_TIMES; i++) {
      expect(uniRandom.alphabet()).toMatch(/^[a-zA-Z]+$/)
    }
  })

  it('digit', () => {
    for (let i = 0; i < TEST_TIMES; i++) {
      expect(uniRandom.digit()).toMatch(/^\d+$/)
    }
  })

  it('arrary', () => {
    const arr = Str.lowercase.split('')
    let prev: string

    for (let i = 0; i < TEST_TIMES; i++) {
      const r = uniRandom.array(arr)
      expect(r).not.toEqual(prev)
      prev = r
    }
  })
})
