const build = require('./build')

const handleValue = (v) => {
  try {
    return JSON.parse(v)
  } catch (e) {
    return v
  }
}

const attributeReshaper = (b) => {
  const res = Object.keys(b.a || {}).reduce((acc, next) => ({
    ...acc,
    [next]: handleValue(b.a[next].s)
  }), {})
  return res
}

const bodyReshaper = (bodies) => {
  const result = {}

  for (let i = 0; i < bodies.length; i += 1) {
    const node = bodies[i]
    let ref = result
    for (let j = 0; j < node.h.length; j += 1) {
      const key = node.h[j]
      if (!ref[key] && j < node.h.length - 1) {
        ref[key] = {}
      } else if (!ref[key]) {
        ref[key] = attributeReshaper(node.b)
        if (node.b && node.b.b) {
          ref[key] = { ...ref[key], ...bodyReshaper(node.b.b) }
        }
      }
      ref = ref[key]
    }
  }

  return result
}

function parseInput (input) {
  if (Buffer.isBuffer(input)) return new Uint8Array(input)
  if (typeof input === 'string') return new Uint8Array(Buffer.from(input))

  throw new TypeError('Expected input to be a string or buffer')
}

const parse = (input) => {
  const src = parseInput(input)
  const [result, error] = build.parse(src)

  if (error) {
    throw Object.assign(new Error('Malformed HCL'), {
      offset: error.Pos.Offset,
      line: error.Pos.Line,
      column: error.Pos.Column
    })
  }

  return result
}

exports.parse = (input) => bodyReshaper(parse(input).r.b)

exports.rawParse = (input) => parse(input)
