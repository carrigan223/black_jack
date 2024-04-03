import { Game } from "@/app/types/state/Game";

const dealerScoreToShow = (game: Game) => {
    if (game.winner) {
      return game.dealerTotal;
    } else {
      if(game.dealer_hand[1].value === "ACE") {
        return 11;
      } else if (game.dealer_hand[1].value === "KING" || game.dealer_hand[1].value === "QUEEN" || game.dealer_hand[1].value === "JACK") {
        return 10;
      } else {
        return game.dealer_hand[1].value;
      }
    }
  };

export default dealerScoreToShow;