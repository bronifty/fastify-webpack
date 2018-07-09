const path = require('path');

const webpackServeWaitpage = require('webpack-serve-waitpage');

const { publicPath } = require('../common/server.json');

module.exports = {
	// webpack-command's extendable webpack configuration
	// https://github.com/webpack-contrib/webpack-command#extendable-webpack-configurations
	extends: path.join(__dirname, 'webpack.config.base.js'),

	mode: 'development',

	serve: {
		content: [__dirname], // "The path from which static content will be served"
		host: 'localhost',
		port: 9090,
		devMiddleware: {
			publicPath, // serve like /static/asset.js
			writeToDisk: true, // TODO not ideal
		},
		hotClient: true, // enable hot reloading
		https: {
			cert: path.join('../server/certs/cert.pem'),
			key: path.join('../server/certs/key.pem'),
		},
		clipboard: false, // don't copy address to clipboard

		add(app, middleware, options) {
			// Show a 'building...' page when waiting to serve.
			app.use(webpackServeWaitpage(options));
		},
	},
};
