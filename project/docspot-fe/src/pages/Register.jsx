import { Image } from "react-bootstrap";
import NavbarComp from "../components/NavbarComp";
import "../styles/Layout.css";
import banner from "../assets/images/banner.jpg";
import RegisterComp from "../components/RegisterComp";

const Register = () => {
  return (
    <>
      <NavbarComp />
      <div class="main-section">
        <Image src={banner} className="banner"></Image>
        <div class="form">
          <RegisterComp />
        </div>
      </div>
    </>
  );
};

export default Register;
