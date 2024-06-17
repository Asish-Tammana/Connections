import axios from "axios";
import { NEW_CHAT_SUCCESS, USER_CHATS_REQUEST, USER_CHATS_SUCCESS } from "../constants/chatConstants";

export const getAllChats = () => async (dispatch, getState) => {

    dispatch({ type: USER_CHATS_REQUEST })
    const { userLogin: { userInfo } } = getState()

    const config = {
        headers: {
            authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.get("/chats", config)
    dispatch({type: USER_CHATS_SUCCESS, payload: data})

}

export const createNewChat = (navigate, userId) => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState()
    const {userChats} = getState()
    const {chats} = userChats

    const config = {
        headers: {
            authorization: `Bearer ${userInfo.token}`
        }
    }

    const { data } = await axios.post("/chats/access",{receiverUserId: userId} , config)

    if(chats.find(ch => ch._id !== data._id)){
        dispatch({type: NEW_CHAT_SUCCESS, payload: data})
        navigate(`/chats/${data._id}`)
    }

}