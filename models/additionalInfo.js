var mongoose = require("mongoose");

var AdditionalInfoSchema = new mongoose.Schema({
    highlights:String,
    wayToTransport:[{
        type:String
    }], //By air,car,train,etc.
});
module.exports = mongoose.model("AdditionalInfo",AdditionalInfoSchema);
    