const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
        message:'Restaurant title is require.'
    },
    imageUrl:{
        type:String,
    },
    food:{
        type:Array
    },
    time:{
        type:String
    },
    pickup:{
        type:Boolean,
        default:true
    },
    delivery:{
        type:Boolean,
        default:true
    },
    logoUrl:{
        type:String
    },
    rating:{
        type:Number,
        default:1,
        min:0,
        max:5
    },
    ratingCount:{
        type:Number
    },
    address:{
        type:String,
        require:true,
        message:'Please add address'
    },
    cords:{
        type:Array
    }
},
{timestamps:true}
)

const restaurantModal = mongoose.model('Restaurant', restaurantSchema)

module.exports = restaurantModal