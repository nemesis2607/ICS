import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";


export const postAppointment = catchAsyncErrors(async(req,res,next)=>{
    const {
    firstName, 
    lastName, 
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    consultant_firstName,
    consultant_lastName,
    hasVisited,
    address,
    } = req.body;

    if(
        (!firstName || 
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !appointment_date ||
        !department ||
        !consultant_firstName ||
        !consultant_lastName ||
        !address)
    ) {
        return next(new ErrorHandler("Please Fill Up All The Details Required!", 400));
    }

    const isConflict = await User.find({
        firstName: consultant_firstName,
        lastName: consultant_lastName,
        role: "Consultant",
        consultantDepartment: department
    })
    if(isConflict.length === 0) {
        return next(new ErrorHandler("Consultant Not Found!", 404));
    }
    if(isConflict.length > 1) {
        return next(new ErrorHandler("An Issue Has Occured with the Consultant! Please Contact Via Email or Phone for Customer Support!", 404));
    }
    const consultantId = isConflict[0]._id;
    const clientId = req.user._id;
    const appointment = await Appointment.create({
    firstName, 
    lastName, 
    email,
    phone,
    nic,
    dob,
    gender,
    appointment_date,
    department,
    consultant:{
        firstName: consultant_firstName,
        lastName: consultant_lastName,
    },
    hasVisited,
    address,
    consultantId,
    clientId
    });
    return res.status(201).json({
        success: true,
        message: "Appointment Registered Successfully!",
        appointment,
    });
});

export const getAllAppointments = catchAsyncErrors(async(req,res,next)=>{
    const appointments = await Appointment.find();
    return res.status(200).json({
        success: true,
        appointments,
    });
});

export const updateAppointmentStatus = catchAsyncErrors(async(req,res,next)=>{
    const {id} = req.params;
    let appointment = await Appointment.findById(id);
    if(!appointment) {
        return next(new ErrorHandler("Appointment Not Found!", 404));
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    return res.status(200).json({
        success: true,
        message: "Appointment Status Updated Successfully!",
        appointment,
    });
});

export const deleteAppointment = catchAsyncErrors(async(req,res,next)=>{
    const {id} = req.params;
    let appointment = await Appointment.findById(id);
    if(!appointment) {
        return next(new ErrorHandler("Appointment Not Found!", 404));
    }
    await appointment.deleteOne();
    return res.status(200).json({
        success: true,
        message: "Appointment Deleted Successfully!",
    });
});