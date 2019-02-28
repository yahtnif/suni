import { Obj } from '../src'

const { filter } = Obj

describe('Object', () => {
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
})
