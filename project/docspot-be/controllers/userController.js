const userService = require("../services/userService");
const { successResponse, errorResponse } = require("../utils/reponseHandler");
const currentUser = require("../utils/requestHandler");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    successResponse(res, 200, "Fetched All Users", users);
  } catch (error) {
    errorResponse(res, 400, error.message, []);
  }
};

exports.getUsersByRole = async (req, res, next) => {
  try {
    currentUser.userDetails = req.user;
    const users = await userService.getUsersByRole(req.params.role);
    successResponse(res, 200, "Fetched Users", users);
  } catch (error) {
    errorResponse(res, 400, error.message, []);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    successResponse(res, 200, "Created Sucessfully", []);
  } catch (err) {
    errorResponse(res, 400, err.message, null);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    successResponse(res, 200, "Deleted successfully!", []);
  } catch (err) {
    errorResponse(res, 400, err.message, null);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserbyId(req.params.id);
    successResponse(res, 200, "Fetched User", user);
  } catch (err) {
    errorResponse(res, 400, err.message, null);
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const id = String(req.params.id);
    const user = await userService.updateUserById(id, req.body);
    successResponse(res, 200, "User Updated", user);
  } catch (err) {
    errorResponse(res, 400, err.message, null);
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await userService.getUserbyId(req.user.userId);
    successResponse(res, 200, "Fetched User", user);
  } catch (err) {
    errorResponse(res, 400, err.message, null);
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const userId = String(req.user.userId);
    const notifications = await userService.getNotificationsByUserId(userId);
    successResponse(
      res,
      200,
      "Notifications Fetched Successfully!",
      notifications
    );
  } catch (err) {
    errorResponse(res, 400, err.message, null);
  }
};

exports.updateToReadNotifications = async (req, res) => {
  try {
    const nId = String(req.params.notificationId);
    const notifications = await userService.updateNotificationById(nId);
    successResponse(
      res,
      200,
      "Notifications Updated Successfully!",
      notifications
    );
  } catch (err) {
    errorResponse(res, 400, err.message, null);
  }
};
