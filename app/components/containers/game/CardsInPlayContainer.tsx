import { Card } from "@/app/types/responses/DeckOfCards";
import React, { use, useEffect, useState } from "react";
import styled from "styled-components";
import PlayingCard from "../../game/PlayingCard";
import DeckInfoText from "../../text/DeckInfoText";
import style from "styled-components";
import { Game } from "@/app/types/state/Game";
import { motion } from "framer-motion";
import dealDelay from "@/app/utils/DealDelay";

type Props = {
  hand: Card[];
  dealer?: boolean;
  winner?: Game["winner"] | null;
};
const CardsInPlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const TopDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const CardsInPlayContainer = ({
  hand,
  dealer = false,
  winner = null,
}: Props) => {
  return (
    <TopDiv>
      {dealer && <DeckInfoText $color="white">Dealer</DeckInfoText>}

      <CardsInPlay>
        {hand.map((card: Card, index: number) => {
          let toTilt = index === 0 ? false : true;
          if (index === 0 && dealer && !winner) {
            return (
              <motion.div
                initial={{ rotateY: 90 }}
                animate={{ rotateY: 0 }}
                transition={{
                  duration: 1,
                  delay: dealDelay(dealer, winner, index),
                }}
                style={{ padding: 6 }}
                key={index}
              >
                <PlayingCard
                  tilt={toTilt}
                  index={index}
                  image="card_back"
                  code="card_back"
                />
              </motion.div>
            );
          }
          return (
            <motion.div
              initial={{ rotateY: 90 }}
              animate={{ rotateY: 0 }}
              transition={{
                duration: 1,
                delay: dealDelay(dealer, winner, index),
              }}
              style={{ padding: 6 }}
              key={index}
            >
              {" "}
              <PlayingCard
                tilt={toTilt}
                index={index}
                image={card.image}
                code={card.code}
              />
            </motion.div>
          );
        })}
      </CardsInPlay>
      {!dealer && <DeckInfoText $color="white">Your Cards</DeckInfoText>}
    </TopDiv>
  );
};

export default CardsInPlayContainer;
