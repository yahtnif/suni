import { Wrandom } from '../src'

interface EmptyObject {
  [key: string]: number
}

describe('Wrandom', () => {
  const weights = [0.3, 0.5, 0.2]
  const format = (v: number): number => Math.round(10 * (v / 100000)) / 10

  it('array - weights', () => {
    let hits = [0, 0, 0]

    for (let i = 0; i < 100000; i++) {
      hits[Wrandom(weights)]++
    }

    expect(weights).toEqual(hits.map(format))
  })

  it('array - object', () => {
    const arr = [
      {
        value: 0,
        weight: 0.3
      },
      {
        value: 0,
        weight: 0.5
      },
      {
        value: 0,
        weight: 0.2
      }
    ]

    const hits: EmptyObject = {}

    for (let i = 0; i < 100000; i++) {
      let item = Wrandom(arr)
      hits[item.weight] = (hits[item.weight] || 0) + 1
    }

    expect(weights).toEqual(weights.map(v => format(hits[v])))
  })

  it('object', () => {
    const obj = {
      '0.3': 0.3,
      '0.5': 0.5,
      '0.2': 0.2
    }

    const hits: EmptyObject = {}

    for (let i in obj) {
      hits[i] = 0
    }

    for (let i = 0; i < 100000; i++) {
      let item = Wrandom(obj)
      hits[item]++
    }

    expect(weights).toEqual(weights.map(v => format(hits[v])))
  })
})
