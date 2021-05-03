module.exports = {
	printWidth: 120,
	tabWidth: 4,
	useTabs: true,
	semi: true,
	singleQuote: true,
	trailingComma: 'all',
	bracketSpacing: false,
	arrowParens: 'avoid',
	overrides: [
		{
			files: '*.js',
			options: {
				parser: 'babel',
			},
		},
		{
			files: '*.md',
			options: {
				parser: 'markdown',
			},
		},
		{
			files: '*.json',
			options: {
				parser: 'json',
			},
		},
	],
};
