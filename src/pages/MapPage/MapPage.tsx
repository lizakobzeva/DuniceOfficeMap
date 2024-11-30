import {
  ClientRect,
  DndContext,
  DragOverlay,
  Over,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { Coordinates, DragEndEvent, Translate } from "@dnd-kit/core/dist/types";
import { ZoomTransform, zoomIdentity } from "d3-zoom";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Canvas } from "./Canvas";
import { useParams } from "react-router-dom";
import {
  addFurniture,
  getFurniture,
} from "@/services/BuildOperations/BuildOperations";
import stc from "string-to-color";
import { Plus, User } from "lucide-react";
import AddBlock from "@/components/shared/AddBlock";
import { Button } from "@/components/ui/button";
import { addFurnitureForm, addRoomForm } from "@/lib/constants/forms";
import { Furniture } from "@/services/OfficesOperations/OfficesOperations.type";
import FreeFurnitureList from "./FreeFurnitureList";

export type Card = {
  id: UniqueIdentifier;
  fio: string;
  coordinates: Coordinates;
  name: string;
  size_x: number;
  size_y: number;
  is_room?: boolean;
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
  const [cards, setCards] = useState<Card[]>([
    {
      fio: "",
      id: 234,
      coordinates: { x: 0, y: 0 },
      name: `кабинет`,
      size_x: 30,
      size_y: 40,
      is_room: true,
    },
    {
      fio: "",
      id: 4,
      coordinates: { x: 164, y: 362 },
      name: ` стол`,
      size_x: 4,
      size_y: 2,
    },
    {
      fio: "",
      id: 1,
      coordinates: { x: 360, y: 362 },
      name: ` стол`,
      size_x: 4,
      size_y: 2,
    },
  ]); //карточки на канвасе
  const [tracedCards, setTracedCards] = useState<Card[]>([]); //карточки для добавления

  const [draggedTrayCardId, setDraggedTrayCardId] =
    useState<UniqueIdentifier>("");

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

  const rotateCard = (card: Card) => {
    setCards([
      ...cards.filter(({ id }) => id !== card.id),
      {
        name: card.name,
        fio: card.fio,
        id: card.id,
        coordinates: {
          x: card.coordinates.x,
          y: card.coordinates.y,
        },
        size_x: card.size_y,
        size_y: card.size_x,
        is_room: card.is_room,
      },
    ]);
  };

  const deleteDraggedTrayCardFromCanvas = (card: Card) => {
    setCards([...cards.filter(({ id }) => id !== card.id)]);
  };

  const updateFurnitureData = useCallback(async () => {
    const data = await getFurniture(Number(id) || 0);
    if (data) {
      setTracedCards(
        data?.map((item) => ({
          fio: item.fio,
          id: item.id,
          coordinates: { x: 0, y: 0 },
          name: ` ${item.name}`,
          size_x: item.size_x,
          size_y: item.size_y,
        }))
      );
    }
  }, [id, tracedCards]);

  useEffect(() => {
    updateFurnitureData();
  }, [updateFurnitureData, id]);

  const addFurnitureFunc = (value: Furniture) => {
    addFurniture({
      name: value.name,
      size_x: Number(value.size_x),
      size_y: Number(value.size_y),
      office_id: Number(id),
      fio: "",
    });
  };

  const addRoomFunc = (value: Furniture) => {
    setCards([
      ...cards,
      {
        fio: value.fio,
        id: Math.random(),
        coordinates: { x: 0, y: 0 },
        name: ` ${value.name}`,
        size_x: value.size_x,
        size_y: value.size_y,
        is_room: true,
      },
    ]);
  };

  const saveMap = () => {
    console.log(cards);
  };

  return (
    <DndContext
      onDragStart={({ active }) => setDraggedTrayCardId(active.id)}
      onDragEnd={addDraggedTrayCardToCanvas}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col h-[83vh] justify-between gap-2">
          <div className="flex items-center gap-2">
            <AddBlock
              trigger={
                <Button>
                  <Plus />
                  Добавить Мебель
                </Button>
              }
              formData={addFurnitureForm}
              formTitle="Мебель"
              addFunc={addFurnitureFunc}
              updateData={updateFurnitureData}
            />
            <AddBlock
              trigger={
                <Button>
                  <Plus />
                  Добавить Комнату
                </Button>
              }
              formData={addRoomForm}
              formTitle="Комната"
              addFunc={addRoomFunc}
              updateData={updateFurnitureData}
            />
          </div>

          <FreeFurnitureList tracedCards={tracedCards} cards={cards} />

          <Button onClick={saveMap}>Сохранить</Button>
        </div>
        <div className="w-3/4">
          <Canvas
            rotateCard={rotateCard}
            cards={cards}
            setCards={setCards}
            transform={transform}
            setTransform={setTransform}
            deleteDraggedTrayCardFromCanvas={deleteDraggedTrayCardFromCanvas}
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
          <div
            style={{
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
            className="card flex items-center justify-center"
          >
            {tracedCards.filter(({ id }) => id == draggedTrayCardId)[0]
              ?.fio && <User />}
          </div>
        </div>
      </DragOverlay>
    </DndContext>
  );
};

export default MapPage;
