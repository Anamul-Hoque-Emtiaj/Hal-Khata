import {combineReducers} from 'redux'
import authReducer from './authReducer'
import transactionReducer from './transactionReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    transactionReducer
})
export default rootReducer;