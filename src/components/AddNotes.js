import React, { useState } from 'react'
import noteContext from '../context/notes/noteContext'
import { useContext } from 'react'

const AddNotes = () => {
    const context = useContext(noteContext)
    const {addNote} = context;

    const [note, setNote] = useState({title:"", description:"", tag:""})

    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote ({title:"", description:"", tag:""})
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
          <h1>Add a note</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" name='title' className="form-control" id="title" aria-describedby="title1" onChange={onChange} value = {note.title}/>
              <div id="title1" className="form-text">Enter Your Title</div>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input type="text" name='description' className="form-control" id="description" aria-describedby="description1" onChange={onChange} value = {note.description}/>
              <div id="desciption1" className="form-text">Enter Your Description</div>
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">Tag</label>
              <input type="text" name='tag' className="form-control" id="tag" aria-describedby="tag1" onChange={onChange} value = {note.tag}/>
              <div id="tag1" className="form-text">Enter Your Tag</div>
            </div>
            <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
          </form>
        </div>
    </div>
  )
}

export default AddNotes
