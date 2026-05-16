const express = require("express");
const router = express.Router();

const Auction = require("../models/Auction");
const User = require("../models/User");

const mongoose = require("mongoose");

router.get("/user-bids/:userId", async (req,res)=>{

 try{

  const userId = new mongoose.Types.ObjectId(req.params.userId);

  const auctions = await Auction.find({
   "bids.bidder": userId
  });

  res.json(auctions);

 }catch(error){

  console.log(error);
  res.status(500).json({message:"Failed to fetch bids"});

 }

});

// Create Auction
router.post("/create", async (req,res)=>{

 const auction = new Auction(req.body);

 await auction.save();

 res.json({
  message:"Auction created successfully",
  auction
 });

});

// Get All Auctions
router.get("/all", async (req,res)=>{

 const auctions = await Auction.find()
 .populate("highestBidder","name");

 res.json(auctions);

});

// Place Bid
router.post("/bid/:id", async (req,res)=>{

 try{

  const {amount,userId} = req.body;

  const auction = await Auction.findById(req.params.id);
  const user = await User.findById(userId);

  const previousBidder = auction.highestBidder;
  if(!auction){
   return res.status(404).json({message:"Auction not found"});
  }

  if(amount <= auction.currentBid || amount < auction.minBid){
   return res.status(400).json({message:"Bid must be higher"});
  }

  if(user.credits < amount){
   return res.status(400).json({message:"Not enough credits"});
  }

  auction.currentBid = amount;
  auction.highestBidder = userId;

  auction.bids.push({
   bidder:userId,
   amount
  });

  await auction.save();

  res.json({
   message:"Bid placed successfully",
   auction
  });

 }catch(error){

  console.log(error);
  res.status(500).json({message:"Bid failed"});

 }

});

module.exports = router;