import React, { Component } from 'react';
import Modal from 'react-modal'
import {connect} from 'react-redux'
import createTransaction from '../store/actions/createTransaction'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class CreateNewTransaction extends Component {

    state={
        amount: null,
        type: "",
        note: "",
        error: {}
    }

    static getDerivedStateFromProps(nextProps,prevState){
        if(JSON.stringify(nextProps.transactionReducer.error)!==JSON.stringify(prevState.error)){
            return{
                error: nextProps.transactionReducer.error
            }
        }
        return null
    }
    changeHandler = event =>{
        this.setState({
         [event.target.name] : event.target.value
        })
     }

     submitHandler = event =>{
        event.preventDefault()
        let {amount,type,note} = this.state
        let author = this.props.auth.user._id
        this.props.createTransaction({amount,type,note,author})
        if(Object.keys(this.state.error).length === 0){
            this.setState({
                amount: null,
                type: "",
                note: "",
                error: {}
            })
            this.props.close()
        }
    }
     
    render() {
        let {amount,note,error}= this.state
        return (
            <div className='container'>
                <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.close}
                style={customStyles}
                contentLabel="Create New Transaction"
                >
                <h2 className="text-center">Create New Transaction</h2>
                <form onSubmit={this.submitHandler}>
                        <div className="form-group py-1">
                            <label htmlFor="amount" className="d-block py-2">Amount:</label>
                             <input type="number" className={error.amount?'form-control is-invalid': 'form-control'} 
                             onChange={this.changeHandler} name="amount" placeholder="Enter Amount" id="amount" value={amount} />
                            {error.amount && <div className='invalid-feedback'>{error.amount}</div>}
                        </div>
                        <div className="form-group py-1">
                            <label htmlFor='type'className='d-block py-2'>Type:</label>
                            <select id='type' className="form-select" name='type'onChange={this.changeHandler}>
                                <option selected >Choose a type</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>
                        <div className="form-group py-1">
                            <label  htmlFor="note" className="d-block py-2">Note:</label>
                            <textarea className={error.note?'form-control is-invalid': 'form-control'} 
                            onChange={this.changeHandler} name="note" placeholder="Enter a short note" id="note" value={note} />
                            {error.note  && <div className='invalid-feedback'>{error.note}</div>}
                        </div>
                        <button className="btn btn-primary">Submit</button>
                    </form>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state =>({
    auth: state.auth,
    transactionReducer: state.transactionReducer
})

export default connect(mapStateToProps,{createTransaction})(CreateNewTransaction);