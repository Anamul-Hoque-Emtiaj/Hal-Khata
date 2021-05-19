import React, { Component } from 'react';
import {connect} from 'react-redux'
import getTransactions from '../store/actions/getTransactions'
import CreateNewTransaction from './CreateNewTransaction'
import EditTransaction from './EditTransaction'
import deleteAllTransaction from '../store/actions/deleteAllTransaction'
import deleteTransaction from '../store/actions/deleteTransaction'


class Dashboard extends Component {

    state={
        sort: 'latest',
        createModalOpen: false,
        updateModalOpen: false,
        id: ''
    }

    openCreateModal = ()=>{
        this.setState({
            createModalOpen: true
        })
    }
    
    closeCreateModal = ()=>{
        this.setState({
            createModalOpen: false
        })
    }

    openUpdateModal = (id)=>{
        this.setState({
            updateModalOpen: true,
            id
        })
    }
    
    closeUpdateModal = ()=>{
        this.setState({
            updateModalOpen: false,
            id: ''
        })
    }

    deleteAll=()=>{
        this.props.deleteAllTransaction(this.props.auth.user._id)
    }

    selectHandler = event=>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    componentDidMount(){
        this.props.getTransactions(this.props.auth.user._id)
    }

    render() {
        
        let {user,transactions} = this.props.transactionReducer
        let userInfo = this.props.auth.user
        return (
            
            <div>
                <h1 className='text-center p-3'>Welcome to your Dashboard</h1>
                <div className="container p-5">
                        <div className="pb-2">
                            <span className='fw-bold m-1'>Name: </span> <span>{userInfo.name}</span>
                        </div>
                        <div className="pb-2">
                            <span className='fw-bold m-1'>Email: </span> <span>{userInfo.email}</span>
                        </div>
                        <div className="pb-2">
                            <span className='fw-bold m-1'>Income: </span> <span>{user.income}</span>
                        </div>
                        <div className="pb-2">
                             <span className='fw-bold m-1'>Expense: </span> <span>{user.expense}</span>
                        </div>
                        <div className="">
                             <span className='fw-bold m-1'>Balance: </span> <span>{user.balance}</span>
                        </div>
                </div>
                <div className='container'>
                 <h3 className='text-center p-3'>Your Transactions</h3>

                <table class="table table-hover mx-2">
                    <thead className="thead-light">
                        <tr>
                            <th>Date</th>
                            <th>Details</th>
                            <th>
                                <label htmlFor='sort'className='mx-2'>SortBy:</label>
                                <select id='sort' name='sort'onChange={this.selectHandler}>
                                    <option value="latest" selected >Latest</option>
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.sort==='latest'?
                    
                            transactions.map(filterTransactions=>
                            ( 
                                    <tr
                                        key={filterTransactions._id}
                                        className={filterTransactions.type==='income'?
                                        'table-primary':'table-success'}
                                    >
                                        {this.state.id===filterTransactions._id ?
                                            <EditTransaction
                                            isOpen={this.state.updateModalOpen}
                                            close={this.closeUpdateModal}
                                            transaction={filterTransactions}
                                        /> : null
                                            }
                                        <td>{filterTransactions.updatedAt.slice(0,10)}</td>
                                        <td>
                                            {filterTransactions.type==='income' ? <span> Earn </span> : 
                                                <span> Spend </span>}
                                            {filterTransactions.amount} 
                                            {filterTransactions.type==='income'? <span> tk from </span>:
                                                <span> tk for </span>}
                                            {filterTransactions.note}</td>
                                        <td>
                                            <button className='btn btn-warning mx-3'
                                                onClick={()=>this.openUpdateModal(filterTransactions._id)}
                                            >Edit</button>
                                            <button className='btn btn-danger'
                                                onClick={()=>this.props.deleteTransaction(filterTransactions._id)}
                                            >Delete</button>
                                        </td>
                                    </tr>
                                )
                            )
                        
                        : this.state.sort==='income' ?
                    
                            transactions.filter(trans=> trans.type==='income').map(filterTransactions=>
                            (
                                    <tr
                                        key={filterTransactions._id}
                                        className='table-primary'
                                    >
                                        {this.state.id===filterTransactions._id ?
                                            <EditTransaction
                                            isOpen={this.state.updateModalOpen}
                                            close={this.closeUpdateModal}
                                            transaction={filterTransactions}
                                        /> : null
                                            }
                                    
                                        <td>{filterTransactions.updatedAt.slice(0,10)}</td>
                                        <td>Earn {filterTransactions.amount} tk from {filterTransactions.note}</td>
                                        <td>
                                            <button className='btn btn-warning mx-3'
                                                onClick={()=>this.openUpdateModal(filterTransactions._id)}
                                            >Edit</button>
                                            <button className='btn btn-danger'
                                                onClick={()=>this.props.deleteTransaction(filterTransactions._id)}
                                            >Delete</button>
                                        </td>
                                    </tr>
                                )
                                
                                )
                            :
                    
                            transactions.filter(trans=> trans.type==='expense').map(filterTransactions=>
                        (
                                
                                    <tr
                                        key={filterTransactions._id}
                                        className='table-success'
                                    >
                                        {this.state.id===filterTransactions._id ?
                                            <EditTransaction
                                            isOpen={this.state.updateModalOpen}
                                            close={this.closeUpdateModal}
                                            transaction={filterTransactions}
                                        /> : null
                                            }
                                        <td>{filterTransactions.updatedAt.slice(0,10)}</td>
                                        <td>Spend {filterTransactions.amount} tk for {filterTransactions.note}</td>
                                        <td>
                                            <button className='btn btn-warning mx-3'
                                                onClick={()=>this.openUpdateModal(filterTransactions._id)}
                                            >Edit</button>
                                            <button className='btn btn-danger'
                                                onClick={()=>this.props.deleteTransaction(filterTransactions._id)}
                                            >Delete</button>
                                        </td>
                                    </tr>
                                )
                            )
                    }
                    </tbody>
                    </table>
                    <div className='d-flex justify-content-start py-3 mx-5'>
                        <CreateNewTransaction 
                        isOpen={this.state.createModalOpen}
                        close={this.closeCreateModal}
                         />
                        <button className='btn btn-success m-2' onClick={this.openCreateModal}>Create New Transaction</button>
                        <button className='btn btn-danger m-2' onClick={this.deleteAll}>Delete all Transaction</button>
                    </div>
                </div>
                </div>
        );
    }
}

const mapStateToProps=state=>({
    auth: state.auth,
    transactionReducer: state.transactionReducer
})
export default connect(mapStateToProps,{getTransactions,
    deleteAllTransaction,deleteTransaction})(Dashboard);