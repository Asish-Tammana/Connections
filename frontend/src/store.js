import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux'
import {thunk} from 'redux-thunk'
import { userLoginReducer } from './reducers/userReducers'

const initialState = {
}

const reducers = combineReducers({
    userLogin: userLoginReducer,
})

const middlewares = [thunk]

const store = createStore(reducers, initialState, applyMiddleware(...middlewares));

export default store;