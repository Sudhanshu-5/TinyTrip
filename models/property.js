const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
   propertyName:String,

   
   distance_From:String,
   distance:String,
   hotel_Address :String,
   minimum_Price : Number, // Lowest price amongst the above offernings.
   hotel_Heading_Img:String, //URL for the main header image
   hotel_Heading_Text:String,
 
   offerings:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offerings"
      }, //Array of offers like 2/3 Nights,etc
   additionalInfo:{
         type: mongoose.Schema.Types.ObjectId,
         ref: "AdditionalInfo"
         }, 
   propertyImage:[{
         type:String
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
