var express = require("express"),
	path = require("path"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	User = require("./models/user"),
	Contract = require("./models/contract");
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	GoogleStrategy = require("passport-google-oauth20");
	fs = require('fs');
	pdf = require('html-pdf');
	html = fs.readFileSync('./files/template.html', 'utf8');
	options = { format: 'A4' };
	XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    xhr = new XMLHttpRequest();
	
	/*cookieSession = require('cookie-session');*/

var url = process.env.VRDB || "mongodb://localhost/demo"; //backup 4 good practice
mongoose.connect(url);

/*app.use(cookieSession({
	maxAge: 24*60*60*1000,
	keys: ['olenhanshaha']
}));*/

var app = express();

app.enable("trust proxy"); //millegipärast on hea

app.use(bodyParser.urlencoded({extended: true}));

//google auth
passport.serializeUser((user, done) => {
	done(null, user.id);
});
passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user.id);
	});
});

passport.use(
	new GoogleStrategy({
		callbackURL: '/auth/google/redirect',
		clientID: process.env.GCID || '64384883783-kmeidd20r1u2etjgb47k249gjepa49ks.apps.googleusercontent.com',
		clientSecret: process.env.GCS || 'SIIxIJUbqVtc7YgyK4pe4Jaq'
	}, (accessToken, refreshToken, profile, done) => {
		User.findOne({googleId: profile.id}).then((currentUser) => {
			if (currentUser){
				console.log('user is: ' + currentUser);
				done(null, currentUser);
			} else {
				new User({
					username: profile.displayName,
					googleId: profile.id
				}).save().then((newUser) => {
						console.log("new user: " + newUser);
						done(null, newUser);
				});
			}
		});	
}));
//end

