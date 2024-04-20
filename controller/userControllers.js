const userModal = require("../modals/userModal")
const bcrypt = require('bcrypt');

const getUserController = async (req, res) => {
    try {
        const user = await userModal.findById({ _id: req.body.userId })
        if (!user) {
            return res.status(404).send({
                status: false,
                message: 'User not found',
            })
        }
        user.password = undefined;

        res.status(200).send({
            status: true,
            message: 'Successful',
            user
        })
    }
    catch (err) {
        res.status(500).send({
            status: false,
            message: 'API not working',
            error: err
        })
    }
}

const updateUserController = async (req, res) => {
    try {
        const user = await userModal.findById({ _id: req.body.userId })
        if (!user) {
            return res.status(404).send({
                status: false,
                message: 'User not found',
            })
        }

        const {userName, address, phone} = req.body
        if(userName) user.userName=userName
        if(address) user.address = address
        if(phone) user.phone = phone

        await user.save()
        res.status(200).send({
            status:true,
            message:'User updated successfully',
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({
            status: false,
            message: 'Api not working',
            error: err
        })
    }
}

const updatePasswordController = async (req, res) => {
    try {
        const {oldPassword, newPassword} = req.body
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                status: false,
                message: 'Please enter old and new password!',
            })
        }
        const user = await userModal.findById({ _id: req.body.userId })
        if (!user) {
            return res.status(404).send({
                status: false,
                message: 'User not found',
            })
        }

        const isPasswordMatch = bcrypt.compareSync(oldPassword, user?.password)
        if (!isPasswordMatch) {
            return res.status(500).send({
                status: false,
                message: 'Please enter correct old password!',
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(newPassword, salt)
        user.password = hashPassword

        await user.save()
        res.status(200).send({
            status:true,
            message:'Password updated successfully',
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({
            status: false,
            message: 'Api not working',
            error: err
        })
    }
}

const deleteUserController = async (req, res) => {
    try {
        const {id} = req.params
        if(!id){
            res.status(500).send({
                status: false,
                message: 'User not found!',
            })
        }
        await userModal.findByIdAndDelete({_id:id})
        res.status(200).send({
            status: true,
            message: 'User delete successfully!',
        })
      
    }
    catch (err) {
        console.log(err)
        res.status(500).send({
            status: false,
            message: 'Api not working',
            error: err
        })
    }
}

module.exports = { getUserController, updateUserController, updatePasswordController, deleteUserController }