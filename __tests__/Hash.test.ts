import { hashsum } from '../src/Hash'

describe('Hash', () => {
  it('hash sum', () => {
    expect(hashsum('')).toEqual('bba68bf6')
    expect(hashsum('null')).toEqual('2d27667d')
    expect(hashsum('false')).toEqual('774b96ed')
    expect(hashsum('true')).toEqual('2d2a1684')
    expect(hashsum('0')).toEqual('8daa1a0c')
    expect(hashsum('1')).toEqual('8daa1a0a')
    expect(hashsum('void 0')).toEqual('e38f07cc')
    expect(hashsum('undefined')).toEqual('6037ea1a')
    expect(hashsum(null)).toEqual('9b7df12e')
    expect(hashsum(false)).toEqual('3c206f76')
    expect(hashsum(true)).toEqual('01e34ba8')
    expect(hashsum(0)).toEqual('1a96284a')
    expect(hashsum(1)).toEqual('1a96284b')
    expect(hashsum(undefined)).toEqual('29172c1a')
    expect(hashsum({})).toEqual('4505230f')
    expect(hashsum({ a: {}, b: {} })).toEqual('3718c6e8')
    expect(hashsum([])).toEqual('5d844489')
  })
})
