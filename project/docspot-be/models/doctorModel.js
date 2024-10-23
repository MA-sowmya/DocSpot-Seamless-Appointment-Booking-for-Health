const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema({
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    enum: ["Morning", "Afternoon", "Evening"],
    required: true,
  },
  maxSlots: {
    type: Number,
    default: 3,
    required: false,
  },
  interval: {
    type: Number,
    default: 30,
  },
});

const dayAvailabiltySchema = new mongoose.Schema({
  day: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  timeSlots: [timeSlotSchema],
  dayOff: {
    type: Boolean,
    default: false,
  },
});

const doctorSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    fee: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    availability: [dayAvailabiltySchema],
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

doctorSchema.virtual("userInfo", {
  ref: "User",
  localField: "doctorId",
  foreignField: "_id",
  justOne: true,
});

doctorSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, r) => {
    (r.id = r._id), delete r._id, delete r.__v;
    return r;
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);

// {
//     name: 'samuel',
//     specialization: 'Cardio',
//     fee:  '400',
//     availability: [
//         {
//             day: 'Monday',
//             timeSlots: [
//                 {
//                     startTime: '9:00AM',
//                     endTime: '12:00PM',
//                     period: 'Morning',
//                     maxSlots: 4,
//                     interval: 30
//                 },
//                    {
//                     startTime: '2:00PM',
//                     endTime: '5:00PM',
//                     period: 'Aftenoon',
//                     maxSlots: 4
//                     interval: 15
//                 },
//                    {
//                     startTime: '6:00PM',
//                     endTime: '8:00PM',
//                     period: 'Evening',
//                     maxSlots: 4
//                     interval: 30
//                 },
//             ]
//         }
//     ]
// }
