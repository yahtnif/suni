import Arr from '../src/Arr'

describe('Array', () => {
  it('shuffle', () => {
    const arr = [1, 2, 3, 4, 5]

    expect(Arr.shuffle(arr).length).toBe(5)
  })
})
