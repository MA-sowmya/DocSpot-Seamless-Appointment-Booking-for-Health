const doctorService = require("../services/doctorService");
const { successResponse, errorResponse } = require("../utils/reponseHandler");

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await doctorService.getDoctors();
    successResponse(res, 200, "Success", doctors);
  } catch (err) {
    errorResponse(res, 400, err.message, []);
  }
};

exports.getApprovedDoctors = async (req, res) => {
  try {
    const doctors = await doctorService.getApprovedDoctors();
    successResponse(res, 200, "Success", doctors);
  } catch (err) {
    errorResponse(res, 400, err.message, []);
  }
};

exports.getDoctor = async (req, res) => {
  try {
    const doctor = await doctorService.getDoctorById(req.params.id);
    successResponse(res, 200, "Success", doctor);
  } catch (err) {
    errorResponse(res, 400, err.message, []);
  }
};

exports.updateDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const updateDate = req.body;
    console.log(doctorId);
    console.log(updateDate);
    const doctor = await doctorService.updateDoctor(doctorId, updateDate);
    console.log(doctor);
    successResponse(res, 200, "Updated Successfully", doctor);
  } catch (err) {
    errorResponse(res, 400, err.message, []);
  }
};
