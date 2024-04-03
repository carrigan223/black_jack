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
import userHit from "./utils/game/UserHit";
import BoardInfoRow from "./components/containers/game/BoredInfoRowContainer";
import DeckInfoText from "./components/text/DeckInfoText";
import Trefoil from "./components/loaders/trefoil";
import GameButtons from './components/containers/game/GameButtonsContainer';

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
  const [deckId, setDeckId] = useState<string>("");
  const [deckState, setDeckState] = useState<Deck | null>(null);
  const [game, setGame] = useState<Game | null>(null);
  //set the currentGame, and hand history
  const theme = useLightOrDark();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DeckDrawResponse>(
          "https://deckofcardsapi.com/api/deck/new/draw/?count=4"
        );
        setDeckId(response.data.deck_id);
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
    }, 1200);
  }, []);

  console.log(game);

  const drawCard = async () => {
    try {
      const response = await axios.get<DeckDrawResponse>(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
    } catch (error) {
      console.error(error);
    }
  };

  const draw = () => {
    userHit(deckId).then((response) => {
      if (response && game) {
        //add the card to the user hand
        const currentHand = game?.user_hand;
        currentHand?.push(response);
        setGame({ ...game, user_hand: currentHand });
        //check for winner`

        const winner = DetermineWinner(game);
        setGame({ ...game, winner: winner });
      }
    });
  };

  const stay = () => {
    if (game) {
      const winner = DetermineWinner(game, true);
      setGame({ ...game, winner: winner });
    }
  };

  return (
    <>
      {loading ? (
        <>
          <div
            style={{
              background:
                "linear-gradient( 240deg,#faf8f852 0%,rgba(0, 0, 0, 0.106) 40%,#080808be 100%)",
              zIndex: 1,
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              display: "flex",
              fontSize: 24,
              color: "white",
            }}
          >
            <Trefoil />
          </div>
        </>
      ) : (
        <>
          <StyledMain $currentTheme={theme.currentTheme}>
            <BoardInfoRow>
              <DeckInfoCard>
                <DeckInfoText>Cards Remaining</DeckInfoText>
                <DeckInfoText>{deckState?.remaining ?? "na"}</DeckInfoText>
              </DeckInfoCard>
              {game?.winner && (
                <DeckInfoCard>
                  <DeckInfoText>Winner</DeckInfoText>
                  <DeckInfoText>{game?.winner ?? "na"}</DeckInfoText>
                </DeckInfoCard>
              )}
            </BoardInfoRow>
            <div>
              <span>Dealer</span>
              {game?.dealer_hand && (
                <CardsInPlayContainer hand={game?.dealer_hand} />
              )}
            </div>
            <GameButtons>
              <GeneralUseButton
                $currentTheme={theme.currentTheme}
                onClick={stay}
              >
                Click Me
              </GeneralUseButton>
              <GeneralUseButton
                $currentTheme={theme.currentTheme}
                onClick={draw}
              >
                Hit
              </GeneralUseButton>
            </GameButtons>

            <div>
              <span>User</span>
              {game?.user_hand && (
                <CardsInPlayContainer hand={game?.user_hand} />
              )}
            </div>
          </StyledMain>
        </>
      )}
    </>
  );
}
