import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/AdminDashboard.css";

function AdminDashboard(){

 const [auctions,setAuctions] = useState([]);

 const logout = () => {

 localStorage.removeItem("userId");

 window.location.href = "/";

};

 useEffect(()=>{
  fetchAuctions();
 },[]);

 const fetchAuctions = async ()=>{
  const res = await API.get("/auction/all");
  setAuctions(res.data);
 };

 return(

  <div className="admin-container">
    <button onClick={logout}>Logout</button>

   <h1 className="admin-title">Admin Dashboard</h1>

   <div>
  
  <a href="/auctions">
    <button>View Auctions</button>
  </a>

</div>

   <div className="admin-cards">

    <div className="card">
      <h3>Total Auctions</h3>
      <p>{auctions.length}</p>
    </div>

    <div className="card">
      <h3>Active Auctions</h3>
      <p>{auctions.length}</p>
    </div>

    <div className="card">
      <h3>Total Bids</h3>
      <p>--</p>
    </div>

   </div>

   <div className="create-btn-area">
     <a href="/create-auction">
       <button>Create New Auction</button>
     </a>
   </div>

   <h2>All Auctions</h2>

   <table className="auction-table">

    <thead>

     <tr>
      <th>Title</th>
      <th>Current Bid</th>
      <th>End Time</th>
     </tr>

    </thead>

    <tbody>

     {auctions.map((a)=> (

      <tr key={a._id}>

       <td>{a.title}</td>

       <td>₹{a.currentBid || a.minBid}</td>

       <td>{new Date(a.endTime).toLocaleString()}</td>

      </tr>

     ))}

    </tbody>

   </table>
   <button onClick={logout}>Logout</button>

  </div>

 );

}

export default AdminDashboard;