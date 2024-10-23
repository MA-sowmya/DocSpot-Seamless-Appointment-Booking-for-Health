const { sendNotificationToUser } = require("../webSocket");
const appointmentService = require("../services/appointmentService");
const { successResponse, errorResponse } = require("../utils/reponseHandler");
const currentUser = require("../utils/requestHandler");

exports.bookAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.bookAppointment(req.body);
    successResponse(res, 201, "Appointment booked successfully!", appointment);
  } catch (err) {
    errorResponse(res, 400, err.message, null);
  }
};

exports.getAppointments = async (req, res) => {
  try {
    currentUser.userDetails = req.user;
    const appointments = await appointmentService.getAppointments();
    successResponse(
      res,
      200,
      "Appointments Fetched Successfully!",
      appointments
    );
  } catch (err) {
    errorResponse(res, 400, err.message, null);
  }
};

exports.getAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.getAppointment(req.params.id);
    successResponse(res, 200, "Appointment Fetched Successfully!", appointment);
  } catch (err) {
    errorResponse(res, 400, err.message, null);
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    await appointmentService.deleteAppointment(req.params.id);
    successResponse(res, 200, "Appointment Deleted Successfully!");
  } catch (err) {
    errorResponse(res, 400, err.message, null);
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const appId = req.params.id;
    const updateData = req.body;
    const appointment = await appointmentService.updateAppointment(
      appId,
      updateData
    );
    successResponse(res, 200, "Appointment Updated Successfully!", appointment);
  } catch (err) {
    errorResponse(res, 400, err.message, null);
  }
};

exports.getAvailableAppointments = async (req, res) => {
  try {
    const appointments = await appointmentService.availableAppointments(
      req.body
    );
    successResponse(
      res,
      200,
      "Available Appointments Fetched Successfully!",
      appointments
    );
  } catch (err) {
    errorResponse(res, 400, err.message, null);
  }
};

exports.uploadFiles = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await appointmentService.getAppointment(appointmentId);
    if (!appointment)
      return errorResponse(res, 400, "Appointment ID not found", null);

    const files = req.files.map((file) => ({
      fileName: file.originalname,
      filePath: file.path,
    }));

    let data = { files: files };
    if (req.body.type && String(req.body.type) === "prescription") {
      data = { prescriptionFiles: files };
    }

    const updatedAppointment = await appointmentService.updateAppointment(
      appointmentId,
      data
    );
    successResponse(res, 200, "Uploaded Successfully!", updatedAppointment);
  } catch (error) {
    errorResponse(res, 400, error.message, null);
  }
};

exports.loadUploadedFiles = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await appointmentService.getAppointment(appointmentId);

    if (!appointment)
      return errorResponse(res, 400, "Appointment ID not found", null);
    const file = appointment.files.find(
      (f) => f.fileName === req.params.filename
    );
    if (!file) return errorResponse(res, 400, "File Not Found", null);

    const filePath = path.resolve(file.filePath);
    res.sendFile(filePath);
  } catch (err) {
    errorResponse(res, 400, err.message, null);
  }
};
