import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import logoutAction from '../store/actions/logoutAction'

class DashboardTwo extends Component {

    state = {
        name: "",
        email: "",
        error: "",
        isAuthenticated: false
    }

    static getDerivedStateFromProps(nextProps,prevState){
        if(JSON.stringify(nextProps.auth.isAuthenticated)!==JSON.stringify(prevState.isAuthenticated)){
            return{
                isAuthenticated: nextProps.auth.isAuthenticated
            }
        }
        return null
    }    
    clickHandler = () =>{
        this.props.logoutAction(this.props.history)
        console.log(this.auth)
    }

    render() {
        return (
            <div className='container me-5 p-5'>
               {this.state.isAuthenticated && <div>
                <h1>I am dashboard</h1>
                 <button className='btn btn-danger'
                    onClick={this.clickHandler}
                 > Logout</button>
               </div>}
               {!this.state.isAuthenticated && <div>
                    <div className='container me-2 p-5'>
                         Please <Link to='/login'>Login</Link> or <Link to='/register'>Register</Link>
                        to see your Dashboard
                 </div>
               </div>}
            </div>
        );
    }
}

const mapStateToProps=state=>({
    auth: state.auth
})
export default connect(mapStateToProps,{logoutAction})(DashboardTwo);