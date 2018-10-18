var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
		username: String,
		password: String,

		id: String,
		token: String,
		email: String,
		name: String
	
});

UserSchema.plugin(passportLocalMongoose);	//bring important methods

module.exports = mongoose.model("User", UserSchema);