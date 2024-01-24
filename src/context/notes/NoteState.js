import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const notesInitial = [
        {
          "_id": "65ae77627bc0413c0ced8a9f",
          "user": "65ae43c66dca6e1f8fdc103c",
          "title": "ThunderClient",
          "description": "This note is sent using thunderclient",
          "tag": "Developer",
          "date": "2024-01-22T14:10:42.645Z",
          "__v": 0
        },
        {
          "_id": "65ae77637bc0413c0ced8aa1",
          "user": "65ae43c66dca6e1f8fdc103c",
          "title": "pro yt dev2",
          "description": "again updated both title and tag2",
          "tag": "Pro Developer2",
          "date": "2024-01-22T14:10:43.727Z",
          "__v": 0
        },
        {
          "_id": "65aff6815720e0bba13b20d2",
          "user": "65ae43c66dca6e1f8fdc103c",
          "title": "pro yt dev4",
          "description": "again updated both title and tag3",
          "tag": "Pro Developer5",
          "date": "2024-01-23T17:25:21.275Z",
          "__v": 0
        },
        {
          "_id": "65aff6825720e0bba13b20d4",
          "user": "65ae43c66dca6e1f8fdc103c",
          "title": "ThunderClient",
          "description": "This note is sent using thunderclient",
          "tag": "Developer",
          "date": "2024-01-23T17:25:22.456Z",
          "__v": 0
        },
        {
          "_id": "65aff6835720e0bba13b20d6",
          "user": "65ae43c66dca6e1f8fdc103c",
          "title": "ThunderClient",
          "description": "This note is sent using thunderclient",
          "tag": "Developer",
          "date": "2024-01-23T17:25:23.635Z",
          "__v": 0
        },
        {
          "_id": "65aff6845720e0bba13b20d8",
          "user": "65ae43c66dca6e1f8fdc103c",
          "title": "ThunderClient",
          "description": "This note is sent using thunderclient",
          "tag": "Developer",
          "date": "2024-01-23T17:25:24.666Z",
          "__v": 0
        }
      ]
      const [notes, setnotes] = useState(notesInitial)

      // add a note
      const addNote = (title,description,tag) => {
        console.log('adding a new note')
        const note = {
          "_id": "65aff6845720e0bba13b20d8888",
          "user": "65ae43c66dca6e1f8fdc103c7",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2024-01-23T17:25:24.666Z",
          "__v": 0
        }
        setnotes(notes.concat(note))
      }


      // delete a note
      const deleteNote = () => {

      }

      // edit a note

      const editNote = () => {}
    return (
        <NoteContext.Provider value = {{notes,addNote,deleteNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;