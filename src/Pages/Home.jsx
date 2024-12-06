import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import titleImage from "../assets/images/developer.gif";
import ProjectCard from "../Components/ProjectCard";
import "./Home.css";
import { addProjectAPI, getHomeProjectAPI } from "../../service/allAPi";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [allProjects, setAllProjects] = useState([]);
 
    
  const navigate = useNavigate();

  useEffect 
    (() => {
      getHomeProjects()
      if (sessionStorage.getItem("token")) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    },
    []);

     const getHomeProjects = async () => {
       const result = await getHomeProjectAPI();
       if (result.status == 200) {
         setAllProjects(result.data);
       } else {
         console.log(result);
       }
       console.log(allProjects);
       
     };
  const handleProjectsPage = () => {
    if (sessionStorage.getItem("token")) {
      navigate("/projects");
    } else {
      toast.warning("please login to explore our projects");
    }
     
  };
 
  return (
    <>
      <div className="container-fluid rounded bg-info">
        <Row className="d-flex align-items-center p-5">
          <Col sm={12} md={6}>
            <h1
              style={{ fontSize: "80px" }}
              className="fw-bolder heading text-light"
            >
              {" "}
              <i className="fa-solid fa-list-check me-2"></i>Project-Fair
            </h1>
            <p className="text-light " style={{ textAlign: "justify" }}>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              mollitia, eligendi doloremque, voluptas explicabo beatae aperiam
              ipsum magnam fugit deleniti distinctio, nihil cum quisquam quo
              dignissimos odio debitis molestiae delectus.
            </p>
            {isLoggedIn ? (
              <Link to={"/dashboard"} className="btn btn-warning ">
                Manage Your Projects
              </Link>
            ) : (
              <Link to={"/login"} className="btn btn-warning ">
                Start to Explore
              </Link>
            )}
          </Col>

          <Col sm={12} md={6} className="mt-sm-3  ">
            <img src={titleImage} alt="" className="img-fluid" />
          </Col>
        </Row>
      </div>

      <div className="all-projects mt-3">
        <h1 className="text-warning text-center fs-1 pb-4">
          Explore Your Projects
        </h1>
        <marquee scrollamount="25">
          <Row>
            {allProjects.length > 0
              ? allProjects.map(projects => (
                  <Col sm={12} md={6} lg={4}>
                    <ProjectCard projects={projects} />
                  </Col>
                )):null
              }
          </Row>
        </marquee>
        <div className="d-flex justify-content-center text-dark mt-5 btn">
          <button className="btn btn-outline-dark" onClick={handleProjectsPage}>
            View More Projects
          </button>
        </div>
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

export default Home;
