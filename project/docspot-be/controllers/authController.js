const { validationResult } = require("express-validator");
const User = require("../models/userModel");
const authService = require("../services/authService");
const { successResponse, errorResponse } = require("../utils/reponseHandler");

exports.register = async (req, res ,next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return errorResponse(res, 422, "Form Validation Failed", errors.array());
        };
        let user = await User.findOne({email: req.body.email});
        if(user){
            return errorResponse(res, 400, "User Already Exist", null);
        }
        const token = await authService.registerUser(req.body);
        return successResponse(res, 201, "User Succesfully Registered", {token: token});
    } catch (error) {
        errorResponse(res, 400, error.message, null);
    }
};

exports.login = async (req, res, next) =>{
    try {
        const token = await authService.loginUser(req.body);
        return successResponse(res, 200, "Successfully LoggedIn", {token: token});
    } catch (error) {
        errorResponse(res, 400, error.message, null);
    }
}; 
