import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const DoctorReviewRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { isDoctor, isApprovedDoctor } = useContext(UserContext);

  return isAuthenticated && isDoctor && !isApprovedDoctor ? (
    children
  ) : (
    <Navigate to="/dashboard" />
  );
};

export default DoctorReviewRoute;
