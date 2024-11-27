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
import { addOffice } from "@/services/OfficesOperations/OfficesOperations";

const addOfficeForm = z.object({
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

interface Props {
  updateData: () => void;
  closeDialog: () => void;
}

const AddOfficeForm = ({ updateData, closeDialog }: Props) => {
  const form = useForm<z.infer<typeof addOfficeForm>>({
    resolver: zodResolver(addOfficeForm),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  async function onSubmit(values: z.infer<typeof addOfficeForm>) {
    const res = await addOffice(values);
    if (res) {
      closeDialog();
      updateData();
    }
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ссылка на изображение</FormLabel>
                <FormControl>
                  <Input placeholder="image" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Адрес</FormLabel>
                <FormControl>
                  <Input placeholder="address" {...field} />
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
    </div>
  );
};

export default AddOfficeForm;
