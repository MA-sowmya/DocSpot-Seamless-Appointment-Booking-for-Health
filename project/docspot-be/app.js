const express = require("express");
const connectDB = require("./config/connection");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const reportRoutes = require("./routes/reportRoutes");
const { authenticateToken } = require("./middlewares/authMiddleware");
const { errorHandler } = require("./middlewares/errorHandlingMiddleware");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

//cors policy
app.use(cors());

//middleware to parse json body
app.use(express.json());

//middleware to parse json body
app.use(errorHandler);

// uploads directory
const uploadsDir = path.join(__dirname, "uploads");

// create upload directory
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

//
app.use(express.static(path.join(__dirname, "public")));

// //Connection To Database
connectDB();

// Define a route
app.use("/api/auth", authRoutes);
app.use("/api/users", authenticateToken, userRoutes);
app.use("/api/appointments", authenticateToken, appointmentRoutes);
app.use("/api/doctors", authenticateToken, doctorRoutes);
app.use("/api/reports", authenticateToken, reportRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // // Start the server
// const PORT = process.env.PORT || 3001;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

module.exports = app;
