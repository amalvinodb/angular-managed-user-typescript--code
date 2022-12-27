module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
	overrides: [],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["@typescript-eslint"],
	rules: {
		semi: ["error", "always"],
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": 0,
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-var-requires": "off"
	},
};
