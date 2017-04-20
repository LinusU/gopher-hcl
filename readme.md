# Gopher HCL

The official HCL library, compiled to JavaScript with GopherJS.

## Installation

```sh
npm install --save gopher-hcl
```

## Usage

```js
const hcl = require('hcl')
const fs = require('fs')

const source = fs.readFileSync('test.hcl')
const result = hcl.parse(source)

console.log(result)
```

## API

### `.parse(source: string | Buffer) => object`

Parses the provided HCL and returns the javascript representation.
