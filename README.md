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
  - [Is](#is)
  - [Obj](#obj)
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

```js
const { Arr } = require('suni')
```

#### Arr.shuffle

```js
const arr = [1, 2, 3, 4, 5]

Arr.shuffle(arr)

console.log(arr) // [4, 3, 1, 5, 2]
```

#### Arr.create

```js
// value starting from 1
Arr.create(5) // [1, 2, 3, 4, 5]

// specify a starting value
Arr.create(5, 10) // [10, 11, 12, 13, 14]
Arr.create(5, 0) // [0, 1, 2, 3, 4]

// pass a function
Arr.create(5, i => i - 1) // [0, 1, 2, 3, 4]
```

### Hash

```js
const { Hash } = require('suni')
```

#### Hash.sum

```js
Hash.sum('') // 'bba68bf6'

Hash.sum('string') // 'ed36c8f2'

Hash.sum({ a: {}, b: {} }) // '3718c6e8'
```

#### Hash.md5

```js
// Calculate the (hex-encoded) MD5 hash of a given string value:
Hash.md5('value') // '2063c1608d6e0baf80249c42e2be5804'

// Calculate the (hex-encoded) HMAC-MD5 hash of a given string value and key:
Hash.md5('value', 'key') // '01433efd5f16327ea4b31144572c67f6'

// Calculate the raw MD5 hash of a given string value:
Hash.md5('value', null, true)

// Calculate the raw HMAC-MD5 hash of a given string value and key:
Hash.md5('value', 'key', true)
```

### Is

```js
const { Is } = require('suni')
```

#### Is.empty

```js
Is.empty([]) // true
Is.empty({}) // true
Is.empty('') // true
Is.empty(null) // true
Is.empty(undefined) // true
Is.empty(new Map()) // true
Is.empty(new Set()) // true
Is.empty(new Error()) // true

Is.empty(true) // false
Is.empty(false) // false
Is.empty(['a', 'b']) // false
Is.empty({ a: 'b' }) // false
Is.empty('string') // false
Is.empty(0) // false
Is.empty(42) // false
Is.empty(function() {}) // false
Is.empty(function(a, b) {}) // false
Is.empty(new Map([['key', 'value']])) // false
Is.empty(new Set([1])) // false
Is.empty(new Error('fail')) // false
```

#### Is.promise

```js
Is.promise({ then:function () {...} }) // true
Is.promise(null) // false
Is.promise({}) // false
Is.promise({ then: true }) // false
```

### Obj

```js
const { Obj } = require('suni')
```

#### Obj.filter

Filter object keys and values into a new object.

```js
const obj = {
  foo: true,
  bar: false
}

Obj.filter(obj, (key, value) => value === true) // { foo: true }

Obj.filter(obj, ['bar']) // { bar: false }
```

#### Obj.map

Map object keys and values into a new object.

```js
const obj = {
  foo: true,
  bar: false
}
Obj.map(obj, (key, value) => [key, !value]) // { foo: false, bar: true }
```

#### Obj.get

Safely get a dot-notated path within a nested object.

```js
const obj = {
  a: {
    b: {
      c: 1,
      d: undefined,
      e: null
    }
  }
}

// use string dot notation for keys
Obj.get(obj, 'a.b.c') // 1

// returns undefined if the full key path does not exist and no default is specified
Obj.get(obj, 'a.b.c.f') // undefined

// optional third parameter for default if the full key in path is missing
Obj.get(obj, 'a.b.c.f', 'foo') // 'foo'
```

#### Obj.set

Safely writing deep Object values.

```js
let foo = { a: 1, b: 2 }

// or ~> Obj.set(foo, ['d', 'e', 'f'], 'hello')
Obj.set(foo, 'd.e.f', 'hello')

console.log(foo) // { a:1, b:2, d:{ e:{ f:'hello' } } }

let bar = {}

Obj.set(bar, 'a.0.b.0', 1)
Obj.set(bar, 'a.0.b.1', 2)

console.log(bar) // { a: [{ b: [1, 2] }] }
```

### Random

Pseudorandom generator: number / string / array item .

```js
const { Random } = require('suni')

// set `unique` to `true`, random will be consecutively unique.
const random = new Random({
  // seed: 100
  unique: true
})

// generate a url safe string
random.string() // 'Mo7Lp23PNkW-J_jwzzTH2hEg2XuQSE3'

random.int() // 141279642

// 100 ~ 2147483647
random.int(100) // 1517513188

// 1 ~ 100
random.int(1, 100) // 62

random.float() // 0.4130089482413688

random.float(100) // 947894369.301629

random.float(1, 100) // 57.521107099038645

random.lowercase() // 'nebsfcpkqrszwka'

random.lowercase(8) // 'xgwjbvwf'

random.uppercase(8) // 'EBEZNDYK'

random.alphabet(8) // 'IcFqJKIZ'

random.digit(8) // 58441778

random.array(['a', 'b', 'c']) // 'c'
```

### Str

digit, uppercase, lowercase, alphabet, url safe string.
pad, padLeft, padRight.
replaceAll.

```js
const { Str } = require('suni')

Str.digit // '0123456789'

Str.uppercase // 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

Str.lowercase // 'abcdefghijklmnopqrstuvwxyz'

Str.alphabet // 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

// url safe string
Str.url // '0123456789_ABCDEFGHIJKLMNOPQRSTUVWXYZ-abcdefghijklmnopqrstuvwxyz'

// pad / padLeft
Str.pad('7', 3, '0') // '007'
Str.padLeft('7', 3, '0') // '007'

// padRight
Str.padRight('1', 4, '0') // '1000'

// replaceAll
Str.replaceAll('rEplacEAll', 'E', 'e') // 'replaceAll'
```

### Wrandom

Produce a random array item based on weights.

```js
const { Wrandom } = require('suni')

const weights = [0.2, 0.5, 0.3]
Wrandom(weights) // random index of weights

const weightsNotAddTo1 = [0.2, 0.3] // auto reweight to [0.4, 0.6]
Wrandom(weightsNotAddTo1) // random index of weights

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

Wrandom(items) // random item of items
Wrandom(items, item => item.anyValue) // random item of items, passing a callback function to get weight

const obj = {
  key1: 0.3,
  key2: 0.5,
  key3: 0.2
}

Wrandom(obj) // random key of obj
```

## License

[MIT](./LICENSE)
