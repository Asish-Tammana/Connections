const express = require('express');
const dotenv = require('dotenv');
const chats = require("./data/data")
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')

const app = express();
dotenv.config();
connectDB()
app.use(express.json())


// app.get("/", (req, res) => {
//     res.send("hey")
// })

app.get("/chats", (req, res) => {
    res.send(chats)
})

app.use("/users", userRoutes)

const PORT  = process.env.PORT || 5000

app.listen(5000, console.log(`port running ${PORT}`))