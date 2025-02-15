const express = require("express");

const app = express();
app.use(express.json());

const users = [
  {username:"user", password:"pass1"},
  {username:"user2", password:"pass3"},
  ]

app.post("/login",(req,res)=>{
  const {username, password} = req.body;
  const user = users.find((u)=> {
    u.username === username && u.password === password;
  })
  if(user){
    res.json({message: "Login Successful"});
  }
  else{
    res.status(401).json({error:"Invalid Credentials "})
  }
})

app.use("/",(req,res,next)=>{
  res.send("apihello");
})

app.listen(3000, ()=>{
  console.log("server running");
})