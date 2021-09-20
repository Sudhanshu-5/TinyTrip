var mongoose = require("mongoose");
// var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: true,
      },
      encryptedPassword: { type: String, required: true }
      ,
      role: {
        type: String,
        enum: ['admin', 'user'],
        required: true
      }
  
});

// UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema);
