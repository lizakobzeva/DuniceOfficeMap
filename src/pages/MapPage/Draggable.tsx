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
import { Move, RotateCcwSquare, User, X } from "lucide-react";

export const Draggable = ({
  card,
  canvasTransform,
  deleteDraggedTrayCardFromCanvas,
  rotateCard,
}: {
  card: Card;
  canvasTransform: ZoomTransform;
  deleteDraggedTrayCardFromCanvas: (card: Card) => void;
  rotateCard: (card: Card) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
  });

  const floorConst = card.is_room ? 40 : 20;
  const zIndex = card.is_room ? 10 : 20;
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
              zIndex: zIndex,
              top: `${
                Math.floor(card.coordinates.y / floorConst) *
                floorConst *
                canvasTransform.k
              }px`,
              left: `${
                Math.floor(card.coordinates.x / floorConst) *
                floorConst *
                canvasTransform.k
              }px`,
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
            {...[!card.is_room ? listeners : []]}
            {...[!card.is_room ? attributes : []]}
            onPointerDown={(e) => {
              if (!card.is_room) {
                listeners?.onPointerDown?.(e);
                e.preventDefault();
              }
            }}
          >
            <div
              style={{
                width: `${card.size_x * 20}px`,
                height: `${card.size_y * 20}px`,
                backgroundColor: stc(card.name),
                opacity: card.is_room ? "0.3" : "1",
                border: card.is_room ? "solid 2px black" : "",
              }}
              className="card flex items-center justify-center"
            >
              {card.fio && <User />}
              {card.is_room && (
                <button
                  className="cursor-grab"
                  {...listeners}
                  {...attributes}
                  onPointerDown={(e) => {
                    listeners?.onPointerDown?.(e);
                    e.preventDefault();
                  }}
                >
                  <Move />
                </button>
              )}
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="z-[100]">
          <p className="justify-center flex items-center font-bold">
            {card.is_room ? card.name : `${card.name} : ${card.id} `}
          </p>

          {!card.is_room && (
            <>
              <ContextMenuItem className="cursor-pointer">
                <DialogTrigger asChild>
                  <p>Назначить сотруднику</p>
                </DialogTrigger>
              </ContextMenuItem>
              <ContextMenuItem className="cursor-pointer">
                <p>Инвентарь</p>
              </ContextMenuItem>
            </>
          )}
          <ContextMenuItem
            className="cursor-pointer"
            onClick={() => rotateCard(card)}
          >
            <p className="flex text-blue-300 justify-between items-center gap-2">
              <RotateCcwSquare />
              Повернуть
            </p>
          </ContextMenuItem>

          <ContextMenuItem
            className="cursor-pointer"
            onClick={() => deleteDraggedTrayCardFromCanvas(card)}
          >
            <p className="flex text-red-600 justify-between items-center gap-2">
              <X />
              Убрать
            </p>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </Dialog>
  );
};
