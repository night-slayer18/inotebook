const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes',fetchuser, async (req, res)=>{
    try {
        const notes =  await Notes.find({user:req.user.id});
        res.json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error occured");
    }
});

// Route 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post('/addnote',fetchuser,[
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
], async (req, res)=>{
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            }
            //create a new note
            const note = new Notes({
                user:req.user.id,
                title:req.body.title,
                description:req.body.description,
                tag:req.body.tag
            });

            const saveNote = await note.save();
            res.json(saveNote);
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server error occured");
        }
    }
);

// Route 3: delete an existing note using: DELETE "/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id',fetchuser, 
    async (req, res)=>{
        try {
            const note = await Notes.findById(req.params.id);
            if(!note){
                return res.status(404).json({"message":"Not found"});
            }
            //Allow deletion only if user owns this note
            if(note.user.toString() !== req.user.id){
                return res.status(401).send("Not allowed, you are not the owner of this note");
            }
            // Delete the node based on the id provided
            const deleteNote = await Notes.findByIdAndDelete(req.params.id);
            res.json({"Success":"Note has been deleted", deleteNote});
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server error occured");
        }
    }
);

// Route 4: update an existing note using: PUT "/api/notes/updatenote/:id". Login required
router.put('/updatenote/:id',fetchuser,
    async (req, res)=>{
        try {
            const note = await Notes.findById(req.params.id);
            if(!note){
                return res.status(404).json({"message":"Not found"});
            }
            //Allow updation only if user owns this note
            if(note.user.toString() !== req.user.id){
                return res.status(401).send("Not allowed, you are not the owner of this note");
            }

            const {title, description, tag} = req.body;
            const updateNote = {};
            if(title){updateNote.title = title};
            if(description){updateNote.description = description};
            if(tag){updateNote.tag = tag};

            //Find the note to be updated and update it
            const update = await Notes.findByIdAndUpdate(req.params.id, {$set:updateNote}, {new:true});
            res.json({"Success":"Note has been updated", update});

        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server error occured");
        }
    }
)
module.exports = router;