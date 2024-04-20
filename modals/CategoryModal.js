const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({

},
{timestamps:true}
)

const restaurantModal = mongoose.model('Restaurant', restaurantSchema)

module.exports = restaurantModal