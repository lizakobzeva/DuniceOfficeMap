import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { CELL_SIZE } from "@/lib/constants/size";
import { CSSProperties } from "react";

export const itemColor = [
  "bg-red-400",
  "bg-blue-700",
  "bg-green-500",
  "bg-slate-500",
  "bg-violet-800",
  "bg-rose-800",
];

export const SidebarItem = ({
  id,
  size_x,
  size_y,
  style,
}: {
  id: number;
  size_x: number;
  size_y: number;
  style?: CSSProperties;
}) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
  });
  if (!id) return;
  return (
    <div
      key={id}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      id={id + ""}
      style={{
        width: CELL_SIZE * size_x,
        height: CELL_SIZE * size_y,
        ...style,
      }}
      className={cn(
        itemColor[id % itemColor.length],
        "box-border rounded cursor-grab"
      )}
    ></div>
  );
};
