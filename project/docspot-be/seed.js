const dotenv = require("dotenv");
const fs = require("fs");
const colors = require("colors");
const path = require("path");
const db = require("./config/connection");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const { faker } = require("@faker-js/faker");

dotenv.config({ path: "./config/config.env" });

const User = require("./models/userModel");
const Doctor = require("./models/doctorModel");
const Appointment = require("./models/appointmentModel");
const { argv } = require("process");
const { availableAppointments } = require("./services/appointmentService");

db();

// Function to read JSON data
// const readJSONFile = (fileName) => {
//   const filePath = path.join(`${__dirname}/_seed`, fileName);
//   const fileData = fs.readFileSync(filePath);
//   return JSON.parse(fileData);
// };

// Read data from JSON files
// const users = readJSONFile("users.json");
// const doctors = readJSONFile("doctors.json");
// const appointments = readJSONFile("appointments.json");

const importUserData = async () => {
  const salt = await bcrypt.genSalt(10);

  let userData = [];

  for (let i = 0; i < 50; i++) {
    const fn = faker.person.firstName();
    const ln = faker.person.lastName();
    const data = {
      firstname: fn,
      lastname: ln,
      email: faker.internet.email(fn, ln),
      password: await bcrypt.hash("test", salt),
      phonenumber: faker.phone.number({ style: "international" }),
      role: faker.helpers.arrayElement(["admin", "doctor", "patient"]),
      dob: faker.date.birthdate({ mode: "age", min: 24, max: 40 }),
      gender: faker.helpers.arrayElement(["male", "female"]),
    };
    userData.push(data);
  }

  userData.push({
    firstname: "admin",
    lastname: "last",
    email: "admin@gmail.com",
    password: await bcrypt.hash("admin", salt),
    phonenumber: faker.phone.number({ style: "international" }),
    role: "admin",
    dob: faker.date.birthdate({ mode: "age", min: 24, max: 40 }),
    gender: "male",
  });

  userData.push({
    firstname: "patient",
    lastname: "last",
    email: "patient@gmail.com",
    password: await bcrypt.hash("patient", salt),
    phonenumber: faker.phone.number({ style: "international" }),
    role: "patient",
    dob: faker.date.birthdate({ mode: "age", min: 24, max: 40 }),
    gender: "female",
  });

  userData.push({
    firstname: "doctor",
    lastname: "last",
    email: "doctor@gmail.com",
    password: await bcrypt.hash("doctor", salt),
    phonenumber: faker.phone.number({ style: "international" }),
    role: "doctor",
    dob: faker.date.birthdate({ mode: "age", min: 24, max: 40 }),
    gender: "female",
    specialization: "Cardiology",
    fee: 400,
    experience: 7,
  });

  return await User.insertMany(userData);
};

const importDoctorData = async (users) => {
  const doctorsData = users
    .filter((d) => d.role === "doctor")
    .map((u) => {
      return {
        doctorId: u._id.toString(),
        name: `${u.firstname} ${u.lastname}`,
        specialization: faker.helpers.arrayElement([
          "Cardiology",
          "Dermatology",
          "Pediatrics",
          "Orthopedics",
          "Gynecology",
          "Psychiatry",
          "Neurology",
          "Ophthalmology",
          "Oncology",
          "Endocrinology",
          "Gastroenterology",
          "General Surgery",
          "Nephrology",
          "Urology",
          "Rheumatology",
          "ENT (Otolaryngology)",
          "Allergy and Immunology",
          "Plastic Surgery",
          "Anesthesiology",
          "Radiology",
          "Infectious Disease",
          "Sports Medicine",
        ]),
        fee: faker.helpers.arrayElement([400, 500, 600, 800, 900, 1000]),
        experience: faker.helpers.arrayElement([
          10, 12, 4, 6, 8, 7, 20, 22, 16, 15, 18,
        ]),
        status: faker.helpers.arrayElement(["pending", "approved"]),
        availability: generateAvailability(),
      };
    });

  return await Doctor.insertMany(doctorsData);
};

const importAppointmentsData = async (users, doctors) => {
  const doctorIds = doctors.map((d) => d.doctorId.toString());
  const patientIds = users
    .filter((u) => u.role.toLowerCase() == "patient")
    .map((p) => p._id.toString());

  for (let i = 0; i < 25; i++) {
    const doctorId = faker.helpers.arrayElement(doctorIds);
    const patientId = faker.helpers.arrayElement(patientIds);
    const appointmentDate = faker.date.between({
      from: "2024-10-16",
      to: "2024-10-20",
    });
    const timeSlot = await getAppointmentTimeSlot({
      id: doctorId.toString(),
      date: appointmentDate,
    });
    const data = {
      doctorId: doctorId,
      patientId: patientId,
      appointmentDate: appointmentDate,
      timeSlot: timeSlot,
      period: "Morning",
      status: "confirmed",
      reasonForVisit: faker.helpers.arrayElement([
        "Acne",
        "Head Ache",
        "Fever",
        "Body Pains",
      ]),
    };

    await Appointment.create(data);
  }
};

const getAppointmentTimeSlot = async (data) => {
  const availability = await availableAppointments(data);
  const period = faker.helpers.arrayElement([
    "Morning",
    "Afternoon",
    "Evening",
  ]);

  let slots = [];
  availability
    .filter((a) => a.period === period)
    .map((x) => {
      slots = [...slots, ...x.availableSlots];
    });
  const slot = slots.length ? faker.helpers.arrayElement(slots) : "10:00PM";
  return slot;
};

const generateAvailability = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const periods = ["Morning", "Afternoon", "Evening"];

  return days.map((d) => {
    const dayOff = faker.helpers.arrayElement([true, false]);
    return {
      day: d,
      dayOff: dayOff,
      timeSlots: !dayOff
        ? periods.map((p) => {
            return {
              startTime: getTime(p, true),
              endTime: getTime(p, false),
              period: p,
              maxSlots: faker.helpers.arrayElement([10, 12, 16, 8, 20]),
              interval: faker.helpers.arrayElement([15, 20, 30, 40, 60]),
            };
          })
        : [],
    };
  });
};

const getTime = (period, start = true) => {
  if (period === "Morning") {
    const time = start
      ? faker.helpers.arrayElement(["7:00AM", "8:00AM", "9:00AM"])
      : "12:00PM";
    return time;
  } else if (period === "Afternoon") {
    const time = start
      ? faker.helpers.arrayElement(["1:00PM", "2:00PM", "3:00PM"])
      : "5:00PM";
    return time;
  } else if (period === "Evening") {
    const time = start
      ? faker.helpers.arrayElement(["6:00PM", "6:30PM", "7:00PM"])
      : "9:00PM";
    return time;
  }
};

const importData = async () => {
  const users = await importUserData();
  const doctors = await importDoctorData(users);
  const appointments = await importAppointmentsData(users, doctors);
  console.log("Data Added Successfully".bgGreen);
  process.exit();
};

const deleteData = async () => {
  await User.deleteMany();
  await Doctor.deleteMany();
  await Appointment.deleteMany();
  console.log("Data Deleted Successfully".bgRed);
  process.exit();
};

if (argv[2] == "-i") {
  importData();
} else if (argv[2] == "-d") {
  deleteData();
}
