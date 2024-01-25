import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"

    const notesInitial = []
      const [notes, setnotes] = useState(notesInitial)
      // get all notes

      const getNotes = async () => {
        // API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhZTQzYzY2ZGNhNmUxZjhmZGMxMDNjIn0sImlhdCI6MTcwNTkyMjQ3Mn0.ufoYLSAwtGKaRjUWcdfeikUKUI69Wuz1tiTuklfkEjM"
          },
        });
        const json = await response.json(); 
        console.log(json);
        setnotes(json)
      }
      // add a note
      const addNote = async (title,description,tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST", 
          
          headers: {
            "Content-Type": "application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhZTQzYzY2ZGNhNmUxZjhmZGMxMDNjIn0sImlhdCI6MTcwNTkyMjQ3Mn0.ufoYLSAwtGKaRjUWcdfeikUKUI69Wuz1tiTuklfkEjM"
          },
          
          body: JSON.stringify({title,description,tag}),
        });
        const note = await response.json();
        setnotes(notes.concat(note))
      }


      // delete a note
      const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", 
          
          headers: {
            "Content-Type": "application/json",
            "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhZTQzYzY2ZGNhNmUxZjhmZGMxMDNjIn0sImlhdCI6MTcwNTkyMjQ3Mn0.ufoYLSAwtGKaRjUWcdfeikUKUI69Wuz1tiTuklfkEjM"
          },          
        });
        console.log("deleteting a note" + id)
        const newNotes = notes.filter((note)=>{return note._id!==id})
        setnotes(newNotes)
      }

      // edit a note

      const editNote = async (id,title,description,tag) => {
          const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT", 
            
            headers: {
              "Content-Type": "application/json",
              "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVhZTQzYzY2ZGNhNmUxZjhmZGMxMDNjIn0sImlhdCI6MTcwNTkyMjQ3Mn0.ufoYLSAwtGKaRjUWcdfeikUKUI69Wuz1tiTuklfkEjM"
            },
            
            body: JSON.stringify({title,description,tag}),
          });
          
          let newNotes = JSON.parse(JSON.stringify(notes))
          for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id===id){
              newNotes[index].title = title;
              newNotes[index].description = description;
              newNotes[index].tag = tag;
              break;
            }
          }
          setnotes(newNotes)
      }
    return (
        <NoteContext.Provider value = {{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;