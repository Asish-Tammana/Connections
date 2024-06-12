import { USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGOUT, USERS_LIST_FAIL, USERS_LIST_REQUEST, USERS_LIST_SUCCESS } from "../constants/userConstants"

export const userLoginReducer = (state = {}, action) => {

    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
}

export const allUsersReducer = (state={}, action) => {
    switch (action.type) {
        case USERS_LIST_REQUEST:
            return { loading: true }
        case USERS_LIST_SUCCESS:
            return { loading: false, allUsersList: action.payload };
        case USERS_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}