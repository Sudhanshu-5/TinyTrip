var mongoose = require("mongoose");

var OfferingsSchema = new mongoose.Schema({
    typeOfPackage: {
        type: String,
        enum : ['package1','package2'],
        default: 'package1'
    },
  
    packageDescription:String,
    packageImgs :[{
        type:String
       }],
    package_Price:Number,
});
module.exports = mongoose.model("Offerings",OfferingsSchema);
    