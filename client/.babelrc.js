const env = process.env.BABEL_ENV || process.env.NODE_ENV;

const config = {
	plugins: [
		"@babel/plugin-proposal-object-rest-spread",
		"@babel/plugin-proposal-class-properties",

		[
			"react-css-modules", {
				"exclude": "^(?!.*module).+\\.(css)$",
				"generateScopedName": "[local]__[hash:base64:5]",
				"context": "src"
			}
		],

		"react-hot-loader/babel",
	],

	presets: [
		["@babel/preset-env", {
			"modules": false,
			"targets": {
				"browsers": [
					">0.25%",
					"not ie 11",
					"not op_mini all",
				],
			},
		}],

		'@babel/preset-react',

		'@babel/preset-flow',
	],
};

if (env === 'test') {
	// Jest runs in Node, and thus requires ES modules to be transpiled to CommonJS modules
	config.plugins.plugins.push("@babel/plugin-transform-modules-commonjs");
}

module.exports = config;
