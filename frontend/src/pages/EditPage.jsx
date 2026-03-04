import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { FormComponent } from '../components/FormComponent';

const EditPage = () => {
    const {id} = useParams();
    const [IndvData , setIndvdata] = useState({title:"", subject:"",isCompleted:false , category:"",content:""});
    const [loading , setLoading] = useState(true);
    const navigate = useNavigate();

    const handleChange = (e) =>{
    const {name , value , type , checked} = e.target;
    setIndvdata((prev)=>({...prev, [name]:type==="checkbox" ? checked : value}));
    }
     
    const fetchDataById = async() =>{
        try {
            const res = await api.get(`/notes/${id}`);
            setIndvdata(res.data);
            console.log("fetched data",res.data);
        } catch (error) {
            console.log("error",error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchDataById();
    },[])

    const handelUpdateEvent = async(e) =>{
        e.preventDefault();
        if (IndvData.title.trim().length < 2) {
        toast.error("Title must be at least 2 characters");
        return;
        }
        if (IndvData.subject.trim().length < 2) {
        toast.error("Subject must be at least 2 characters");
        return;
        }
        if (IndvData.content.trim().length < 10) {
        toast.error("Content must be at least 10 characters");
        return;
        }

        try {
            const res = await api.put( `/notes/${id}`,IndvData);
            console.log(res.data);
            console.log("Form updated")
            toast.success("note updated successfully!");
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    }
  return (
    loading ? (
    <div className="min-h-screen flex justify-center items-center">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  ) : (
    <FormComponent
      handleSubmitEvent={handelUpdateEvent}
      isEditMode={true}
      handleChange={handleChange}
      formData={IndvData}
      loading={false}
    />
  )
  )
}

export default EditPage