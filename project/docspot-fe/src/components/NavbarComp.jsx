import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import NavNotificationsComp from "./NavNotificationComp";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { UserContext } from "../context/UserContext";

const NavbarComp = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  const { isAuthenticated } = useContext(AuthContext);

  const { isDoctor, isApprovedDoctor } = useContext(UserContext);
  return (
    <Navbar
      className="bg-body-tertiary px-4"
      expand="lg"
      sx={{ backgroundColor: "#1E88E5" }}
      fixed="top"
    >
      <Navbar.Brand
        as={Link}
        to={"/"}
        sx={{ fontSize: "1.5rem", color: "white" }}
        className="fw-bolder"
      >
        DOCSPOT
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {isAuthenticated && !isDoctor && <NavNotificationsComp />}
          {isAuthenticated && isDoctor && isApprovedDoctor && (
            <>
              {isDoctor}
              <NavNotificationsComp />
            </>
          )}
          {!isAuthenticated && (
            <>
              <Nav.Link as={Link} to={"/login"}>
                Login
              </Nav.Link>
              <Nav.Link as={Link} to={"/register"}>
                Register
              </Nav.Link>
            </>
          )}
          {isAuthenticated && isDoctor && !isApprovedDoctor && (
            <IconButton className="text-black" onClick={onLogout}>
              <LogoutIcon />
            </IconButton>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComp;
