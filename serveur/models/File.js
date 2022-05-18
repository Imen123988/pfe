// create file schema mongoose
const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usersal",
  },
});

const file = new mongoose.model("file", fileSchema);

module.exports = file;
