import React, { Component } from 'react';
import {connect} from 'react-redux'
import getUserInfo from '../store/actions/getUserInfo'
import getTransactions from '../store/actions/getTransactions'

class Dashboard extends Component {

    state={
        sort: 'all'
    }

    selectHandler = event=>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    componentDidMount(){
        this.props.getUserInfo(this.props.auth.user._id)
        this.props.getTransactions(this.props.auth.user._id)
    }

    render() {
        let {userReducer,transactionReducer}=this.props
        return (
            <div>
                <h1 className='text-center p-3'>Welcome to your Dashboard</h1>
                <div className="container p-5">
                        <div className="pb-2">Name: {userReducer.user.name}</div>
                        <div className="pb-2">Email: {userReducer.user.email}</div>
                        <div className="pb-2">Income: {userReducer.user.income}</div>
                        <div className="pb-2">Expense: {userReducer.user.expense}</div>
                        <div className="">Balance: {userReducer.user.balance}</div>
                </div>
                <h1 className='text-center p-3'>Your Transactions</h1>

                <table class="table table-hover">
                    <thead className="thead-light">
                        <tr>
                            <th>Date</th>
                            <th>Details</th>
                            <th>
                                <label htmlFor='sort'className='mx-2'>SortBy:</label>
                                <select id='sort' name='sort'onChange={this.selectHandler}>
                                    <option value="all" selected >All</option>
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.sort==='income'&&
                            transactionReducer.transactions.filter(trans=> trans.type==='income')
                            .map(filterTransactions=>(
                                <tr
                                key={filterTransactions._id}
                                className='table-primary'
                                >
                                    <td>{filterTransactions.updatedAt.slice(0,10)}</td>
                                    <td>Earn {filterTransactions.amount} from {filterTransactions.note}</td>
                                    <td>
                                        <button className='btn btn-warning mx-3'>Edit</button>
                                        <button className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                        {
                            this.state.sort==='expense'&&
                            transactionReducer.transactions.filter(trans=> trans.type==='expense')
                            .map(filterTransactions=>(
                                <tr
                                key={filterTransactions._id}
                                className='table-success'
                                >
                                    <td>{filterTransactions.updatedAt.slice(0,10)}</td>
                                    <td>Spend {filterTransactions.amount} for {filterTransactions.note}</td>
                                    <td>
                                         <button className='btn btn-warning mx-3'>Edit</button>
                                        <button className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                        {
                            this.state.sort==='all'&&
                            transactionReducer.transactions
                            .map(filterTransactions=>(
                                <tr
                                key={filterTransactions._id}
                                className={filterTransactions.type==='income'?
                                'table-primary':'table-success'}
                                >
                                    <td>{filterTransactions.updatedAt.slice(0,10)}</td>
                                    <td>{filterTransactions.type==='income'&& <span> Earn </span>}
                                    {filterTransactions.type==='expense'&& <span> Spend </span>}
                                    {filterTransactions.amount} 
                                    {filterTransactions.type==='income'&& <span> from </span>}
                                    {filterTransactions.type==='expense'&& <span> for </span>}
                                    {filterTransactions.note}</td>
                                    <td>
                                        <button className='btn btn-warning mx-3'>Edit</button>
                                        <button className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                        
                    </tbody>
                    </table>
                    <div className='d-flex justify-content-start py-3'>
                        <button className='btn btn-success m-2'>Create New Transaction</button>
                        <button className='btn btn-danger m-2'>Delete all Transaction</button>
                    </div>
                </div>
        );
    }
}

const mapStateToProps=state=>({
    auth: state.auth,
    userReducer: state.userReducer,
    transactionReducer: state.transactionReducer
})
export default connect(mapStateToProps,{getUserInfo,getTransactions})(Dashboard);