import React, { useRef, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const User = (props) => {
    const [password, setPassword] = useState({opass:"",npass:""})
    const ref = useRef(null)
    const closeref = useRef(null)
    const handleClick = (e) =>{
        ref.current.click()
    }
    const updatePass =  async (e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/updatepassword", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({oldPassword:password.opass,newPassword:password.npass}),
        })
        const json = await response.json();
        if (json.success){
            setPassword({opass:"",npass:""})
            closeref.current.click()
            props.passwordUpdated()
        }
        else{
            props.invalidCred()
        }
    }

    const onChange = (e)=>{
        setPassword({...password, [e.target.name]:e.target.value})
    }
  return (
    <>
    <button hidden ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
    </button>


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Change Password</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="opass" className="form-label">Old Password</label>
                <input onChange={onChange} value={password.opass} type="text" name='opass' className="form-control" id="opass" aria-describedby="opass" required/>
              </div>
              <div className="mb-3">
                <label htmlFor="npass" className="form-label">New Password</label>
                <input onChange={onChange} value={password.npass} type="text" name='npass' className="form-control" id="npass" aria-describedby="npass" required/>
              </div>
            </form>
        </div>
        <div className="modal-footer">
            <button ref = {closeref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button disabled={password.opass.length<5 && password.npass.length<5} onClick={updatePass} type="button" className="btn btn-primary">Update Password</button>
        </div>
        </div>
    </div>
    </div>
    <div className='d-flex justify-content-center align-items-center my-5 text-center'>
      <Card style={{ width: '25rem', height: '30rem' }}>
        <Card.Body className="d-flex flex-column align-items-center justify-content-center">
          <span className="bi bi-person-fill" style={{ fontSize: '5rem' }}></span>
          <Card.Title className="mb-3 text-center">{localStorage.getItem('name')}</Card.Title>
          <Card.Text className="mb-3 text-center">
            <strong>Email:</strong> {localStorage.getItem('email')}
          </Card.Text>
          <Button onClick={handleClick} variant="primary">Update Password</Button>
        </Card.Body>
      </Card>
    </div>
    </>
  )
}

export default User
