# n9-node-utils

Neo9 Node Utils Module.

[![npm version](https://img.shields.io/npm/v/@neo9/n9-node-utils.svg)](https://www.npmjs.com/package/@neo9/n9-node-utils)
[![Travis](https://img.shields.io/travis/neo9/n9-node-utils/master.svg)](https://travis-ci.org/neo9/n9-node-utils)
[![Coverage](https://img.shields.io/codecov/c/github/neo9/n9-node-utils/master.svg)](https://codecov.io/gh/neo9/n9-node-utils)
[![license](https://img.shields.io/github/license/neo9/n9-node-utils.svg)](https://github.com/neo9/n9-node-utils/blob/master/LICENSE)

## Installation

```bash
npm install --save @neo9/n9-node-utils
```

## N9Error

Custom error class (extends `Error`), used by [n9-node-micro](https://github.com/neo9/n9-node-micro) for API errors with status code and context.

`new N9Error(message [, statusCode] [, context])`

Arguments:

- message: `String`, **required**
- status: `Number`, default: `500`
- context: `Object`, default: `{}`

Example:

```ts
import { N9Error } from '@neo9/n9-node-utils'

throw new N9Error('file-not-found', 404, { path: '/tmp/my-file.txt' })
```


## ok

Waits for the value of promise. If promise throws an Error, returns `undefined`.

`ok(promise: Object): Promise`

Arguments:

- promise: `Promise`

Example:

```ts
import { readFile } from 'fs-extra'
import { ok } from '@neo9/n9-node-utils'

// readFile sends back a Promise since we use fs-extra
const file = await ok(readFile('./my-file.txt', 'utf-8'))

if (file) console.log('File found:', file)
```

## cb

Calls a function `fn` that takes arguments `args` and an `(err, result)` callback. Waits for the `callback` result, throwing an `Error` if `err` is truthy.

`cb(fn: Function, ...args: any[]): Promise`

Arguments:

- fn: `Function`, a function that takes a callback
- args: (...`any`) arguments to pass to `fn`

Example:

```ts
import { cb } from '@neo9/n9-node-utils'

const file = await cb(readFile('./my-file.txt', 'utf-8'))

console.log('File content:', file)
```

## waitFor

Waits for ms milliseconds to pass, use `setTimeout` under the hood.

`waitFor(ms: number): Promise`

Arguments:

- ms: `Number`, default: `0`

Example:

```ts
import { waitFor } from '@neo9/n9-node-utils'

await waitFor(1000) // wait for 1s
```

## waitForEvent

Waits for emitter to emit an eventName event.

`waitForEvent(emitter: EventEmitter, eventName: string): Promise<Array>`

Arguments:

- emitter: `EventEmitter`
- eventName: `String`

Example:

```ts
import { waitForEvent } from '@neo9/n9-node-utils'

await waitForEvent(sever, 'listen')
```

## asyncObject

Waits for all Promises in the keys of `obj` to resolve.

`asyncObject(obj: Object): Promise<Object>`

Arguments:

- obj: `Object`, default: `{}`

Example:

```ts
import { asyncObject } from '@neo9/n9-node-utils'

const results = await asyncObject({
  pictures: getPictures(),
  comments: getComments(),
  tweets: getTweets()
})

console.log(results.pictures, results.comments, results.tweets)
```
