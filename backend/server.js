const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const chats = require("./data/data")
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { notFound, errorHandler } = require('./Middlewares/errorMiddleware');

const app = express();
dotenv.config();
connectDB()
app.use(express.json())
app.use(cors());

app.use("/users", userRoutes)
app.use("/chats", chatRoutes)
app.use("/messages", messageRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT  = process.env.PORT || 5000

app.listen(5000, console.log(`port running ${PORT}`))