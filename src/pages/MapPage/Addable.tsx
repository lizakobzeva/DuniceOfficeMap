import { useDraggable } from "@dnd-kit/core";
import { Card } from "./MapPage";
import stc from "string-to-color";

export const Addable = ({ card }: { card: Card }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: card.id,
  });
  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      <div className="flex items-center">
        <div
          style={{
            width: `${card.size_x * 20}px`,
            height: `${card.size_y * 20}px`,
            backgroundColor: stc(card.name),
          }}
          className="card"
        ></div>
        - {card.name}
      </div>
    </div>
  );
};
