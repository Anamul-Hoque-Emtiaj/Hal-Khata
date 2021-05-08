import * as Types from './types'
import axios from 'axios'

const registerAction = (user,history) => dispatch=>{
    axios.post('/api/users/register',user)
    .then(res=>{
        dispatch({
            type: Types.USER_ERRORS,
            payload:{
                error:{}
            }
        })
        history.push('/login')
    })
    .catch(error=>{
        dispatch({
            type: Types.USER_ERRORS,
            payload:{
                error: error.response.data
            }
        })
    })
}
export default registerAction;