const express = require("express");
const {
  getDoctors,
  getDoctor,
  updateDoctor,
  getApprovedDoctors,
} = require("../controllers/doctorController");

const router = express.Router();

router.get("/", getDoctors);
router.get("/approved", getApprovedDoctors);
router.get("/:id", getDoctor);
router.put("/:id", updateDoctor);

module.exports = router;
