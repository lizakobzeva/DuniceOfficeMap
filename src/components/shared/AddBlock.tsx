import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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

interface Props {
  updateData?: () => void;
  trigger: ReactElement;
  formData: FormDataType;
  formTitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addFunc: (value: any) => void;
}

function AddBlock({
  trigger,
  formData,
  formTitle,
  addFunc,
  updateData,
}: Props) {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  // const { id } = useParams();

  const form = useForm<z.infer<typeof formData.zodSchema>>({
    resolver: zodResolver(formData.zodSchema),
    defaultValues: Object.fromEntries(
      formData.formItems.map((obj) => [obj.type, obj.defaultValue])
    ),
  });

  async function onSubmit(values: z.infer<typeof formData.zodSchema>) {
    await setDisabled(true);
    await addFunc(values);
    if (updateData) await updateData();
    await setOpen(false);
    form.reset(formData.formItems.map((obj) => [obj.type, obj.defaultValue]));
    setDisabled(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <Title size="md" text={formTitle} />
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            {formData.formItems.map((item) => (
              <FormField
                key={item.label}
                control={form.control}
                name={item.type}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      <Input
                        type={
                          item.type === "password" || item.type === "email"
                            ? item.type
                            : "text"
                        }
                        placeholder={item.label}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button disabled={disabled} type="submit" className="w-full mt-8">
              Сохранить
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddBlock;
