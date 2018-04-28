const path = require('path');

const context = path.resolve(__dirname, 'src');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

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

		// Generate HTML to serve
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './src/index.template.html'),
			filename: 'index.html',
			inject: 'head',
			favicon: path.join(__dirname, './static/favicon.ico'),
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

		// Analyze webpack bundles (good insight into code-splitting and tree-shaking)
		// new BundleAnalyzerPlugin({  // COMMENT OUT WHEN NOT USING
		// analyzerMode: 'static',     // COMMENT OUT WHEN NOT USING
		// defaultSizes: 'gzip',       // COMMENT OUT WHEN NOT USING
		// }),                         // COMMENT OUT WHEN NOT USING
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

	optimization: {
		splitChunks: {
			chunks: 'async',
			cacheGroups: {
				default: {
					reuseExistingChunk: true,
				},
				commons: {
					test: /node_modules/,
					name: 'vendor',
					chunks: 'all',
				},
			},
		},
	},
};
