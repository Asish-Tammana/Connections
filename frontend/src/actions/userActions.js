import axios from 'axios';
import { USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, USER_LOGOUT, USERS_LIST_FAIL, USERS_LIST_REQUEST, USERS_LIST_SUCCESS } from '../constants/userConstants';

export const login = (credential, navigate) => async (dispatch) => {

    try {

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post('/users/login', { token: credential }, config);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('connectionsUser', JSON.stringify(data));
        navigate("/chats")

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }

}

export const logout = (navigate) => (dispatch) => {
    localStorage.removeItem("connectionsUser")
    dispatch({ type: USER_LOGOUT })
    navigate("/")
}

export const getAllUsers = (searchInput) => async (dispatch, getState) => {

    try {

        dispatch({ type: USERS_LIST_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                authorization: `Bearer ${userInfo.token}`
            }
        }


        const { data } = await axios.get(`/users?search=${searchInput}`, config)
        dispatch({ type: USERS_LIST_SUCCESS, payload: data })


    } catch (error) {
        dispatch({
            type: USERS_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }

}