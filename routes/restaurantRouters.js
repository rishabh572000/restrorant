const express = require('express')
const authMiddlewares = require('../middlewares/authMiddlewares')
const { createRestaurantController, getAllRestaurantController, restaurantDetailsController } = require('../controller/restaurantControllers')

const router = express.Router()

router.post('/create', authMiddlewares, createRestaurantController)
router.get('/get-all-restaurant', getAllRestaurantController)
router.get('/restaurant-details/:id', restaurantDetailsController)


module.exports = router