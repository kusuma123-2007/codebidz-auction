import { useState } from "react";
import API from "../services/api";
import "../styles/Login.css";

function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("bidder");

  const handleRegister = async (e) => {

  e.preventDefault();

  try {

    await API.post("https://auction-backend-09hk.onrender.com/api/auth/register",{
      name,
      email,
      password,
      role
    });

    alert("Registration Successful");

    // redirect to Login page
    window.location.href="/";

  } catch(error){

    alert("Registration Failed");

  }

};

  return (

    <div className="login-container">

      <div className="login-card">

        <h1 className="logo">CodeBidz</h1>

        <p className="subtitle">Create an Account</p>

        <form onSubmit={handleRegister}>

          <div className="input-group">
            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e)=>setName(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Select Role</label>

            <select onChange={(e)=>setRole(e.target.value)}>

              <option value="bidder">Bidder</option>
              <option value="admin">Admin</option>

            </select>

          </div>

          <button className="login-btn">
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;