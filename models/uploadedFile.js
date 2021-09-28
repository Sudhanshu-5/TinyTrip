var mongoose = require("mongoose");

    const UploadedFileSchema = new mongoose.Schema({
       
        profilePhotoLocation: {
            type: String,
          },
  })
  module.exports = mongoose.model("UploadedFile", UploadedFileSchema);
