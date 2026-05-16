const mongoose = require("mongoose");
const Auction = require("./models/Auction");

mongoose.connect("YOUR_MONGODB_URL")
.then(() => {
   console.log("MongoDB Connected");
   removeDuplicates();
});

async function removeDuplicates(){

   const auctions = await Auction.find();

   const titles = [];

   for(const auction of auctions){

      if(titles.includes(auction.title)){

         await Auction.findByIdAndDelete(auction._id);

         console.log("Deleted Duplicate:", auction.title);

      }else{

         titles.push(auction.title);

      }

   }

   console.log("Duplicate Removal Completed");

   process.exit();

}