const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "doctor", "patient"],
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

userSchema.virtual("doctorInfo", {
  ref: "Doctor",
  localField: "_id",
  foreignField: "doctorId",
  justOne: true,
});

userSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, r) => {
    (r.id = r._id), delete r._id, delete r.__v;
    delete r.password;
    return r;
  },
});

module.exports = mongoose.model("User", userSchema);
