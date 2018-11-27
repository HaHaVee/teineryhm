var mongoose = require("mongoose");
//var Schema =mongoose.Schema;
//var passportLocalMongoose = require("passport-local-mongoose");

var contractListSchema = new mongoose.Schema({
	nameOfOwner: String,
	contracts: [Schema.Types.ObjectId]
});

module.exports = mongoose.model("ContractList", contractListSchema);