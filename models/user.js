var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
		username: String,
		password: String,
		googleId: String	
});

UserSchema.plugin(passportLocalMongoose);	//bring important methods

module.exports = mongoose.model("User", UserSchema);