import { Card } from "@/app/types/responses/DeckOfCards";
import React from "react";
import styled from "styled-components";
import PlayingCard from "../../game/PlayingCard";

type Props = {
  hand: Card[];
  dealer?: boolean;
  winner?: string | null;
};
const CardsInPlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
`;

const CardsInPlayContainer = ({ hand, dealer = false }: Props) => {
  return (
    <CardsInPlay>
      {hand.map((card: Card, index: number) => {
        let toTilt = index === 0 ? false : true;
        if (index === 0 && dealer) {
          return (
            <div style={{ padding: 6 }} key={index}>
              <PlayingCard
                tilt={toTilt}
                index={index}
                image="card_back"
                code="card_back"
              />
            </div>
          );
        }
        return (
          <div style={{ padding: 6 }} key={index}>
            <PlayingCard
              tilt={toTilt}
              index={index}
              image={card.image}
              code={card.code}
            />
          </div>
        );
      })}
    </CardsInPlay>
  );
};

export default CardsInPlayContainer;
