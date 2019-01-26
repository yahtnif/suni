import { Wrandom } from '../src'

interface EmptyObject {
  [key: string]: number
}

describe('Wrandom', () => {
  const weights = [0.3, 0.5, 0.2]
  const weights2 = [0.2, 0.3]
  const weights2Result = [0.4, 0.6]
  const format = (v: number): number => Math.round(10 * (v / 100000)) / 10

  it('array - weights', () => {
    const hits = [0, 0, 0]
    const hits2 = [0, 0]

    for (let i = 0; i < 100000; i++) {
      hits[Wrandom(weights)]++
      hits2[Wrandom(weights2)]++
    }

    expect(hits.map(format)).toEqual(weights)
    expect(hits2.map(format)).toEqual(weights2Result)
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

    const arr2 = [
      {
        value: 0,
        weight: 0.3
      },
      {
        value: 0,
        weight: 0.2
      }
    ]

    const hits: EmptyObject = {}
    const hits2: EmptyObject = {}

    for (let i = 0; i < 100000; i++) {
      let item = Wrandom(arr)
      hits[item.weight] = (hits[item.weight] || 0) + 1

      let item2 = Wrandom(arr2)
      hits2[item2.weight] = (hits2[item2.weight] || 0) + 1
    }

    expect(weights.map(v => format(hits[v]))).toEqual(weights)
    expect(weights2.map(v => format(hits2[v]))).toEqual(weights2Result)
  })

  it('object', () => {
    const obj = {
      '0.3': 0.3,
      '0.5': 0.5,
      '0.2': 0.2
    }

    const obj2 = {
      '0.3': 0.3,
      '0.2': 0.2
    }

    const hits: EmptyObject = {}
    const hits2: EmptyObject = {}

    for (let i in obj) {
      hits[i] = 0
    }

    for (let i in obj2) {
      hits2[i] = 0
    }

    for (let i = 0; i < 100000; i++) {
      hits[Wrandom(obj)]++

      hits2[Wrandom(obj2)]++
    }

    expect(weights.map(v => format(hits[v]))).toEqual(weights)
    expect(weights2.map(v => format(hits2[v]))).toEqual(weights2Result)
  })
})
