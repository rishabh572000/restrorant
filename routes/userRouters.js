const express = require('express')
const { getUserController, updateUserController, updatePasswordController, deleteUserController } = require('../controller/userControllers')
const authMiddlewares = require('../middlewares/authMiddlewares')

const router = express.Router()

router.get('/getUser', authMiddlewares, getUserController)
router.put('/updateUser', authMiddlewares, updateUserController)
router.put('/updatePassword', authMiddlewares, updatePasswordController)
router.delete('/deleteUser/:id', authMiddlewares, deleteUserController)

module.exports = router