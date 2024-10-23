import http from "./http";

export const appointmentsApi = async () => {
  const response = await http.get("/api/appointments");

  return response;
};

export const appointmentApi = async (id) => {
  const response = await http.get(`/api/appointments/${id}`);

  return response;
};

export const availableAppointmentsApi = async (id, date) => {
  try {
    const req = {
      id,
      date,
    };
    const response = await http.post("/api/appointments/available", req);

    return response;
  } catch (error) {
    throw error;
  }
};

export const bookAppointmentsApi = async (data) => {
  try {
    const reponse = await http.post("/api/appointments/book", data);

    return reponse;
  } catch (error) {
    throw error;
  }
};

export const reScheduleAppointmentsApi = async (id, data) => {
  try {
    const reponse = await http.put(`/api/appointments/${id}`, data);

    return reponse;
  } catch (error) {
    throw error;
  }
};

export const updateAppointmentApi = async (id, data) => {
  try {
    const reponse = await http.put(`/api/appointments/${id}`, data);

    return reponse;
  } catch (error) {
    throw error;
  }
};

export const uploadDocsApi = async (appointmentId, formData) => {
  try {
    const reponse = await http.post(
      `/api/appointments/upload/${appointmentId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return reponse;
  } catch (error) {
    throw error;
  }
};
