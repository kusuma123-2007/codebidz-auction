import { useState } from "react";
import API from "../services/api";
import "../styles/Auction.css";

function CreateAuction() {

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [minBid,setMinBid] = useState("");
  const [image,setImage] = useState("");
  const [startTime,setStartTime] = useState("");
  const [endTime,setEndTime] = useState("");

  const createAuction = async (e) => {

    e.preventDefault();

    try {

      await API.post("/auction/create",{
        title,
        description,
        image,
        startTime,
        endTime,
        minBid
      });

      alert("Auction Created Successfully");

    } catch(error){

      alert("Error creating auction");

    }

  };

  return (

    <div className="auction-container">

      <div className="auction-card">

        <h2>Create New Auction</h2>

        <form onSubmit={createAuction}>

          <div className="input-group">

            <label>Auction Title</label>

            <input
              type="text"
              placeholder="Enter auction title"
              onChange={(e)=>setTitle(e.target.value)}
            />

          </div>

          <div className="input-group">

            <label>Description</label>

            <textarea
              placeholder="Enter auction description"
              onChange={(e)=>setDescription(e.target.value)}
            />

          </div>

          <div className="input-group">

            <label>Image URL</label>

            <input
              type="text"
              placeholder="Paste product image URL"
              onChange={(e)=>setImage(e.target.value)}
            />

          </div>

          <div className="input-row">

            <div>

              <label>Start Time</label>

              <input
                type="datetime-local"
                onChange={(e)=>setStartTime(e.target.value)}
              />

            </div>

            <div>

              <label>End Time</label>

              <input
                type="datetime-local"
                onChange={(e)=>setEndTime(e.target.value)}
              />

            </div>

          </div>

          <div className="input-group">

            <label>Minimum Bid</label>

            <input
              type="number"
              placeholder="Enter minimum bid"
              onChange={(e)=>setMinBid(e.target.value)}
            />

          </div>

          <button className="create-btn">
            Create Auction
          </button>

        </form>

      </div>

    </div>

  );
}

export default CreateAuction;