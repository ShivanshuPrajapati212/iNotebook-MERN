const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true, 
    }
  });
const Note = mongoose.model('notes', NotesSchema);
  module.exports = Note