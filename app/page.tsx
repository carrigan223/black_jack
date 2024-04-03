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
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  align-items: start;
  width: 100%;
`;

const ScoreCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 10px;
  align-items: end;
  width: 100%;

  /* @media (max-width: 768px) {
    width: 30%;
  } */
`;

const WinnerCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;

  height: 100%;

  /* @media (max-width: 768px) {
    width: 30%;
  } */
`;

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [deckState, setDeckState] = useState<Deck>({
    deck_id: null,
    remaining: null,
    success: null,
    discarded: [],
  });
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
          discarded: [],
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
        currentHand?.push(response.card);
        setGame({ ...game, user_hand: currentHand });
        //check for winner`
        const checkForBlackJackResponse = checkForBlackJack(game);
        const winner = DetermineWinner(checkForBlackJackResponse);
        setGame({ ...checkForBlackJackResponse, winner: winner });
        setDeckState({
          ...deckState,
          remaining: response.remaining,
          deck_id: response.deck_id,
          success: true,
          discarded: [...deckState.discarded],
        });
      }
    });
  };

  console.log(deckState);

  return (
    <>
      {loading ? (
        <TrefoilLoading />
      ) : (
        <>
          <StyledMain $currentTheme={theme.currentTheme}>
            <BoardInfoRow>
              <DeckInfoCard>
                <DeckInfoText>Deck: {deckState?.remaining}</DeckInfoText>
                <DeckInfoText>
                  Discard: {deckState?.discarded.length}
                </DeckInfoText>
                <DeckInfoText>
                  In Play: {game?.user_hand?.length + game?.dealer_hand?.length}
                </DeckInfoText>
              </DeckInfoCard>
              <WinnerCard>
                <DeckInfoText>
                  {game?.winner ? `Winner: ${game?.winner}` : "No Winner Yet"}
                </DeckInfoText>
              </WinnerCard>
              <ScoreCard>
                <DeckInfoText>
                  Dealer: {game?.dealerTotal ? game?.dealerTotal : 0}
                </DeckInfoText>
                <DeckInfoText>
                  User Total: {game?.userTotal ? game?.userTotal : 0}
                </DeckInfoText>
              </ScoreCard>
            </BoardInfoRow>
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
