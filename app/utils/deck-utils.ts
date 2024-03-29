import axios from "axios";

const getDeck = async () => {
    try {
      const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

export { getDeck };
