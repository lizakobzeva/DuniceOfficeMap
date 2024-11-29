import { z, ZodSchema } from "zod";

export interface FormDataType {
  zodSchema: ZodSchema;
  formItems: {
    label: string;
    type: string;
    defaultValue: string | number;
  }[];
}

export const addFurnitureSchema = z.object({
  size_x: z
    .string()
    .min(1, {
      message: "укажите ширину",
    })
    .max(1, {
      message: "значение должно быть меньше 10",
    }),
  size_y: z
    .string()
    .min(1, {
      message: "укажите длину",
    })
    .max(1, {
      message: "значение должно быть меньше 10",
    }),
  name: z.string().min(3, {
    message: "название должно быть больше 2 символов",
  }),
});

export const addFurnitureForm: FormDataType = {
  zodSchema: addFurnitureSchema,
  formItems: [
    {
      label: "Название",
      type: "name",
      defaultValue: "",
    },
    {
      label: "Ширина",
      type: "size_x",
      defaultValue: "",
    },
    {
      label: "Длинна",
      type: "size_y",
      defaultValue: "",
    },
  ],
};

export const addRoomSchema = z.object({
  size_x: z
    .string()
    .min(2, {
      message: "укажите ширину",
    })
    .max(2, {
      message: "значение должно быть меньше 100",
    }),
  size_y: z
    .string()
    .min(2, {
      message: "укажите длину",
    })
    .max(2, {
      message: "значение должно быть меньше 100",
    }),
  name: z.string().min(3, {
    message: "название должно быть больше 2 символов",
  }),
});

export const addRoomForm: FormDataType = {
  zodSchema: addRoomSchema,
  formItems: [
    {
      label: "Название",
      type: "name",
      defaultValue: "",
    },
    {
      label: "Ширина",
      type: "size_x",
      defaultValue: "",
    },
    {
      label: "Длинна",
      type: "size_y",
      defaultValue: "",
    },
  ],
};

export const addOfficeSchema = z.object({
  image: z.string().min(1, {
    message: "Необходимо указать url картинки",
  }),
  name: z.string().min(3, {
    message: "название должно быть не короче 3х символов",
  }),
  address: z.string().min(1, {
    message: "Необходимо указать адресс",
  }),
});

export const addOfficeForm: FormDataType = {
  zodSchema: addOfficeSchema,
  formItems: [
    {
      label: "Ссылка на изображение",
      type: "image",
      defaultValue: "",
    },
    {
      label: "Название",
      type: "name",
      defaultValue: "",
    },
    {
      label: "Адрес",
      type: "address",
      defaultValue: "",
    },
  ],
};

export const addEmployeeSchema = z.object({
  fio: z.string().min(6, {
    message: "FIO must be at least 6 characters.",
  }),
  position: z.string().min(1, {
    message: "Необходимо указать должность",
  }),
  email: z.string().email({ message: "incorrect email" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export const addEmployeeForm: FormDataType = {
  zodSchema: addEmployeeSchema,
  formItems: [
    {
      label: "ФИО",
      type: "fio",
      defaultValue: "",
    },
    {
      label: "Должность",
      type: "position",
      defaultValue: "",
    },
    {
      label: "Почта",
      type: "email",
      defaultValue: "",
    },
    {
      label: "Пароль",
      type: "password",
      defaultValue: "",
    },
  ],
};

export const addInventorySchema = z.object({
  name: z.string().min(3, {
    message: "название должно быть не короче 3х символов",
  }),
});

export const addInventoryForm: FormDataType = {
  zodSchema: addInventorySchema,
  formItems: [
    {
      label: "Название",
      type: "name",
      defaultValue: "",
    },
  ],
};
