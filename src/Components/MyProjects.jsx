import React, { useContext, useEffect, useState } from 'react'
import Addproject from './Addproject'
import { deleteUserProjectAPI, getUserProjectAPI } from '../../service/allAPi'
import { addProjectResponseContext, editProjectResponseContext } from './ContextAPI/ContextShare';
import EditProject from './EditProject';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function MyProjects() {

const[allProjects,setAllProjects]=useState([])
const { addProjectResponse, setAddProjectResponse } = useContext(
  addProjectResponseContext
);
const { editProjectResponse, setEditProjectResponse } = useContext(
  editProjectResponseContext
);
const getUserProjects=async()=>{
  const token = sessionStorage.getItem("token")
  if(token){
   const reqHeader = {
     "Content-Type": "multipart/form-data",
     "authorization": `Bearer ${token}`, // Correct string interpolation
   };
    try {
      const result=await getUserProjectAPI(reqHeader)
      console.log(result);
      if(result.status==200){
        setAllProjects(result.data)
      }
      else{
        console.log(result);
        
      }
    } catch (error) {
      console.log(error);
      
    }
  }
}

const handleDelete=async(pid)=>{
  const token = sessionStorage.getItem("token")
  if(token){
   const reqHeader = {
     "Content-Type": "application/json",
     "authorization": `Bearer ${token}`, // Correct string interpolation
   }
   try {
    const result=await deleteUserProjectAPI(pid,reqHeader)
    if(result.status==200){
      getUserProjects()
    }
    else{
      toast.warning(result.response.data)
    }
   } catch (error) {
    console.log(error);
    
   }}
}

useEffect(() => {
  getUserProjects();
}, [addProjectResponse, editProjectResponse]);

  return (
    <div>
      <div className="card shadow mt-5">
        <div className="d-flex">
          <h2>My Projects</h2>
        </div>
        <div className="ms-auto">
          <Addproject />
        </div>
        {allProjects?.length > 0 ? (
          allProjects.map((project, index) => (
            <div className="mt-4 border container-fluid d-flex">
              <h2>{project?.title}</h2>
              <div className="d-flex  align-items-center ">
                <EditProject project={project} />
                <a
                  className="me-3 text-dark"
                  href={project?.github}
                  target="_blank"
                >
                  <i class="fa-brands fa-github"></i>
                </a>
                <a className="me-3 text-dark" onClick={()=>handleDelete(project?._id)}>
                  <i class="fa-solid fa-trash"></i>
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-danger fw-bolder">No Projects Added Yet...</p>
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="colored"
        transition:Zoom
      />
    </div>
  );
}

export default MyProjects
