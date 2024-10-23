const express = require("express");
const { login, register } = require("../controllers/authController");
const { registerValidator } = require("../validations/registerValidation");

const router = express.Router();

router.post("/login", login);
router.post("/register", registerValidator, register);



module.exports= router