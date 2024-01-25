import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setcredentials] = useState({name:"",email:"",password:"",confirmpassword:""})
  const {name, email, password,confirmpassword} = credentials;
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name,email,password}),
    })
    const json = await response.json();
    if(json.success){
      // Save the auth token and redirect
      history("/login");
      props.showAlert("Account Created Successfully","success")
    }
  }

  const onChange = (e)=>{
    setcredentials({...credentials, [e.target.name]:e.target.value})
  }

  return (
    <div className="container my-5" style={{width:'40rem'}}>
      <h2 className="my-5">Signup to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input value ={name} onChange={onChange} type="text" className="form-control" id="name" name='name' aria-describedby="name"required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input value={email} onChange={onChange} type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp"required/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input value ={password} onChange={onChange} type="password" className="form-control" id="password" name='password'required minLength={5}/>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
          <input value ={confirmpassword} onChange={onChange} type="password" className="form-control" id="confirmpassword" name='confirmpassword' required minLength={5}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
