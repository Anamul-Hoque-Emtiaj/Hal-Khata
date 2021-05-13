import * as Types from './types'
import axios from 'axios'

const deleteTransaction = transactionId=>dispatch=>{
    axios.delete(`/api/transactions/${transactionId}`)
    .then(res=>{
        dispatch({
            type: Types.DELETE_TRANSACTIONS,
            payload:{
                transaction: res.data.transaction,
                user: res.data.user
            }
        })
    }).catch(()=>{
        
    })
}
export default deleteTransaction;