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
import { useState } from "react";

import { MonitorCog, PenLine, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import InventoriesForEmployeeBlock from "./InventoriesForEmployeeBlock";
import {
  addOfficesEmployee,
  deleteEmployee,
  editOfficesEmployee,
} from "@/services/AuthByEmail/AuthByEmail";
import {
  OfficesEmployee,
  OfficesUser,
} from "@/services/OfficesOperations/OfficesOperations.type";
import { Button } from "../ui/button";
import AddBlock from "./AddBlock";
import { useParams } from "react-router-dom";
import { addEmployeeForm } from "@/lib/constants/forms";
import ImportEmployeesButton from "./ImportEmployeesButton";
import EditBlock from "./EditBlock";

interface Props<TValue> {
  columns: ColumnDef<OfficesEmployee, TValue>[];
  data: OfficesEmployee[];
  updateData: () => void;
}

function EmployeesTable<TValue>({ columns, data, updateData }: Props<TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { id } = useParams();

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

  const deleteFunc = async (id: string) => {
    await deleteEmployee(id);
    updateData();
  };

  const addEmployeeFunc = async (values: Omit<OfficesUser, "office_id">) => {
    return addOfficesEmployee({
      ...values,
      office_id: id || "",
    });
  };
  const editEmployeeFunc = async (
    employeeId: string | number,
    values: Omit<OfficesUser, "office_id">
  ) => {
    return editOfficesEmployee(String(employeeId), {
      ...values,
      office_id: id || "",
    });
  };

  return (
    <div>
      <div className="flex items-center py-4 justify-between gap-2 flex-wrap">
        <Input
          placeholder="Искать по ФИО..."
          value={(table.getColumn("fio")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("fio")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <div className="flex gap-4">
          {localStorage.getItem("role") === "admin" ? (
            <>
              <AddBlock
                updateData={updateData}
                trigger={
                  <Button>
                    <Plus />
                    Добавить сотрудника
                  </Button>
                }
                formData={addEmployeeForm}
                formTitle={"Сотрудник"}
                addFunc={addEmployeeFunc}
              />
              <ImportEmployeesButton />
            </>
          ) : (
            <Button disabled>
              <Plus />
              Добавить сотрудника
            </Button>
          )}
        </div>
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
                      <InventoriesForEmployeeBlock id={data[id]?.id} />

                      <EditBlock
                        trigger={
                          <PenLine color="#3B82F6" className="cursor-pointer" />
                        }
                        formData={addEmployeeForm}
                        formTitle="Сотрудник"
                        initialData={{
                          fio: data[id].fio,
                          position: data[id].position,
                          email: data[id].email,
                        }}
                        itemId={data[id].id}
                        editFunc={editEmployeeFunc}
                        updateData={updateData}
                      />
                      <Trash2
                        color="#DC2626"
                        className="cursor-pointer"
                        onClick={() => deleteFunc(data[id]?.id)}
                      />
                    </TableCell>
                  ) : (
                    <TableCell className="opacity-40 flex items-center justify-between gap-2">
                      <MonitorCog />
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

export default EmployeesTable;
