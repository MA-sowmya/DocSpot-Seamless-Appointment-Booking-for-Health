import http from "./http";

export const getStatusApi = async () => {
  try {
    const reponse = await http.get(`/api/reports`);

    return reponse;
  } catch (error) {
    throw error;
  }
};
