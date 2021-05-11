import * as Types from "../actions/types"

const init={
    user:{},
    error:{}
}
const userReducer=(state=init,action)=>{
    switch(action.type){
        case Types.GET_USER_ERRORS:{
            return{
                ...state,
                error: action.payload.error
            }
        }
        case Types.GET_USER:{
            return{
                user: action.payload.user,
                error:{}
            }
        }
        default:{
            return state
        }
    }
}
export default userReducer