var mongoose = require("mongoose");

var LocationSchema = new mongoose.Schema({
   
   locationName:String,
   hotels: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotels"
    }],
    locationLandMarkimage:String,
    minimumCost:String
});
module.exports = mongoose.model("Location",LocationSchema);
    