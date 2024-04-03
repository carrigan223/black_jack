import React from "react";
import BoardInfoRow from "../containers/game/BoredInfoRowContainer";
import DeckInfoText from "../text/DeckInfoText";
import dealerScoreToShow from "@/app/utils/game/DealerScoreToShow";
import DeckInfoCard from '../containers/game/DeckInfoCardConnotainer';
import WinnerCard from "../containers/game/WinnerCardContainer";
import { Deck } from "@/app/types/state/Deck";
import { Game } from "@/app/types/state/Game";
import ScoreCard from "../containers/game/ScoreCardContainer";

type Props = {
  deckState: Deck;
  game: Game;
};

const GameInfo = ({ game, deckState }: Props) => {
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
        <DeckInfoText>
          {game?.winner ? `Winner: ${game?.winner}` : "No Winner Yet"}
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
