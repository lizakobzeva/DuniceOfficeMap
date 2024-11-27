import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddEmployeeForm from "./AddEmployeeForm";
import Title from "../ui/title";
import { useState } from "react";
import { addOfficesEmployee } from "@/services/AuthByEmail/AuthByEmail";
import { OfficesUser } from "@/services/OfficesOperations/OfficesOperations.type";
import { useParams } from "react-router-dom";

interface Props {
  updateData: () => void;
}

export function AddEmployeeBlock({ updateData }: Props) {
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
    updateData();
  };

  const onSubmitFunc = async (values: Omit<OfficesUser, "office_id">) => {
    return addOfficesEmployee({
      ...values,
      office_id: id || "",
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Добавить сотрудника
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <Title size="md" text="Сотрудник" />
        </DialogHeader>
        <AddEmployeeForm
          onSubmitFunc={onSubmitFunc}
          closeDialog={closeDialog}
        />
      </DialogContent>
    </Dialog>
  );
}
