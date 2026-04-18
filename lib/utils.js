const {URL} = require('url');

function wrap(string, ...wrappers) {
	return [...wrappers, string, ...wrappers.reverse()].join('');
}

function isURL(string) {
	try {
		return Boolean(new URL(string));
	} catch (error) {
		return false;
	}
}

const emojiRegex = new RegExp(
	'^\\p{Extended_Pictographic}' +
		'(?:\\p{Emoji_Modifier})?' +
		'(?:\\uFE0F)?' +
		'(?:\\u200D(?:\\p{Extended_Pictographic}|\\p{Emoji})' +
		'(?:\\p{Emoji_Modifier})?' +
		'(?:\\uFE0F)?)*$',
	'u',
);

function isEmoji(text) {
	return typeof text === 'string' && emojiRegex.test(text);
}

function isTelegramMediaUrl(url, text) {
	if (typeof url !== 'string') return false;
	if (url.startsWith('tg://time')) return true;
	if (url.startsWith('tg://emoji')) return isEmoji(text);
	return false;
}

function escapeSymbols(text, textType = 'text') {
	if (!text) {
		return text;
	}
	switch (textType) {
		case 'code':
			return text.replace(/\\/g, '\\\\').replace(/`/g, '\\`');
		case 'link':
			return text.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
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
	isEmoji,
	isTelegramMediaUrl,
	escapeSymbols,
	processUnsupportedTags,
};
