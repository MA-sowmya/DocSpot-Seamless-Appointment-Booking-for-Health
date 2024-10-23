import { Image, Nav, NavLink } from "react-bootstrap";
import "../styles/SideNav.css";
import maleImg from "../assets/images/male.png";
import femaleImg from "../assets/images/female.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { IconButton } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MedicationIcon from "@mui/icons-material/Medication";
import PaymentsIcon from "@mui/icons-material/Payments";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { GridSearchIcon } from "@mui/x-data-grid";
import { capitalize } from "../utils/convert";

const SideNavComp = () => {
  const { logout } = useContext(AuthContext);
  const { isAdmin, isDoctor, isPatient, profile } = useContext(UserContext);

  const location = useLocation();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      <div className="aside">
        <Nav defaultActiveKey="dashboard" className="flex-column">
          <div
            className={`sidenav-button ${
              location.pathname === "/search" ? "active" : ""
            }`}
          >
            <IconButton className="text-black">
              <GridSearchIcon />
            </IconButton>
            <NavLink as={Link} to={"search"}>
              Search Doctors
            </NavLink>
          </div>
          <div
            className={`sidenav-button ${
              location.pathname === "/dashboard" ? "active" : ""
            }`}
          >
            <IconButton className="text-black">
              <DashboardIcon />
            </IconButton>
            <NavLink as={Link} to={"dashboard"}>
              Dashboard
            </NavLink>
          </div>
          <div
            className={`sidenav-button ${
              location.pathname === "/appointments" ? "active" : ""
            }`}
          >
            <IconButton className="text-black">
              <BusinessCenterIcon />
            </IconButton>
            <NavLink as={Link} to={"appointments"}>
              {isPatient && "My"} Appointments
            </NavLink>
          </div>
          {isAdmin && (
            <div
              className={`sidenav-button ${
                location.pathname === "/doctors" ? "active" : ""
              }`}
            >
              <IconButton className="text-black">
                <GroupAddIcon />
              </IconButton>
              <NavLink as={Link} to={"doctors"}>
                Doctors
              </NavLink>
            </div>
          )}

          {!isPatient && (
            <div
              className={`sidenav-button ${
                location.pathname === "/patients" ? "active" : ""
              }`}
            >
              <IconButton className="text-black">
                <MedicationIcon />
              </IconButton>
              <NavLink as={Link} to={"patients"}>
                Patients
              </NavLink>
            </div>
          )}
          {isAdmin && (
            <div
              className={`sidenav-button ${
                location.pathname === "/users" ? "active" : ""
              }`}
            >
              <IconButton className="text-black">
                <PeopleAltIcon />
              </IconButton>
              <NavLink as={Link} to={"users"}>
                Users
              </NavLink>
            </div>
          )}

          {!isPatient && (
            <div
              className={`sidenav-button ${
                location.pathname === "/payments" ? "active" : ""
              }`}
            >
              <IconButton className="text-black">
                <PaymentsIcon />
              </IconButton>
              <NavLink as={Link} to={"payments"}>
                Payments
              </NavLink>
            </div>
          )}
        </Nav>
        <div className="nav-profile">
          <div className="d-flex flex-column justify-content-center align-items-center profile-icon">
            <NavLink as={Link} to={"/profile"}>
              <Image
                src={profile.gender === "female" ? femaleImg : maleImg}
                className="profileImg"
                roundedCircle
              />
            </NavLink>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <h3 className="name">
                {capitalize(profile.firstname)} {capitalize(profile.lastname)}
              </h3>
              <p className="role">{capitalize(profile.role)}</p>
            </div>
          </div>
          <div className="action-icon">
            <NavLink as={Link} to={"/profile"}>
              <IconButton className="text-black">
                <SettingsIcon />
              </IconButton>
            </NavLink>
            <IconButton className="text-black" onClick={onLogout}>
              <LogoutIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavComp;
