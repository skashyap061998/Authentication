const {Schema,model} = require("mongoose")

const userSchema = new Schema ({
    name:{
        type:String,
    },
    username:{
        type:String,
    },
    email:{
        type:String
    },
    password:String,
})


const userModel = model('user',userSchema)

module.exports = userModel