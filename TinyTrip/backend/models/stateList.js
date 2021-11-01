var mongoose = require("mongoose");

var StateListSchema = new mongoose.Schema({
   
   stateName:String,
   stateImage:String
});
module.exports = mongoose.model("StateList",StateListSchema);
    