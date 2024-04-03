import axios from "axios";
import { DeckDrawResponse } from "../types/responses/DeckOfCards";

const getDeck = async () => {
    try {
      const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      const data = await response.data;
    } catch (error) {
      console.error(error);
    }
   
  }

  const drawCard = async (deck_id: string) => {
    try {
      const response = await axios.get<DeckDrawResponse>(
        `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
      );
    } catch (error) {
      console.error(error);
    }
    
  };



export { getDeck, drawCard};
