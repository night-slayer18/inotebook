import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {

    const [credentials, setCredentials] = useState({email:"",password:""})
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}),
        })
        const json = await response.json();
        if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("Account Logged In Successfully","success")
            history("/");
        }
        else{
            props.showAlert("Invalid Credentials","danger")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }

  return (
    <>
    <div className="container my-5" style={{width:'40rem'}}>
        <h2 className="my-5">Login to continue to iNotebook</h2>
    <form onSubmit={handleSubmit}>
        <div className="row mb-3">
            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
            <input onChange={onChange} type="email" name='email' className="form-control" id="email" value={credentials.email} required/>
            </div>
        </div>
        <div className="row mb-3">
            <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
            <input onChange={onChange} type="password" name='password' className="form-control" id="password" value={credentials.password} required minLength={5}/>
            </div>
        </div>
        <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
    </div>
    </>
  )
}

export default Login
