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
import { Inventory } from "@/services/OfficesOperations/OfficesOperations.type";

const addInventorySchema = z.object({
  name: z.string().min(3, {
    message: "название должно быть не короче 3х символов",
  }),
});

interface Props {
  closeDialog: () => void;
  onSubmitFunc: (name: string) => Promise<string | false>;
  deFaultInventory?: Inventory;
}

const AddInventoryForm = ({
  closeDialog,
  onSubmitFunc,
  deFaultInventory,
}: Props) => {
  const form = useForm<z.infer<typeof addInventorySchema>>({
    resolver: zodResolver(addInventorySchema),
    defaultValues: {
      name: deFaultInventory?.name || "",
    },
  });

  async function onSubmit(values: z.infer<typeof addInventorySchema>) {
    await onSubmitFunc(values.name);
    closeDialog();
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

          <Button type="submit" className="w-full mt-8">
            Сохранить
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddInventoryForm;
