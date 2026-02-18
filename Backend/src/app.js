/*
Server ko create karna
*/

const express = require('express');
const noteModel = require('./models/note.model');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
/**
 * http://localhost:3000/asserts/index-C-MukGQ1.js
 */
app.use(express.static("./public"))
/**
 * - Post/api/notes -> create a note
 * - Create new note and save data in mongoDb
 * - req.body = {title, description}
 */

app.post('/api/notes', async (req, res) => {
    const { title, description } = req.body;

   const note = await noteModel.create({ 
    title, description })

    res.status(201).json({
        message: 'Note created successfully',
        note
    })
    // console.log(req.body);
    // res.send('Note created successfully');
});

/**
 * - Get/api/notes
 * - Fetch all notes data from mongodb and send them in the response 
 */

app.get('/api/notes', async (req, res) => {
    const notes = await noteModel.find();

    res.status(200).json({
        message: 'Notes fetched successfully',
        notes
    })
});

/**
 * - Delete/api/notes/:id 
 * - Delete note with the id from req.params 
 */
app.delete('/api/notes/:id',(req,res)=>{
    const id = req.params.id
    console.log(id)

    res.status(200).json({
        message: `Note with id ${id} deleted successfully`
    })
})

/**
 * Patch /api/notes/:id
 * - Update the descrption of the note by id 
 * req.body = {description}
 */
app.patch('/api/notes/:id', async (req, res) => {
    const id = req.params.id
    const { description } = req.body;

   await noteModel.findByIdAndUpdate(id, { description })

    res.status(200).json({
        message: "Note updated successfully."
    })
})

app.use('*name',(req, res)=>{
    res.sendFile(path.join(__dirname,"..", "public/index.html"))
})

module.exports = app