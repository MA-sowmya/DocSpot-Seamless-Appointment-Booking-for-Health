const express = require("express");
const {
  getAppointments,
  bookAppointment,
  getAppointment,
  deleteAppointment,
  updateAppointment,
  getAvailableAppointments,
  uploadFiles,
  loadUploadedFiles,
} = require("../controllers/appointmentController");
const {
  bookAppointmentValidator,
} = require("../validations/bookAppointmentValidation");
const upload = require("../middlewares/uploadMiddleware");
const router = express.Router();

router.get("/", getAppointments);
router.post("/book", bookAppointmentValidator, bookAppointment);
router.get("/:id", getAppointment);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);
router.post("/available", getAvailableAppointments);
router.post("/upload/:id", upload.array("files", 5), uploadFiles);

module.exports = router;
