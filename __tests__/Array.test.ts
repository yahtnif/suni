import { shuffle } from '../src/Array'

describe('Array', () => {
  it('shuffle', () => {
    const arr = [1, 2, 3, 4, 5]

    expect(shuffle(arr).length).toBe(5)
  })
})
