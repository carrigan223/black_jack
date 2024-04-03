import { Game } from "@/app/types/state/Game";
import { draw } from "../deck-utils";
import checkForBlackJack from "./CheckForBlackJack";
import determineWinner from "./DetermineWinner";
import { Deck } from "@/app/types/state/Deck";

const userHit = (
  game: Game,
  setGame: (game: Game) => void,
  deckState: Deck,
  setDeckState: (deckState: Deck) => void
) => {
if (!game.deck_id) return;
  let deck_id = game.deck_id;
  let discarded = deckState.discarded;

  draw(deck_id,discarded).then((response) => {
    if (response && game) {
      //add the card to the user hand
      const currentHand = game?.user_hand;
      currentHand?.push(response.card);
      setGame({ ...game, user_hand: currentHand });
      //check for winner`
      const checkForBlackJackResponse = checkForBlackJack(game);
      const winner = determineWinner(checkForBlackJackResponse);
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

export default userHit;
