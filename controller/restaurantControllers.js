const { isEmpty } = require("lodash")
const restaurantModal = require("../modals/restaurantModal")

const createRestaurantController = async (req, res) => {
    try{
        const {title, address} = req.body
        if(!title && !address){
            return res.status(500).send({
                status:false,
                message:'Please fill required fields!',
            })
        }
        const restaurant = await restaurantModal.create(req.body)

        res.status(200).send({
            status:true,
            message:'Restaurant created successfully',
            restaurant
        })
    }
    catch(err){
        res.status(500).send({
            status:false,
            message:'Api not working!',
            error:err
        })
    }
}

const getAllRestaurantController = async (req, res) => {
    try{
       const restaurants = await restaurantModal.find({})

      

        res.status(200).send({
            status:true,
            totalCount:restaurants.length,
            message:'Restaurant fetched successfully',
            restaurants
        })
    }
    catch(err){
        res.status(500).send({
            status:false,
            message:'Api not working!',
            error:err
        })
    }
}

const restaurantDetailsController = async (req, res) => {
    try{
        const id = req.params.id
        const restaurantDetails = await restaurantModal.findById(id)

        if(!restaurantDetails){
            return res.status(500).send({
                status:false,
                message:'Restaurant not found'
            })
        }
        return res.status(200).send({
            status:true,
            message:'Restaurant details fetch successfully!',
            restaurantDetails
        })

        
    }
    catch(err){
        res.status(500).send({
            status:false,
            message:'Api not working!',
            error:err
        })
    }
}
module.exports = {
    createRestaurantController,
    getAllRestaurantController,
    restaurantDetailsController
}