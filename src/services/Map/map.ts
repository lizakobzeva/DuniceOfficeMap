import axiosInstance from "@/lib/config/ApiConfig/ApiConfig";

export const requestFloors = async (id: string | number) => {
  return await axiosInstance.get(`/offices/floors/${id}`);
};

export const requestFurniture = async (id: string | number) => {
  return await axiosInstance.get(`/build/furniture/${id}`);
};
export const requestMapByFloor = async (
  office_id: string | number,
  floor_id: string | number
) => {
  return (await axiosInstance.get(`/offices/map/${office_id}/${floor_id}`))
    .data;
};

export const requestCreateFloors = async (data: {
  office_id: number;
  name: string;
}) => {
  return await axiosInstance.post(`/offices/floor`, data);
};

export const requestCreateFurniture = async (data: {
  name: string;
  size_x: number;
  size_y: number;
}) => {
  return await axiosInstance.post(`/build/furniture`, data);
};

export const requestUpdateFloor = async (
  office_id: string | number,
  floor_id: string | number,
  data: {
    furniture_id: number;
    type: number;
    x: number;
    y: number;
    is_vertical: boolean;
  }
) => {
  return await axiosInstance.put(`/build/edit/${office_id}/${floor_id}`, data);
};
