import { toast } from "react-toastify";
import http from "./http";

export const loginApi = async (email, password) => {
  try {
    const reponse = await http.post("/api/auth/login", {
      email,
      password,
    });
    return reponse;
  } catch (error) {
    toast.error("Invalid User or Password", {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
    });
    throw error;
  }
};

export const registerApi = async (req) => {
  try {
    const reponse = await http.post("/api/auth/register", req);
    return reponse;
  } catch (error) {
    toast.error(error.message, {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
    });
    throw error;
  }
};

export const logoutApi = async () => {
  // await http.post('api/auth/logut');
  return true;
};
