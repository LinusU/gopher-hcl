/* eslint-env mocha */

const hcl = require('./')

const assert = require('assert')
const fs = require('fs')
const path = require('path')
const loadJsonFile = require('load-json-file')

describe('Gopher HCL', () => {
  const hclFiles = fs
    .readdirSync(path.join(__dirname, 'test-cases'))
    .filter((name) => name.endsWith('.hcl'))
    .map((name) => path.join(__dirname, 'test-cases', name))

  for (const hclFile of hclFiles) {
    const input = fs.readFileSync(hclFile, 'utf-8')
    const expected = loadJsonFile.sync(hclFile.replace(/\.hcl$/, '.json'))
    const rawExpected = loadJsonFile.sync(hclFile.replace(/\.hcl$/, '.raw.json'))

    it(`should parse ${hclFile}`, () => {
      assert.deepStrictEqual(hcl.parse(input), expected)
    })
    it(`should rawParse ${hclFile}`, () => {
      assert.deepStrictEqual(hcl.rawParse(input), rawExpected)
    })
  }
})
