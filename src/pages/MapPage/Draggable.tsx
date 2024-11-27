import { ZoomTransform } from "d3-zoom";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AssignedEmployeeFurniture } from "@/components/shared/AssignedEmployeeFurniture";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Card } from "./MapPage";

import { X } from "lucide-react";
import DraggableBlock from "./DraggableBlock";

export const Draggable = ({
  card,
  canvasTransform,
}: {
  card: Card;
  canvasTransform: ZoomTransform;
}) => {
  return (
    <Dialog>
      <AssignedEmployeeFurniture
        furniture={{ ...card, id: Number(card.id), office_id: 1 }}
      />
      <ContextMenu>
        <ContextMenuTrigger>
          <DraggableBlock card={card} canvasTransform={canvasTransform} />
        </ContextMenuTrigger>
        <ContextMenuContent className="z-[100]">
          <ContextMenuItem>
            <DialogTrigger asChild>
              <p>Назначить сотруднику</p>
            </DialogTrigger>
          </ContextMenuItem>
          <ContextMenuItem>
            <p>Инвентарь</p>
          </ContextMenuItem>
          <ContextMenuItem>
            <p className="flex text-red-600 justify-between items-center">
              <X />
              Убрать
            </p>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </Dialog>
  );
};
