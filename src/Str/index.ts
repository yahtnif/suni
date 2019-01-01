const digit: string = '0123456789'

const lower: string = 'abcdefghijklmnopqrstuvwxyz'

const upper: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const alphabet: string = `${lower}${upper}`

const urlSafeString: string = `${digit}_${lower}-${upper}`

const Str = { digit, lower, upper, alphabet, urlSafeString }

export default Str
