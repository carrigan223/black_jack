"use client";
import StyledMain from "./components/containers/main/StyledMain";
import GeneralUseButton from "./components/buttons/GeneralUseButton";
import { useEffect, useState } from "react";
import useLightOrDark from "./hooks/useTheme";
import {
  Card,
  DeckDrawResponse,
} from "./types/responses/DeckOfCards";
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
        setGame({
          user_hand: userCards,
          dealer_hand: dealerCards,
          winner: null,
          userTotal: null,
          dealerTotal: null,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    setTimeout(() => {
      setLoading(false);
    }, 400);
  }, []);

  useEffect(() => {
    if (game) {
      const blackJackCheck = checkForBlackJack(game);
      setGame(blackJackCheck);
      const winner = DetermineWinner(game);
      setGame({ ...game, winner: winner });
    }
  }, [loading]);

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
    // userHit(deckId).then
    // if (game === null) return;
    // //if the user hits, draw a card and add it to the user array
    // //if the user busts, the dealer wins
    // //if the user hits 21, the user wins
    // //if the user hits under 21, the game continues
    // //if the ace is drawn and the user busts, change the value of the ace to 1
    // const response = await axios.get<DeckDrawResponse>(
    //   `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    // );
    // const card = response.data.cards[0];
    // const user_cards = game.user_hand;
    // // let userTotal = checkForBlackJack(game, setWinner, setGame)?.userTotal ?? 0;
    // if (card.value === "ACE") {
    //   user_cards.forEach((card: Card) => {
    //     if (card.value === "ACE") {
    //       if (userTotal + 11 > 21) {
    //         userTotal += 1;
    //       } else {
    //         userTotal += 11;
    //       }
    //     }
    //   });
    // } else if (
    //   card.value === "KING" ||
    //   card.value === "QUEEN" ||
    //   card.value === "JACK"
    // ) {
    //   card.value = "10";
    // }
    // user_cards.push(card);
    // setGame({ ...game, user_hand: user_cards });
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
            Loading
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
                <CardsInPlayContainer dealer hand={game?.dealer_hand} />
              )}
            </div>
            <div>
              <span>User</span>
              {game?.user_hand && (
                <CardsInPlayContainer hand={game?.user_hand} />
              )}
            </div>
            <GeneralUseButton
              $currentTheme={theme.currentTheme}
              onClick={() => theme.toggleTheme()}
            >
              Click Me
            </GeneralUseButton>
            <GeneralUseButton $currentTheme={theme.currentTheme} onClick={draw}>
              Hit
            </GeneralUseButton>
          </StyledMain>
        </>
      )}
    </>
  );
}
