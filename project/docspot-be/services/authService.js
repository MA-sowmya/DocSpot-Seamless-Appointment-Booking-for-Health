const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CustomError = require("../utils/CustomError");
const Doctor = require("../models/doctorModel");

exports.registerUser = async (userData) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userData.password, salt);
    userData.password = hashPassword;
    let user = new User(userData);
    const res = await user.save();

    if (userData.role.toLowerCase() === "doctor") {
      let doctor = new Doctor();
      doctor.status = "pending";
      doctor.doctorId = res._id;
      (doctor.name = `${res.firstname} ${res.lastname}`),
        (doctor.specialization = userData.specialization),
        (doctor.experience = userData.experience),
        (doctor.fee = userData.fee);
      const doc = await doctor.save();
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role, status: user.status },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return token;
  } catch (error) {
    throw error;
  }
};

exports.loginUser = async (userData) => {
  try {
    let user = await User.findOne({ email: userData.email });
    if (!user) {
      throw new CustomError("User Doesn't Exist", 400);
    }

    const isMatch = await bcrypt.compare(userData.password, user.password);
    if (!isMatch) {
      throw new CustomError("Invalid Email or Password", 401);
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role, status: user.status },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return token;
  } catch (error) {
    throw error;
  }
};
