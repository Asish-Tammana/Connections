import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension';
import { allUsersReducer, userLoginReducer } from './reducers/userReducers'
import { groupReducer, updateGroupReducer, userChatsReducer } from './reducers/chatReducer'
import { getChatMessageReducer, notificationsReducer, sendMessageReducer } from './reducers/messageReducer';

const userInfoFromStorage = localStorage.getItem('connectionsUser')? JSON.parse(localStorage.getItem('connectionsUser')) : null


const initialState = {
    userLogin: {userInfo: userInfoFromStorage},
    notifications: {notificationsList: []}
}

const reducers = combineReducers({
    userLogin: userLoginReducer,
    userChats: userChatsReducer,
    usersList : allUsersReducer,
    newGroup: groupReducer,
    updateGroup: updateGroupReducer,
    sendMessageReducer: sendMessageReducer,
    chatMessages: getChatMessageReducer,
    notifications: notificationsReducer
})

const middlewares = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;