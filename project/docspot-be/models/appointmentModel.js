const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  fileName: String,
  filePath: String,
  createdAt: { type: Date, default: Date.now },
});

const appointmentSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "scheduled",
    },
    period: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "unpaid",
    },
    reasonForVisit: {
      type: String,
      required: true,
    },
    files: [fileSchema],
    prescriptionFiles: [fileSchema],
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

appointmentSchema.pre("findByIdAndUpdate", async function (next) {
  this.previousDoc = await this.model.findOne(this.getQuery());
  next();
});

appointmentSchema.pre("save", function (next) {
  const date = this.appointmentDate;
  if (date) {
    date.setUTCHours(0, 0, 0, 0); // Set the time to midnight UTC
    this.appointmentDate = date;
  }
  next();
});

appointmentSchema.virtual("doctorInfo", {
  ref: "Doctor",
  localField: "doctorId",
  foreignField: "doctorId",
  justOne: true,
});

appointmentSchema.virtual("doctorUserInfo", {
  ref: "User",
  localField: "doctorId",
  foreignField: "_id",
  justOne: true,
});

appointmentSchema.virtual("patientInfo", {
  ref: "User",
  localField: "patientId",
  foreignField: "_id",
  justOne: true,
});

appointmentSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, r) => {
    (r.id = r._id), delete r._id, delete r.__v;
    return r;
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
