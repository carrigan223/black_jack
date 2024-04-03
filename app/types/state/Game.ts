import { Card } from "../responses/DeckOfCards";

export interface Game {
  winner: "user" | "dealer" | "draw" | null;
  userTotal: number | null;
  dealerTotal: number | null;
  user_hand: Card[];
  dealer_hand: Card[];
  deck_id: string | null;
}
