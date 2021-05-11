import {combineReducers} from 'redux'
import authReducer from './authReducer'
import userReducer from './userReducer'
import transactionReducer from './transactionReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    userReducer,
    transactionReducer
})
export default rootReducer;