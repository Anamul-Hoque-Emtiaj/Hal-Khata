import * as Types from './types'
import axios from 'axios'


const createTransaction = transaction => dispatch =>{
    axios.post('/api/transactions/',transaction)
    .then(response=>{
        dispatch({
            type: Types.ADD_NEW_TRANSACTION,
            payload:{
               transaction: response.data.transaction,
               user: response.data.user
            }
        })
    })
    .catch(()=>{
        
    })
}

export default createTransaction