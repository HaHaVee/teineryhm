var express = require("express");
var app = express();

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
	res.send("homepage");
});

var port = 80;
var host = "0.0.0.0";
app.listen(port, host, function() {
  console.log("Server started");
});