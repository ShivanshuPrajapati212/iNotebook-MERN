const express = require("express");
const Note = require("../models/Note.js");
const { validationResult } = require("express-validator")

const fetchAllNotes = async (req, res) => {
  try{

    const notes = await Note.find({user: req.user.id});
    return res.status(200).json(notes);
  } catch{
    res.status(400).json("Some Error occurred")
  }
};

const addNote = async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note = new Note({
      user: req.user.id,
      title: req.body.title,
      desc: req.body.desc,
    });


    const savedNote = await note.save()

    return res.json({success: true, savedNote});

  } catch(e) {
    return res
      .status(400)
      .json({ success: false, error: "Some Error occurred", a:req.user.id });
  }
};

const updateNote = async (req, res) => {
  try {
  const { title, desc } = req.body;

  const { id } = req.params;

  
  let note = await Note.findById(id)

  if (!note) {
    return res
      .status(404)
      .json({ success: false, error: "Note with this id not found" });
  }
  
  const new_note = note;

  if (title) {
    new_note.title = title;
  }
  if (desc) {
    new_note.desc = desc;
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
}

  note = await Note.findByIdAndUpdate(req.params.id, { $set: new_note }, { new: true })

  return res.status(200).json({ success: true, note });
}catch(e) {
    return res
      .status(400)
      .json({ success: false, error: "Some Error occurred", a:req.user.id, e });
  }
};

const deleteNote = async (req, res) => {
  try{
  const { id } = req.params;
  let note = await Note.findById(id)

  if (!note) {
    return res
      .status(404)
      .json({ success: false, error: "Note with this id not found" });
  }
  
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
}

note = await Note.findByIdAndDelete(id)


return res.status(200).json({ success: true, note });
}catch(e) {
  return res
    .status(400)
    .json({ success: false, error: "Some Error occurred", a:req.user.id, e });
}
};

module.exports = {
  fetchAllNotes,
  addNote,
  updateNote,
  deleteNote,
};
