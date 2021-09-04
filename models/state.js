var mongoose = require("mongoose");

var StateSchema = new mongoose.Schema({
    
   stateName:String,
   name:String,
   locations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location"
    }],
    // properties: [{
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Property"
    // }],
    stateLandMarkimage:String
  
});
module.exports = mongoose.model("State",StateSchema);
