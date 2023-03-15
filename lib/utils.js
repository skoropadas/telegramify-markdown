const { URL } = require('url');

function wrap(string, ...wrappers) {
	return [
		...wrappers,
		string,
		...wrappers.reverse(),
	].join('');
}

function isURL(string) {
	try {
		return Boolean(new URL(string));
	} catch (error) {
		return false;
	}
}

function escapeSymbols(text, textType = 'text') {
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

function processUnsupportedTags(content, strategy) {
	switch (strategy) {
		case 'escape':
			return escapeSymbols(content);
		case 'remove':
			return '';
		case 'keep':
		default:
			return content;
	}
}

module.exports = {
	wrap,
	isURL,
	escapeSymbols,
	processUnsupportedTags,
};
