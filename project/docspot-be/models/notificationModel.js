const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: String },
    refIdType: { type: String, enum: ["doctorId", "appointmentId"] },
    referenceId: { type: String },
    message: { type: String },
    isSent: { type: Boolean, default: false },
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: "createdAt" },
  }
);

notificationSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, r) => {
    (r.id = r._id), delete r._id, delete r.__v;
    return r;
  },
});

module.exports = mongoose.model("Notification", notificationSchema);
