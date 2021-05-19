import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Home extends Component {

    render() {
        return (
            <div className='container m-5 p-5'>
                 <h1 className='text-center m-2 p-2 display-2'>Hal Khata</h1>
                 <h5 className='m-5 p-5 w-75 display-4'>
                    Store your incomes-expenses information. Find out your total incomes and expenses.
                    See your current balance here easily.
                    {!this.props.auth.isAuthenticated &&
                    <span><Link to='/login'> Login</Link> / <Link to='/register'>Register</Link> Now. </span>}
                     Made your life simple and smooth.
                 </h5>
            </div>
        );
    }
}
const mapStateToProps=state=>({
    auth: state.auth
})
export default connect(mapStateToProps)(Home);