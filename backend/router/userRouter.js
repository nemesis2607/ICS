import express from "express";
import { addNewAdmin, addnewConsultant, clientRegister, getAllConsultants, getUserDetails, login, logoutAdmin, logoutClient } from "../controller/userController.js";
import {isAdminAuthenticated, isClientAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

router.post("/client/register", clientRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.get("/consultants", getAllConsultants);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/client/me", isClientAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/client/logout", isClientAuthenticated, logoutClient);
router.post("/consultant/addnew", isAdminAuthenticated, addnewConsultant);

export default router;