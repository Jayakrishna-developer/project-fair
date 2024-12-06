import React, { useContext } from 'react'
import { Button } from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from 'react-router-dom';
import { TokenAuthContext } from './ContextAPI/TokenAuth';
function Header({ insideDashboard }) {
  const navigate=useNavigate()
  const{isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)
  const handleLogOut=()=>{
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("token")
    setIsAuthorized(false)
    navigate('/')
  }
  return (
    <div>
      <Navbar className="bg-info">
        <Container>
          <Navbar.Brand>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <i
                className="fa-solid fa-list-check me-2"
                style={{ color: "white" }}
              ></i>
            </Link>
          </Navbar.Brand>
          {
            insideDashboard&&<Button onClick={handleLogOut} className='btn btn-outline-warning text-light'>Logout</Button>
          }
        </Container>
      </Navbar>
    </div>
  );
}

export default Header
