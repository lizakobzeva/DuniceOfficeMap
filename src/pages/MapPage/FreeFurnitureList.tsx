import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "./MapPage";
import { Addable } from "./Addable";

interface Props {
  tracedCards: Card[];
  cards: Card[];
}

const FreeFurnitureList = ({ tracedCards, cards }: Props) => {
  return (
    <ScrollArea className="w-80 flex flex-col gap-2">
      <div className="w-80 flex flex-col gap-2">
        {tracedCards.map((trayCard) => {
          if (cards.find((card) => card.id === trayCard.id)) return null;

          return <Addable card={trayCard} key={trayCard.id} />;
        })}
      </div>
    </ScrollArea>
  );
};

export default FreeFurnitureList;
