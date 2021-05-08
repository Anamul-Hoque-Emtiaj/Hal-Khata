import React, { Component } from 'react';
import {connect} from 'react-redux'
import logoutAction from '../store/actions/logoutAction'

class DashboardTwo extends Component {

    state = {
        name: "",
        email: "",
        error: ""
    }
    clickHandler = () =>{
        this.props.logoutAction(this.props.history)
    }

    render() {
        return (
            <div className='container me-5 p-5'>
                <h1>I am dashboard</h1>
                <button className='btn btn-danger'
                    onClick={this.clickHandler}
                > Logout</button>
            </div>
        );
    }
}

const mapStateToProps=state=>({
    auth: state.auth
})
export default connect(mapStateToProps,{logoutAction})(DashboardTwo);