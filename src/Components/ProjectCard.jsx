import React, { useState } from 'react'
import { Card, Col, Modal, Row } from 'react-bootstrap'
import projectpic from '../assets/images/3.jpg'
import { server_url } from '../../service/server_url';


function ProjectCard({ projects }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          width={"100%"}
          src={`${server_url}/uploads/${projects?.projectImage}`}
          onClick={handleShow}
        />
        <Card.Body>
          <Card.Title>{projects?.title}</Card.Title>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img
                src={`${server_url}/uploads/${projects?.projectImage}`}
                width={"100%"}
                alt=""
              />
            </Col>
            <h1>{projects?.title}</h1>
            <h3>{projects?.languages}</h3>
            <p style={{ textAlign: "justify" }}>
              <span>Overview:</span>
              {projects?.overview}
            </p>
          </Row>
          <div className="mt-2">
            <a
              href={projects?.github}
              target="_blank"
              className="me-3 btn text-dark"
            >
              <i class="fa-brands fa-github"></i>
            </a>
            <a
              href={projects?.website}
              target="_blank"
              className="me-3 btn text-dark"
            >
              <i class="fa-solid fa-link"></i>
            </a>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProjectCard
