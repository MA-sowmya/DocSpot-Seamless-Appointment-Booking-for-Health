import { createContext, useContext, useEffect, useState } from "react";
import { profileApi } from "../api/user";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // const [isRole, setIsRole] = useState(false);

  const [profile, setProfile] = useState({});
  const [userId, setUserId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isApprovedDoctor, setIsApprovedDoctor] = useState(false);
  const [isPatient, setIsPatient] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      getProfile();
    }
  }, [isAuthenticated]);

  const getProfile = async () => {
    const response = await profileApi();
    if (response.status === 200) {
      const profile = response.data.data;
      setUserId(profile.id);
      setProfile(profile);
      profile.role.toLowerCase() === "admin"
        ? setIsAdmin(true)
        : setIsAdmin(false);
      profile.role.toLowerCase() === "doctor"
        ? setIsDoctor(true)
        : setIsDoctor(false);
      profile.role.toLowerCase() === "patient"
        ? setIsPatient(true)
        : setIsPatient(false);

      profile.role.toLowerCase() === "doctor" &&
      profile?.doctorInfo?.status.toLowerCase() === "approved"
        ? setIsApprovedDoctor(true)
        : setIsApprovedDoctor(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        isAdmin,
        isDoctor,
        isPatient,
        profile,
        isApprovedDoctor,
        getProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
