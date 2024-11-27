import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import Title from "../ui/title";
import { useState } from "react";
import { Furniture } from "@/services/OfficesOperations/OfficesOperations.type";
import { useParams } from "react-router-dom";
import AddFurnitureForm from "./AddFurnitureForm";
import { addFurniture } from "@/services/BuildOperations/BuildOperations";

interface Props {
  updateData: () => void;
}

export function AddFurnitureBlock({ updateData }: Props) {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
    updateData();
  };

  const onSubmitFunc = async (values: Omit<Furniture, "id">) => {
    return addFurniture({ ...values, office_id: Number(id) || 0 });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Добавить Мебель
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <Title size="md" text="Мебель" />
        </DialogHeader>
        <AddFurnitureForm
          onSubmitFunc={onSubmitFunc}
          closeDialog={closeDialog}
        />
      </DialogContent>
    </Dialog>
  );
}
