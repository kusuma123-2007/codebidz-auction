import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Marketplace.css";
import { io } from "socket.io-client";

const socket = io("https://auction-backend-09hk.onrender.com");

function Auctions(){

 const [auctions,setAuctions] = useState([]);
 const [bidAmount,setBidAmount] = useState("");

useEffect(()=>{

 fetchAuctions();

 socket.on("bidUpdate",()=>{
  fetchAuctions();
 });

 socket.on("outbid",(data)=>{

  const userId = localStorage.getItem("userId");

  if(data.previousBidder === userId){
   alert("You have been outbid!");
  }

 });

},[]);

 const fetchAuctions = async ()=>{

  const res = await API.get("/auction/all");
  setAuctions(res.data);

 };

 const placeBid = async(id)=>{

 try{

  const res = await API.post(`/auction/bid/${id}`,{
   amount:Number(bidAmount),
   userId: localStorage.getItem("userId")
  });

  socket.emit("newBid",{
   auctionId:id,
   previousBidder: res.data.previousBidder
  });

  alert("Bid placed successfully");

  fetchAuctions();

 }catch(error){

  alert("Bid failed");

 }

};
const getRemainingTime = (endTime) => {

 const total = Date.parse(endTime) - Date.now();

 const seconds = Math.floor((total/1000)%60);
 const minutes = Math.floor((total/1000/60)%60);
 const hours = Math.floor((total/(1000*60*60))%24);

 if(total <= 0){
   return "Auction ended";
 }

 return `${hours}h ${minutes}m ${seconds}s`;

};

const isAuctionEnded = (endTime) => {

 return new Date() > new Date(endTime);

};
 return(

  <div className="marketplace">

   <h2>Live Auctions</h2>

   <div className="auction-grid">

    {auctions.map((auction)=> (

     <div className="auction-card" key={auction._id}>

      <img src={auction.image} alt="product"/>

      <h3>{auction.title}</h3>

      <p>{auction.description}</p>

      <p className="timer">
       Ends in: {getRemainingTime(auction.endTime)}
    </p>

    {isAuctionEnded(auction.endTime) && auction.highestBidder && (

 <p className="winner">
  Winner: {auction.highestBidder.name}
 </p>

)}

      <p className="bid">
       Current Bid: ₹{auction.currentBid || auction.minBid}
      </p>
     
     {auction.highestBidder === localStorage.getItem("userId") && (
 <p className="winner-badge">⭐ You are the highest bidder</p>
)}
      <input
       type="number"
       placeholder="Enter your bid"
       onChange={(e)=>setBidAmount(e.target.value)}
      />

      <button
 className="bid-btn"
 disabled={isAuctionEnded(auction.endTime)}
 onClick={()=>placeBid(auction._id)}
>
 {isAuctionEnded(auction.endTime) ? "Auction Ended" : "Place Bid"}
</button>

     </div>

    ))}

   </div>

  </div>

 );

}

export default Auctions;