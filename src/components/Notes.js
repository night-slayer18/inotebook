import React from 'react'
import noteContext from '../context/notes/noteContext'
import { useContext } from 'react'
import NoteItem from './NoteItem'
import AddNotes from './AddNotes';

const Notes = () => {
  const context = useContext(noteContext)
  const {notes} = context;
  return (
    <>
    <AddNotes/>
    <div className="row my-3">
          <h1>Your Notes</h1>
          {notes.map((note)=>{
            return <NoteItem key ={note._id} note={note} />
          })}
    </div>
    </>
  )
}

export default Notes
