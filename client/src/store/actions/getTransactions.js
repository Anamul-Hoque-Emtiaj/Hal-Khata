import * as Types from './types'
import axios from 'axios'

const getTransactions = userId =>dispatch=>{
    axios.get(`/api/transactions/${userId}`)
    .then(res=>{
        dispatch({
            type: Types.GET_TRANSACTIONS,
            payload:{
                transactions: res.data
            }
        })
    })
    .catch(error=>{
        dispatch({
            type: Types.TRANSACTION_ERRORS,
            payload:{
                error: error.response.data
            }
        })
    })
}

export default getTransactions;