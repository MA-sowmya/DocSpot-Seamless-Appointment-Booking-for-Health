import { Image } from "react-bootstrap";
import NavbarComp from "../components/NavbarComp";
import "../styles/Layout.css";
import banner from "../assets/images/banner.jpg";
import LoginComp from "../components/LoginComp";

const Login = () => {
  return (
    <>
      <NavbarComp />
      <div className="main-section">
        <Image src={banner} className="banner"></Image>
        <div className="form">
          <LoginComp />
        </div>
      </div>
    </>
  );
};

export default Login;
