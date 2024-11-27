import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

import { Furniture } from "@/services/OfficesOperations/OfficesOperations.type";

const addFurnitureSchema = z.object({
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
    message: "name must be at least 3 characters.",
  }),
});

interface Props {
  closeDialog: () => void;
  onSubmitFunc: (values: Omit<Furniture, "id">) => Promise<string | false>;
}

const AddFurnitureForm = ({ closeDialog, onSubmitFunc }: Props) => {
  const form = useForm<z.infer<typeof addFurnitureSchema>>({
    resolver: zodResolver(addFurnitureSchema),
    defaultValues: {
      size_x: "0",
      size_y: "0",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof addFurnitureSchema>) {
    await onSubmitFunc({
      name: values.name,
      size_x: Number(values.size_x),
      size_y: Number(values.size_y),
      office_id: 0,
      fio: "",
    });
    closeDialog();
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder="название" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="size_x"
          render={({ field }) => (
            <FormItem>
              <FormLabel>size_x</FormLabel>
              <FormControl>
                <Input placeholder="size_x" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="size_y"
          render={({ field }) => (
            <FormItem>
              <FormLabel>size_y</FormLabel>
              <FormControl>
                <Input type="size_y" placeholder="size_y" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mt-8">
          Сохранить
        </Button>
      </form>
    </Form>
  );
};

export default AddFurnitureForm;
