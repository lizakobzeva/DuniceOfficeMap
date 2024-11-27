import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PenLine } from "lucide-react";
import AddEmployeeForm from "./AddEmployeeForm";
import Title from "../ui/title";
import { useState } from "react";
import {
  OfficesEmployee,
  OfficesUser,
} from "@/services/OfficesOperations/OfficesOperations.type";
import { editOfficesEmployee } from "@/services/AuthByEmail/AuthByEmail";
import { useParams } from "react-router-dom";

interface Props {
  updateData: () => void;
  employee: OfficesEmployee;
  employeeId: string;
}

export function EditEmployeeBlock({ updateData, employee, employeeId }: Props) {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen(false);
    updateData();
  };
  const onSubmitFunc = async (values: Omit<OfficesUser, "office_id">) => {
    return editOfficesEmployee(employeeId, {
      ...values,
      office_id: id || "",
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <PenLine color="#3B82F6" className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <Title size="md" text="Сотрудник" />
        </DialogHeader>
        <AddEmployeeForm
          initialEmployee={employee}
          onSubmitFunc={onSubmitFunc}
          closeDialog={closeDialog}
        />
      </DialogContent>
    </Dialog>
  );
}
