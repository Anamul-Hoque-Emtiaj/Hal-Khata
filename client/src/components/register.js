import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import registerAction from '../store/actions/registerAction'

class register extends Component {

    state = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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
        let {name,email,password,confirmPassword} = this.state
        this.props.registerAction({name,email,password,confirmPassword},this.props.history)
    }
    render() {
        let {name,email,password,confirmPassword,error} = this.state
        return (
            <div className="container">
                <h1 className="text-center p-5">Register Here</h1>
                <div className='m-3 p-2 w-75'>
                    <form onSubmit={this.submitHandler}>
                        <div className="form-group py-1">
                            <label  htmlFor="name" className="d-block py-2">Name:</label>
                            <input type="text" className={error.name?'form-control is-invalid': 'form-control'}
                            onChange={this.changeHandler} name="name" placeholder="Enter your Name" id="name" value={name} />
                            {error.name && <div className='invalid-feedback'>{error.name}</div>}
                        </div>
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
                        <div className="form-group py-1">
                            <label htmlFor="confirmPassword" className="d-block py-2">Confirm Password:</label>
                            <input type="password" className={error.confirmPassword?'form-control is-invalid': 'form-control'}
                            onChange={this.changeHandler} name="confirmPassword" placeholder="Re-enter your Password" id="confirmPassword" value={confirmPassword} />
                            {error.confirmPassword && <div className='invalid-feedback'>{error.confirmPassword}</div>}
                        </div>
                        <div className="col-auto py-1">
                            <Link to="/login">Already have acount?Log in now!</Link>
                        </div>
                        <div className="col-auto py-1">
                            <button  className="btn btn-primary">Register</button>
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

export default connect(mapStateToProps,{registerAction}) (register);