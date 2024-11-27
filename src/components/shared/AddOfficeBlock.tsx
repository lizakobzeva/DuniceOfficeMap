import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import Title from "../ui/title";
import AddOfficeForm from "./AddOfficeForm";
import { useState } from "react";

interface Props {
  updateData: () => void;
}

export function AddOfficeBlock({ updateData }: Props) {
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
    updateData();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Добавить офис
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <Title size="md" text="Офис" />
        </DialogHeader>
        <AddOfficeForm closeDialog={closeDialog} updateData={updateData} />
      </DialogContent>
    </Dialog>
  );
}
