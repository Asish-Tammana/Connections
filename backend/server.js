const express = require('express');
const dotenv = require('dotenv');
const chats = require("./data/data")
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes');

const app = express();
dotenv.config();
connectDB()
app.use(express.json())

app.use("/users", userRoutes)
app.use("/chats", chatRoutes)

const PORT  = process.env.PORT || 5000

app.listen(5000, console.log(`port running ${PORT}`))