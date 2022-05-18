const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nomsal: {
        type:String,
        required:true
    },
    prenomsal: {
        type: String,
        required:true
    },
    telsal: {
        type: String,
        required:true
    },
    postsal:{
        type: String,
        required:true
    },
    emailsal: {
        type: String,
        required:true,
        unique:true
    },
    mdpsal: {
        type: String,
        required:true,
        unique:true
    },
    
});

const usersal =  new mongoose.model("usersal", userSchema);


module.exports = usersal;