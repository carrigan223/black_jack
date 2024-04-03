"use client";
import StyledMain from "./components/containers/main/StyledMain";
import GeneralUseButton from "./components/buttons/GeneralUseButton";
import { useEffect, useState } from "react";
import useLightOrDark from "./hooks/useTheme";
import { Card, DeckDrawResponse } from "./types/responses/DeckOfCards";
import axios from "axios";
import { Game } from "./types/state/Game";
import { Deck } from "./types/state/Deck";
import styled from "styled-components";
import CardsInPlayContainer from "./components/containers/game/CardsInPlayContainer";
import checkForBlackJack from "./utils/game/CheckForBlackJack";
import DetermineWinner from "./utils/game/DetermineWinner";
import BoardInfoRow from "./components/containers/game/BoredInfoRowContainer";
import DeckInfoText from "./components/text/DeckInfoText";
import GameButtons from "./components/containers/game/GameButtonsContainer";
import stay from "./utils/game/StayHand";
import TrefoilLoading from "./components/loaders/TrefoilLoading";
import { draw } from "./utils/deck-utils";

//the card should be responsive
const DeckInfoCard = styled.div`
  width: 17%;
  display: flex;
  flex-direction: column;
  color: black;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  background: white;

  @media (max-width: 768px) {
    width: 30%;
  }
`;

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [deckState, setDeckState] = useState<Deck | null>(null);
  const [game, setGame] = useState<Game>({
    user_hand: [],
    dealer_hand: [],
    winner: null,
    userTotal: null,
    dealerTotal: null,
    deck_id: null,
  });
  //set the currentGame, and hand history
  const theme = useLightOrDark();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DeckDrawResponse>(
          "https://deckofcardsapi.com/api/deck/new/draw/?count=4"
        );

        setDeckState({
          deck_id: response.data.deck_id,
          remaining: response.data.remaining,
          success: response.data.success,
        });
        let userCards = response.data.cards.slice(0, 2) as Card[];
        let dealerCards = response.data.cards.slice(2, 4) as Card[];
        let dealtHands: Game = {
          user_hand: userCards,
          dealer_hand: dealerCards,
          winner: null,
          userTotal: null,
          dealerTotal: null,
          deck_id: response.data.deck_id,
        };
        let postCheckGame = checkForBlackJack(dealtHands);
        setGame(postCheckGame);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const userHit = () => {
    if (!game.deck_id) return;
    draw(game.deck_id).then((response) => {
      if (response && game) {
        //add the card to the user hand
        const currentHand = game?.user_hand;
        currentHand?.push(response);
        setGame({ ...game, user_hand: currentHand });
        //check for winner`
        const checkForBlackJackResponse = checkForBlackJack(game);
        const winner = DetermineWinner(checkForBlackJackResponse);
        setGame({ ...checkForBlackJackResponse, winner: winner });
      }
    });
  };

  return (
    <>
      {loading ? (
        <TrefoilLoading />
      ) : (
        <>
          <StyledMain $currentTheme={theme.currentTheme}>
            <BoardInfoRow>Test</BoardInfoRow>
            <>
              {game?.dealer_hand && (
                <CardsInPlayContainer
                  dealer
                  hand={game?.dealer_hand}
                  winner={game.winner}
                />
              )}
            </>
            <GameButtons>
              <GeneralUseButton
                $currentTheme={theme.currentTheme}
                onClick={() => stay(game, setGame)}
              >
                Stay
              </GeneralUseButton>
              <GeneralUseButton
                $currentTheme={theme.currentTheme}
                onClick={userHit}
              >
                Hit
              </GeneralUseButton>
              <GeneralUseButton
                $currentTheme={theme.currentTheme}
                onClick={() => window.location.reload()}
              >
                Deal
              </GeneralUseButton>
            </GameButtons>

            <>
              {game?.user_hand && (
                <CardsInPlayContainer hand={game?.user_hand} />
              )}
            </>
          </StyledMain>
        </>
      )}
    </>
  );
}
