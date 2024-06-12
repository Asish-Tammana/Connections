import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension';
import { userLoginReducer } from './reducers/userReducers'
import { userChatsReducer } from './reducers/chatReducer'


const userInfoFromStorage = localStorage.getItem('connectionsUser')? JSON.parse(localStorage.getItem('connectionsUser')) : null


const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const reducers = combineReducers({
    userLogin: userLoginReducer,
    userChats: userChatsReducer
})

const middlewares = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;