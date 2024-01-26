import React from 'react'
import Notes from './Notes';

const Home = (props) => {
  const {deleteNoteToast,updateNoteToast,addNoteToast}=props;
  return (
    <div>
        <Notes deleteNoteToast={deleteNoteToast} updateNoteToast={updateNoteToast} addNoteToast={addNoteToast}/>
    </div>
  )
}

export default Home
