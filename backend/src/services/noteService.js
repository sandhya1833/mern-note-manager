import Note from "../model/noteModel.js";


export const getNoteService = async() =>{
    const notes = await Note.find();
    return notes;
}

export const createNoteService = async({category,isCompleted,subject,title,content}) => {
  const note =  new Note({category,isCompleted,subject,title,content});
  const savedNote = await note.save();
  return savedNote;
};

export const checkExitNoteService = async(content) =>{
  const note = await Note.findOne({content});
  return note;
}
 

export const getNoteByIdService = async(id) =>{
  const note = await Note.findById(id);
  return note;
}

export const updateNoteByIdService = async({id,data}) =>{
  const note = await Note.findByIdAndUpdate(id,data , {new:true,runValidators: true});
  return note;
}

export const deleteNoteByIdService=async(id) =>{
  const note = await Note.findByIdAndDelete(id);
  return note;
}