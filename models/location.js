var mongoose = require("mongoose");

var LocationSchema = new mongoose.Schema({
   
   locationName:String,
   properties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property"
    }],
    locationLandMarkimage:String,
    minimumCost:String
});
module.exports = mongoose.model("Location",LocationSchema);
    