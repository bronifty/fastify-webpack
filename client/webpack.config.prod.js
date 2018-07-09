const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// COMMENT OUT WHEN NOT USING
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
	// webpack-command's extendable webpack configuration
	// https://github.com/webpack-contrib/webpack-command#extendable-webpack-configurations
	extends: path.join(__dirname, 'webpack.config.base.js'),

	mode: 'production',

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
