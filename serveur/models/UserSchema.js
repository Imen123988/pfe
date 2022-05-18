const mongoose = require("mongoose");
const uuidv1 = require("uuidv1");
const crypto = require("crypto");
const userSalSchema = new mongoose.Schema({
  nomsal: {
    type: String,
    required: true,
  },
  prenomsal: {
    type: String,
    required: true,
  },
  telsal: {
    type: String,
    required: true,
  },
  postsal: {
    type: String,
    required: true,
  },
  emailsal: {
    type: String,
    required: true,
    unique: true,
  },
  mdpsal: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
});
// userSalSchema.virtual("_mdpsal").set(function (password) {
//   //create temp variable called _password
//   this._mdpsal = password;

//   //generate a timestamp, uuidv1 gives us the unix timestamp
//   this.salt = uuidv1();

//   //encrypt the password function call
//   this.mdpsal = this.encryptPassword(password);
// });

// //methods
// userSalSchema.methods = {
//   encryptPassword: function (password) {
//     if (!password) return "";
//     try {
//       return crypto
//         .createHmac("sha256", this.salt)
//         .update(password)
//         .digest("hex");
//     } catch (err) {
//       return "";
//     }
//   },
//   authentificate: function (plainText) {
//     return this.encryptPassword(plainText) === this.mdpsal;
//   },
// };

const usersal = new mongoose.model("usersal", userSalSchema);
//virtual field

module.exports = usersal;
