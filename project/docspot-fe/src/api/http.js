import axios from "axios";
import { getToken } from "../utils/tokenStorage";
import { toast } from "react-toastify";

const http = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      // Set the content type to multipart/form-data
      config.headers["Content-Type"] = "multipart/form-data";
    }
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response, // Success response
  (error) => {
    console.log(error);
    if (error.response) {
      if (error.response.status === 400) {
        toast.error(error.message, {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
        });
      } else if (error.response.status === 500) {
        toast.error(error.message, {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
        });
      }
    } else if (error.request) {
      toast.error("Network Error: Please check your connection.", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    } else {
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }
    return Promise.reject(error);
  }
);

export default http;
