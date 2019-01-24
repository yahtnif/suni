# Suni

[![npm](https://badgen.net/npm/v/suni)](https://www.npmjs.com/package/suni)
[![gzip size](https://img.badgesize.io/https://cdn.jsdelivr.net/npm/suni/dist/suni.js?compression=gzip)](https://cdn.jsdelivr.net/npm/suni/dist/suni.js)
[![install size](https://badgen.net/packagephobia/install/suni)](https://packagephobia.now.sh/result?p=suni)
[![Build Status](https://travis-ci.org/yahtnif/suni.svg?branch=master)](https://travis-ci.org/yahtnif/suni)

## Install

```sh
yarn add suni
# or
npm install suni
```

## Usage

### string

```js
import { Str } from 'suni'

console.log(Str.digit) // 0123456789

console.log(Str.upper) // ABCDEFGHIJKLMNOPQRSTUVWXYZ

console.log(Str.lower) // abcdefghijklmnopqrstuvwxyz

console.log(Str.alphabet) // ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz

// url safe string
console.log(Str.url) // 0123456789_ABCDEFGHIJKLMNOPQRSTUVWXYZ-abcdefghijklmnopqrstuvwxyz
```

### hashsum

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

console.log(random.lower()) // nebsfcpkqrszwka

console.log(random.lower(8)) // xgwjbvwf

console.log(random.upper(8)) // EBEZNDYK

console.log(random.alphabet(8)) // IcFqJKIZ

console.log(random.digit(8)) // 58441778

console.log(random.array(['a', 'b', 'c'])) // c
```

### array

```js
import { Arr } from 'suni'

const arr = [1, 2, 3, 4, 5]

Arr.shuffle(arr)

console.log(arr) // [4, 3, 1, 5, 2]

console.log(Arr.create(5)) // [0, 1, 2, 3, 4]

console.log(Arr.create(5, 10)) // [10, 11, 12, 13, 14]

console.log(Arr.create(5, i => i + 10)) // [10, 11, 12, 13, 14]
```

## License

[MIT](./LICENSE)
