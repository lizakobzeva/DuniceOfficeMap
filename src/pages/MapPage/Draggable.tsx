import { useDraggable } from "@dnd-kit/core";
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
import stc from "string-to-color";
import { User, X } from "lucide-react";

export const Draggable = ({
  card,
  canvasTransform,
  deleteDraggedTrayCardFromCanvas,
}: {
  card: Card;
  canvasTransform: ZoomTransform;
  deleteDraggedTrayCardFromCanvas: (card: Card) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
  });

  return (
    <Dialog>
      <AssignedEmployeeFurniture
        furniture={{ ...card, id: Number(card.id), office_id: 1 }}
      />
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            style={{
              position: "absolute",
              top: `${card.coordinates.y * canvasTransform.k}px`,
              left: `${card.coordinates.x * canvasTransform.k}px`,
              transformOrigin: "top left",
              ...(transform
                ? {
                    // temporary change to this position when dragging
                    transform: `translate3d(${transform.x}px, ${transform.y}px, 0px) scale(${canvasTransform.k})`,
                  }
                : {
                    // zoom to canvas zoom
                    transform: `scale(${canvasTransform.k})`,
                  }),
            }}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            onPointerDown={(e) => {
              listeners?.onPointerDown?.(e);
              e.preventDefault();
            }}
          >
            <div
              style={{
                width: `${card.size_x * 20}px`,
                height: `${card.size_y * 20}px`,
                backgroundColor: stc(card.name),
              }}
              className="card flex items-center justify-center"
            >
              {card.fio && <User />}
              {/* {card.name} */}
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="z-[100]">
          <p className="justify-center flex items-center font-bold">
            {`${card.name} : ${card.id} `}
          </p>

          <ContextMenuItem>
            <DialogTrigger asChild>
              <p>Назначить сотруднику</p>
            </DialogTrigger>
          </ContextMenuItem>
          <ContextMenuItem>
            <p>Инвентарь</p>
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => deleteDraggedTrayCardFromCanvas(card)}
          >
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
