import { Str } from '../src'

describe('Str', () => {
  it('padLeft', () => {
    expect(Str.pad('7', 3, '0')).toEqual('007')
    expect(Str.padLeft('7', 3, '0')).toEqual('007')
  })

  it('padRight', () => {
    expect(Str.padRight('1', 4, '0')).toEqual('1000')
  })
})
