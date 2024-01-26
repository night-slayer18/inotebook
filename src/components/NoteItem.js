import React, { useContext } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import noteContext from '../context/notes/noteContext'


const NoteItem = (props) => {

  const context = useContext(noteContext)
  const {deleteNote} = context;
  return (
    <div className="col-md-3">
      <div className="card my-3 text-center mb-3">
          <div className="card-body">
              <h5 className="card-title">{props.note.title}</h5>
              <p className="card-text">{props.note.description}</p>
              <p className="card-text">{props.note.tag}</p>
              <button onClick={()=>{props.updateNote(props.note)}} className="btn btn-success mx-2 my-2">Edit <i className="bi bi-pencil-square"></i></button>
              <button onClick={()=>{deleteNote(props.note._id);props.deleteNoteToast()}} className="btn btn-danger mx-2 my-2">Delete <i className="bi bi-x-octagon"></i></button>
          </div>
      </div>
    </div>
  )
}

export default NoteItem
