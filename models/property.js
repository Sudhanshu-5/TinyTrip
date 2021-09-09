const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
 propertyName:String,
 location:{
   
    type: mongoose.Schema.Types.ObjectId,
     ref: "LocationList"
},
 state:{
    type: mongoose.Schema.Types.ObjectId,
     ref: "StateList"

},
 propertyImage:String,
 propertyType:String,
 weekendHolidayPackagePrice:String,
 minimumCost:String,
 bestTimeToVisit:String

});

module.exports = mongoose.model('Property', PropertySchema);
