import { GET_MESSAGES_FAIL, GET_MESSAGES_REQUEST, GET_MESSAGES_SUCCESS, SEND_MESSAGE_FAIL, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS } from "../constants/messageConstants";

export const sendMessageReducer = (state={}, action) => {
    switch (action.type) {
        case SEND_MESSAGE_REQUEST:
            return { loading: true }
        case SEND_MESSAGE_SUCCESS:
            return { loading: false, message: action.payload }
        case SEND_MESSAGE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const getChatMessageReducer = (state={messagesList: []}, action) =>{

    switch (action.type) {
        case GET_MESSAGES_REQUEST:
            return { loading: true }
        case GET_MESSAGES_SUCCESS:
            return { loading: false, messagesList: action.payload }
        case GET_MESSAGES_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }

}