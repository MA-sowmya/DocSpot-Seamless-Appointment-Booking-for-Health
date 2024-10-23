import NavbarComp from "../components/NavbarComp";
import "../styles/Layout.css";
import SideNavComp from "../components/SideNavComp";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <NavbarComp />
      <div className="main-container">
        <SideNavComp />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
