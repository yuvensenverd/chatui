import userReducer from './userReducer'
import { combineReducers } from 'redux'

export default combineReducers({
    userdata : userReducer
})