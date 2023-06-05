const jwt = require('jsonwebtoken')
const userModel = require('../Model/user.model')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')


module.exports={
     Signup : async(req,res)=>{
          const error = validationResult(req)
          if(!error.isEmpty()){
return res.status(400).send({error:error.array()})
          }
          const {name,username,email,password,} = req.body
          let user = await userModel.findOne({ email })
          if (user){return res.status(400).send("A user is already registered with this email address.")}
          user = {
               name,username,email,password
          }
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password,salt)
          const newUser = new userModel(user)
          await newUser.save();

return res.status(201).send({message:"user successfully created"})
     },
    
    Login:async (req,res)=>{
const error = validationResult(req)
if(!error.isEmpty()){
     return res.status(400).send({error:error.array()})
}
const {username,email,password,} = req.body
let user;
if(email){
     
      user = await userModel.findOne({email})
}
if(username){
     user = await userModel.findOne({username})
}
var salt = await bcrypt.genSalt(10);
var hashPassword = await bcrypt.hash(password, salt)
let verify = bcrypt.compareSync(user.password, hashPassword)
          // return res.send(verify)
          if(!verify){
     return res.status(400).send({message:"Please enter valid Password"})
          }
          const token = await jwt.sign({
               name:user.name,
               username:user.username,
               email:user.email
          },"Shubham")
          return res.status(200).send({message:"Welcome to website",token})
          // console.log(token);
    },

  GoogleSignup:async(req,res)=>{
     
     const {name,email,password,} = req.user
     let user = await userModel.findOne({ email })
     if (user){return res.status(400).send("A user is already registered with this email address.")}
     user = {
          name,email,password
     }
     const salt = await bcrypt.genSalt(10);
     user.password = await bcrypt.hash(user.password,salt)
     const newUser = new userModel(user)
     await newUser.save();

return res.status(201).send({message:"user successfully created"})
  }

    }
