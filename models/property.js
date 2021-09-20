const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
   propertyName:String,
   distance_From:String,
   distance:String,
   propertyType:{
      type:String,
      enum:["Villa","Hotel"]
   },
   property_Address :String,
   minimum_Price : String, // Lowest price amongst the above offernings.
   prperty_Heading_Img:String, //URL for the main header image
   property_Heading_Text:String,
   highlights:String,
   wayToTransport:[{
       type:String
   }],//By air,car,train,etc. 
   thingsToDo:String,
   offerings:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offerings"
   
      }], //Array of offers like 2/3 Nights,etc
   // additionalInfo:{
   //       type: mongoose.Schema.Types.ObjectId,
   //       ref: "AdditionalInfo"
   //       }, 
   propertyImage:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "UploadedFile"
        }],
    
   location:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "LocationList"
    },
   state:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "StateList"
  
  }

});

module.exports = mongoose.model('Property', PropertySchema);
