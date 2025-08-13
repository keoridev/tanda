import axios, { AxiosInstance } from "axios";

const API_URL = import.meta.env.VITE_BASE_URL as string;

// Создаем экземпляр Axios с настройками по умолчанию
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
});
