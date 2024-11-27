import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PenLine } from "lucide-react";
import Title from "../ui/title";
import AddInventoryForm from "./AddInventoryForm";
import { useState } from "react";
import { editInventory } from "@/services/BuildOperations/BuildOperations";
import { Inventory } from "@/services/OfficesOperations/OfficesOperations.type";

interface Props {
  updateData: () => void;
  deFaultInventory: Inventory;
}

export function EditInventoryBlock({ updateData, deFaultInventory }: Props) {
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    updateData();
    setOpen(false);
  };
  const onSubmitFunc = async (name: string) => {
    return editInventory(deFaultInventory.id, name);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <PenLine color="#3B82F6" className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <Title size="md" text="Оборудование" />
        </DialogHeader>
        <AddInventoryForm
          onSubmitFunc={onSubmitFunc}
          closeDialog={closeDialog}
          deFaultInventory={deFaultInventory}
        />
      </DialogContent>
    </Dialog>
  );
}
