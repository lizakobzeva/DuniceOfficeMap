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

interface Props {
  updateData: () => void;
  trigger: ReactElement;
  formData: FormDataType;
  formTitle: string;
  initialData: Record<string, string>;
  itemId: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editFunc: (itemId: string | number, values: any) => void;
}

function EditBlock({
  trigger,
  formData,
  formTitle,
  editFunc,
  itemId,
  initialData,
  updateData,
}: Props) {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const form = useForm<z.infer<typeof formData.zodSchema>>({
    resolver: zodResolver(formData.zodSchema),
    defaultValues: Object.fromEntries(
      formData.formItems.map((obj) => [
        obj.type,
        initialData[obj.type] || obj.defaultValue,
      ])
    ),
  });

  async function onSubmit(values: z.infer<typeof formData.zodSchema>) {
    await setDisabled(true);
    await editFunc(itemId, values);
    if (updateData) await updateData();
    await setOpen(false);
    form.reset(
      Object.fromEntries(
        formData.formItems.map((obj) => [
          obj.type,
          initialData[obj.type] || obj.defaultValue,
        ])
      )
    );
    setDisabled(false);
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

export default EditBlock;
