var mongoose = require("mongoose");

var LocationListSchema = new mongoose.Schema({
   
   locatioName:String,
   locationImage:String
});
module.exports = mongoose.model("LocationList",LocationListSchema);
    