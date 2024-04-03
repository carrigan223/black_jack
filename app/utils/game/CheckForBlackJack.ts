import { Card } from "@/app/types/responses/DeckOfCards";
import { Game } from "@/app/types/state/Game";

const  checkForBlackJack =  (
  game: Game,

) => {
  //take the user and dealer cards

  //check if the user has blackjack
  //if the user has blackjack return the user wins
  //if the dealer has blackjack return the dealer wins
  //if both have blackjack return a draw
  //if neither have blackjack return the game state ongoing
  //account for aces being 1 or 11

  const user = game.user_hand;
  const dealer = game.dealer_hand;

  let userTotal = 0;
  let dealerTotal = 0;
  let winner = null as Game['winner'] | null;

  user.forEach((card: Card) => {
    if (card.value === "ACE") {
      if (userTotal + 11 > 21) {
        userTotal += 1;
      } else {
        userTotal += 11;
      }
    } else if (
      card.value === "KING" ||
      card.value === "QUEEN" ||
      card.value === "JACK"
    ) {
      userTotal += 10;
    } else {
      userTotal += parseInt(card.value);
    }
  });

  dealer.forEach((card: Card) => {
    if (card.value === "ACE") {
      if (dealerTotal + 11 > 21) {
        userTotal += 1;
      } else {
        userTotal += 11;
      }
    } else if (
      card.value === "KING" ||
      card.value === "QUEEN" ||
      card.value === "JACK"
    ) {
      dealerTotal += 10;
    } else {
      dealerTotal += parseInt(card.value);
    }
  });

  //check for winner
  if (userTotal === 21 && dealerTotal === 21) {
    winner = "dealer";
  } else if (userTotal === 21) {
    winner = "user";
  } else if (dealerTotal === 21) {
    winner = "dealer";
  }

     return { ...game, userTotal: userTotal, dealerTotal: dealerTotal, winner: winner };
};



export default checkForBlackJack;
