const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "unpaid",
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

paymentSchema.virtual("doctorInfo", {
  ref: "Doctor",
  localField: "_id",
  foreignField: "userId",
  justOne: true,
});

paymentSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, r) => {
    (r.id = r._id), delete r._id, delete r.__v;
    return r;
  },
});

module.exports = mongoose.model("User", userSchema);
