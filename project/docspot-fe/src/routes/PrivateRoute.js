import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { isDoctor, isApprovedDoctor } = useContext(UserContext);
  if (isDoctor) {
    return isAuthenticated && isApprovedDoctor ? (
      children
    ) : (
      <Navigate to="/review" />
    );
  } else {
    return isAuthenticated ? children : <Navigate to="/login" />;
  }
};

export default PrivateRoute;
