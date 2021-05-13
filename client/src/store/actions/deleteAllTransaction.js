import * as Types from './types'
import axios from 'axios'

const deleteAllTransaction = userId=>dispatch=>{
    axios.delete(`/api/transactions/user/${userId}`)
    .then(res=>{
        dispatch({
            type: Types.DELETE_ALL_TRANSACTIONS,
            payload:{
                user: res.data.user
            }
        })
    })
    .catch(()=>{
        
    })
}
export default deleteAllTransaction;