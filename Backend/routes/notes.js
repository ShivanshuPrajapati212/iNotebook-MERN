const express = require("express")
const router = express.Router()
const { body } = require("express-validator")

const {fetchAllNotes, addNote, updateNote, deleteNote} = require("../controllers/notes.js")

const fetchuser = require("../middleware/fetchuser.js")

router.get("/fetchallnotes",fetchuser, fetchAllNotes)
router.post("/addnote", [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('desc', 'Description must be atleast 5 characters').isLength({ min: 5 })
],fetchuser, addNote)
router.put("/updatenote/:id",fetchuser, updateNote)
router.delete("/deletenote/:id",fetchuser, deleteNote)


module.exports = router