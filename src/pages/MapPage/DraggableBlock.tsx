import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Card } from "./MapPage";
import { ZoomTransform } from "d3-zoom";
import { useDraggable } from "@dnd-kit/core";
import stc from "string-to-color";
import { User } from "lucide-react";

const DraggableBlock = ({
  card,
  canvasTransform,
}: {
  card: Card;
  canvasTransform: ZoomTransform;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
  });
  return (
    <div>
      <HoverCard>
        <div className="relative">
          <HoverCardTrigger>
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
              </div>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            <div>{card.name}</div>
          </HoverCardContent>
        </div>
      </HoverCard>
    </div>
  );
};

export default DraggableBlock;
