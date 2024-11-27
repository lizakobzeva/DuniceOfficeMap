import {
  ClientRect,
  DndContext,
  DragOverlay,
  Over,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { Coordinates, DragEndEvent, Translate } from "@dnd-kit/core/dist/types";
import { ZoomTransform, zoomIdentity } from "d3-zoom";
import { useEffect, useState } from "react";
import { Addable } from "./Addable";
import "./App.css";
import { Canvas } from "./Canvas";
import { useParams } from "react-router-dom";
import { getFurniture } from "@/services/BuildOperations/BuildOperations";
import { AddFurnitureBlock } from "@/components/shared/AddFurnitureBlock";
import stc from "string-to-color";

export type Card = {
  id: UniqueIdentifier;
  fio: string;
  coordinates: Coordinates;
  name: string;
  size_x: number;
  size_y: number;
};

const calculateCanvasPosition = (
  initialRect: ClientRect,
  over: Over,
  delta: Translate,
  transform: ZoomTransform
): Coordinates => ({
  x:
    (initialRect.left + delta.x - (over?.rect?.left ?? 0) - transform.x) /
    transform.k,
  y:
    (initialRect.top + delta.y - (over?.rect?.top ?? 0) - transform.y) /
    transform.k,
});

const MapPage = () => {
  const { id } = useParams();
  const [cards, setCards] = useState<Card[]>([]);
  const [tracedCards, setTracedCards] = useState<Card[]>([]);

  const [draggedTrayCardId, setDraggedTrayCardId] =
    useState<UniqueIdentifier>("");

  // store the current transform from d3
  const [transform, setTransform] = useState(zoomIdentity);

  const addDraggedTrayCardToCanvas = ({
    over,
    active,
    delta,
  }: DragEndEvent) => {
    setDraggedTrayCardId("");

    if (over?.id !== "canvas") return;
    if (!active.rect.current.initial) return;

    setCards([
      ...cards,
      {
        id: tracedCards.filter(({ id }) => id == draggedTrayCardId)[0]?.id,
        coordinates: calculateCanvasPosition(
          active.rect.current.initial,
          over,
          delta,
          transform
        ),
        name: tracedCards.filter(({ id }) => id == draggedTrayCardId)[0]?.name,
        fio: tracedCards.filter(({ id }) => id == draggedTrayCardId)[0]?.fio,
        size_x: tracedCards.filter(({ id }) => id == draggedTrayCardId)[0]
          .size_x,
        size_y: tracedCards.filter(({ id }) => id == draggedTrayCardId)[0]
          .size_y,
      },
    ]);
  };

  useEffect(() => {
    getFurniture(Number(id) || 0).then((data) => {
      if (data) {
        setTracedCards(
          data?.map((item) => ({
            fio: item.fio,
            id: item.id,
            coordinates: { x: 0, y: 0 },
            name: `${item.name}:${item.id}`,
            size_x: item.size_x,
            size_y: item.size_y,
          }))
        );
      }
    });
  }, [id]);

  return (
    <DndContext
      onDragStart={({ active }) => setDraggedTrayCardId(active.id)}
      onDragEnd={addDraggedTrayCardToCanvas}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col h-[75vh] justify-between gap-2">
          <AddFurnitureBlock updateData={() => {}} />
          <div className="w-80 flex flex-col gap-2">
            {tracedCards.map((trayCard) => {
              if (cards.find((card) => card.id === trayCard.id)) return null;

              return <Addable card={trayCard} key={trayCard.id} />;
            })}
          </div>
        </div>
        <div className="w-3/4">
          <Canvas
            cards={cards}
            setCards={setCards}
            transform={transform}
            setTransform={setTransform}
          />
        </div>
      </div>
      <DragOverlay>
        <div
          style={{
            transformOrigin: "top left",
            transform: `scale(${transform.k})`,
            width: `${
              tracedCards.filter(({ id }) => id == draggedTrayCardId)[0]
                ?.size_x * 20
            }px`,
            height: `${
              tracedCards.filter(({ id }) => id == draggedTrayCardId)[0]
                ?.size_y * 20
            }px`,
            backgroundColor: stc(
              tracedCards.filter(({ id }) => id == draggedTrayCardId)[0]?.name
            ),
          }}
          className="trayOverlayCard"
        >
          {draggedTrayCardId}
        </div>
      </DragOverlay>
    </DndContext>
  );
};

export default MapPage;
