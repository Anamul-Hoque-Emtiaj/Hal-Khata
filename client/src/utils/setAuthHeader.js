import axios from 'axios'

const setAuthHeader = token =>{
    if(token){
        axios.defaults.headers.common['Authorization'] = token
    }else{
        axios.defaults.headers.common['Authorization'] = ""
    }
}
export default setAuthHeader;