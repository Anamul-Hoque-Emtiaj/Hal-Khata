import * as Types from "../actions/types"

const init={
    isAuthenticated: false,
    user:{},
    error: {}
}

const authReducer=(state=init,action)=>{
    switch(action.type){
        case Types.USER_ERRORS:{
            return{
                ...state,
                error: action.payload.error
            }
        }
        case Types.LOGIN_USER:{
            return{
               isAuthenticated: true,
               user: action.payload.user,
               error:{}
            }
        }
        case Types.LOGOUT_USER:{
            return{
               isAuthenticated: false,
               user: {},
               error:{}
            }
        }
        default:{
            return state
        }
    }
}
export default authReducer;