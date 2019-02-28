# Suni

[![npm](https://badgen.net/npm/v/suni)](https://www.npmjs.com/package/suni)
[![gzip size](https://img.badgesize.io/https://cdn.jsdelivr.net/npm/suni/dist/suni.js?compression=gzip)](https://cdn.jsdelivr.net/npm/suni/dist/suni.js)
[![install size](https://badgen.net/packagephobia/install/suni)](https://packagephobia.now.sh/result?p=suni)
[![Build Status](https://travis-ci.org/yahtnif/suni.svg?branch=master)](https://travis-ci.org/yahtnif/suni)

## Table of contents

- [Install](#install)
- [Usage](#usage)
  - [Arr](#arr)
  - [Hash](#hash)
  - [Random](#random)
  - [Str](#str)
  - [Wrandom](#wrandom)
- [License](#license)

## Install

```sh
yarn add suni
# or
npm install suni
```

## Usage

### Arr

shuffle, create

```js
import { Arr } from 'suni'

const arr = [1, 2, 3, 4, 5]

Arr.shuffle(arr)

console.log(arr) // [4, 3, 1, 5, 2]

console.log(Arr.create(5)) // [0, 1, 2, 3, 4]

console.log(Arr.create(5, 10)) // [10, 11, 12, 13, 14]

console.log(Arr.create(5, i => i + 10)) // [10, 11, 12, 13, 14]
```

### Hash

sum, md5

```js
import { Hash } from 'suni'

console.log(Hash.sum('')) // bba68bf6

console.log(Hash.sum('string')) // ed36c8f2

console.log(Hash.sum({ a: {}, b: {} })) // 3718c6e8

// Calculate the (hex-encoded) MD5 hash of a given string value:
const hash = Hash.md5('value') // "2063c1608d6e0baf80249c42e2be5804"

// Calculate the (hex-encoded) HMAC-MD5 hash of a given string value and key:
const hash = Hash.md5('value', 'key') // "01433efd5f16327ea4b31144572c67f6"

// Calculate the raw MD5 hash of a given string value:
const hash = Hash.md5('value', null, true)

// Calculate the raw HMAC-MD5 hash of a given string value and key:
const hash = Hash.md5('value', 'key', true)
```

### Random

Pseudorandom generator: number / string / array item .

```js
import { Random } from 'suni'

// set `unique` to `true`, random will be consecutively unique.
const random = new Random({
  // seed: 100
  unique: true
})

// generate a url safe string
console.log(random.string()) // Mo7Lp23PNkW-J_jwzzTH2hEg2XuQSE3

console.log(random.int()) // 141279642

// 100 ~ 2147483647
console.log(random.int(100)) // 1517513188

// 1 ~ 100
console.log(random.int(1, 100)) // 62

console.log(random.float()) // 0.4130089482413688

console.log(random.float(100)) // 947894369.301629

console.log(random.float(1, 100)) // 57.521107099038645

console.log(random.lowercase()) // nebsfcpkqrszwka

console.log(random.lowercase(8)) // xgwjbvwf

console.log(random.uppercase(8)) // EBEZNDYK

console.log(random.alphabet(8)) // IcFqJKIZ

console.log(random.digit(8)) // 58441778

console.log(random.array(['a', 'b', 'c'])) // c
```

### Str

digit, uppercase, lowercase, alphabet, url safe string.
pad, padLeft, padRight.

```js
import { Str } from 'suni'

console.log(Str.digit) // 0123456789

console.log(Str.uppercase) // ABCDEFGHIJKLMNOPQRSTUVWXYZ

console.log(Str.lowercase) // abcdefghijklmnopqrstuvwxyz

console.log(Str.alphabet) // ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz

// url safe string
console.log(Str.url) // 0123456789_ABCDEFGHIJKLMNOPQRSTUVWXYZ-abcdefghijklmnopqrstuvwxyz

// pad / padLeft
console.log(Str.pad('7', 3, '0')) // 007
console.log(Str.padLeft('7', 3, '0')) // 007

// padRight
console.log(Str.padRight('1', 4, '0')) // 1000

// replaceAll
Str.replaceAll('rEplacEAll', 'E', 'e') // replaceAll
```

### Wrandom

Produce a random array item based on weights.

```js
import { Wrandom } from 'suni'

const weights = [0.2, 0.5, 0.3]
console.log(Wrandom(weights)) // random index of weights

const weightsNotAddTo1 = [0.2, 0.3] // auto reweight to [0.4, 0.6]
console.log(Wrandom(weightsNotAddTo1)) // random index of weights

const items = [
  {
    anyValue: 0.1,
    weight: 0.2
  },
  {
    anyValue: 0.7,
    weight: 0.5
  },
  {
    anyValue: 0.2,
    weight: 0.3
  }
]

console.log(Wrandom(items)) // random item of items
console.log(Wrandom(items, item => item.anyValue)) // random item of items, passing a callback function to get weight

const obj = {
  key1: 0.3,
  key2: 0.5,
  key3: 0.2
}

console.log(Wrandom(obj)) // random key of obj
```

## License

[MIT](./LICENSE)
