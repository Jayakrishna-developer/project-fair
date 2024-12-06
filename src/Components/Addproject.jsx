import React, { useContext, useEffect, useState } from "react";
import { FloatingLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProjectAPI } from "../../service/allAPI";
import { addProjectResponseContext } from "./ContextAPI/ContextShare";

function Addproject() {
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState("");
const{addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setProjectData({
      title: "",
      languages: "",
      github: "",
      overview: "",
      website: "",
      projectImage: "",
    });
    setPreview("");
  };

  const [projectData, setProjectData] = useState({
    title: "",
    languages: "",
    github: "",
    overview: "",
    website: "",
    projectImage: "",
  });
  console.log(projectData.projectImage.type);
  const [fileStatus, setFileStatus] = useState(false);
  useEffect(() => {
    if (
      projectData.projectImage.type == "image/png" ||
      projectData.projectImage.type == "image/jpg" ||
      projectData.projectImage.type == "image/jpeg"
    ) {
      console.log("generate url");
      setFileStatus(false);
      setPreview(URL.createObjectURL(projectData.projectImage));
    } else {
      console.log("please upload following formats");
      setFileStatus(true);
      setProjectData({ ...projectData, projectImage: "" });
    }
  }, [projectData.projectImage]);

  const handleAddProject = async () => {
    const { title, languages, overview, github, website, projectImage } =
      projectData;

    // Check if all fields are filled
    if (
      !title ||
      !languages ||
      !overview ||
      !github ||
      !website ||
      !projectImage
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
      reqBody.append("projectImage", projectImage);

      // Get token from sessionStorage
      const token = sessionStorage.getItem("token");

      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "authorization": `Bearer ${token}`, // Correct string interpolation
        };

        // API call to add the project
        try {
          const result = await addProjectAPI(reqBody, reqHeader);
          console.log(result);
          if (result.status === 200) {
            toast.success("Project created successfully");
            handleClose(); // Close the form or modal
            setAddProjectResponse(result.data)
          } else {
            toast.warning(result.response.data); // Show warning message
          }
        } catch (err) {
          console.log(err); // Log errors if any
          toast.error("An error occurred while creating the project");
        }
      } else {
        toast.error("Authentication failed. Please log in.");
      }
    }


   
  };
  return (
    <>
      <div>
        <Button className="me-3" variant="primary" onClick={handleShow}>
          Add Project
        </Button>

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
                        : "https://icon-library.com/images/image-placeholder-icon/image-placeholder-icon-16.jpg"
                    }
                    alt=""
                    className="img-fluid"
                  />
                </label>
                {fileStatus && (
                  <div className="mt-3 text-danger">
                    please upload the following file extenstions (jpeg/png/jpg)
                  </div>
                )}
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
                    label="OverView"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Overview"
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
                      onChange={(e) =>
                        setProjectData({
                          ...projectData,
                          github: e.target.value,
                        })
                      }
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingInput4"
                    label="website"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="website"
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
            <Button variant="primary" onClick={handleAddProject}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="colored"
        transition:Zoom
      />
    </>
  );
}

export default Addproject;
