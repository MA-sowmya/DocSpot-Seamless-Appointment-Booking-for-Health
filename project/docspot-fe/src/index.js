import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

moment.tz.setDefault("Asia/Kolkata");
// moment.tz.setDefault("America/Chicago");
// moment.tz.setDefault("UTC");

const root = ReactDOM.createRoot(document.getElementById("root"));

// Wrap your app with BrowserRouter
root.render(<App />);
