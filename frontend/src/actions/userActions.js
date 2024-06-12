import axios from 'axios';
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from '../constants/userConstants';

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

export const logout = () => (dispatch) => {
    localStorage.removeItem("connectionsUser")
    dispatch({ type: USER_LOGOUT })
}