const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  startTime: Date,
  endTime: Date,
  minBid: Number,
  currentBid: {
    type: Number,
    default: 0
  },
  highestBidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
   bids:[
  {
   bidder:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
   },
   amount:Number,
   time:{
    type:Date,
    default:Date.now
   }
  }
 ]

});

module.exports = mongoose.model("Auction", auctionSchema);