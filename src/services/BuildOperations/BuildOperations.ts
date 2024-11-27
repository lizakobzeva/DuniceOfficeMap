import axiosInstance from "@/lib/config/ApiConfig/ApiConfig";
import { showErrorNotification } from "@/lib/helpers/notification";
import { AxiosError } from "axios";
import {
  Furniture,
  Inventory,
} from "../OfficesOperations/OfficesOperations.type";

export const addInventory = async (name: string, office_id: string) => {
  try {
    const res = await axiosInstance.post("/build/inventory", {
      name,
      office_id,
    });
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};
export const editInventory = async (inventoryId: number, name: string) => {
  try {
    const res = await axiosInstance.put(`/build/inventory/${inventoryId}`, {
      name,
    });
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};

export const getInventories = async (id: number) => {
  try {
    const res = await axiosInstance.get<Inventory[]>(`/build/inventory/${id}`);
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};

export const getFreeInventories = async (id: number) => {
  try {
    const res = await axiosInstance.get<Inventory[]>(
      `/build/inventory/${id}?status=free`
    );
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};

export const deleteInventory = async (id: number) => {
  try {
    const res = await axiosInstance.delete(`/build/inventory/${id}`);
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};
export const deleteEmployeeForInventory = async (id: number) => {
  try {
    const res = await axiosInstance.delete(
      `/build/attach/inventory/employee/${id}`
    );
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};

export const attachInventory = async (
  user_id: string,
  inventory_ids: number[]
) => {
  try {
    const res = await axiosInstance.post("/build/attach/inventory", {
      user_id,
      inventory_ids,
    });
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};
export const attachFurniture = async (
  user_id: string,
  furniture_ids: number[]
) => {
  try {
    const res = await axiosInstance.post("/build/attach/furniture", {
      furniture_ids,
      user_id,
    });
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};
export const deleteAttachFurniture = async (inventory_id: number) => {
  try {
    const res = await axiosInstance.delete(
      `/build/attach/furniture/employee/${inventory_id}`
    );
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};

export const deleteAttachInventory = async (inventory_id: number) => {
  try {
    const res = await axiosInstance.delete(
      `/build/attach/inventory/employee/${inventory_id}`
    );
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};

export const addFurniture = async (furniture: Omit<Furniture, "id">) => {
  try {
    const res = await axiosInstance.post("/build/furniture", {
      ...furniture,
    });
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};

export const getFurniture = async (id: number) => {
  try {
    const res = await axiosInstance.get<Furniture[]>(`/build/furniture/${id}`);
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    showErrorNotification(error.message);
    return false;
  }
};
