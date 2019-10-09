// [split-array-into-chunks](https://stackoverflow.com/a/37826698)
export default function(array: any[], perChunk: number): any[] {
  return array.reduce((all, one, i) => {
    const ch = Math.floor(i / perChunk)
    all[ch] = [].concat(all[ch] || [], one)
    return all
  }, [])
}
