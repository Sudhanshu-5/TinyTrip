var mongoose = require("mongoose");

var StateSchema = new mongoose.Schema({
    
   stateName:{
       type: mongoose.Schema.Types.ObjectId,
        ref: "StateList"

   },
   locations:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "LocationList"
        }]
});
module.exports = mongoose.model("State",StateSchema);
