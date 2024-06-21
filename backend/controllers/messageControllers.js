const asyncHandler = require('express-async-handler')
const Cryptr = require('cryptr');
const Message = require('../Models/messageModel');
const User = require('../Models/userModel');
const Chat = require('../Models/chatModel');


const sendMessage = asyncHandler(async (req, res) => {

    const user = await User.findOne({ email: req.email })

    const {messageContent, chatId} = req.body;

    if(!messageContent || !chatId){
        throw new Error("Invalid message content")
        return;
    }

    const cryptr = new Cryptr(chatId);

    const newMessage = {
        sender: user._id,
        content: cryptr.encrypt(messageContent),
        chat: chatId
    }

    try {

        let message = await Message.create(newMessage)
        
        message = await message.populate("sender", "name picture")
        message = await message.populate("chat")

        message = await  User.populate(message, {
            path: "chat.users",
            select: "name email picture"
        })

        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message
        })

        res.json(message)

        
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }

})

module.exports = {sendMessage}