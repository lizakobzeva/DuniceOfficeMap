import Title from "../ui/title";
import { MonitorCog } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InventoriesForEmployeeTabs } from "./InventoriesForEmployeeTabs";

interface Props {
  id: string;
}

const InventoriesForEmployeeBlock = ({ id }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MonitorCog className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <Title size="md" text="Оборудование" />
        </DialogHeader>
        <InventoriesForEmployeeTabs id={id} />
      </DialogContent>
    </Dialog>
  );
};

export default InventoriesForEmployeeBlock;
