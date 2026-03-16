const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const http = require("http");
const { Server } = require("socket.io");

const auctionRoutes = require("./routes/auctionRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
  cors:{
    origin:"*"
  }
});

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/auctionDB")
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err));

app.use("/api/auction", auctionRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req,res)=>{
  res.send("Auction API running");
});

io.on("connection",(socket)=>{
  console.log("User connected");

  socket.on("newBid",(data)=>{

 io.emit("bidUpdate",data);

 if(data.previousBidder){
   io.emit("outbid",data);
 }

});

  socket.on("disconnect",()=>{
    console.log("User disconnected");
  });

});

server.listen(5000,()=>{
  console.log("Server running on port 5000");
});