import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { FaFileCode } from "react-icons/fa";
import { Form } from "react-bootstrap";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
import { loginAPI, registerAPI } from "../../service/allAPI";
import { TokenAuthContext } from "../Components/ContextAPI/TokenAuth";

function Authorization({ register }) {
  const{isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)
  const navigate=useNavigate()
  const isRegisterForm = register ? true : false;
  const[userData,setUserData]=useState({
    username:"",email:"",password:""
  })
//  console.log(userData);

const handleRegister=async(e)=>{
  e.preventDefault()
  const {username,email,password}=userData
  if(!username||!email||!password){
    toast.info('missing fields')
  }
  else{
   try{
    const result=await registerAPI(userData)
    if(result.status==200){
      toast.success(`${result.data.username} has successfully registered`)
      navigate('/login')
      setUserData({ username: "", email: "", password: "" });
    }else{
      toast.warning(result.response.data)
    }

   }
   catch(err){
    console.log(err);
    
   }
  }}

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    if ( !email || !password) {
      toast.info("please fill missing fields");
    } else {
      try {
        // proceed to api call
        const result = await loginAPI({email,password});
        if (result.status == 200) {
          sessionStorage.setItem("username",result.data.existingUser.username)
          sessionStorage.setItem("token",result.data.token)
          setIsAuthorized(true)
          navigate("/");
          setUserData({  email: "", password: "" });
        } else {
          toast.warning(result.response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };



  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <div className="container w-100">
          <Link
            to={"/"}
            style={{
              textDecoration: "none",
              color: "blue",
              fontWeight: "bolder",
            }}
          >
            <MdArrowBackIos />
            Back to home
          </Link>
          <div className="card shadow p-3 bg-info">
            <div className="row align-items-center flex-colomn">
              <div className="col-lg-6">
                <img
                  src="https://img.freepik.com/premium-vector/secured-computer-password-icon-flat-illustration-secured-computer-password-vector-icon-web-design_98396-27767.jpg?w=996"
                  alt=""
                  width={"100%"}
                />
              </div>

              <div className="col-lg-6">
                <div className="d-flex align-items-center flex-column">
                  <div className="d-flex">
                    <FaFileCode className="fs-3 mt-2 text-light" />
                    <h3 className="fw-bolder text-light mt-2">Project fair</h3>
                  </div>
                  <h5 className="fw-bolder text-light">
                    {isRegisterForm
                      ? "sign up to your account"
                      : "sign in to  your account"}
                    <Form className="mt-4 text-light">
                      {isRegisterForm && (
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Control
                            type="text"
                            placeholder="enter your username"
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                username: e.target.value,
                              })
                            }
                            value={userData.username}
                          />
                        </Form.Group>
                      )}
                      <Form.Group
                        className="mb-3"
                        controlId="examplleForm.ControlInput2"
                      >
                        <Form.Control
                          type="email"
                          placeholder="enter your email"
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              email: e.target.value,
                            })
                          }
                          value={userData.email}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="examplleForm.ControlInput2"
                      >
                        <Form.Control
                          type="password"
                          placeholder="enter your password"
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              password: e.target.value,
                            })
                          }
                          value={userData.password}
                        />
                      </Form.Group>
                      {isRegisterForm ? (
                        <div>
                          <button
                            className="btn btn-warning"
                            onClick={handleRegister}
                          >
                            Register
                          </button>
                          <p>
                            Already have an account?click here to{" "}
                            <Link
                              to={"/login"}
                              style={{ textDecoration: "none", color: "green" }}
                            >
                              Login
                            </Link>
                          </p>
                        </div>
                      ) : (
                        <div>
                          <button
                            className="btn btn-warning"
                            onClick={handleLogin}
                          >
                            Login
                          </button>
                          <p className="text-light fw-bolder mt-2">
                            New user click here to
                            <Link
                              to={"/register"}
                              style={{ textDecoration: "none", color: "green" }}
                            >
                              Register
                            </Link>
                          </p>
                        </div>
                      )}
                    </Form>
                  </h5>
                </div>
              </div>
            </div>
          </div>
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

export default Authorization;
