# Telegramify-Markdown

[![Build](https://img.shields.io/github/actions/workflow/status/skoropadas/telegramify-markdown/release.yml?branch=master)](https://github.com/skoropadas/telegramify-markdown/actions)
[![codecov](https://codecov.io/gh/skoropadas/telegramify-markdown/branch/master/graph/badge.svg?token=LxCmgGNUHl)](https://codecov.io/gh/skoropadas/telegramify-markdown)
![License](https://img.shields.io/github/license/skoropadas/telegramify-markdown)

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
# Header
## Subheader

[1.0.0](http://version.com)

* item 1
* item 2
* item 3

And simple text with + some - symbols.
`;

telegramifyMarkdown(markdown);
/*
 *Header*
 *Subheader*
 
[1\.0\.0](http://version.com)

 • item 1
 • item 2
 • item 3

And simple text with \+ some \- symbols\.
*/
```

[MIT Licence](LICENSE)
