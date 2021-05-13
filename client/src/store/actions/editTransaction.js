import * as Types from './types'
import axios from 'axios'


const editTransaction = (id,transaction) => dispatch =>{
    axios.put(`/api/transactions/${id}`,transaction)
    .then(response=>{
        dispatch({
            type: Types.EDIT_TRANSACTION,
            payload:{
               transaction: response.data.transaction,
               user: response.data.user
            }
        })
    })
    .catch(()=>{
        
    })
}

export default editTransaction