var mongoose = require("mongoose");

var LocationListSchema = new mongoose.Schema({
   
   locatioName:String,
   locationImage:[{
      type: mongoose.Schema.Types.ObjectId,
           ref: "UploadedFile"
      }],
});
module.exports = mongoose.model("LocationList",LocationListSchema);
    