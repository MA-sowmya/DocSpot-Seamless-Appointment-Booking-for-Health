import { useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchDoctorComp from "../components/SearchDoctorComp";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Profile from "../pages/Profile";
import Patients from "../pages/Patients";
import Users from "../pages/Users";
import Payments from "../pages/Payments";
import Appointments from "../pages/Appointments";
import Doctors from "../pages/Doctors";
import AppointmentConfirm from "../components/AppointmentConfimComp";
import Layout from "../pages/Layout";
import Dashboard from "../pages/Dashboard";
import DoctorReviewRoute from "./DoctorReviewRoute";
import Review from "../pages/Review";
import Landing from "../pages/Landing";

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/landing",
      element: (
        <PublicRoute>
          <Landing />
        </PublicRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "/register",
      element: (
        <PublicRoute>
          <Register />
        </PublicRoute>
      ),
    },
    {
      path: "/review",
      element: (
        <DoctorReviewRoute>
          <Review />
        </DoctorReviewRoute>
      ),
    },
    {
      path: "/",
      element: (
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      ),
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "appointments", element: <Appointments /> },
        { path: "search", element: <SearchDoctorComp /> },
        { path: "doctors", element: <Doctors /> },
        { path: "profile", element: <Profile /> },
        { path: "patients", element: <Patients /> },
        { path: "users", element: <Users /> },
        { path: "payments", element: <Payments /> },
        { path: "confirmation/:id", element: <AppointmentConfirm /> },
      ],
    },
  ]);

  return routes;
};

export default AppRoutes;
