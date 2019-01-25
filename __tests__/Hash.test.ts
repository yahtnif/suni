import { Hash } from '../src'

describe('Hash', () => {
  it('hash md5', () => {
    expect(Hash.md5('value')).toEqual('2063c1608d6e0baf80249c42e2be5804')
    expect(Hash.md5('value', 'key')).toEqual('01433efd5f16327ea4b31144572c67f6')
  })

  it('hash sum', () => {
    expect(Hash.sum('')).toEqual('bba68bf6')
    expect(Hash.sum('null')).toEqual('2d27667d')
    expect(Hash.sum('false')).toEqual('774b96ed')
    expect(Hash.sum('true')).toEqual('2d2a1684')
    expect(Hash.sum('0')).toEqual('8daa1a0c')
    expect(Hash.sum('1')).toEqual('8daa1a0a')
    expect(Hash.sum('void 0')).toEqual('e38f07cc')
    expect(Hash.sum('undefined')).toEqual('6037ea1a')
    expect(Hash.sum(null)).toEqual('9b7df12e')
    expect(Hash.sum(false)).toEqual('3c206f76')
    expect(Hash.sum(true)).toEqual('01e34ba8')
    expect(Hash.sum(0)).toEqual('1a96284a')
    expect(Hash.sum(1)).toEqual('1a96284b')
    expect(Hash.sum(undefined)).toEqual('29172c1a')
    expect(Hash.sum({})).toEqual('4505230f')
    expect(Hash.sum({ a: {}, b: {} })).toEqual('3718c6e8')
    expect(Hash.sum([])).toEqual('5d844489')
  })
})
