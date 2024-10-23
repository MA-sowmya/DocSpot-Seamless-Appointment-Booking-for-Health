const express = require("express");
const {
  getUsers,
  deleteUser,
  getUserProfile,
  getUsersByRole,
  getUserById,
  getNotifications,
  updateUserById,
  updateToReadNotifications,
} = require("../controllers/userController");

const router = express.Router();

router.get("/profile", getUserProfile);
router.get("/", getUsers);
router.get("/role/:role", getUsersByRole);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUser);
router.get("/:id/notifications", getNotifications);
router.put("/notifications/:notificationId", updateToReadNotifications);

module.exports = router;
