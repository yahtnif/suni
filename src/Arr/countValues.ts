import { EmptyObject } from '../../interfaces/common'

/**
 * Fork: [a45515b](https://github.com/zeke/count-array-values/blob/master/index.js)
 */
const defaultLabels = {
  count: 'count',
  value: 'value'
}
export default function(arr: any[], labels?: EmptyObject) {
  const counts: EmptyObject = {}

  const { count, value } = labels
    ? { ...defaultLabels, ...labels }
    : defaultLabels

  arr.forEach(function(value) {
    if (typeof value !== 'string') return
    counts[value] ? counts[value]++ : (counts[value] = 1)
  })

  return Object.keys(counts)
    .map(key => ({
      [`${value}`]: key,
      [`${count}`]: counts[key]
    }))
    .sort((a, b) => b[count] - a[count])
}
