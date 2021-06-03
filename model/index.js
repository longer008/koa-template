'use strict'

const fs = require('fs')

const files = fs.readdirSync(__dirname).filter(file => file !== 'index.js')

const models = {}
for (const file of files) {
  if (file.toLowerCase().endsWith('js')) {
    const model = require(`./${file}`)
    models[`${file.replace(/\.model\.js/, '')}`] = model
  }
}

module.exports = models
