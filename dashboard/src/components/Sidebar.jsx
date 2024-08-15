import React, { useContext, useState } from "react";
import { Context } from "../main";
import {TiHome} from "react-icons/ti";
import {RiLogoutBoxFill} from "react-icons/ri";
import {AiFillMessage} from "react-icons/ai";
import {GiHamburgerMenu} from "react-icons/gi";
import {IoPersonAddSharp} from "react-icons/io5";
import {RiAdminFill} from "react-icons/ri";
import {GrUserExpert} from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const Sidebar = () => {
    const [show, setShow] = useState(false);

    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

    const navigateTo = useNavigate();

    const gotoHome = () => {
        navigateTo("/");
        setShow(!show);
    }

    const gotoConsultantsPage = () => {
        navigateTo("/consultant");
        setShow(!show);
    }
    
    const gotoMessages = () => {
        navigateTo("/messages");
        setShow(!show);
    }

    const gotoAddNewConsultant = () => {
        navigateTo("/consultant/addnew");
        setShow(!show);
    }

    const gotoAddNewAdmin = () => {
        navigateTo("/admin/addnew");
        setShow(!show);
    }

    const handleLogout = async() => {
        await axios.get("http://localhost:4000/api/v1/user/admin/logout",{
            withCredentials: true,
        })
        .then((res) => {
            toast.success(res.data.message);
            setIsAuthenticated(false)
        })
        .catch((err) => {
            toast.error(err.response.data.message);
        });
    };

    return (
        <>
        <nav 
            style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
            className={show ? "show sidebar" : "sidebar"}
        >
            <div className="sidebar">
                <TiHome onClick={gotoHome}/> <br/><br/>
                <GrUserExpert onClick={gotoConsultantsPage}/> <br/> <br/>
                <RiAdminFill onClick={gotoAddNewAdmin}/> <br/><br/>
                <IoPersonAddSharp onClick={gotoAddNewConsultant}/> <br/><br/>
                <AiFillMessage onClick={gotoMessages}/> <br/><br/>
                <RiLogoutBoxFill onClick={handleLogout}/> <br/><br/>
            </div>
        </nav>

        <div style={!isAuthenticated? {display: "none"} : {display: "flex"}} className="wrapper"> 
            <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)}/>
        </div>
        </>
    );
};

export default Sidebar;
