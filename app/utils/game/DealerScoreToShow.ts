import { Game } from "@/app/types/state/Game";

const dealerScoreToShow = (game: Game) => {
    if (game.winner) {
      return game.dealerTotal;
    } else {
      return game.dealer_hand[1].value;
    }
  };

export default dealerScoreToShow;