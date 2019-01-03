import shuffle from './shuffle'

const Arr = {
  shuffle,
  create(n: number, cb?: number | Function): any[] {
    return Array.from(new Array(n), (v, i) =>
      cb ? (typeof cb === 'number' ? i + cb : cb(i)) : i
    )
  }
}

export default Arr
