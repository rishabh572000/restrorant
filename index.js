const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/authRouters');
const userRoutes = require('./routes/userRouters');
const restaurantRoutes = require('./routes/restaurantRouters');



const connectDB = require('./connect');

const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

dotenv.config()
connectDB()
const PORT = 8080;

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/restaurant', restaurantRoutes)

app.listen(PORT, ()=>`app listine on port ${PORT}`)