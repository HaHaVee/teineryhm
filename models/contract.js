var mongoose = require("mongoose");
//var passportLocalMongoose = require("passport-local-mongoose");

var contractInfoSchema = new mongoose.Schema({
	timeFrame: String,
	nameOfOwner: String,
	nameOfTenant: String,
	rentSumCurrency: String,
	dueDate: String,
	objectAddress: String,
	spaceForRent: Number,
	otherConditions: String,
	contractName: String
});

//bring important methods
//contractInfoSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Contract", contractInfoSchema);