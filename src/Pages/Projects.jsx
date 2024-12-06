import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap';
import ProjectCard from '../Components/ProjectCard';
import { getAllProjectAPI } from '../../service/allAPI';

function Projects() {
  const [allProjects, setAllProjects] = useState([]);
  const[searchKey,setSearchKey]=useState("")
  const getAllProjects = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "authorization": `Bearer ${token}`, // Correct string interpolation
      };
      try {
        const result = await getAllProjectAPI(searchKey,reqHeader);
        console.log(result);
        if (result.status == 200) {
          setAllProjects(result.data);
        } else {
          console.log(result);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getAllProjects();
  }, [searchKey]);

  return (
    <>
      <div>
        <Header />
        <div className="projects mt-5">
          <h1 className="text-center mb-5">All Projects</h1>
          <div className="d-flex justify-content-center align-items-center">
            <div className="d-flex border w-50 rounded mb-3">
              <input
                type="text"
                className="form-control custom-label"
                placeholder="search by technologies"
                onChange={(e)=>setSearchKey(e.target.value)}
              />
              <i
                style={{ marginLeft: "-25px" }}
                class="fa-solid fa-magnifying-glass mt-2 "
              ></i>
            </div>
          </div>
        </div>
      </div>
      <Row className="container-fluid mt-5">
        {allProjects?.length > 0 ? (
          allProjects.map((projects) => (
            <Col sm={12} md={6} lg={4}>
              <ProjectCard projects={projects} />
            </Col>
          ))
        ) : (
          <p className="text-danger fw-bolder">No Projects Added Yet...</p>
        )}
      </Row>
    </>
  );
}

export default Projects
