import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FloatingLabel, Modal } from "react-bootstrap";
import { server_url } from "../../service/server_url";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editUserProjectAPI } from "../../service/allAPI";
import { editProjectResponseContext } from "./ContextAPI/ContextShare";
function EditProject({ project }) {
  const { editProjectResponse, setEditProjectResponse } = useContext(
    editProjectResponseContext
  );
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState("");
  const [projectData, setProjectData] = useState({
    id: project?._id,
    title: project?.title || "",
    languages: project?.languages || "",
    github: project?.github || "",
    overview: project?.overview || "",
    website: project?.website || "",
    projectImage: "",
  });

  const handleClose = () => {
    setShow(false);
    setProjectData({
      title: project?.title || "",
      languages: project?.languages || "",
      github: project?.github || "",
      overview: project?.overview || "",
      website: project?.website || "",
      projectImage: "",
    });
    setPreview("");
  };

  const handleShow = () => setShow(true);

  

  const handleUpdate = async() => {
    const { id, title, languages, overview, github, website, projectImage } =
      projectData;
    if (
      !title ||
      !languages ||
      !overview ||
      !github ||
      !website 
    ) {
      toast.info("Please fill all the fields");
    } else {
      // Create FormData for file upload
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("languages", languages);
      reqBody.append("overview", overview);
      reqBody.append("github", github);
      reqBody.append("website", website);
      preview
        ? reqBody.append("projectImage", projectImage)
        : reqBody.append("projectImage", project.projectImage);

      // Get token from sessionStorage
      const token = sessionStorage.getItem("token");

      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`, // Correct string interpolation
        };
        try {
          const result=await editUserProjectAPI(id,reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
            handleClose()
             setEditProjectResponse(result.data)
          }
          else{
          toast.warning(result.response.data);
            
          }
        } catch (error) {
          console.log(error);
          
        }
      }
    }
  };
  useEffect(() => {
    if (projectData.projectImage) {
      setPreview(URL.createObjectURL(projectData.projectImage));
    } else {
      setPreview("");
    }
   
  }, [projectData.projectImage]);
  return (
    <div>
      <button className="btn" onClick={handleShow}>
        <i className="fa-solid fa-pen-to-square text-dark me-3"></i>
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <label>
                <input
                  style={{ display: "none" }}
                  type="file"
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      projectImage: e.target.files[0],
                    })
                  }
                />
                <img
                  src={
                    preview
                      ? preview
                      : `${server_url}/uploads/${project?.projectImage}`
                  }
                  alt=""
                  className="img-fluid"
                />
              </label>
            </div>
            <div className="col-6">
              <Form>
                <FloatingLabel
                  controlId="floatingInput1"
                  label="Project Title"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Project Title"
                    value={projectData.title}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        title: e.target.value,
                      })
                    }
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput2"
                  label="Languages Used"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Languages Used"
                    value={projectData.languages}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        languages: e.target.value,
                      })
                    }
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput3"
                  label="Overview"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Overview"
                    value={projectData.overview}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        overview: e.target.value,
                      })
                    }
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput4"
                  label="GitHub"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="GitHub"
                    value={projectData.github}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        github: e.target.value,
                      })
                    }
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput5"
                  label="Website"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Website"
                    value={projectData.website}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        website: e.target.value,
                      })
                    }
                  />
                </FloatingLabel>
              </Form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="colored"
        transition:Zoom
      />
    </div>
  );
}

export default EditProject;
