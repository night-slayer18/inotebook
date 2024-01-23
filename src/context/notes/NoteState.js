import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const s1 = {
        "name": "Harry",
        "class": "5th",
        "roll": "21"
    }

    const [state,setState] = useState(s1);
    const update = () => {
        setTimeout(() => {
            setState({
                "name": "Rohan",
                "class": "10th",
                "roll": "25"
            });
        }, 1000);
    }
    return (
        <NoteContext.Provider value = {{state,update}}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;