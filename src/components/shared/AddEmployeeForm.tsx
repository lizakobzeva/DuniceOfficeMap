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

import { OfficesUser } from "@/services/OfficesOperations/OfficesOperations.type";

const addEmployeeSchema = z.object({
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

interface Props {
  closeDialog: () => void;
  onSubmitFunc: (
    values: Omit<OfficesUser, "office_id">
  ) => Promise<string | false>;
  initialEmployee?: Omit<OfficesUser, "office_id">;
}

const AddEmployeeForm = ({
  closeDialog,
  onSubmitFunc,
  initialEmployee,
}: Props) => {
  const form = useForm<z.infer<typeof addEmployeeSchema>>({
    resolver: zodResolver(addEmployeeSchema),
    defaultValues: {
      fio: initialEmployee?.fio || "",
      position: initialEmployee?.position || "",
      email: initialEmployee?.email || "",
      password: initialEmployee?.password || "",
    },
  });

  async function onSubmit(
    values: z.infer<Omit<typeof addEmployeeSchema, "office_id">>
  ) {
    await onSubmitFunc(values);
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
          name="fio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ФИО</FormLabel>
              <FormControl>
                <Input placeholder="фио" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Должность</FormLabel>
              <FormControl>
                <Input placeholder="должность" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Почта</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Почта" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
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

export default AddEmployeeForm;
