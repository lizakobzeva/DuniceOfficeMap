import { urls } from "@/lib/constants/urls";
import { showErrorNotification } from "@/lib/helpers/notification";
import axios, { AxiosError } from "axios";
import { OfficesUser } from "../OfficesOperations/OfficesOperations.type";
const axiosInstance = axios.create({
  baseURL: urls.api,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      axiosInstance.get("/users/refresh_token");
    }
    return error;
  }
);

export const loginFetch = async (email: string, password: string) => {
  try {
    const res = await axiosInstance.post(
      "/auth/login",
      {
        email,
        password,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    localStorage.setItem("access_token", res.data["token"]);
    localStorage.setItem("role", res.data.role);
    return res.data["token"];
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};
export const registerFetch = async (
  fio: string,
  email: string,
  password: string
) => {
  try {
    const res = await axiosInstance.post(
      "/auth/register",
      {
        fio,
        email,
        password,
        team: Math.floor(Math.random() * 100_000_000) + "",
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    localStorage.setItem("access_token", res.data["token"]);
    return res.data["token"];
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};
export const logout = async () => {
  try {
    localStorage.removeItem("access_token");
    return true;
  } catch (e) {
    console.log(e);
  }
};

export const addOfficesEmployee = async (employee: OfficesUser) => {
  try {
    const res = await axiosInstance.post("/auth/employee", employee);

    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};
export const editOfficesEmployee = async (
  id: string,
  employee: OfficesUser
) => {
  try {
    const res = await axiosInstance.put(`/auth/employee/${id}`, employee);

    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};

export const deleteEmployee = async (id: string) => {
  try {
    const res = await axiosInstance.delete(`/auth/employee/${id}`);
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};
