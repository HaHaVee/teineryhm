var assert = require('assert');

describe('securebadger page', function(){
	it('should have the right title', function(){
		browser.url('/');
		var title = browser.getTitle();
		assert.equal(title, 'Securebadger Contract Wizard');
	});
});