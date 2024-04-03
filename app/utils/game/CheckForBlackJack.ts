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

  const user_cards = game.user_hand.map(card => card);
  const dealer_cards = game.dealer_hand.map(card => card);
  console.log('user', dealer_cards)
  //reorder the list of cards so the aces are last
  //this will allow us to check if the ace should be 1 or 11

  const sortedUser = user_cards.sort((a: Card, b: Card) => {
    if (a.value === "ACE") {
      return 1;
    } else {
      return -1;
    }
  }
  );
  const sortedDealer = dealer_cards.sort((a: Card, b: Card) => {
    if (a.value === "ACE") {
      return 1;
    } else {
      return -1;
    }
  }
  );

  let userTotal = 0;
  let dealerTotal = 0;
  let winner = null as Game['winner'] | null;

  sortedUser.forEach((card: Card) => {
    console.log('user total in', userTotal)
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
    console.log('user total out', userTotal)
  });

  sortedDealer.forEach((card: Card) => {
    console.log('dealer total in', dealerTotal)
    if (card.value === "ACE") {
      if (dealerTotal + 11 > 21) {
        dealerTotal += 1;
      } else {
        dealerTotal += 11;
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
    console.log('dealer total out', dealerTotal)
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
