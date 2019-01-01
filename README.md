# Suni

[![npm](https://badgen.net/npm/v/suni)](https://www.npmjs.com/package/suni)
[![gzip size](https://img.badgesize.io/https://cdn.jsdelivr.net/npm/suni/dist/suni.min.js?compression=gzip)](https://cdn.jsdelivr.net/npm/suni/dist/suni.min.js)
[![install size](https://badgen.net/packagephobia/install/suni)](https://packagephobia.now.sh/result?p=suni)
[![downloads](https://badgen.net/npm/dt/suni)](https://www.npmjs.com/package/suni)
[![Build Status](https://travis-ci.org/yahtnif/suni.svg?branch=master)](https://trbanneravis-ci.org/yahtnif/suni)

## Install

```sh
yarn add suni
# or
npm install suni
```

## Usage

### string

```js
import { lower, upper, alphabet, digit } from 'suni'

console.log(lower)
// abcdefghijklmnopqrstuvwxyz

console.log(upper)
// ABCDEFGHIJKLMNOPQRSTUVWXYZ

console.log(alphabet)
// alphabet

console.log(digit)
// 0123456789
```

### hashsum

```js
import { hashsum } from 'suni'

console.log(hashsum(''))
// bba68bf6

console.log(hashsum('null'))
// 2d27667d

console.log(hashsum('false'))
// 774b96ed

console.log(hashsum('true'))
// 2d2a1684

console.log(hashsum('0'))
// 8daa1a0c

console.log(hashsum('1'))
// 8daa1a0a

console.log(hashsum('void 0'))
// e38f07cc

console.log(hashsum('undefined'))
// 6037ea1a

console.log(hashsum(null))
// 9b7df12e

console.log(hashsum(false))
// 3c206f76

console.log(hashsum(true))
// 01e34ba8

console.log(hashsum(0))
// 1a96284a

console.log(hashsum(1))
// 1a96284b

console.log(hashsum(undefined))
// 29172c1a

console.log(hashsum({}))
// 4505230f

console.log(hashsum({ a: {}, b: {} }))
// 3718c6e8

console.log(hashsum([]))
// 5d844489
```

### Random

```js
import { Random } from 'suni'

// set `unique` to `true`, random will be consecutively unique.
const random = new Random({
  // seed: 100
  unique: true
})

// generate a url safe string
console.log(random.string())
// Mo7Lp23PNkW-J_jwzzTH2hEg2XuQSE3

console.log(random.int())
// 141279642

// 100 ~ 2147483647
console.log(random.int(100))
// 1517513188

// 1 ~ 100
console.log(random.int(1, 100))
// 62

console.log(random.float())
// 0.4130089482413688

console.log(random.float(100))
// 947894369.301629

console.log(random.float(1, 100))
// 57.521107099038645

console.log(random.lower())
// nebsfcpkqrszwka

console.log(random.lower(8))
// xgwjbvwf

console.log(random.upper(8))
// EBEZNDYK

console.log(random.alphabet(8))
// IcFqJKIZ

console.log(random.digit(8))
// 58441778

console.log(random.array(['a', 'b', 'c']))
// c
```

### array

```js
import { shuffle } from 'suni'

const arr = [1, 2, 3, 4, 5]

shuffle(arr)

console.log(arr)
// [4, 3, 1, 5, 2]
```

## License

[MIT](./LICENSE)
