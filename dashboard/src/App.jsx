import React, { useContext, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Dashboard from "./components/Dashboard";
import LogIn from "./components/LogIn";
import AddNewAdmin from "./components/AddNewAdmin";
import AddNewConsultant from "./components/AddNewConsultant";
import Consultant from "./components/Consultant";
import Messages from "./components/Messages";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Context} from "./main";
import axios from "axios";
import "./App.css";

const App = () => {

  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/admin/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);
  
  return (
    <>
    <Router>
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/admin/addnew" element={<AddNewAdmin/>}/>
        <Route path="/consultant/addnew" element={<AddNewConsultant/>}/>
        <Route path="/consultants" element={<Consultant/>}/>
        <Route path="/messages" element={<Messages/>}/>
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
    </>
  )
}

export default App;