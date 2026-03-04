import {  checkExitNoteService, createNoteService, deleteNoteByIdService, getNoteByIdService, getNoteService, updateNoteByIdService } from "../services/noteService.js";

export const getAllNotes = async (req, res) => {
    try {
    const note = await getNoteService();
    res.status(200).json(note);
  } catch (error) {
    console.log("error in getAllNotes controller" , error);
    res.status(500).json({ message: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    let {category ,isCompleted,subject,title,content} = req.body;

    category = category.trim().toLowerCase();
    subject = subject.trim();
    title = title.trim();
    content = content.trim();
    
    if(!category|| !subject||!title||!content) {
      return res.status(400).json({message:"all fields are required."})
    }

    

    if (isCompleted === undefined) {
      isCompleted = false;
    }

    if (typeof isCompleted !== "boolean") {
      return res.status(400).json({ message: "isCompleted must be true or false" });
    }

    const ExitContent = await checkExitNoteService(content);
    if(ExitContent){
      return res.status(400).json({message:"Note is already exist with same content"})
    }

    const allowedCategory = ["study","personal","work","important"];
    if(!allowedCategory.includes(category)){
      return res.status(400).json({message:"Invalid category"});
    }

    const note = await createNoteService({category,isCompleted,subject,title,content});
    res.status(201).json(note);

  } catch (error) {
    if (error.name === "ValidationError") {
    const message = Object.values(error.errors)
      .map((err) => err.message)
      .join(", ");

    return res.status(400).json({ message });
  }
    console.log("error in createnotes controller" , error);
    res.status(500).json({ message: error.message });
  }
};

export const getNoteById = async(req,res) =>{
  try {
    const {id} = req.params;
    const note = await getNoteByIdService(id);
    if(!note) return res.status(404).json({message:"note not found"});
    res.status(200).json(note);
  } catch (error) {
    console.log("error in getting note by id" , error);
    res.status(500).json({ message: error.message });
  }
}

export const updateNoteById = async(req,res)=>{
  try {
    const {id} = req.params;
    const data = req.body;
    console.log("data", data);
     
    Object.entries(data).forEach(([key, value]) => {
    if (typeof value === "string") {
    req.body[key] = value.trim();
    }});

     
    const note = await updateNoteByIdService({id,data});
    if(!note) return res.status(404).json({message:"note not found"});
    res.status(200).json({note});
  } catch (error) {
    console.log("error in update controller" , error);
    res.status(500).json({ message: error.message });
  }
}

export const deleteNoteById = async(req,res) =>{
  try {
    const {id} = req.params;
    const note = await deleteNoteByIdService(id);
    if(!note) return res.status(404).json({message:"note not found"});
    res.status(200).json({message:"deleted successfully"});
  } catch (error) {
    console.log("error in deleting note controller");
    res.status(500).json({message:error.message});
  }
}