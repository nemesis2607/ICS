import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [2, "First Name Must Contain At Least 2 Characters!"],
    },
    lastName: {
        type: String,
        required: true,
        minLength: [2, "Last Name Must Contain At Least 2 Characters!"],
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Enter A Valid Email!"],
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
        maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
    },
    nic: {
        type: String,
        required: true,
        minLength: [13, "NIC Number Must Contain Exact 13 Digits!"],
        maxLength: [13, "NIC Number Must Contain Exact 13 Digits!"],
    },
    dob: {
        type: Date,
        required: [true, "Please Enter Your Date Of Birth!"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Prefer Not To Say"],
    },
    appointment_date: {
        type: Date,
        required: true,
    },
    department:{
        type:String,
        required:true,
    },
    consultant:{
        firstName:{
            type:String,
            required: true,
        },
        lastName:{
            type:String,
            required:true,
        },
    },
    hasVisited:{
        type:Boolean,
        default:false
    },
    consultantId:{
        type:mongoose.Schema.ObjectId,
        required: true,
    },
    clientId:{
        type:mongoose.Schema.ObjectId,
        required: true,
    },
    address:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["Pending","Approved","Rejected"],
        default:"Pending",
    },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);