const express = require("express")
const mongoose = require('mongoose')
const userRouter = require("./Routes/user.route")
const app = express()
require('dotenv').config();
const PORT = process.env.PORT || 8080
app.use(express.json())

app.get('/',(req,res)=>{
    return res.send("server working properly")
})

app.use("/auth",userRouter)
mongoose.connect(process.env.CONNECTION).then(()=>{
    app.listen(PORT,()=>{
        console.log('server listen at',PORT);
    })
}).catch((err)=>{
    console.log(err)
})