const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

 name:String,
 email:String,
 password:String,

 role:{
  type:String,
  enum:["admin","bidder"]
 },

 credits:{
  type:Number,
  default:1000000
 }

});

module.exports = mongoose.model("User",userSchema);