module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "plugin:flowtype/recommended",
    "airbnb"
  ],
  "plugins": [
    "flowtype",
    "react",
    "jsx-a11y",
    "import"
  ],
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "./webpack.config.js",
      }
    }
  },
  "rules": {
    "import/first": 0, // seems like an arbitrary rule TODO research rationale
    "jsx-a11y/anchor-is-valid": 0, // doesnt like routes helper.
    "function-paren-newline": 0, // doesn't play well with single arg functions https://github.com/eslint/eslint/issues/9286
    "no-tabs": 0,
    "indent": ["error", "tab"],
    "react/jsx-indent": [2, 'tab'],
    "react/jsx-indent-props": [2, 'tab'],
  },
	"env": {
		"browser": true,
	},
};
