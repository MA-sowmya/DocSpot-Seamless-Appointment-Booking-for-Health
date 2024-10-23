import http from "./http";

export const updateDoctorApi = async (id, updateData) => {
  try {
    const reponse = await http.put(`/api/doctors/${id}`, updateData);

    return reponse;
  } catch (error) {
    throw error;
  }
};

export const appprovedDoctorsApi = async () => {
  try {
    const reponse = await http.get("/api/doctors/approved");

    return reponse;
  } catch (error) {
    throw error;
  }
};
