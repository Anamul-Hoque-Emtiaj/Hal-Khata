import React, { Component } from 'react';
import {NavLink,Link} from 'react-router-dom'
import logoutAction from '../store/actions/logoutAction'
import {connect} from 'react-redux'

class Navber extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-primary m-1">
                    <Link  to="#">
                        <span className="navbar-brand m-5">Hal Khata</span>
                    </Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item m-1">
                                    <NavLink activeClassName='active' exact to="/">
                                        <span className="nav-link">Home</span>
                                    </NavLink>
                                </li>
                                {
                                    this.props.auth.isAuthenticated?
                                    <React.Fragment>
                                        <li className="nav-item m-1">
                                            <NavLink  activeClassName='active' to="/dashboard">
                                                <span className="nav-link">Dashbosrd</span>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item m-1">
                                            <NavLink  activeClassName='active' to="/login">
                                                <button class="btn btn-primary"
                                                onClick={()=>this.props.logoutAction()} >
                                                    Logout
                                                </button>
                                            </NavLink>
                                            
                                        </li>
                                    </React.Fragment>:
                                    <React.Fragment>
                                         <li className="nav-item m-1">
                                            <NavLink  activeClassName='active' to="/login">
                                                <span className="nav-link">Login</span>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item m-1">
                                            <NavLink  activeClassName='active' to="/register">
                                                <span className="nav-link">Register</span>
                                            </NavLink>
                                        </li>
                                    </React.Fragment>
                                }
                            </ul>
                    </div>
        </nav>
        );
    }
    
}
const mapStateToProps=state=>({
    auth: state.auth
})

export default connect(mapStateToProps,{logoutAction})(Navber);