import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import loginAction from '../store/actions/loginAction'

class login extends Component {
    state = {
        email: "",
        password: "",
        error: ""
    }
    changeHandler = event =>{
       this.setState({
        [event.target.name] : event.target.value
       })
    }
    static getDerivedStateFromProps(nextProps,prevState){
        if(JSON.stringify(nextProps.auth.error)!==JSON.stringify(prevState.error)){
            return{
                error: nextProps.auth.error
            }
        }
        return null
    }
    submitHandler = event =>{
        event.preventDefault()
        let {email,password} = this.state
        this.props.loginAction({email,password},this.props.history)
    }
    render() {
        let {email,password,error} = this.state
        return (
            <div className="container m-3 p-3">
                <h1 className="text-center mt-5">Login Here</h1>
                <div className='m-5 p-5 w-75'>
                    <form onSubmit={this.submitHandler}>
                        <div className="form-group py-1">
                            <label htmlFor="email" className="d-block py-2">Email:</label>
                             <input type="email" className={error.email?'form-control is-invalid': 'form-control'} 
                             onChange={this.changeHandler} name="email" placeholder="Enter your Email" id="email" value={email} />
                            {error.email && <div className='invalid-feedback'>{error.email}</div>}
                        </div>
                        <div className="form-group py-1">
                            <label  htmlFor="password" className="d-block py-2">Password:</label>
                            <input type="password" className={error.password?'form-control is-invalid': 'form-control'} 
                            onChange={this.changeHandler} name="password" placeholder="Enter your Password" id="password" value={password} />
                            {error.password  && <div className='invalid-feedback'>{error.password}</div>}
                        </div>
                        <div className="col-auto p-2">
                            <Link to="/register">Don't have acount?Register now</Link>
                         </div>
                         <div className="col-auto p-2">
                            <button type="submit" className="btn btn-primary">Log in</button>
                         </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>({
    auth: state.auth
})

export default connect(mapStateToProps,{loginAction}) (login);