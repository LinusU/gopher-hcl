const build = require('./build')
const mixinDeep = require('mixin-deep')

function dearrayify (data) {
  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key]) && data[key].every(item => typeof item === 'object')) {
      data[key] = data[key].reduce((mem, item) => {
        return mixinDeep(mem, dearrayify(item))
      }, {})
    }
  })

  return data
}

function parseInput (input) {
  if (Buffer.isBuffer(input)) return input
  if (typeof input === 'string') return Buffer.from(input)

  throw new TypeError('Expected input to be a string or buffer')
}

exports.parse = function parse (input) {
  const src = parseInput(input)
  const [result, error] = build.parse(src)

  if (error) {
    throw Object.assign(new Error('Malformed HCL'), {
      offset: error.Pos.Offset,
      line: error.Pos.Line,
      column: error.Pos.Column
    })
  }

  return dearrayify(result)
}
