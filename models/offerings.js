var mongoose = require("mongoose");

var OfferingsSchema = new mongoose.Schema({
    typeOfPackage: {
        type: String,
    
    },
  
    packageDescription:String,
    packageImgs:[{
        type: mongoose.Schema.Types.ObjectId,
             ref: "UploadedFile"
        }],
    package_Price:String,
});
module.exports = mongoose.model("Offerings",OfferingsSchema);
    