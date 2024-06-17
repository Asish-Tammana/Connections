import { NEW_CHAT_SUCCESS, USER_CHATS_FAIL, USER_CHATS_REQUEST, USER_CHATS_SUCCESS } from "../constants/chatConstants"

export const userChatsReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_CHATS_REQUEST:
            return { loading: true }
        case USER_CHATS_SUCCESS:
            return { loading: false, chats: action.payload }
        case USER_CHATS_FAIL:
            return { loading: false, error: action.payload }
        // create new chat in same reducer
        case NEW_CHAT_SUCCESS:
            return { loading: false, chats: [ action.payload, ...state.chats] }
        default:
            return state
    }
}
