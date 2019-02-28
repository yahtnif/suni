import { Is } from '../src'

const { empty } = Is

describe('is-empty', function() {
  it('handles arrays', function() {
    expect(empty([])).toBeTruthy()
    expect(empty(['a', 'b'])).toBeFalsy()
  })

  it('handles objects', function() {
    expect(empty({})).toBeTruthy()
    expect(empty({ a: 'b' })).toBeFalsy()
    expect(empty({ length: 0 })).toBeFalsy()
  })

  it('handles strings', function() {
    expect(empty('')).toBeTruthy()
    expect(empty('string')).toBeFalsy()
    expect(empty('Error')).toBeFalsy()
  })

  it('handles numbers', function() {
    expect(empty(0)).toBeFalsy()
    expect(empty(42)).toBeFalsy()
  })

  it('handles functions', function() {
    expect(empty(function() {})).toBeFalsy()
    expect(empty(function(a: any, b: any) {})).toBeFalsy()
  })

  it('handles nulls', function() {
    expect(empty(null)).toBeTruthy()
    expect(empty(undefined)).toBeTruthy()
    expect(empty()).toBeTruthy()
  })

  it('handles booleans', function() {
    expect(empty(false)).toBeFalsy()
    expect(empty(true)).toBeFalsy()
  })

  it('handles maps', function() {
    expect(empty(new Map())).toBeTruthy()
    expect(empty(new Map([['key', 'value']]))).toBeFalsy()
  })

  it('handles sets', function() {
    expect(empty(new Set())).toBeTruthy()
    expect(empty(new Set([1, 2, 3, 4]))).toBeFalsy()
  })

  it('handles errors', function() {
    expect(empty(new Error())).toBeTruthy()
    expect(empty(new Error(''))).toBeTruthy()
    expect(empty(new Error('test'))).toBeFalsy()
  })
})
