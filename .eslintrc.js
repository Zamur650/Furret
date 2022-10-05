module.exports = {
	env: {
		node: true,
		commonjs: true,
		es2021: true
	},
	extends: ["eslint:recommended", "prettier"],
	parserOptions: {
		ecmaVersion: 12
	},
	plugins: ["prettier"],
	rules: {
		indent: ["error", "tab"],
		quotes: ["error", "double"],
		semi: ["error", "always"]
	},
	ignorePatterns: ["node_modules"]
};
