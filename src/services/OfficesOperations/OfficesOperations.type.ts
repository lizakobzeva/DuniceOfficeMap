export interface OfficesEmployeeInventory {
  id: string;
  name: string;
}

export interface OfficesEmployee {
  id: string;
  fio: string;
  position: string;
  place?: string;
  email: string;
  // то, что на столе
  inventory?: OfficesEmployeeInventory[];
}

export interface OfficesUser {
  office_id: string;
  fio: string;
  position: string;
  email: string;
  password?: string;
}

export interface Office {
  id?: number;
  name: string;
  image?: string;
  address: string;
}

export interface Inventory {
  id: number;
  name: string;
  fio: string | null;
}

export interface Furniture {
  name: string;
  id: number;
  size_x: number;
  size_y: number;
  office_id: number;
  fio: string;
}
