import { useEffect,useState } from "react";
import API from "../services/api";

function MyBids(){

 const [bids,setBids] = useState([]);

 useEffect(()=>{
  fetchBids();
 },[]);

 const fetchBids = async()=>{

  const userId = localStorage.getItem("userId");

  const res = await API.get(`/auction/user-bids/${userId}`);

  setBids(res.data);

 };

 return(

  <div>
   <h2>My Bids</h2>

   {bids.map((auction)=>(
    <div key={auction._id}>
      <h3>{auction.title}</h3>
      <p>Current Bid: ₹{auction.currentBid}</p>
    </div>
   ))}

  </div>

 );

}

export default MyBids;