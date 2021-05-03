const convert = require('../lib/convert');

describe('Test convert method', () => {
	it('It should convert links', () => {
		expect(
			convert(`[go.o.gle](https://google.com/)`)
		)
			.toBe('[go\.o\.gle](https://google.com/)');
	})
})
