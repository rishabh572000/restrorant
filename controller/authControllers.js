const { isEmpty } = require("lodash")
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const userModal = require("../modals/userModal")

const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, userType, address } = req.body

        if (!userName || !email || !password || !phone || !userType) {
            return res.status(500).send({
                status: false,
                message: 'Please fill all fields'
            })
        }

        const existingUserEmail = await userModal.findOne({ email})
        const existingUserPhone = await userModal.findOne({ phone })

        if (existingUserEmail || existingUserPhone) {
            return res.status(500).send({
                status: 'false',
                message: 'User already exist'
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt)
        // console.log(hashPassword, 'hashPassword')

        const user = await userModal.create({
            userName,
            email,
            phone,
            userType,
            password:hashPassword,
            address
        })

        res.status(201).send({
            status: true,
            message: 'User register successfully!',
            user
        })


    }
    catch (err) {
        res.status(500).send({
            status: false,
            message: 'Error in register api',
            error: err
        })
    }
}

const loginController = async (req, res) =>{
    try{
        const {email, password} = req.body

        if(!email || !password){
            return res.status(500).send({
                status:false,
                message:'Please provide email and password'
            })
        }
        
        let findUser = await userModal.findOne({email})
        const isPasswordMatch = bcrypt.compareSync(password, findUser?.password)

        if(isEmpty(findUser) || !isPasswordMatch){
            return res.status(404).send({
                status:false,
                message:'User not found'
            })
        }

        const token = JWT.sign({userId:findUser._id}, process.env.JWT_SECRETE, {
            expiresIn:"7d",
        })
        
        findUser.password=undefined

        res.status(200).send({
            status: true,
            user:findUser,
            token,
            message:'User login successful'
        })
    }
    catch(err){
        res.status(500).send({
            status:false,
            message:'API not working',
            error:err
        })
    }
}

module.exports = { registerController, loginController }