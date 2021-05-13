import * as Types from "../actions/types"

const init={
    transactions:[],
    user:{},
    error:{}
}

const transactionReducer = (state=init,action)=>{
    switch(action.type){
        case Types.GET_TRANSACTIONS:{
            return{
                transactions: action.payload.transactions,
                user: action.payload.user,
                error:{}
            }
        }
        case Types.DELETE_ALL_TRANSACTIONS:{
            return{
                transactions: [],
                user: action.payload.user,
                error:{}
            }
        }
        case Types.TRANSACTION_ERRORS:{
            return{
                ...state,
                error: action.payload.error
            }
        }
        case Types.ADD_NEW_TRANSACTION:{
           let transactions = [...state.transactions]
           transactions.unshift(action.payload.transaction)
           return{
                transactions,
                user: action.payload.user,
                error:{}
           }
        }
        case Types.EDIT_TRANSACTION:{
            let transactions = [...state.transactions]
            return{
                transactions: transactions.map(tran=>{
                    if(tran._id===action.payload.transaction._id){
                        return action.payload.transaction
                    }
                    return tran
                }),
                user: action.payload.user,
                error:{}
            }
         }
        case Types.DELETE_TRANSACTIONS:{
            return{
                transactions: state.transactions.filter(trans=> trans._id!== action.payload.transaction._id),
                user: action.payload.user,
                error: {}
            }
         }
        default:{
            return state
        }
    }
}
export default transactionReducer;