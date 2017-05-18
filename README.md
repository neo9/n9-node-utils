# n9-node-utils

Neo9 Node Utils Module.

## Installation

```bash
npm install --save n9-node-utils
```

## N9Error

Custom error class (extends `Error`), used by [n9-node-micro](http://scm.bytefactory.fr/projects/N9NODE/repos/n9-node-micro/browse) for API errors with status code and context.

`new N9Error(message [, statusCode] [, context])`

Arguments:

- message: `String`, **required**
- status: `Number`, default: `500`
- context: `Object`, default: `{}`

Example:

```ts
import { N9Error } from 'n9-node-utils'

throw new N9Error('file-not-found', 404, { path: '/tmp/my-file.txt' })
```
