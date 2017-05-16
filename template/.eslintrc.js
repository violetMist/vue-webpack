// http://eslint.cn/docs/user-guide/configuring
// https://www.npmjs.com/package/eslint

module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module'
	},
	env: {
		browser: true
	},
	globals : {
		'IX' : false,
		'IXW' : false,
		'$XP' : false,
		'$Xw' : false,
		'$XD' : false,
		'$XH' : false,
		'NP' : false
	},

	extends: 'airbnb-base',
	// required to lint *.vue files
	plugins: [
		'html'
	],
	// check if imports actually resolve
	'settings': {
		'import/resolver': {
			'webpack': {
				'config': 'build/webpack.base.conf.js'
			}
		}
	},
	// add your custom rules here, refer to http://eslint.cn/docs/rules/
	'rules': {
		'no-tabs' : 0,
		'no-extra-semi' : 2,
		'no-var' : 0,
		'indent' : 0,
		'curly' : 0,
		'comma-dangle' : 0,
		'consistent-return' : 0,
		'global-require' : 0,
		'prefer-template' : 0,
		'prefer-arrow-callback' : 0,
		'no-trailing-spaces':0,
		'no-underscore-dangle' : 0,
		'func-names' : 0,
		'object-shorthand' : 0,
		'one-var' : 0,
		'one-var-declaration-per-line' : 0,
		'no-param-reassign' : 0,
		'no-mixed-operators' : 0,
		'eqeqeq' : 0,
		'no-nested-ternary' : 0,
		'no-use-before-define' : 0,

		'import/no-dynamic-require' : 0,

		// don't require .vue extension when importing
		'import/extensions': ['error', 'always', {
			'js': 'never',
			'vue': 'never'
		}],
		// allow optionalDependencies
		'import/no-extraneous-dependencies': ['error', {
			'optionalDependencies': ['test/unit/index.js']
		}],
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
	}
}
