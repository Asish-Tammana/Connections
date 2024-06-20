import axios from "axios";
import { NEW_CHAT_SUCCESS, NEW_GROUP_FAIL, NEW_GROUP_REQUEST, USER_CHATS_REQUEST, USER_CHATS_SUCCESS } from "../constants/chatConstants";

export const getAllChats = () => async (dispatch, getState) => {

    dispatch({ type: USER_CHATS_REQUEST })
    const { userLogin: { userInfo } } = getState()

    const config = {
        headers: {
            authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.get("/chats", config)
    dispatch({ type: USER_CHATS_SUCCESS, payload: data })

}

export const createNewChat = (navigate, userId) => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState()
    const { userChats } = getState()
    const { chats } = userChats

    const config = {
        headers: {
            authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.post("/chats/access", { receiverUserId: userId }, config)

    if (chats.find(ch => ch._id !== data._id)) {
        dispatch({ type: NEW_CHAT_SUCCESS, payload: data })
        navigate(`/chats/${data._id}`)
    }

}

export const createNewGroup = (groupName, users, navigate) => async (dispatch, getState) => {

    try {

        dispatch({ type: NEW_GROUP_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const { userChats } = getState()
        const { chats } = userChats

        const config = {
            headers: {
                authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post("/chats/group", { groupName, users }, config)

        if (chats.find(ch => ch._id !== data._id)) {
            dispatch({ type: NEW_CHAT_SUCCESS, payload: data })
            navigate(`/chats/${data._id}`)
            return true
        }
    } catch (error) {
        dispatch({
            type: NEW_GROUP_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }

}

export const updateGroup = (groupId, groupName, usersList, navigate) => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState()
    const { userChats } = getState()
    const { chats } = userChats
    const config = {
        headers: {
            authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.put(`/chats/group/update`, { groupChatId: groupId, newGroupName: groupName, newGroupUsers: usersList }, config)

    if(data){

        const updatedChats = chats.map(eachChat => eachChat._id === data._id ? data : eachChat)
        dispatch({ type: USER_CHATS_SUCCESS, payload: updatedChats })
        navigate(`/chats/${data._id}`)
        return true
    }

    // if (chats.find(ch => ch._id !== data._id)) {
    //     dispatch({ type: NEW_CHAT_SUCCESS, payload: data })
    //     return true
    // }

}