const easyMediaQuery = require('postcss-easy-media-query');

const breakpoints = {
	xs: '544px',
	sm: '768px',
	md: '992px',
	lg: '1200px',
};

module.exports = {
	plugins: [
		easyMediaQuery({
			breakpoints,
		}),
		require('postcss-nested')(),
		require('postcss-import')({
			path: [
				'./src'
			],
		}),
		require('postcss-custom-properties')(),
		require('postcss-custom-selectors')(),
		require('postcss-color-function')(),
		require('autoprefixer')({ browsers: ['last 2 versions'] }),
	]
}
