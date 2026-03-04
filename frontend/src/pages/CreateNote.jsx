import  { useState } from 'react'
import {useNavigate } from 'react-router';
import toast from "react-hot-toast";
import api from '../lib/axios';
import { FormComponent } from '../components/FormComponent';

const CreateNote = () => {
  const [formData , setFormData] = useState({title:"", subject:"",isCompleted:false , category:"",content:""});
  const [loading , setLoading] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>{
    const {name , value , type ,checked} = e.target;
    setFormData((prev)=>({...prev, [name]:type==="checkbox" ?checked :value}));
  }

  const handleSubmitEvent = async (e) => {
  e.preventDefault();
  if (formData.title.trim().length < 2) {
    toast.error("Title must be at least 2 characters");
    return;
  }
  if (formData.subject.trim().length < 2) {
    toast.error("Subject must be at least 2 characters");
    return;
  }
  if (formData.content.trim().length < 10) {
    toast.error("Content must be at least 10 characters");
    return;
  }

  try {
    setLoading(true)
    await api.post("/notes", formData);
    toast.success("Note created successfully!");
    navigate("/");
  } catch (error) {
    console.log("error creating note", error);
    toast.error("Failed to create note");
  } finally {
    setLoading(false);
  }
  setFormData({title:"", subject:"",isCompleted:false , category:"",content:""})
};

  return (
  <FormComponent loading={loading} handleSubmitEvent={handleSubmitEvent} 
  handleChange={handleChange} formData={formData} isEditMode={false}/>
  )
}

export default CreateNote