import axios from "axios";
import { USER_CHATS_REQUEST } from "../constants/chatConstants";

export const getAllChats = () => async(dispatch, getState) => {

    dispatch({type: USER_CHATS_REQUEST})
    const {userLogin: {userInfo}} = getState()

    const config = {
        headers: {
            authorization: `Bearer ${userInfo.token}`
        }
    }

        const {data} = await axios.get("/chats", config)
        console.log(data)

}