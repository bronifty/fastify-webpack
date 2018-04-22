console.log(`Webpack building bundles, NODE_ENV=${process.env.NODE_ENV}`)

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./webpack.config.prod');
} else {
  module.exports = require('./webpack.config.dev');
}
