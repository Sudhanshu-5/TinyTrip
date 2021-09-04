const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
 propertyName:String,
 location:String,
 state:String,
 propertyImage:String,
 propertyType:String


});

module.exports = mongoose.model('Property', PropertySchema);
