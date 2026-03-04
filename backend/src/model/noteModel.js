import mongoose from "mongoose";

const NoteScheme = new mongoose.Schema({
    title: { 
        type: String,
        required: true ,
        minlength:2 ,
        maxlength:100
    },

    category: { 
        type: String,
        required: true ,
        enum:["study","personal","work","important"] 
    },

    isCompleted: { 
        type: Boolean,
        default: false 
    },

    subject: { 
        type: String,
        required: true ,
        minlength:2,
        maxlength:50
    },

    content: { 
        type: String,
        required: true ,
        minlength:10 , 
        maxlength:500 , 
        unique:true ,
        lowercase:true}

},{ timestamps: true })

const Note = mongoose.model("Note", NoteScheme);
export default Note;