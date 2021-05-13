import * as Types from './types'

const logout= () => dispatch =>{

    localStorage.removeItem('auth_token')
    dispatch({
        type: Types.LOGOUT_USER,
        payload:{
        }
    })
}

export default logout;