import { DeckDrawResponse } from "@/app/types/responses/DeckOfCards";
import axios from "axios";

const userHit = async (deck_id: string) => {
    if (deck_id === null) return;
    //if the user hits, draw a card and add it to the user array
    //if the user busts, the dealer wins
    //if the user hits 21, the user wins
    //if the user hits under 21, the game continues
    //if the ace is drawn and the user busts, change the value of the ace to 1
    const response = await axios.get<DeckDrawResponse>(
      `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
    );

    const card = response.data.cards[0];
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

    return card
  };

  export default userHit;