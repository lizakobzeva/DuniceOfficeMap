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
