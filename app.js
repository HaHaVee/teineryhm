var express = require("express"),
	path = require("path"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	User = require("./models/user"),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose");

var url = process.env.VRDB || "mongodb://localhost/demo"; //backup 4 good practice
mongoose.connect(url);

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
	secret: "Mu kutsa nimi on Arro",
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

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "/saladus"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.use(express.static(__dirname + "/public"));

// ========================================================
// ROUTES
// ========================================================

app.get("/", function(req, res){
	res.sendFile(path.join(__dirname+'/views/index.html'));
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

app.get("/votted", function(req, res){
	res.sendFile(path.join(__dirname+'/views/votted.html'));
});
app.get("/saladus", isLoggedIn, function(req, res){
	res.sendFile(path.join(__dirname+'/views/saladus.html'));
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

app.get("*", function(req, res){
	res.send("Seda lehte ei eksisteeri.");
});


var port = process.env.PORT || 80;
var host = "0.0.0.0";
app.listen(port, host, function() {
  console.log("Server started");
});