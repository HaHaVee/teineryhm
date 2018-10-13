var express = require("express"),
	path = require("path"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	User = require("./models/user"),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/demo");

var app = express();

app.use(require("express-session")({
	secret: "Mu kutsa nimi on Arro",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());	//set up passport
app.use(passport.session());	//set up passport

//read sessions, take encoded data from session, unencode it, encode it, serialize it, bring back to session
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//end

app.use(express.static(__dirname + "/public"));

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
app.get("/saladus", function(req, res){
	res.sendFile(path.join(__dirname+'/views/saladus.html'));
});

app.get("*", function(req, res){
	res.send("Seda lehte ei eksisteeri.");
});


var port = process.env.PORT || 80;
var host = "0.0.0.0";
app.listen(port, host, function() {
  console.log("Server started");
});