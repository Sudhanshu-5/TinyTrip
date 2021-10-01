var mongoose = require("mongoose");

var StateListSchema = new mongoose.Schema({
   
   stateName:String,
   stateImage:[{
      type: mongoose.Schema.Types.ObjectId,
           ref: "UploadedFile"
      }],
});
module.exports = mongoose.model("StateList",StateListSchema);
    