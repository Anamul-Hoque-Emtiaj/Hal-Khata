import * as Types from './types'
import axios from 'axios'

const getUserInfo = userId=>dispatch=>{
    axios.get(`/api/users/${userId}`)
    .then(res=>{
        dispatch({
            type:  Types.GET_USER,
            payload:{
                user: res.data
            }
        })
    })
    .catch(error=>{
        dispatch({
            type: Types.GET_USER_ERRORS,
            payload:{
                error: error.response.data
            }
        })
    })
}
export default getUserInfo;