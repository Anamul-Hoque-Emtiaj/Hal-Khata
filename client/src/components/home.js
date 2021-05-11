import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import logoutAction from '../store/actions/logoutAction'

class Dashboard extends Component {

    state = {
        name: "",
        email: "",
        error: "",
        isAuthenticated: false
    } 
    clickHandler = () =>{
        this.props.logoutAction(this.props.history)
    }

    render() {
        return (
            <div className='container me-5 p-5'>
                 <h1>I am Home</h1>
               {this.props.auth.isAuthenticated && <div>
                 <button className='btn btn-danger'
                    onClick={this.clickHandler}
                 > Logout</button>
               </div>}
               {!this.props.auth.isAuthenticated && <div>
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
export default connect(mapStateToProps,{logoutAction})(Dashboard);