const path = require('path');

const context = path.resolve(__dirname, 'src');
const { publicPath } = require('../common/server.json');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
	mode: 'production',

	// context is "the base directory, an absolute path, for resolving entry
	// points and loaders from configuration"
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
			filename: '[name].bundle.css',
			chunkFilename: '[name]-[id].css',
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
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true,
			}),

			new OptimizeCSSAssetsPlugin({}),
		],

		// SplitChunksPlugin (aka optimization.splitChunks) documentation:
		// https://github.com/webpack/webpack.js.org/blob/master/src/content/plugins/split-chunks-plugin.md
		splitChunks: {
			// (this is the default)
			chunks: 'async',
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
				},
			},
		},
	},
};
