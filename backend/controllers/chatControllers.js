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

    if(!req.body.users || !req.body.groupName){
        res.status(400).send("Users and Group Name are required")
        return;
    }

    const usersList = JSON.parse(req.body.users)
    const groupName = req.body.groupName

    if(usersList.length < 2){
        res.status(400).send("Group should have at least 3 memebrers")
    }

    const user = await User.findOne({email: req.email})

    usersList.push(user)

    try {
        
        const newGroupChat = await Chat.create({
            chatName: groupName,
            isGroupChat: true,
            users: usersList,
            groupAdmin: user
        })

        const groupChat = await Chat.findOne({_id: newGroupChat._id})
        .populate("users", "-token")
        .populate("groupAdmin", "-token")

        res.status(200).json(groupChat)

    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }


});

const renameGroup = asyncHandler(async (req, res) => {
    console.log("renameGroup")

    const {groupChatId, newGroupName} = req.body

    const updatedChat = await Chat.findByIdAndUpdate(groupChatId, {chatName: newGroupName}, {new: true})
    .populate("users", "-token")
    .populate("groupAdmin", "-token")

    if(!updatedChat) {
        res.status(400)
        throw new Error("Group not found")
    } else{
        res.status(200).json(updatedChat)
    }


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