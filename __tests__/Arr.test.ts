import { Arr } from '../src'

describe('Arr', () => {
  it('shuffle', () => {
    const arr = [1, 2, 3, 4, 5]

    expect(Arr.shuffle(arr).length).toBe(5)
  })

  it('create', () => {
    expect(Arr.create(5)).toEqual([0, 1, 2, 3, 4])

    expect(Arr.create(5, 10)).toEqual([10, 11, 12, 13, 14])

    expect(Arr.create(5, (i: number) => i + 10)).toEqual([10, 11, 12, 13, 14])
  })
})
