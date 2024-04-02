import { Game } from "@/app/types/state/Game";

const determineWinner = (game: Game) => {
  if(game.winner) {
    return game.winner;
  }
  //return null if no totals
  if(!game.userTotal || !game.dealerTotal) {
    return null;
  }

  //otherwise we will use the totals to determine the winner
  //if the user is over 21 the dealer wins
    //if the dealer is over 21 the user wins
    //if the user is closer to 21 than the dealer the user wins
    //if the dealer is closer to 21 than the user the dealer wins
    //if the user and dealer are the same the dealer wins
   //draws are acceptable
    const user = game.userTotal;
    const dealer = game.dealerTotal;

    //if user is over 21, dealer wins
    if(user > 21) {
        return "dealer";
    }

    //if dealer is over 21, user wins
    if(dealer > 21) {
        return "user";
    }

    //if user is closer to 21 than dealer, user wins
    if(user > dealer) {
        return "user";
    }

    //if dealer is closer to 21 than user, dealer wins
    if(dealer > user) {
        return "dealer";
    }

    //if user and dealer are the same, dealer wins
    if(user === dealer) {
    return "draw";
    }

    //if none of the above, return null
    return null;
};

export default determineWinner;
