import * as Types from "../actions/types"

const init={
    transactions:[],
    error:{}
}

const transactionReducer = (state=init,action)=>{
    switch(action.type){
        case Types.GET_TRANSACTIONS:{
            return{
                transactions: action.payload.transactions,
                error:{}
            }
        }
        case Types.TRANSACTION_ERRORS:{
            return{
                ...state,
                error: action.payload.error
            }
        }
        default:{
            return state
        }
    }
}
export default transactionReducer;