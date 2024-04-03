import { Card, DeckDrawResponse } from "@/app/types/responses/DeckOfCards";
import checkForBlackJack from "./CheckForBlackJack";
import axios from "axios";
import { Game } from "@/app/types/state/Game";
import { Deck } from "@/app/types/state/Deck";

const startGame = async (
  setGame: (game: Game) => void,
  setDeckState: (deck: Deck) => void
) => {
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

export default startGame;
