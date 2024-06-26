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
            users: { $elemMatch: { $eq: user._id } }
        }).populate('users', "-token")
            .populate("latestMessage")
            .populate("groupAdmin", "-token")
            .sort({ updatedAt: -1 })

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

    if (!req.body.users || !req.body.groupName) {
        throw new Error("Users and Group Name are required")
        return;
    }

    
    const usersList = req.body.users
    const groupName = req.body.groupName

    if (usersList.length < 2) {
        throw new Error("Group should have at least 3 memebrers")
    }

    const user = await User.findOne({ email: req.email })

    usersList.push(user._id)

    try {

        const newGroupChat = await Chat.create({
            chatName: groupName,
            isGroupChat: true,
            users: usersList,
            groupAdmin: user
        })

        const groupChat = await Chat.findOne({ _id: newGroupChat._id })
            .populate("users", "-token")
            .populate("groupAdmin", "-token")

        res.status(200).json(groupChat)

    } catch (error) {
        // console.log(error)
        res.status(400)
        throw new Error(error.message)
    }


});

const updateGroup = asyncHandler(async (req, res) => {

    const {groupChatId, newGroupName, newGroupUsers} = req.body

    if(!groupChatId){
        res.status(400)
        throw new Error("Cannot access the chat")
        return;
    }

    if (!newGroupUsers || !newGroupName) {
        throw new Error("Users and Group Name are required")
        return;
    }

    if (newGroupUsers.length < 2) {
        throw new Error("Group should have at least 3 memebrers")
        return;
    }

    const updatedChat = await Chat.findByIdAndUpdate(groupChatId, { users: newGroupUsers, chatName: newGroupName }, { new: true })
       .populate("users", "-token")
       .populate("groupAdmin", "-token")

    if (!updatedChat) {
        res.status(400)
        throw new Error("Group not found")
    } else {
        res.status(200).json(updatedChat)
    }
})

const renameGroup = asyncHandler(async (req, res) => {

    const { groupChatId, newGroupName } = req.body

    const updatedChat = await Chat.findByIdAndUpdate(groupChatId, { chatName: newGroupName }, { new: true })
        .populate("users", "-token")
        .populate("groupAdmin", "-token")

    if (!updatedChat) {
        res.status(400)
        throw new Error("Group not found")
    } else {
        res.status(200).json(updatedChat)
    }


});

const addToGroup = asyncHandler(async (req, res) => {

    const { groupId, userId } = req.body

    const addUser = await Chat.findByIdAndUpdate(groupId, {
        $push: { users: userId }
    },
        { new: true })
        .populate("users", "-token")
        .populate("groupAdmin", "-token")

    if (!addUser) {
        res.status(400)
        throw new Error("Group not found")
    } else {
        res.status(200).json(addUser)
    }


});

const removeFromGroup = asyncHandler(async (req, res) => {
    const { groupId, userId } = req.body

    const removeUser = await Chat.findByIdAndUpdate(groupId, {
        $pull: { users: userId }
    },
        { new: true })
        .populate("users", "-token")
        .populate("groupAdmin", "-token")

    if (!removeUser) {
        res.status(400)
        throw new Error("Group not found")
    } else {
        res.status(200).json(removeUser)
    }
});

const deleteGroup = asyncHandler(async (req, res) => {
    
    const {groupId} = req.body
    let removeGroup

    const user = await User.findOne({email: req.email})

    const groupDetails = await Chat.findOne({_id: groupId})

    if(groupDetails.groupAdmin._id.toString() === user._id.toString()) {
        removeGroup = await Chat.findByIdAndDelete(groupId)
    }else{
        res.status(400)
        throw new Error("You are not authorized to delete this group")
    }

    

    if(!removeGroup){
        res.status(400)
        throw new Error("Group not found")
    }else{
        res.status(200).json("Group deleted successfully")
    }

    
});

module.exports = {
    getAllChats, accessChat, createGroup,updateGroup, renameGroup, addToGroup, removeFromGroup, deleteGroup
}