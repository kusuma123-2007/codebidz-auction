const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    res.json({ message: "User registered successfully" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Registration error" });
  }
});

// LOGIN
router.post("/login", async (req,res)=>{

 try{

  const {email,password} = req.body;

  const user = await User.findOne({email});

  if(!user){
   return res.status(400).json({
    message:"User not found"
   });
  }

  // compare encrypted password
  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch){
   return res.status(400).json({
    message:"Invalid password"
   });
  }

  res.json({
   message:"Login successful",
   user
  });

 }catch(error){

  console.log(error);

  res.status(500).json({
   message:"Login failed"
  });

 }

});

router.post("/assign-credits", async(req,res)=>{

 const {userId,credits} = req.body;

 const user = await User.findById(userId);

 user.credits += credits;

 await user.save();

 res.json({message:"Credits assigned"});

});

router.get("/user/:id", async (req,res)=>{

 try{

  const user = await User.findById(req.params.id);

  res.json(user);

 }catch(error){

  res.status(500).json({message:"User fetch failed"});

 }

});

module.exports = router;