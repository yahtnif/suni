export default function(n: number, start?: number | Function): any[] {
  return Array.from(new Array(n), (v, i) =>
    typeof start !== 'undefined'
      ? typeof start === 'number'
        ? i + start
        : start(i + 1)
      : i + 1
  )
}
