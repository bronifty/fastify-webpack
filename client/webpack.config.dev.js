const path = require('path');

const context = path.resolve(__dirname, 'src');
const { publicPath } = require('../common/server.json');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	context,

	entry: {
		frontend: [
			'babel-polyfill',
			path.resolve(__dirname, './src/index.jsx'),
		],
	},

	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath,
		filename: '[name].bundle.js',
	},

	resolve: {
		// Look for modules in these places...
		modules: [
			'node_modules',
			path.resolve(__dirname, './src'),
		],

		// Settings so filename extension isn't required when importing.
		extensions: ['.js', '.jsx'],
	},

	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),

		new WebpackPwaManifest({
			filename: 'manifest.webmanifest',
			name: 'Webapp name goes here',
			short_name: 'Webapp',
			description: 'This is a webapp.',
			background_color: '#fff',
			theme_color: '#00aaff',
			inject: true,
			icons: [
				{
					src: path.resolve(__dirname, './static/react-1024px.png'),
					sizes: [96, 128, 192, 256, 384, 512, 1024],
				},
			],
		}),

		// Generate HTML to serve
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './src/index.template.html'),
			filename: 'index.html',
			inject: 'head',
			favicon: path.resolve(__dirname, './static/favicon.ico'),
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			},
		}),

		// Plugin for HtmlWebpackPlugin hook which allows functionality with
		// different deployment options for your scripts (async, defer, etc).
		new ScriptExtHtmlWebpackPlugin({
			defaultAttribute: 'defer',
		}),
	],

	module: {
		rules: [
			// Javascript
			{
				test: /\.(js|jsx)$/,
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

			// CSS (CSS Modules)
			{
				test: /\.module\.css$/, // Only handle *.module.css
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 2,
							localIdentName: '[local]__[hash:base64:5]',
						},
					},
					'postcss-loader', // options in postcss.config.js
				],
			},

			// CSS (global/non-css-module)
			{
				test: /\.css$/,
				exclude: /\.module\.css$/, // Don't handle *.module.css
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
					},
					'postcss-loader', // options in postcss.config.js
				],
			},
		],
	},
};
