var express = require("express");
var app = express();
var path = require("path");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/demo");

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