import EmployeesTable from "@/components/shared/EmployeesTable";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { OfficesEmployee } from "@/services/OfficesOperations/OfficesOperations.type";
import { useCallback, useEffect, useState } from "react";
import { getOfficesEmployees } from "@/services/OfficesOperations/OfficesOperations";
import { useParams } from "react-router-dom";

export const columns: ColumnDef<OfficesEmployee>[] = [
  {
    accessorKey: "fio",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ФИО
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "position",
    header: "Должность",
  },
  {
    accessorKey: "place",
    header: "Место",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Почта
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];

const EmployeesTablePage = () => {
  const [employeesData, setEmployeesData] = useState<OfficesEmployee[]>([]);
  const { id } = useParams();

  const updateData = useCallback(async () => {
    getOfficesEmployees(Number(id)).then(
      (data) => data && setEmployeesData(data)
    );
  }, [id]);

  useEffect(() => {
    updateData();
  }, [updateData]);
  return (
    <Container>
      <EmployeesTable
        updateData={updateData}
        columns={columns}
        data={employeesData}
      />
    </Container>
  );
};

export default EmployeesTablePage;
