import { createContext, useEffect, useState } from "react";
import { loginApi, logoutApi, registerApi } from "../api/auth";
import { removeToken, setToken, getToken } from "../utils/tokenStorage";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {
    const response = await loginApi(email, password);
    if (response.status === 200) {
      const token = response.data.data.token;
      if (token) {
        setToken(token);
        setIsAuthenticated(true);
        toast.success("User Logged in successfully!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
        });
      }
    } else {
      console.log(response.status);
      setIsAuthenticated(false);
    }
  };

  const register = async (data) => {
    const response = await registerApi(data);
    if (response.status === 201) {
      console.log(data);
      const token = response.data.data.token;
      if (token) {
        setToken(token);
        setIsAuthenticated(true);
        toast.success("User Registered successfully!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
        });
      }
    } else {
      console.log(response.status);
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    await logoutApi();
    removeToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
