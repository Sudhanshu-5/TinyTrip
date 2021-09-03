var mongoose = require("mongoose");

var StateSchema = new mongoose.Schema({
    
   stateName:String,
   name:String,
   locations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location"
    }],
    hotels: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel"
    }],
    stateLandMarkimage:String
  
});
module.exports = mongoose.model("State",StateSchema);
