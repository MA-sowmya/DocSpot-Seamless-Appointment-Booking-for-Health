import { useLoading } from "../context/LoaderContext";
import http from "./http";

export const profileApi = async () => {
  try {
    const reponse = await http.get("/api/users/profile");

    return reponse;
  } catch (error) {
    throw error;
  }
};

export const usersApi = async (showLoader, hideLoader) => {
  try {
    showLoader();
    const reponse = await http.get("/api/users");

    return reponse;
  } catch (error) {
    throw error;
  } finally {
    hideLoader();
  }
};

export const usersByRoleApi = async (role) => {
  try {
    const reponse = await http.get(`/api/users/role/${role}`);

    return reponse;
  } catch (error) {
    throw error;
  }
};

export const usersByIdApi = async (id) => {
  try {
    const reponse = await http.get(`/api/users/${id}`);

    return reponse;
  } catch (error) {
    throw error;
  }
};

export const updateUserByIdApi = async (id, updateData) => {
  try {
    const reponse = await http.put(`/api/users/${id}`, updateData);

    return reponse;
  } catch (error) {
    throw error;
  }
};

export const notificationsApi = async (id) => {
  try {
    const reponse = await http.get(`/api/users/${id}/notifications`);

    return reponse;
  } catch (error) {
    throw error;
  }
};

export const updateNotificationsApi = async (notificationId) => {
  try {
    const reponse = await http.put(
      `/api/users/notifications/${notificationId}`,
      {}
    );

    return reponse;
  } catch (error) {
    throw error;
  }
};
