import * as Types from './types'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import setAuthHeader from '../../utils/setAuthHeader'

const loginAction = (user,history) => dispatch=>{
    axios.post('/api/users/login',user)
    .then(res=>{
        let token = res.data.token
        localStorage.setItem('auth_token',token)
        setAuthHeader(token)
        let decode = jwtDecode(token)
        dispatch({
            type: Types.LOGIN_USER,
            payload:{
                user: decode
            }
        })
        history.push('/dashboard')
    })
    .catch(error=>{
        console.log(error.response.data)
        dispatch({
            type: Types.USER_ERRORS,
            payload:{
                error: error.response.data
            }
        })
    })
}
export default loginAction;