import React, { useEffect } from "react";
import BoardInfoRow from "../containers/game/BoredInfoRowContainer";
import DeckInfoText from "../text/DeckInfoText";
import dealerScoreToShow from "@/app/utils/game/DealerScoreToShow";
import DeckInfoCard from "../containers/game/DeckInfoCardConnotainer";
import WinnerCard from "../containers/game/WinnerCardContainer";
import { Deck } from "@/app/types/state/Deck";
import { Game } from "@/app/types/state/Game";
import ScoreCard from "../containers/game/ScoreCardContainer";
import Confetti from "../confetti/Confetti";

type Props = {
  deckState: Deck;
  game: Game;
};

const GameInfo = ({ game, deckState }: Props) => {
  useEffect(() => {
    if (game.winner === "user") {
      Confetti();
    }
  }, [game.winner]);
  return (
    <BoardInfoRow>
      <DeckInfoCard>
        <DeckInfoText>Deck: {deckState?.remaining}</DeckInfoText>
        <DeckInfoText>Discard: {deckState?.discarded.length}</DeckInfoText>
        <DeckInfoText>
          In Play: {game?.user_hand?.length + game?.dealer_hand?.length}
        </DeckInfoText>
      </DeckInfoCard>
      <WinnerCard>
        <DeckInfoText>Winner:</DeckInfoText>
        <DeckInfoText
          $color={
            game?.winner === "dealer"
              ? "red"
              : game?.winner === "user"
              ? "green"
              : "gray"
          }
        >
          {game?.winner
            ? ` ${game?.winner.charAt(0).toUpperCase() + game?.winner.slice(1)}`
            : "No Winner Yet"}
        </DeckInfoText>
      </WinnerCard>
      <ScoreCard>
        <DeckInfoText>
          House: {game?.dealerTotal ? dealerScoreToShow(game) : 0}
        </DeckInfoText>
        <DeckInfoText>
          User Total: {game?.userTotal ? game?.userTotal : 0}
        </DeckInfoText>
      </ScoreCard>
    </BoardInfoRow>
  );
};

export default GameInfo;
