var assert = require('assert');

describe('Securebadger homepage', function(){
	it('Has the right title', function(){
		browser.url('/');
		var title = browser.getTitle();
		assert.equal(title, 'Securebadger Contract Wizard');
	});

	it('Cancel button redirects to homepage', function(){
		browser.url('/');
		var cancelBtn = 'a[id="cancelbutton"]';
		browser.click(cancelBtn);
		var url = browser.getUrl();
		assert.equal(url, "https://blooming-mesa-29689.herokuapp.com/");
	});

	it('Clicking "Save & next" without filling necessary information does not lead customer to next page', function(){
		browser.url('/');
		var nextBtn = 'input[id="nextbutton"]';
		browser.click(nextBtn);
		var url = browser.getUrl();
		assert.equal(url, "https://blooming-mesa-29689.herokuapp.com/");
	});

	it('Filling form correctly and clicking "Next.." leads client to "/second"', function(){
		browser.url('/');
		browser.click('input[id="openend"]');
		browser.setValue('input[id="ownername"]', "Vladimir Vihmauss");
		browser.setValue('input[id="tenantname"]', "Peeter Paul");
		browser.setValue('input[id="suminput"]', "400");

		browser.click('select[id="currency"]');
		browser.click('option[value="eur"]');

		browser.setValue('#rentdate', '1');
		browser.setValue('#objectaddress', 'Tiigi 14');
		browser.setValue('#space', "50");

		browser.click('#nextbutton');

		var pagenumber = browser.getText('#pagenumber');
		assert.equal(pagenumber, '2/4');
	});
});

describe('/second', function(){
	it('Go to "/third"', function(){
		browser.url('/second');
		browser.click('#nextbutton');
		browser.pause(5000);

		var pagenumber = browser.getText('#pagenumber');
		assert.equal(pagenumber, '3/4');
	});
});

describe('/third', function(){
	it('Enter valid inputs and go to "/fourth"', function(){
		browser.url('/third');
		browser.click('#contracts');
		browser.click('option:nth-child(2)');
		browser.setValue('#tenantEmail', "vladimir@vihmauss.com");
		browser.click('#nextbutton');

		browser.pause(5000);
		var pagenumber = browser.getText('#pagenumber');
		assert.equal(pagenumber, '4/4');
	});
});

describe('/login', function(){
	it('Cannot login with random username and password', function(){
		browser.url('/login');
		browser.setValue('input[id="username"]', 'random');
		browser.setValue('input[id="password"]', 'random');
		browser.click('button');
		var url = browser.getUrl();
		assert.equal(url, 'https://blooming-mesa-29689.herokuapp.com/login');
	});

	it('Loging in with Google account redirects to "/saladus" while Google account is not saved', function(){
		// User does not need to be logged in.
		// User has to input their username and password, then click "Next".
		browser.url('/login');
		browser.click('a[href="/auth/google"]');
		browser.pause(6000);

		//set your username as the second parameter
		browser.setValue('input[id="identifierId"]', 'kolizei.annaabi');
		browser.click('div[id="identifierNext"]');
		browser.pause(3000);
		//set your password as the second parameter
		browser.setValue('input[type="password"]', '');
		browser.click('div[id="passwordNext"]');
		browser.pause(3000);

		var title = browser.getTitle();
		assert.equal(title, "Saladus");
	});

	it('Loging in with Google account redirect to "/saladus" while Google account is saved', function(){
		// User needs to be logged into Google account
		// so that user could be redirected straight into "/saladus"
		browser.url('/saladus');
		browser.click('a[href="/logout"]');
		browser.pause(2000);
		browser.click('a[href="/login"]');
		browser.click('a[href="/auth/google"]');
		browser.pause(3000);

		var title = browser.getTitle();
		assert.equal(title, 'Saladus');
	});

	it("Client can login with correct username and password", function(){
		browser.url('/login');
		browser.setValue('input[id="username"]', 'veebirakendused');
		browser.setValue('input[id="password"]', 'veebirakendused');
		browser.click('button');
		var title = browser.getTitle();
		assert.equal(title, 'Saladus');
	});

	it("Client can register an account (with no guidelines for username and password)", function(){
		browser.url('/registreeri');
		browser.setValue('input[id="username"]', 'abfaeadf2sd1A*. ,!');
		browser.setValue('input[id="password"]', 'aajnraasdeq3__. ?_');
		browser.click('button');
		browser.pause(1000);

		var title = browser.getTitle();
		assert.equal(title, 'Saladus');
	});

	it("Cannot register an account that is already in use.", function(){
		browser.url('/registreeri')
		browser.setValue('input[id="username"]', 'abfaeadf2sd1A*. ,!');
		browser.setValue('input[id="password"]', 'aajnraasdeq3__. ?_');
		browser.click('button');
		browser.pause(1000);

		var title = browser.getTitle();
		assert.equal(title, 'Registreerimine');
	});
});