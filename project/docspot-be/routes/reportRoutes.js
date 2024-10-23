const express = require("express");
const { getStats } = require("../controllers/reportController");

const router = express.Router();

router.get("/", getStats);

module.exports = router;
