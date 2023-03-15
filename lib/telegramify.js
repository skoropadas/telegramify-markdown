const defaultHandlers = require('mdast-util-to-markdown/lib/handle');
const phrasing = require('mdast-util-to-markdown/lib/util/container-phrasing');

const {wrap, isURL, escapeSymbols, processUnsupportedTags} = require('./utils');

/**
 * Creates custom `mdast-util-to-markdown` handlers that tailor the output for
 * Telegram Markdown.
 *
 * @param {Readonly<Record<string, { title: null | string, url: string }>>} definitions
 * Record of `Definition`s in the Markdown document, keyed by identifier.
 *
 * @returns {import('mdast-util-to-markdown').Handlers}
 */
const createHandlers = (definitions, unsupportedTagsStrategy) => ({
	heading: (node, _parent, context) => {
		// make headers to be just *strong*
		const marker = '*';

		const exit = context.enter('heading');
		const value = phrasing(node, context, {before: marker, after: marker});
		exit();

		return wrap(value, marker);
	},

	strong: (node, _parent, context) => {
		const marker = '*';

		const exit = context.enter('strong');
		const value = phrasing(node, context, {before: marker, after: marker});
		exit();

		return wrap(value, marker);
	},

	delete(node, _parent, context) {
		const marker = '~';

		const exit = context.enter('delete');
		const value = phrasing(node, context, {before: marker, after: marker});
		exit();

		return wrap(value, marker);
	},

	emphasis: (node, _parent, context) => {
		const marker = '_';

		const exit = context.enter('emphasis');
		const value = phrasing(node, context, {before: marker, after: marker});
		exit();

		return wrap(value, marker);
	},

	list: (...args) => defaultHandlers.list(...args).replace(/^(\d+)./gm, '$1\\.'),

	listItem: (...args) => defaultHandlers.listItem(...args).replace(/^\*/, '•'),

	code(node, _parent, context) {
		const exit = context.enter('code');
		// delete language prefix for deprecated markdown formatters (old Bitbucket Editor)
		const content = node.value.replace(/^#![a-z]+\n/, ''); // ```\n#!javascript\ncode block\n```
		exit();

		return wrap(escapeSymbols(content, 'code'), '```', '\n');
	},

	link: (node, _parent, context) => {
		const exit = context.enter('link');
		const text = phrasing(node, context, {before: '|', after: '>'}) || escapeSymbols(node.title);
		const url = encodeURI(node.url);
		exit();

		if (!isURL(url)) return escapeSymbols(text) || escapeSymbols(url);

		return text
			? `[${text}](${escapeSymbols(url, 'link')})`
			: `[${escapeSymbols(url)}](${escapeSymbols(url, 'link')})`;
	},

	linkReference: (node, _parent, context) => {
		const exit = context.enter('linkReference');
		const definition = definitions[node.identifier];
		const text = phrasing(node, context, {before: '|', after: '>'}) || (definition ? definition.title : null);
		exit();

		if (!definition || !isURL(definition.url)) return escapeSymbols(text);

		return text
			? `[${text}](${escapeSymbols(definition.url, 'link')})`
			: `[${escapeSymbols(definition.url)}](${escapeSymbols(definition.url, 'link')})`;
	},

	image: (node, _parent, context) => {
		const exit = context.enter('image');
		const text = node.alt || node.title;
		const url = encodeURI(node.url);
		exit();

		if (!isURL(url)) return escapeSymbols(text) || escapeSymbols(url);

		return text
			? `[${escapeSymbols(text)}](${escapeSymbols(url, 'link')})`
			: `[${escapeSymbols(url)}](${escapeSymbols(url, 'link')})`;
	},

	imageReference: (node, _parent, context) => {
		const exit = context.enter('imageReference');
		const definition = definitions[node.identifier];
		const text = node.alt || (definition ? definition.title : null);
		exit();

		if (!definition || !isURL(definition.url)) return escapeSymbols(text);

		return text
			? `[${escapeSymbols(text)}](${escapeSymbols(definition.url, 'link')})`
			: `[${escapeSymbols(definition.url)}](${escapeSymbols(definition.url, 'link')})`;
	},

	text: (node, _parent, context) => {
		const exit = context.enter('text');
		const text = node.value;
		exit();

		return escapeSymbols(text);
	},

	blockquote: (node, _parent, context) =>
		processUnsupportedTags(defaultHandlers.blockquote(node, _parent, context), unsupportedTagsStrategy),
	html: (node, _parent, context) =>
		processUnsupportedTags(defaultHandlers.html(node, _parent, context), unsupportedTagsStrategy),
});

/**
 * Creates options to be passed into a `remark-stringify` processor that tailor
 * the output for Telegram Markdown.
 *
 * @param {Readonly<Record<string, { title: null | string, url: string }>>} definitions
 * Record of `Definition`s in the Markdown document, keyed by identifier.
 *
 * @returns {import('remark-stringify').RemarkStringifyOptions}
 */
const createOptions = (definitions, unsupportedTagsStrategy) => ({
	bullet: '*',
	tightDefinitions: true,
	handlers: createHandlers(definitions, unsupportedTagsStrategy),
});

module.exports = createOptions;
