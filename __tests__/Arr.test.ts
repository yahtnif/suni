import { Arr } from '../src'

describe('Arr', () => {
  /**
   * Fork: [a45515b](https://github.com/zeke/count-array-values/blob/master/test.js)
   */
  it('countValues', () => {
    const items: any[] = [
      [
        ['foo', 'bar', 'Bar', 451, 'bar', 'bar', 'baz', 'foo', null, undefined],
        [
          { value: 'bar', count: 3 },
          { value: 'foo', count: 2 },
          { value: 'Bar', count: 1 },
          { value: 'baz', count: 1 }
        ]
      ],
      [
        ['apple', 'banana', 'apple'],
        [{ fruit: 'apple', count: 2 }, { fruit: 'banana', count: 1 }],
        { value: 'fruit' }
      ],
      [
        ['banana', 'express', 'lodash', 'express', 'lodash', 'express'],
        [
          { package: 'express', dependents: 3 },
          { package: 'lodash', dependents: 2 },
          { package: 'banana', dependents: 1 }
        ],
        { value: 'package', count: 'dependents' }
      ]
    ]

    for (const item of items) {
      expect(Arr.countValues(item[0], item[2])).toEqual(item[1])
    }
  })

  it('create', () => {
    expect(Arr.create(5)).toEqual([1, 2, 3, 4, 5])

    expect(Arr.create(5, 10)).toEqual([10, 11, 12, 13, 14])

    expect(Arr.create(5, 0)).toEqual([0, 1, 2, 3, 4])

    expect(Arr.create(5, (i: number) => i - 1)).toEqual([0, 1, 2, 3, 4])
  })

  it('shuffle', () => {
    const arr = [1, 2, 3, 4, 5]

    expect(Arr.shuffle(arr).length).toBe(5)
  })

  it('unique', () => {
    const arr = [1, 2, 3, 2, 1, 'a', 'b', 'a']

    expect(Arr.unique(arr)).toEqual([1, 2, 3, 'a', 'b'])
  })
})
