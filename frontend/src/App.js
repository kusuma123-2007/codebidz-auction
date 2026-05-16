import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Auctions from "./pages/Auctions";
import CreateAuction from "./pages/CreateAuction";
import AdminDashboard from "./pages/AdminDashboard";
import BidderDashboard from "./pages/BidderDashboard";
import MyBids from "./pages/MyBids";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/auctions" element={<Auctions />} />


        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route path="/bidder-dashboard" element={<BidderDashboard />} />
        <Route path="/create-auction" element={<CreateAuction />} />
        <Route path="/my-bids" element={<MyBids />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;