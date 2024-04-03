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

    const draw = async (deck_id: string,discarded: string[]) => {
      if(discarded.length >= 52){
        //convert the discard pile to a string comma separated
        let discardString = discarded.join(",");
        let endpoint = `https://deckofcardsapi.com/api/deck/${deck_id}/return/?cards=${discardString}`
       
        //call the endpoint to shuffle the deck
        try {
            await axios.get(endpoint);
        } catch (error) {
            console.error(error);
        }
    }
      if (deck_id === null) return;
      const response = await axios.get<DeckDrawResponse>(
        `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
      );
  
      const card = response.data.cards[0];
      const remaining = response.data.remaining;
  
      return {card, remaining, deck_id}
    };
  



export { getDeck, draw};
