import axios from 'axios';
import { ADD_MESSAGE_SUCCESS, GET_MESSAGES_FAIL, GET_MESSAGES_REQUEST, GET_MESSAGES_SUCCESS, SEND_MESSAGE_FAIL, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS } from '../constants/messageConstants';

export const sendNewMessage = (messageContent, chatId) => async (dispatch, getState) => {

    try {

        dispatch({ type: SEND_MESSAGE_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(`/messages`, { messageContent, chatId }, config)
        dispatch({ type: SEND_MESSAGE_SUCCESS, payload: data })
        dispatch({type: ADD_MESSAGE_SUCCESS, payload: data})
        return data
    } catch (error) {
        dispatch({
            type: SEND_MESSAGE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }

}

export const getMessages = (chatId) => async (dispatch, getState) => {

    try {
        dispatch({ type: GET_MESSAGES_REQUEST})
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/messages/${chatId}`, config)
        dispatch({ type: GET_MESSAGES_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: GET_MESSAGES_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }

}