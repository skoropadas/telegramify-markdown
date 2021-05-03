const { URL } = require('url');

module.exports = {
	wrap(string, ...wrappers) {
		return [
			...wrappers,
			string,
			...wrappers.reverse(),
		].join('');
	},

	isURL(string) {
		try {
			return Boolean(new URL(string));
		} catch (error) {
			return false;
		}
	},

	escapeSymbols(text, textType = 'text') {
		if (!text) {
			return text;
		}
		switch (textType) {
			case 'code':
				return text
					.replace(/`/g, '\\`')
					.replace(/\\/g, '\\\\')
			case 'link':
				return text
					.replace(/\(/g, '\\(')
					.replace(/\)/g, '\\)')
					.replace(/\\/g, '\\\\')
			default:
				return text
					.replace(/_/g, '\\_')
					.replace(/\*/g, '\\*')
					.replace(/\[/g, '\\[')
					.replace(/]/g, '\\]')
					.replace(/\(/g, '\\(')
					.replace(/\)/g, '\\)')
					.replace(/~/g, '\\~')
					.replace(/`/g, '\\`')
					.replace(/>/g, '\\>')
					.replace(/#/g, '\\#')
					.replace(/\+/g, '\\+')
					.replace(/-/g, '\\-')
					.replace(/=/g, '\\=')
					.replace(/\|/g, '\\|')
					.replace(/{/g, '\\{')
					.replace(/}/g, '\\}')
					.replace(/\./g, '\\.')
					.replace(/!/g, '\\!');

		}
	}
};
