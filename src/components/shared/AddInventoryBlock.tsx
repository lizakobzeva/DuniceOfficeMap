import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import Title from "../ui/title";
import AddInventoryForm from "./AddInventoryForm";
import { useState } from "react";
import { addInventory } from "@/services/BuildOperations/BuildOperations";
import { useParams } from "react-router-dom";

interface Props {
  updateData: () => void;
}

export function AddInventoryBlock({ updateData }: Props) {
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const closeDialog = () => {
    updateData();
    setOpen(false);
  };
  const onSubmitFunc = async (name: string) => {
    return addInventory(name, id || "");
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Добавить инвентарь
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <Title size="md" text="Оборудование" />
        </DialogHeader>
        <AddInventoryForm
          onSubmitFunc={onSubmitFunc}
          closeDialog={closeDialog}
        />
      </DialogContent>
    </Dialog>
  );
}
