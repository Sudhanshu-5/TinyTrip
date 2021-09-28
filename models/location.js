var mongoose = require("mongoose");

var LocationSchema = new mongoose.Schema({
   
  
    
 locationImage:[{
    type: mongoose.Schema.Types.ObjectId,
         ref: "UploadedFile"
    }], 
    location_Heading_Text:String,
    locationName:{
    type: mongoose.Schema.Types.ObjectId,
         ref: "LocationList"
    },
    properties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property"
    }],
    isPopular:Boolean
    
});
module.exports = mongoose.model("Location",LocationSchema);
    