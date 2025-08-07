// import axios from 'axios';

import { apiClient } from "~shared/lib/api";

// const API_URL = import.meta.env.VITE_BASE_URL as string;

export const getTeacherData = async () => {
  try {
    const response = await apiClient.get("/staffs");
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении проектов:", error);
    throw error;
  }
};
