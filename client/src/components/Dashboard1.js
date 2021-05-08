import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Dashboard1 extends Component {
    render() {
        return (
            <div className='container me-2 p-5'>
                Please <Link to='/login'>Login</Link> or <Link to='/register'>Register</Link>
                 to see your Dashboard
            </div>
        );
    }
}

export default Dashboard1;