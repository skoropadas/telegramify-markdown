# Telegramify-Markdown

[![CircleCI](https://circleci.com/gh/skoropadas/telegramify-markdown.svg?style=svg)](https://circleci.com/gh/skoropadas/telegramify-markdown)
[![codecov](https://codecov.io/gh/skoropadas/telegramify-markdown/branch/master/graph/badge.svg?token=LxCmgGNUHl)](https://codecov.io/gh/skoropadas/telegramify-markdown)

Telegramify-Markdown is a Markdown
to [Telegram-specific-markdown](https://core.telegram.org/bots/api#formatting-options) converter, based
on [Unified](https://github.com/unifiedjs/unified) and [Remark](https://github.com/remarkjs/remark/).

## Install

```bash
npm install telegramify-markdown
```

## Usage

```js
const telegramifyMarkdown = require('telegramify-markdown');
const markdown = `
# List of items 

[1.0.0](http://version.com)

* item 1
* item 2
* item 3

And simple text with + some - symbols.
`;

telegramifyMarkdown(markdown);
/*
 *List of items*
 
[1\.0\.0](http://version.com)

 • item 1
 • item 2
 • item 3

And simple text with \+ some \- symbols\.
*/
```

[MIT Licence](LICENSE)
