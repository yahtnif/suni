import { Obj } from '../src'
import { EmptyObject } from '../interfaces/common'

const { filter, map } = Obj

describe('Object', () => {
  /**
   * Fork: [a8325b1](https://github.com/sindresorhus/filter-obj/blob/master/test.js)
   */
  it('filter - function predicate', () => {
    expect(
      Object.keys(filter({ foo: true, bar: false }, () => true)).length
    ).toBe(2)
    expect(
      Object.keys(filter({ foo: true, bar: false }, () => false)).length
    ).toBe(0)
    expect(
      Object.keys(
        filter(
          { foo: true, bar: false },
          (key: string, val: boolean) => val === true
        )
      ).length
    ).toBe(1)
  })

  it('filter - array predicate', () => {
    const x = Object.keys(filter({ foo: true, bar: false }, ['foo']))
    expect(x[0]).toEqual('foo')
    expect(x.length).toEqual(1)
  })

  /**
   * Fork: [0e51f16](https://github.com/sindresorhus/map-obj/blob/master/test.js)
   */
  it('map', () => {
    expect(map({ foo: 'bar' }, (key: string) => [key, 'unicorn']).foo).toEqual(
      'unicorn'
    )
    expect(
      map({ foo: 'bar' }, (key: string, val: string) => ['unicorn', val])
        .unicorn
    ).toEqual('bar')
    expect(
      map({ foo: 'bar' }, (key: string, val: string) => [val, key]).bar
    ).toEqual('foo')
  })

  it('map - target option', () => {
    const target: EmptyObject = {}
    expect(
      map({ foo: 'bar' }, (key: string, val: string) => [val, key], { target })
    ).toEqual(target)
    expect(target.bar).toEqual('foo')
  })

  it('deep option', () => {
    const obj = { one: 1, obj: { two: 2, three: 3 }, arr: [{ four: 4 }, 5] }
    const expected = {
      one: 2,
      obj: { two: 4, three: 6 },
      arr: [{ four: 8 }, 5]
    }
    const fn = (key: string, val: string) => [
      key,
      typeof val === 'number' ? val * 2 : val
    ]
    const actual = map(obj, fn, { deep: true })
    expect(actual).toEqual(expected)
  })

  it('nested arrays', () => {
    const obj: EmptyObject = { arr: [[0, 1, 2, { a: 3 }]] }
    const expected: EmptyObject = { arr: [[0, 1, 2, { a: 6 }]] }
    const fn = (key: string, val: string) => [
      key,
      typeof val === 'number' ? val * 2 : val
    ]
    const actual = map(obj, fn, { deep: true })
    expect(actual).toEqual(expected)
  })

  it('handles circular references', () => {
    const obj: EmptyObject = { one: 1, arr: [2] }
    obj.circular = obj
    obj.arr2 = obj.arr
    obj.arr.push(obj)

    const fn = (key: string, val: string) => [key.toUpperCase(), val]
    const actual = map(obj, fn, { deep: true })

    const expected: EmptyObject = { ONE: 1, ARR: [2] }
    expected.CIRCULAR = expected
    expected.ARR2 = expected.ARR
    expected.ARR.push(expected)

    expect(actual).toEqual(expected)
  })
})
