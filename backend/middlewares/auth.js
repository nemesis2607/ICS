import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

export const isAdminAuthenticated = catchAsyncErrors(async(req,res,next)=>{
    const token = req.cookies.adminToken;
    if(!token){
        return next(new ErrorHandler("Admin Has Not Been Authenticated!", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if(req.user.role !== "Admin"){
        return next(new ErrorHandler(`${req.user.role} Is Not Authorized!`, 403));
    }
    next();
});



export const isClientAuthenticated = catchAsyncErrors(async(req,res,next)=>{
    const token = req.cookies.clientToken;
    if(!token){
        return next(new ErrorHandler("Client Has Not Been Authenticated!", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    if(req.user.role !== "Client"){
        return next(new ErrorHandler(`${req.user.role} Is Not Authorized!`, 403));
    }
    next();
});