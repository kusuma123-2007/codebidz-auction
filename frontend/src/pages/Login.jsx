import { useState } from "react";
import "../styles/Login.css";
import API from "../services/api";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

 const handleLogin = async (e) => {

  e.preventDefault();

  try{

    const response = await API.post("/auth/login",{
      email,
      password
    });

    localStorage.setItem("userId", response.data.user._id);

    if(response.data.user.role === "admin"){
      window.location.href="/admin-dashboard";
    }else{
      window.location.href="/bidder-dashboard";
    }

  }catch(error){

    alert("Login failed");

  }

};

  return (

    <div className="login-container">

      <div className="login-card">

        <h1 className="logo">CodeBidz</h1>

        <p className="subtitle">Auction Platform Login</p>

        <form onSubmit={handleLogin}>

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
              placeholder="Enter your password"
              onChange={(e)=>setPassword(e.target.value)}
            />

          </div>

          <button className="login-btn">
            Login
          </button>

        </form>

        <p className="register-text">
  Don't have an account? <a href="/register">Register</a>
</p>

      </div>

    </div>

  );
}

export default Login;