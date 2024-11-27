import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Inventory } from "@/services/OfficesOperations/OfficesOperations.type";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InventoriesTable from "@/components/shared/InventoriesTable";
import { getInventories } from "@/services/BuildOperations/BuildOperations";

export const columns: ColumnDef<Inventory>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Название
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "id",
    header: "ID оборудования",
  },
  {
    accessorKey: "fio",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Сотрудник
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];

const InventoriesTablePage = () => {
  const [inventoriesData, setInventoriesData] = useState<Inventory[]>([]);
  const { id } = useParams();

  const updateData = useCallback(async () => {
    getInventories(Number(id)).then((data) => data && setInventoriesData(data));
  }, [id]);

  useEffect(() => {
    updateData();
  }, [updateData]);
  return (
    <Container>
      <InventoriesTable
        updateData={updateData}
        columns={columns}
        data={inventoriesData}
      />
    </Container>
  );
};

export default InventoriesTablePage;
