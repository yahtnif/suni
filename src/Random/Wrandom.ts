/**
 * Fork: [8ef23fd](https://github.com/mafintosh/random-weighted/blob/master/index.js)
 */

export default function Wrandom(data: any, cb?: Function): any {
  const ran = Math.random()
  let acc = 0
  let weights = data
  let returnCb = (i: number): any => i

  if (Array.isArray(data)) {
    if (typeof weights[0] !== 'number') {
      weights = data.map(v => (cb ? cb(v) : v.weight))
      returnCb = (i: number): any => data[i]
    }
  } else if (typeof data === 'object') {
    const entries = Object.entries(data)
    weights = entries.map(v => v[1])
    returnCb = (i: number): any => entries[i][0]
  }

  for (let i = 0; i < weights.length; i++) {
    acc += weights[i]
    if (ran < acc) return returnCb(i)
  }

  throw new Error('Weights should add up to 1')
}
