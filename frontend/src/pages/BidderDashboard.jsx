import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/BidderDashboard.css";

function BidderDashboard(){

 const [credits,setCredits] = useState(0);

 const logout = () => {

 localStorage.removeItem("userId");

 window.location.href = "/";

};

 useEffect(()=>{
  fetchUser();
 },[]);

 const fetchUser = async ()=>{
  try{
   const res = await API.get("/auth/user");
   setCredits(res.data.credits);
  }catch(err){
   console.log(err);
  }
 };

 return(

  <div className="bidder-container">

    <button onClick={logout} className="logout-btn">
  Logout
 </button>

   <h1 className="dashboard-title">Bidder Dashboard</h1>

   <div className="dashboard-cards">

    <div className="card credit-card">
      <h3>Your Credits</h3>
      <p>{credits}</p>
    </div>

    <div className="card action-card">
      <h3>Browse Auctions</h3>
      <a href="/auctions">
        <button>View Auctions</button>
      </a>
    </div>

    <div className="card action-card">
      <h3>My Bids</h3>
      <a href="/my-bids">
        <button>View Bidding History</button>
      </a>
    </div>

    <div className="card action-card">
  <h3>Create Auction</h3>

  <a href="/create-auction">
    <button>Create Auction</button>
  </a>
</div>
   </div>

   <div className="info-section">

    <h2>Welcome to the Auction Platform</h2>

    <p>
      Browse active auctions, place bids, and track your bidding history.
      Use your credits wisely to win exciting items.
    </p>

   </div>
  </div>

 );

}

export default BidderDashboard;