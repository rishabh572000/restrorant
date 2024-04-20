const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true, 'user name is require']
    },
    email:{
        type:String,
        required:[true, 'email is require'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'password is require']
    },
    address:{
        type:Array,
    },
    phone:{
        type:String,
        required:[true, 'phone no. is require'],
        unique:true
    },
    userType:[{
        type:String,
        required:[true, 'user type is require'],
        enum:['client', 'admin', 'vendor', 'driver']
    }],
    profile:[{
        type:String,
        default:''
    }],
 
},
{timestamps:true}
)

const userModal = mongoose.model('Users', userSchema)

module.exports = userModal