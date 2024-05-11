import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import Layout from "../components/Layout"
function Account() {
    const [pin, setPin] = useState('');
    // const history = useHistory();
    const navigate = useNavigate();
    const [user, setUser] = useState({})

    useEffect(() => {
        if (localStorage.getItem('token') == "" || localStorage.getItem('token') == null) {
            navigate("/");
        } else {
            getUser()
        }
    }, [])
    const bodyParameters = {
        "token": localStorage.getItem('token')
    };

    const getUser = () => {
        axios.get('/api/get_user', {
            params: {
                token: localStorage.getItem('token')
            }
        })
            .then((r) => {
                console.log(r);
                setUser(r.data.user)
            })
            .catch((e) => {
                console.log(e)
            });
    }


    const handlePinSubmit = async () => {
        try {
            await axios.post('/api/set-pin', { pin });
            // Redirect to transaction page after PIN is set
            //     history.push('/transactions');
        } catch (error) {
            console.error('Error setting PIN:', error);
        }
    };

    return (

        <Layout>
            <div className="row justify-content-md-center">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">Account</a>
                            <div className="d-flex">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/transactions">Transactions</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">Dashboard</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <div className="col-12 text-center">

                        <h2 className="text-center mt-5">Welcome, {user.name}!</h2  >
                        <h2>Set PIN</h2>
                        <input type="password" placeholder="Enter PIN" value={pin} onChange={(e) => setPin(e.target.value)} />
                        <button onClick={handlePinSubmit}>Set PIN</button>
                    </div>
                </div>
            </div>
        </Layout>

    );
}

export default Account;
