var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var AdminSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: true,
      },
      encryptedPassword: {
        type: String,
        required: true,
      }  
});

AdminSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("Admin", AdminSchema);
