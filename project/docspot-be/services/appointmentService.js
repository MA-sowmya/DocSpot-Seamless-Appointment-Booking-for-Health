const moment = require("moment");
const Appointment = require("../models/appointmentModel");
const Notification = require("../models/notificationModel");
const Doctor = require("../models/doctorModel");
const CustomError = require("../utils/CustomError");
const currentUser = require("../utils/requestHandler");
const { sendNotificationToUser } = require("../webSocket");

exports.bookAppointment = async (appointmentData) => {
  try {
    const startDate = new Date(appointmentData.appointmentDate);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(appointmentData.appointmentDate);
    endDate.setUTCHours(23, 59, 59, 999);
    const doctor = await Doctor.findOne({ userId: appointmentData.doctorId });
    const existingAppointments = await Appointment.find({
      doctorId: appointmentData.doctorId,
      appointmentDate: {
        $gte: startDate,
        $lt: endDate,
      },
    });
    const availableTimeSlots = getAvailableTimeslots(
      doctor,
      startDate,
      existingAppointments
    );

    let allBookedSlots = [];
    availableTimeSlots.map((x) => {
      allBookedSlots = [...allBookedSlots, ...x.bookedSlots];
    });

    const isBookingExists = allBookedSlots.filter((b) =>
      moment(b, "hh:mmA").isSame(moment(appointmentData.timeSlot, "hh:mmA"))
    );

    if (!isBookingExists.length) {
      const appointment = new Appointment(appointmentData);
      return await appointment.save();
    } else {
      throw new CustomError("Slot No Longer Exist");
    }
  } catch (e) {
    throw e;
  }
};

exports.getAppointments = async () => {
  try {
    const user = currentUser.userDetails;
    let filter = {};
    if (user._userRole.toLowerCase() === "doctor") {
      filter = { doctorId: user._userId };
    } else if (user._userRole.toLowerCase() === "patient") {
      filter = { patientId: user._userId };
    }
    return await Appointment.find(filter)
      .populate("doctorInfo")
      .populate("patientInfo")
      .populate("doctorUserInfo");
  } catch (e) {
    throw e;
  }
};

exports.getAppointment = async (id) => {
  try {
    id = String(id);
    const appointment = await Appointment.findById(id)
      .populate("doctorInfo")
      .populate("patientInfo")
      .populate("doctorUserInfo");
    return appointment;
  } catch (e) {
    throw e;
  }
};

exports.deleteAppointment = async (id) => {
  try {
    return await Appointment.findByIdAndDelete(id);
  } catch (e) {
    throw e;
  }
};

exports.updateAppointment = async (id, updateData) => {
  try {
    id = String(id);

    const previousValue = await Appointment.findById(id);
    if (!previousValue) {
      console.log("Document not found");
      return;
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (appointment && previousValue.status !== appointment.status) {
      const userId = String(appointment.patientId);
      const status = appointment.status;
      const message = `Your appointment is ${
        status.charAt(0).toUpperCase() + status.slice(1)
      }`;

      const notification = new Notification({
        userId,
        message,
        refIdType: "appointmentId",
        referenceId: appointment.id,
      });

      const alert = await notification.save();

      await sendNotificationToUser(userId, {
        notificationId: alert.id,
        referenceId: `${appointment.id}`,
        refIdType: "appointmentId",
        message: message,
        timestamp: new Date(),
      });
    }

    return appointment;
  } catch (e) {
    throw e;
  }
};

exports.availableAppointments = async (appInfo) => {
  try {
    const doctorId = appInfo.id;
    const startDate = new Date(appInfo.date);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(appInfo.date);
    endDate.setUTCHours(23, 59, 59, 999);
    const doctor = await Doctor.findOne({ doctorId: doctorId });
    if (doctor?.availability.length) {
      const existingAppointments = await Appointment.find({
        doctorId: doctorId,
        appointmentDate: {
          $gte: startDate,
          $lt: endDate,
        },
      });
      return getAvailableTimeslots(doctor, startDate, existingAppointments);
    }
  } catch (e) {
    throw e;
  }
};

const getAvailableTimeslots = (
  doctor,
  appointmentDate,
  existingAppoitments
) => {
  const reqDayName = moment.utc(appointmentDate).format("dddd");
  const dayAvailablity = doctor?.availability.find(
    (a) => a.day === reqDayName && !a.dayOff
  );

  if (!dayAvailablity) {
    return [];
  }

  const bookedTimeSlots = existingAppoitments
    .filter((e) =>
      moment.utc(e.appointmentDate).isSame(moment.utc(appointmentDate, "day"))
    )
    .map((s) => s.timeSlot);

  let allTimeSlots = [];

  dayAvailablity.timeSlots.map((t) => {
    let slots = generateTimeSlots(t.startTime, t.endTime);

    const aSlots = slots.filter((slot) => !bookedTimeSlots.includes(slot));
    const bSlots = (slots = slots.filter((slot) =>
      bookedTimeSlots.includes(slot)
    ));

    const timePeriod = {
      period: t.period,
      availableSlots: aSlots,
      bookedSlots: bSlots,
    };

    allTimeSlots = [...allTimeSlots, timePeriod];
  });

  return allTimeSlots;
};

const generateTimeSlots = (startTime, endTime, interval = 15) => {
  let slots = [];
  let currentTime = moment(startTime, "hh:mmA");
  const closingTime = moment(endTime, "hh:mmA");

  while (currentTime.isBefore(closingTime)) {
    slots.push(currentTime.format("hh:mmA"));
    currentTime.add(interval, "minutes");
  }

  return slots;
};
