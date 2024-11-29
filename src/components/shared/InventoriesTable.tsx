import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

import { PenLine, Plus, Trash2, UserCog } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AssignedEmployeeBlock } from "./AssignedEmployeeBlock";
import {
  Inventory,
  OfficesEmployee,
} from "@/services/OfficesOperations/OfficesOperations.type";
import {
  addInventory,
  attachInventory,
  deleteEmployeeForInventory,
  deleteInventory,
  editInventory,
} from "@/services/BuildOperations/BuildOperations";
import { getOfficesEmployees } from "@/services/OfficesOperations/OfficesOperations";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import AddBlock from "./AddBlock";
import { addInventoryForm } from "@/lib/constants/forms";
import EditBlock from "./EditBlock";

interface Props<TValue> {
  columns: ColumnDef<Inventory, TValue>[];
  data: Inventory[];
  updateData: () => void;
}

function InventoriesTable<TValue>({
  columns,
  data,
  updateData,
}: Props<TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [employeesData, setEmployeesData] = useState<OfficesEmployee[]>([]);
  const { id } = useParams();

  useEffect(() => {
    getOfficesEmployees(Number(id)).then(
      (data) => data && setEmployeesData(data)
    );
  }, [id]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const deleteFunc = async (id: number) => {
    await deleteInventory(id);
    updateData();
  };

  const attachedUser = async (id: string, inventoryId: number) => {
    await attachInventory(id, [inventoryId]);
    updateData();
  };

  const deleteAttachedUser = async (inventoryId: number) => {
    await deleteEmployeeForInventory(inventoryId);
    updateData();
  };

  const addInventoryFunc = async (values: { name: string }) => {
    return addInventory(values.name, id || "");
  };

  const editInventoryFunc = async (
    inventoryId: string | number,
    values: { name: string }
  ) => {
    return editInventory(Number(inventoryId), values.name);
  };
  return (
    <div>
      <div className="flex items-center py-4 justify-between gap-2">
        <Input
          placeholder="Искать по Названию..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {localStorage.getItem("role") === "admin" ? (
          <AddBlock
            updateData={updateData}
            trigger={
              <Button>
                <Plus />
                Добавить оборудование
              </Button>
            }
            formData={addInventoryForm}
            formTitle={"Оборудование"}
            addFunc={addInventoryFunc}
          />
        ) : (
          <Button disabled>
            <Plus />
            Добавить оборудование
          </Button>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, id) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  {localStorage.getItem("role") === "admin" ? (
                    <TableCell className="flex items-center justify-between gap-2">
                      <AssignedEmployeeBlock
                        attachedUser={attachedUser}
                        inventory={data[id]}
                        employeesData={employeesData}
                        deleteAttachedUser={deleteAttachedUser}
                      />
                      <EditBlock
                        updateData={updateData}
                        trigger={
                          <PenLine color="#3B82F6" className="cursor-pointer" />
                        }
                        formData={addInventoryForm}
                        formTitle={"Оборудование"}
                        initialData={{ name: data[id].name }}
                        itemId={data[id].id}
                        editFunc={editInventoryFunc}
                      />
                      <Trash2
                        color="#DC2626"
                        className="cursor-pointer"
                        onClick={() => deleteFunc(data[id].id)}
                      />
                    </TableCell>
                  ) : (
                    <TableCell className="opacity-40 flex items-center justify-between gap-2">
                      <UserCog />
                      <PenLine color="#3B82F6" />
                      <Trash2 color="#DC2626" />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Результаты не найдены
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default InventoriesTable;
