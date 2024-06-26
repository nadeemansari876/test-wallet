import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
  
function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [dob, setDob] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [validationErrors, setValidationErrors] = useState({});
    const [stripeError, setStripeError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
 
    useEffect(()=>{
        if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
            navigate("/dashboard");
        }
    },[])
 
    const registerAction = (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        let payload = {
            name: name,
            email:email,
            dob:dob,
            password:password,
            password_confirmation:confirmPassword
        }

        console.log(payload);
        axios.post('/api/register', payload)
        .then((r) => {
            setIsSubmitting(false)
           // localStorage.setItem('token', r.data.token)
            navigate("/dashboard");
        })
        .catch((e) => {
            console.log('fail',e);
            setIsSubmitting(false)
            if (e.response.data.error != undefined) {
                setValidationErrors(e.response.data.error);
                console.log(e.response.data);
                setStripeError(e.response.data.error);
            }else{
                console.log(e.response.data);
                setStripeError(e.response.data[0]);
            }
        });
    }
     
    return (
        <Layout>
            <div className="row justify-content-md-center mt-5">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Register</h5>
                            <form onSubmit={(e)=>registerAction(e)}>
                                <div className="mb-3">
                                    <label 
                                        htmlFor="name"
                                        className="form-label">Name
                                    </label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={name}
                                        onChange={(e)=>{setName(e.target.value)}}
                                    />
                                    {validationErrors.name != undefined &&
                                        <div className="flex flex-col">
                                            <small  className="text-danger">
                                            {validationErrors.name[0]}
                                            </small >
                                        </div>
                                    }
                                     
                                </div>
                                <div className="mb-3">
                                    <label 
                                        htmlFor="email"
                                        className="form-label">Email address
                                    </label>
                                    <input 
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e)=>{setEmail(e.target.value)}}
                                    />
                                    {validationErrors.email != undefined &&
                                        <div className="flex flex-col">
                                            <small  className="text-danger">
                                            {validationErrors.email[0]}
                                            </small >
                                        </div>
                                    }
                                     
                                </div>

                                <div className="mb-3">
                                    <label 
                                        htmlFor="email"
                                        className="form-label">Date of Birth
                                    </label>
                                    <input 
                                        type="date"
                                        className="form-control"
                                        id="dob"
                                        name="dob"
                                        value={dob}
                                        onChange={(e)=>{setDob(e.target.value)}}
                                    />
                                    {validationErrors.dob != undefined &&
                                        <div className="flex flex-col">
                                            <small  className="text-danger">
                                            {validationErrors.dob[0]}
                                            </small >
                                        </div>
                                    }
                                     
                                </div>

                                <div className="mb-3">
                                    <label 
                                        htmlFor="password"
                                        className="form-label">Password
                                    </label>
                                    <input 
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e)=>setPassword(e.target.value)}
                                    />
                                    {validationErrors.password != undefined &&
                                        <div className="flex flex-col">
                                            <small  className="text-danger">
                                            {validationErrors.password[0]}
                                            </small >
                                        </div>
                                    }
                                </div>
                                <div className="mb-3">
                                    <label 
                                        htmlFor="confirm_password"
                                        className="form-label">Confirm Password
                                    </label>
                                    <input 
                                        type="password"
                                        className="form-control"
                                        id="confirm_password"
                                        name="confirm_password"
                                        value={confirmPassword}
                                        onChange={(e)=>setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                {stripeError != '' &&
                                        <div className="flex flex-col">
                                            <small  className="text-danger">
                                            {stripeError}
                                            </small >
                                        </div>
                                    }
                                <div className="d-grid gap-2">
                                    <button 
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="btn btn-primary btn-block">Register Now
                                    </button>
                                    <p 
                                        className="text-center">Have already an account <Link to="/">Login here</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
   
export default Register;