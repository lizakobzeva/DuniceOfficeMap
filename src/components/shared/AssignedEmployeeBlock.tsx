import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link, Unlink, UserCog } from "lucide-react";
import Title from "../ui/title";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import {
  Inventory,
  OfficesEmployee,
} from "@/services/OfficesOperations/OfficesOperations.type";
import { useState } from "react";

interface Props {
  inventory: Inventory;
  employeesData: OfficesEmployee[];
  attachedUser: (id: string, inventoryId: number) => void;
  deleteAttachedUser: (inventoryId: number) => void;
}

export function AssignedEmployeeBlock({
  inventory,
  employeesData,
  attachedUser,
  deleteAttachedUser,
}: Props) {
  const [search, setSearch] = useState("");

  const searchEmployeesData = employeesData.filter(({ fio }) =>
    fio.toLowerCase().includes(search.toLowerCase())
  );

  const toggleAttachedUser = async (id: string) => {
    if (inventory.fio) {
      await deleteAttachedUser(inventory.id);
      attachedUser(id, inventory.id);
    } else {
      attachedUser(id, inventory.id);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <UserCog className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Title size="sm" text="Назначено сотруднику:" />
        <div className="border-y py-3 flex items-center justify-between">
          {inventory.fio ? (
            <>
              <p>{inventory.fio}</p>
              <Unlink
                color="#DC2626"
                className="cursor-pointer"
                onClick={() => deleteAttachedUser(inventory.id)}
              />
            </>
          ) : (
            <p className="w-full text-center text-red-900">
              Нет назначеного сотрудника
            </p>
          )}
        </div>
        <DialogHeader>
          <Title size="md" text="Назначить сотруднику" />
        </DialogHeader>
        <div>
          <Input value={search} onChange={(e) => setSearch(e.target.value)} />
          <ScrollArea className="h-[300px] w-full border-none mt-4 rounded-md border p-4">
            {searchEmployeesData.map((employee) => (
              <div className="border-b flex items-center justify-between py-3">
                <p>{employee.fio}</p>
                <Link
                  color="#16a34a"
                  className="cursor-pointer"
                  onClick={() => toggleAttachedUser(employee.id)}
                />
              </div>
            ))}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
