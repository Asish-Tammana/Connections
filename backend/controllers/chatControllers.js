const { response } = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const Chat = require("../Models/chatModel");

const accessChat = asyncHandler(async (req, res) => {
    const { receiverUserId } = req.body

    const user = await User.findOne({ email: req.email })


    if (!receiverUserId) {
        res.status(400).send("receiverUserId is required");
        return;
    }

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: user._id } } },
            { users: { $elemMatch: { $eq: receiverUserId } } },
        ]
    }).populate("users", "-token -createdAt -updatedAt").populate("latestMessage")

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name email picture"
    })

    if (isChat.length > 0) {
        res.status(200).json(isChat[0])
    } else {

        const chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [user._id, receiverUserId]
        }


        try {

            const newChat = await Chat.create(chatData)
            const fullChat = await Chat.findById(newChat._id).populate("users", "-token")

            res.status(200).json(fullChat)

        } catch (error) {

            throw new Error(error.message)

        }

    }

});

const getAllChats = asyncHandler(async (req, res) => {

    const user = await User.findOne({ email: req.email })

    try {
        let chats = await Chat.find({
            users: {$elemMatch: {$eq: user._id}}
        }).populate('users', "-token")
        .populate("latestMessage")
        .populate("groupAdmin", "-token")
        .sort({updatedAt: -1})

        chats = await User.populate(chats, {
            path: "latestMessage.sender",
            select: "name email picture"
        })
    
        res.status(200).json(chats)
    } catch (error) {
        throw new Error(error.message)
    }

})


const createGroup = asyncHandler(async (req, res) => {
    console.log("createGroup")
});

const renameGroup = asyncHandler(async (req, res) => {
    console.log("renameGroup")
});

const addToGroup = asyncHandler(async (req, res) => {
    console.log("addToGroup")
});

const removeFromGroup = asyncHandler(async (req, res) => {
    console.log("removeFromGroup")
});

const deleteGroup = asyncHandler(async (req, res) => {
    console.log("deleteGroup")
});

module.exports = {
    getAllChats, accessChat, createGroup, renameGroup, addToGroup, removeFromGroup, deleteGroup
}