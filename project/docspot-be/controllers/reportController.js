const reportService = require("../services/reportService");
const { errorResponse, successResponse } = require("../utils/reponseHandler");
const currentUser = require("../utils/requestHandler");

exports.getStats = async (req, res) => {
  try {
    currentUser.userDetails = req.user;
    const stats = await reportService.getStats();
    successResponse(res, 200, "Stats Fetched Successfully!", stats);
  } catch (err) {
    console.log(err);
    errorResponse(res, 400, err.message, null);
  }
};
