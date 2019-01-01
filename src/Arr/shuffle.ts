// https://stackoverflow.com/a/6274398
export default function(array: any[]): any[] {
  let counter: number = array.length

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index: number = Math.floor(Math.random() * counter)

    // Decrease counter by 1
    counter--

    // And swap the last element with it
    let temp: any = array[counter]
    array[counter] = array[index]
    array[index] = temp
  }

  return array
}
