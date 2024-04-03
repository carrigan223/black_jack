"use client";
import StyledMain from "./components/containers/main/StyledMain";
import GeneralUseButton from "./components/buttons/GeneralUseButton";
import { useEffect, useState } from "react";
import useLightOrDark from "./hooks/useTheme";
import { Game } from "./types/state/Game";
import { Deck } from "./types/state/Deck";
import CardsInPlayContainer from "./components/containers/game/CardsInPlayContainer";
import GameButtons from "./components/containers/game/GameButtonsContainer";
import stay from "./utils/game/StayHand";
import TrefoilLoading from "./components/loaders/TrefoilLoading";
import GameInfo from "./components/game/GameInfo";
import DealButtonContainer from "./components/containers/game/DealButtonContainer";
import userHit from "./utils/game/UserHit";
import startGame from "./utils/game/StartGame";
import { Card } from "./types/responses/DeckOfCards";

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
  const [history, setHistory] = useState<Game[]>([]);
  //set the currentGame, and hand history
  const theme = useLightOrDark();

  useEffect(() => {
    startGame(setGame, setDeckState);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const reDeal = () => {
    //set the current game to the history
    setHistory([...history, game]);
    //add the cards from the user and dealer hands to the discard pile
    let discardPile = [...deckState.discarded];
    game.user_hand.forEach((card: Card) => discardPile.push(card.code));
    game.dealer_hand.forEach((card: Card) => discardPile.push(card.code));

    //set the game state to a new game
    startGame(setGame, setDeckState, deckState.deck_id, discardPile);
  };

  return (
    <>
      {loading ? (
        <TrefoilLoading />
      ) : (
        <>
          <StyledMain $currentTheme={theme.currentTheme}>
            <GameInfo game={game} deckState={deckState} />
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
                disabled={game.winner ? true : false}
              >
                Stay
              </GeneralUseButton>
              <GeneralUseButton
                $currentTheme={theme.currentTheme}
                onClick={() => userHit(game, setGame, deckState, setDeckState)}
                disabled={game.winner ? true : false}
              >
                Hit
              </GeneralUseButton>
            </GameButtons>
            <>
              {game?.user_hand && (
                <CardsInPlayContainer hand={game?.user_hand} />
              )}
            </>
            {game.winner && (
              <DealButtonContainer>
                <GeneralUseButton
                  $currentTheme={theme.currentTheme}
                  onClick={reDeal}
                >
                  Deal
                </GeneralUseButton>
              </DealButtonContainer>
            )}
          </StyledMain>
        </>
      )}
    </>
  );
}
