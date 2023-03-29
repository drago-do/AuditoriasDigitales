const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  linkTo: { type: mongoose.Schema.Types.Mixed, index: true },
  name: { type: String },
  img: {
    data: Buffer,
    contentType: String,
  },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
