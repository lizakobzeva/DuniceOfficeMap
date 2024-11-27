import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getEmployeeInventory } from "@/services/OfficesOperations/OfficesOperations";
import { Inventory } from "@/services/OfficesOperations/OfficesOperations.type";
import { Link, Unlink } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import {
  attachInventory,
  deleteAttachInventory,
  getFreeInventories,
} from "@/services/BuildOperations/BuildOperations";
import { useParams } from "react-router-dom";

interface Props {
  id: string;
}
export function InventoriesForEmployeeTabs({ id }: Props) {
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const [freeInventories, setFreeInventories] = useState<Inventory[]>([]);
  const [searchInventories, setSearchInventories] = useState("");
  const [searchFreeInventories, setSearchFreeInventories] = useState("");
  const { id: officeId } = useParams();

  const filterInventories = inventories.filter(({ name }) =>
    name.toLowerCase().includes(searchInventories.toLowerCase())
  );

  const filterFreeInventories = freeInventories.filter(({ name }) =>
    name.toLowerCase().includes(searchFreeInventories.toLowerCase())
  );

  const updateEmployeeInventories = useCallback(async () => {
    getEmployeeInventory(id).then((data) => data && setInventories(data));
  }, [id]);

  const updateFreeInventories = useCallback(async () => {
    getFreeInventories(Number(officeId)).then(
      (data) => data && setFreeInventories(data)
    );
  }, [officeId]);

  useEffect(() => {
    updateEmployeeInventories();
    updateFreeInventories();
  }, [id, officeId, updateEmployeeInventories, updateFreeInventories]);

  const assignInventory = async (inventoryId: number) => {
    await attachInventory(id, [inventoryId]);
    updateFreeInventories();
    updateEmployeeInventories();
  };

  const deleteAssignInventory = async (inventoryId: number) => {
    await deleteAttachInventory(inventoryId);
    updateEmployeeInventories();
    updateFreeInventories();
  };
  return (
    <Tabs defaultValue="assigned" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="assigned">Назначенное</TabsTrigger>
        <TabsTrigger value="free">Свободное</TabsTrigger>
      </TabsList>
      <TabsContent value="assigned">
        <Input
          value={searchInventories}
          onChange={(e) => setSearchInventories(e.target.value)}
        />
        <div className="w-4/5 px-4 pt-4 flex items-center justify-between">
          <p className="w-1/2 font-bold">Название</p>
          <p className="w-1/5 font-bold">ID</p>
        </div>
        <ScrollArea className="h-[300px] w-full border-none mt-4 rounded-md border px-4">
          {filterInventories?.map((inventory) => (
            <div className="border-b py-3 flex items-center justify-between">
              <p className="w-1/2">{inventory.name}</p>
              <p className="w-1/5">{inventory.id}</p>
              <Unlink
                color="#DC2626"
                className="cursor-pointer"
                onClick={() => deleteAssignInventory(inventory.id)}
              />
            </div>
          ))}
        </ScrollArea>
      </TabsContent>
      <TabsContent value="free">
        <Input
          value={searchFreeInventories}
          onChange={(e) => setSearchFreeInventories(e.target.value)}
        />
        <div className="w-4/5 px-4 pt-4 flex items-center justify-between">
          <p className="w-1/2 font-bold">Название</p>
          <p className="w-1/5 font-bold">ID</p>
        </div>
        <ScrollArea className="h-[300px] w-full border-none mt-4 rounded-md border px-4">
          {filterFreeInventories?.map((inventory) => (
            <div className="flex items-center justify-between border-b py-3">
              <p className="w-1/2">{inventory.name}</p>
              <p className="w-1/5">{inventory.id}</p>
              <Link
                color="#16a34a"
                className="cursor-pointer"
                onClick={() => assignInventory(inventory.id)}
              />
            </div>
          ))}
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}
