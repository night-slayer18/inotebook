import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NoteItem = (props) => {

  const successToast = () => {
    toast.success('Note Edited Successfully', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true
      });
  }
  const deleteToast = () => {
    toast.error('Note Deleted', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true
      });
  }
  return (
    <div className="col-md-3">
      <div className="card my-3 text-center mb-3">
          <div className="card-body">
              <h5 className="card-title">{props.note.title}</h5>
              <p className="card-text">{props.note.description}</p>
              <p className="card-text">{props.note.tag}</p>
              <button onClick={successToast} className="btn btn-success mx-2 my-2">Edit <i className="bi bi-pencil-square"></i></button>
              <button onClick={deleteToast} className="btn btn-danger mx-2 my-2">Delete <i className="bi bi-x-octagon"></i></button>
              <ToastContainer/>
          </div>
      </div>
    </div>
  )
}

export default NoteItem
