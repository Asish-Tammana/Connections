import { NEW_CHAT_SUCCESS, NEW_GROUP_FAIL, NEW_GROUP_REQUEST, UPDATE_GROUP_FAIL, UPDATE_GROUP_REQUEST, USER_CHATS_FAIL, USER_CHATS_REQUEST, USER_CHATS_SUCCESS } from "../constants/chatConstants"

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

export const groupReducer = (state={}, action) =>{
    switch (action.type) {
        case NEW_GROUP_REQUEST:
            return { loading: true }
        case NEW_GROUP_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}


export const updateGroupReducer = (state={}, action) => {
    switch (action.type) {
        case UPDATE_GROUP_REQUEST:
            return { loading: true }
        case UPDATE_GROUP_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}