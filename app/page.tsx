"use client";
import StyledMain from "./components/containers/StyledMain";
import GeneralUseButton from "./components/buttons/GeneralUseButton";
import { useEffect, useState } from "react";
import useLightOrDark from "./hooks/useTheme";
import {
  DeckDrawResponse,
  DeckShuffleResponse,
} from "./types/responses/DeckOfCards";
import axios from "axios";
import Image from "next/image";
import style from "styled-components";
import PlayingCard from "./components/game/PlayingCard";
import StyledBackgroundContainer from "./components/containers/StyledMain";


export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [deckInfo, setDeckInfo] = useState<null | DeckShuffleResponse>(null);
  const [deckId, setDeckId] = useState<string>("");
  const theme = useLightOrDark();
  const [cards, setCards] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DeckShuffleResponse>(
          "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        );
        setDeckInfo(response.data);
        setDeckId(response.data.deck_id);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const drawCard = async () => {
    try {
      const response = await axios.get<DeckDrawResponse>(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      console.log(response.data);
      cards
        ? setCards([...cards, response.data.cards[0]])
        : setCards([response.data.cards[0]]);

      console.log(cards);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(deckId, deckInfo, loading);
  return (
    <>
    
      <StyledMain $currentTheme={theme.currentTheme}>
     
        <GeneralUseButton
          $currentTheme={theme.currentTheme}
          onClick={() => theme.toggleTheme()}
        >
          Click Me
        </GeneralUseButton>
        <GeneralUseButton $currentTheme={theme.currentTheme} onClick={drawCard}>
          Draw Card
        </GeneralUseButton>

        <div>
          {cards &&
            cards.map((card, index) => {
              return (
                <div key={index}>
                  <PlayingCard image={card.image} code={card.code} />
                </div>
              );
            })}
        </div>
        <div>Hello</div>
      </StyledMain>
    </>
  );
}
