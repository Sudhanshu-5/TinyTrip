const mongoose = require('mongoose');

const Hotels = new mongoose.Schema({
 hotelName:String,
 location:String,
 state:String,
 hotelImage:String

});

module.exports = mongoose.model('Hotel', Hotels);
