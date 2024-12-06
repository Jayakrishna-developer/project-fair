import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Projects from "./Pages/Projects";
import Dashboard from "./Pages/Dashboard";
import Authorization from "./Pages/Authorization";

import Footer from "./Components/Footer";
import { useContext } from "react";
import { TokenAuthContext } from "./Components/ContextAPI/TokenAuth";


function App() {
  
const{isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)
  return (
    <>
      <Routes>
        <Route path="/" element={<Home  />}  />
        <Route path="/login" element={<Authorization />} />
        <Route path="/projects" element={isAuthorized?<Projects />:<Home/>} />
        <Route path="register" element={<Authorization register />} />
        <Route path="/*" element={<Navigate to={'/'} />} />
        <Route path="/dashboard" element={isAuthorized?<Dashboard />:<Home/>} />
      </Routes>
      
      <Footer/>
    </>
  );
}

export default App
