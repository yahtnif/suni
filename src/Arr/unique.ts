export default function(arr: any[]): any[] {
  return Array.from(new Set(arr))
}
