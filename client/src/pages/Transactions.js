// TransactionPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [showForm, setShowForm] = useState(false);
    useEffect(() => {
        // Fetch transaction history when component mounts
        fetchTransactions();
    }, []);

    const [transactionType, setTransactionType] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();


        try {
            // Call your API to add the transaction
            const response = axios.post('/api/create', {
                "type":transactionType,
                "amount":amount,
                "status":status,
            }, { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}});

            // Handle successful response
            console.log('Transaction added successfully:', response.data);
            fetchTransactions();
            setShowForm(false);
            setAmount('');
            setStatus('');
            setTransactionType('');
            // Optionally, reset form fields or show success message
        } catch (error) {
            // Handle error response
            console.error('Error adding transaction:', error.response.data.error);
            setErrorMessage('Error adding transaction. Please try again.');
        }

        // If validation passes, you can proceed with the submission
        // Call your API to add the transaction here
        // Example:
        // addTransaction({ transactionType, amount, status, password });
    };

   const handelFormShow = () => {
    setShowForm(!showForm);
   }
    const fetchTransactions = async () => {
        try {
            const response = await axios.get('/api/transactions', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}});
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    return (
        <Layout>
            <div className="row justify-content-md-center">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">Dashboard</a>
                            <div className="d-flex">
                                <ul className="navbar-nav">
                                <li className="nav-item">
                                        <Link className="nav-link" to="/">Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/account">Account</Link>
                                    </li>

                    
                                </ul>
                            </div>
                        </div>
                    </nav>

                    { !showForm && <div>
<br></br>
                        <button onClick={handelFormShow}>New Transaction</button>
                        <br></br>
                        <h2>Transaction History</h2>
                        <br></br>
                        <ul>
                            {transactions.map(transaction => (
                                <li key={transaction.id}>
                              
                                 <span>Transaction Type : {transaction.type}</span> 
                                 <span>Amount : {transaction.amount}</span> 
                                 <span>Date : {transaction.created_at}</span> 
                              
                                </li>
                            ))}
                        </ul>
                    </div> }

                 {showForm &&   <div>
            <h2>Add New Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div>

                    <select
                        id="transactionType"
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value)}
                        required
                    >
                        <option value="">Select Transaction Type</option>
                        <option value="deposit">Deposit</option>
                        <option value="withdrawal">Withdrawal</option>
                    </select>
                </div>
                <div>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <button type="submit">Submit</button>
                <button onClick={handelFormShow}>Cancel</button>
            </form>
        </div>
        }
                </div>
            </div>
        </Layout>

    );
}

export default Transactions;
