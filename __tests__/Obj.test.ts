import { Obj } from '../src'
import { EmptyObject } from '../interfaces/common'

const { filter, get, map, set } = Obj

describe('Object', () => {
  /**
   * Fork: [55003e0](https://github.com/developit/dlv/blob/master/test.js)
   */
  it('get', () => {
    let obj: EmptyObject = {
      undef: undefined,
      zero: 0,
      one: 1,
      n: null,
      f: false,
      a: {
        two: 2,
        b: {
          three: 3,
          c: {
            four: 4
          }
        }
      }
    }

    // assert equality of a given path, as dot notation and array.
    //optional third argument is for default when object is not found
    function check(path: any, value: any, def?: any) {
      const out = get(obj, path, def)
      expect(out).toEqual(value)

      if (path) {
        const arr = path.split('.')
        expect(get(obj, arr, def)).toEqual(value)
      }
    }

    // No Defaults
    check('', undefined)
    check('one', obj.one)
    check('one.two', undefined)
    check('a', obj.a)
    check('a.two', obj.a.two)
    check('a.b', obj.a.b)
    check('a.b.three', obj.a.b.three)
    check('a.b.c', obj.a.b.c)
    check('a.b.c.four', obj.a.b.c.four)
    check('n', obj.n)
    check('n.badkey', undefined)
    check('f', false)
    check('f.badkey', undefined)

    // With Defaults
    check('', 'foo', 'foo')
    check('undef', 'foo', 'foo')
    check('n', null, 'foo')
    check('n.badkey', 'foo', 'foo')
    check('zero', 0, 'foo')
    check('a.badkey', 'foo', 'foo')
    check('a.badkey.anotherbadkey', 'foo', 'foo')
    check('f', false, 'foo')
    check('f.badkey', 'foo', 'foo')

    //check undefined key throws an error
    expect(get.bind(this, obj, undefined)).toThrow()
    expect(get.bind(this, obj, undefined, 'foo')).toThrow()

    // check undefined obj doesn't throw errors and uses default
    const backupObj = obj
    obj = undefined
    check('one', undefined)
    check('one', 'foo', 'foo')
    obj = backupObj
  })

  /**
   * Fork: [0cbf2c6](https://github.com/lukeed/dset/blob/master/test/index.js)
   */
  it('set', () => {
    let foo: EmptyObject = { a: 1, b: 2 }
    let out = set(foo, 'c', 3) // add c
    expect(out).toEqual(undefined)
    expect(foo).toEqual({ a: 1, b: 2, c: 3 })

    foo = {}
    set(foo, 'a.b.c', 999) // add deep
    expect(foo).toEqual({ a: { b: { c: 999 } } })

    foo = {}
    set(foo, ['a', 'b', 'c'], 123) // change via array
    expect(foo).toEqual({ a: { b: { c: 123 } } })

    foo = { a: 1 }
    set(foo, 'e.0.0', 2) // create arrays instead of objects
    expect(foo.e[0][0]).toBe(2)
    expect(foo).toEqual({ a: 1, e: [[2]] })
    expect(Array.isArray(foo.e)).toBeTruthy()

    foo = { a: { b: { c: 123 } } }
    set(foo, 'a.b.x.y', 456) // preserve existing structure
    expect(foo).toEqual({ a: { b: { c: 123, x: { y: 456 } } } })

    foo = { a: { b: 123 } }
    set(foo, 'a.b.c', 'hello') // preserve non-object value, won't alter
    expect(foo.a.b).toEqual(123)
    expect(foo).toEqual({ a: { b: 123 } })

    foo = { a: { b: { c: 123, d: { e: 5 } } } }
    set(foo, 'a.b.d.z', [1, 2, 3, 4]) // preserve object tree, with array value
    expect(foo.a.b.d).toEqual({ e: 5, z: [1, 2, 3, 4] })

    foo = { b: 123 }
    expect(set(foo, 'b.c.d.e', 123)).toBeUndefined()
    expect(foo.b).toBe(123)

    foo = { b: 0 }
    expect(set(foo, 'b.a.s.d', 123)).toBeUndefined()
    expect(foo).toEqual({ b: 0 })

    foo = {}
    set(foo, ['x', 'y', 'z'], 123)
    expect(foo).toEqual({ x: { y: { z: 123 } } })

    foo = {}
    set(foo, ['x', '0', 'z'], 123)
    expect(foo).toEqual({ x: [{ z: 123 }] })
    expect(Array.isArray(foo.x)).toBeTruthy()

    foo = {}
    set(foo, ['x', '1', 'z'], 123)
    expect(foo).toEqual({ x: [, { z: 123 }] })
    expect(Array.isArray(foo.x)).toBeTruthy()

    foo = {}
    set(foo, ['x', '10.0', 'z'], 123)
    expect(foo).toEqual({ x: { '10.0': { z: 123 } } })
    expect(Array.isArray(foo.x)).toBeFalsy()

    foo = {}
    set(foo, ['x', '10.2', 'z'], 123)
    expect(foo).toEqual({ x: { '10.2': { z: 123 } } })
    expect(Array.isArray(foo.x)).toBeFalsy()
  })

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
