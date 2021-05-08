import * as Types from './types'

const logout=history=>dispatch=>{

    localStorage.removeItem('auth_token')
    history.push('/login')
    dispatch({
        type: Types.LOGOUT_USER,
        payload:{
        }
    })
}

export default logout;