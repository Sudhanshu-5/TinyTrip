var mongoose = require("mongoose");

var LocationSchema = new mongoose.Schema({
   
   locationName:{
   
           type: mongoose.Schema.Types.ObjectId,
            ref: "LocationList"

    
   },
   properties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property"
    }]
 
});
module.exports = mongoose.model("Location",LocationSchema);
    