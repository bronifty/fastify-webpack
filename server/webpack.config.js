const path = require('path');

const context = path.resolve(__dirname, 'src');
// const context = path.resolve(__dirname);

var nodeExternals = require('webpack-node-externals');

module.exports = {
	target: 'node', // ignore built-in modules like path, file, etc
	node: {
		__dirname: true, // otherwise path gets confused. more @ https://webpack.js.org/configuration/node/#node-__dirname
	},
	externals: [nodeExternals()], // ignore modules in node_modules

	context,

	entry: {
		backend: [
			// 'babel-polyfill',
			path.resolve(__dirname, './src/index.js'),
		],
	},

	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].bundle.js',
	},

	resolve: {
		// Look for modules in these places...
		modules: [
			path.resolve(__dirname, './node_modules'),
			path.resolve(__dirname, './src'),
		],

		// Settings so filename extension isn't required when importing.
		extensions: ['.js'],
	},

	module: {
		rules: [
			// Javascript
			{
				test: /\.(js)$/,
				exclude: [
					/node_modules/,
				],
				use: [
					{
						loader: 'babel-loader',
						// options in .babelrc
					},
				],
			},
		],
	},
};
