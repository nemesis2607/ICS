import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
        minLength: [10, "Password Must Contain Atleast 10 Characters!"],
        select: false
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Client", "Consultant"],
    },
    consultantDepartment: {
        type: String,
    },
    contAvatar: {
        public_id: String,
        url: String,
    },
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

export const User = mongoose.model("User", userSchema);