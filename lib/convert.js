const gfm = require('remark-gfm');
const parse = require('remark-parse');
const stringify = require('remark-stringify');
const removeComments = require('remark-remove-comments');
const unified = require('unified');

const { collectDefinitions, removeDefinitions } = require('./definitions');
const createTelegramifyOptions = require('./telegramify');

module.exports = (markdown, unsupportedTagsStrategy) => {
	const definitions = {};

	const telegramifyOptions = createTelegramifyOptions(definitions, unsupportedTagsStrategy);

	return unified()
		.use(parse)
		.use(gfm)
		.use(removeComments)
		.use(collectDefinitions, definitions)
		.use(removeDefinitions)
		.use(stringify, telegramifyOptions)
		.processSync(markdown)
		.toString()
		.replaceAll(/<!---->\n/g, '');
};
