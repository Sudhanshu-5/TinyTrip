var mongoose = require("mongoose");

var LocationSchema = new mongoose.Schema({
   
  
    location_Heading_Img:String, //URL for the main header image
    location_Heading_Text:String,
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
    