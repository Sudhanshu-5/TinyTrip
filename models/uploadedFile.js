var mongoose = require("mongoose");

    const UploadedFileSchema = new mongoose.Schema({
        path: String,
        type: String,
        size: Number,
        folder: String,
        filename: String,
        profilePhotoLocation: {
            type: String,
          },
  })
  module.exports = mongoose.model("UploadedFile", UploadedFileSchema);
