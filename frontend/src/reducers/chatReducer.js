import { USER_CHATS_FAIL, USER_CHATS_REQUEST, USER_CHATS_SUCCESS } from "../constants/chatConstants"

export const userChatsReducer = (state={}, action) => {
    switch (action.type) {
        case USER_CHATS_REQUEST:
            return { loading: true }
        case USER_CHATS_SUCCESS:
            return { loading: false, chats: action.payload }
        case USER_CHATS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}