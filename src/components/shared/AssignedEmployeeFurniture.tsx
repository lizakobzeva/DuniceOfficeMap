import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Link, Unlink } from "lucide-react";
import Title from "../ui/title";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import {
  Furniture,
  OfficesEmployee,
} from "@/services/OfficesOperations/OfficesOperations.type";
import { useCallback, useEffect, useState } from "react";
import { getOfficesEmployees } from "@/services/OfficesOperations/OfficesOperations";
import { useParams } from "react-router-dom";
import {
  attachFurniture,
  deleteAttachFurniture,
} from "@/services/BuildOperations/BuildOperations";

interface Props {
  furniture: Furniture;
  //   employeesData: OfficesEmployee[];
  //   attachedUser: (id: string, furnitureId: number) => void;
  //   deleteAttachedUser: (furnitureId: number) => void;
}

export function AssignedEmployeeFurniture({
  furniture,
}: //   employeesData,
//   attachedUser,
//   deleteAttachedUser,
Props) {
  const [employeesData, setEmployeesData] = useState<OfficesEmployee[]>([]);
  const [search, setSearch] = useState("");
  const { id } = useParams();

  const searchEmployeesData = employeesData.filter(({ fio }) =>
    fio.toLowerCase().includes(search.toLowerCase())
  );

  const updateData = useCallback(async () => {
    getOfficesEmployees(Number(id)).then(
      (data) => data && setEmployeesData(data)
    );
  }, [id]);

  useEffect(() => {
    updateData();
  }, [updateData]);

  const toggleAttachedUser = async (id: string) => {
    if (furniture.fio) {
      await deleteAttachFurniture(furniture.id);
      attachFurniture(id, [furniture.id]);
    } else {
      attachFurniture(id, [furniture.id]);
    }
  };
  return (
    <DialogContent className="sm:max-w-[425px]">
      <Title size="sm" text="Назначено сотруднику:" />
      <div className="border-y py-3 flex items-center justify-between">
        {furniture.fio ? (
          <>
            <p>{furniture.fio}</p>
            <Unlink
              color="#DC2626"
              className="cursor-pointer"
              onClick={() => deleteAttachFurniture(furniture.id)}
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
            <div
              key={employee.id}
              className="border-b flex items-center justify-between py-3"
            >
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
  );
}
