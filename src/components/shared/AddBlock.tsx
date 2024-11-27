import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Title from "../ui/title";
import { ReactElement, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormDataType } from "@/lib/constants/forms";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

interface Props {
  updateData?: () => void;
  trigger: ReactElement;
  formData: FormDataType;
  formTitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addFunc: (value: any) => void;
}

function AddBlock({ trigger, formData, formTitle, addFunc }: Props) {
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const form = useForm<z.infer<typeof formData.zodSchema>>({
    resolver: zodResolver(formData.zodSchema),
    defaultValues: Object.fromEntries(
      formData.formItems.map((obj) => [obj.type, obj.defaultValue])
    ),
  });

  async function onSubmit(values: z.infer<typeof formData.zodSchema>) {
    await addFunc({
      name: values.name,
      size_x: Number(values.size_x),
      size_y: Number(values.size_y),
      office_id: Number(id),
      fio: "",
    });
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <Title size="md" text={formTitle} />
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            {formData.formItems.map((item) => (
              <FormField
                control={form.control}
                name={item.type}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      <Input
                        type={item.type}
                        placeholder={item.label}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button type="submit" className="w-full mt-8">
              Сохранить
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddBlock;
