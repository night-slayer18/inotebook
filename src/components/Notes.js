import React, { useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import { useContext } from 'react'
import NoteItem from './NoteItem'
import AddNotes from './AddNotes';


const Notes = () => {
  const context = useContext(noteContext)
  const {notes,getNotes,editNote} = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, [])
  let ref = useRef(null)
  let refClose = useRef(null)

  const [note, setNote] = useState({id: "",etitle:"", edescription:"", etag:""})

  const updateNote = (currentNote) => {
    ref.current.click()
    setNote({id:currentNote._id,etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
  }

  const handleClick = (e)=>{
    editNote (note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click()
  }

  const onChange = (e)=>{
    setNote({...note, [e.target.name]:e.target.value})
  }

  return (
    <>
    <AddNotes/>
    <button ref = {ref} type="button" className="btn btn-primary" hidden data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>

    <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">Title</label>
                <input type="text" name='etitle' className="form-control" id="etitle" aria-describedby="title1" onChange={onChange} value={note.etitle}/>
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Description</label>
                <input type="text" name='edescription' className="form-control" id="edescription" aria-describedby="edescription1" onChange={onChange} value={note.edescription} />
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">Tag</label>
                <input type="text" name='etag' className="form-control" id="etag" aria-describedby="tag1" onChange={onChange} value={note.etag} />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button ref = {refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button disabled={note.etitle.length<3 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
          </div>
        </div>
      </div>
    </div>
    <div className="row my-3">
          <h1>Your Notes</h1>
          <div className="container mx-2">
          {notes.length===0 && "No notes to display"}
          </div>
          {notes.map((note)=>{
            return <NoteItem key ={note._id} note={note} updateNote={updateNote}/>
          })}
    </div>
    </>
  )
}

export default Notes