app.use(require("express-session")({
	secret: process.env.localsecret || 'Mu kutsa nimi on arro',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());	//set up passport
app.use(passport.session());	//set up passport

passport.use(new LocalStrategy(User.authenticate()));
//read sessions, take encoded data from session, unencode it, encode it, serialize it, bring back to session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//end


app.use(express.static(__dirname + "/public"));

// ========================================================
// ROUTES
// ========================================================


app.get("/", function(req, res){
	res.sendFile(path.join(__dirname+'/views/index.html'));
});
app.get("/est", function(req, res){
	res.sendFile(path.join(__dirname+'/views/index(EST).html'));
});
app.get("/robots.txt", function(req, res){
	res.sendFile(path.join(__dirname+'/robots.txt'));
});
app.get("/sitemap.xml", function(req, res){
	res.sendFile(path.join(__dirname+'/sitemap.xml'));
});
app.get("/second", function(req, res){
	res.sendFile(path.join(__dirname+'/views/page2.html'));
});
app.get("/third", function(req, res){
	res.sendFile(path.join(__dirname+'/views/page3.html'));
});
app.get("/fourth", function(req, res){
	res.sendFile(path.join(__dirname+'/views/page4.html'));
});
	app.get("/template", function(req, res){
	res.sendFile(path.join(__dirname+'/files/template.html'));
});
app.get("/lamp.pdf", function(req, res){
	res.sendFile(path.join(__dirname+'/files/lamp.pdf'));
});
	

app.get("/votted", function(req, res){
	res.sendFile(path.join(__dirname+'/views/votted.html'));
});
app.get("/saladus", isLoggedIn, function(req, res){
	res.sendFile(path.join(__dirname+'/views/saladus.html'));
});


	//create html get function
	
	function getBody(content) 
{
   test = content.toLowerCase();    // to eliminate case sensitivity
   var x = test.indexOf("<body");
   if(x == -1) return "";

   x = test.indexOf(">", x);
   if(x == -1) return "";

   var y = test.lastIndexOf("</body>");
   if(y == -1) y = test.lastIndexOf("</html>");
   if(y == -1) y = content.length;    // If no HTML then just grab everything till end

   return content.slice(x + 1, y);   
} 

function loadHTML(url, fun, storage, param)
{
	var xhr = createXHR();
	xhr.onreadystatechange=function()
	{ 
		if(xhr.readyState == 4)
		{
			//if(xhr.status == 200)
			{
				storage.innerHTML = getBody(xhr.responseText);
				fun(storage, param);
			}
		} 
	}; 

	xhr.open("GET", url , true);
	xhr.send(null); 

} 

	function processHTML(temp, target)
	{
		target.innerHTML = temp.innerHTML;
	}

	function loadWholePage(url)
	{
		var y = document.getElementById("storage");
		var x = document.getElementById("displayed");
		loadHTML(url, processHTML, x, y);
	}	
	
	function processByDOM(responseHTML, target)
	{
		target.innerHTML = "Extracted by id:<br />";

		// does not work with Chrome/Safari
		//var message = responseHTML.getElementsByTagName("div").namedItem("two").innerHTML;
		var message = responseHTML.getElementsByTagName("div").item(1).innerHTML;
		
		target.innerHTML += message;

		target.innerHTML += "<br />Extracted by name:<br />";
		
		message = responseHTML.getElementsByTagName("form").item(0);
		target.innerHTML += message.dyn.value;
	}
	
	function accessByDOM(url)
	{
		//var responseHTML = document.createElement("body");	// Bad for opera
		var responseHTML = document.getElementById("storage");
		var y = document.getElementById("displayed");
		loadHTML(url, processByDOM, responseHTML, y);
	}	

	
const { check, validationResult } = require('express-validator/check');
app.post("/", [ check('ownername').isLength({ max: 31 }), check('tenantname').isLength({ max: 31})
], function(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	else{ 
		var newContract =new Contract({
			nameOfOwner : req.body.ownername,
			timeFrame : req.body.term,
			nameOfTenant : req.body.tenantname,
			rentSumCurrency : req.body.currency,
			dueDate : req.body.rentdate,
			objectAddress : req.body.objectaddress,
			spaceForRent : req.body.rentspace,
			otherConditions : req.body.conditions,
			contractName : req.body.contractname
		});
		
		newContract.save(function(err, doc){
			if (err){
				res.json(err);
			} else res.status(200);
			var objectId = doc._id;
			 var string = encodeURIComponent(objectId);
			/*
			var doc = document.implementation.createDocument ('', 'html', null);
			var body = document.createElementNS('http://www.w3.org/1999/xhtml', 'body');
			body.setAttribute('id', 'abc');
			doc.documentElement.appendChild(body);*/
			
			pdf.create(html, options).toFile('./files/lamp.pdf', function(err, res) {
			  if (err) return console.log(err);
			  console.log(res); // { filename: '/app/businesscard.pdf' }
			});
			 res.redirect('/second?id=' + string);
		});
	}
});

app.get('/second', function(req, res) {
  var passedVariable = req.query.id;
  console.log(passedVariable);
});

// Authentication routes
// show sign up form
app.get("/registreeri", function(req, res){
	res.sendFile(path.join(__dirname+'/views/registreeri.html'));
});
// handling user sign up
app.post("/registreeri", function(req, res){
	req.body.username
	req.body.password
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if (err){
			console.log(err);
			return res.sendFile(path.join(__dirname+'/views/registreeri.html'));
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/saladus");
		})
	});
});

// LOGIN ROUTES
// login form
app.get("/login", function(req, res){
	res.sendFile(path.join(__dirname+'/views/login.html'));
})
// login logic
app.post("/login", passport.authenticate("local", {
	successRedirect: "/saladus",
	failureRedirect: "/login"
}), function(req, res){
});

// google auth
app.get('/auth/google', passport.authenticate('google', {
	scope: ['profile']
}));

app.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
	res.redirect("/saladus");
});
// google auth end

app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/votted");
});

function isLoggedIn(req, res, next){
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

/*app.get("*", function(req, res){
	res.send("Seda lehte ei eksisteeri.");
});*/


var port = process.env.PORT || 80;
var host = "0.0.0.0";
app.listen(port, host, function() {
  console.log("Server started");
});