type DeckShuffleResponse = {
    deck_id: string;
    shuffled: boolean;
    remaining: number;
    success: boolean;
    };

type DeckDrawResponse = {
    cards: Card[];
    deck_id: string;
    remaining: number;
    success: boolean;
    };

type Card = {
    code: string;
    image: string;
    images: {
        png: string;
        svg: string;
    };
    suit: string;
    value: string;
    };

    //? Currently dont need this but know it exists
    // type Pile = {
    //     success: boolean;
    //     deck_id: string;
    //     remaining: number;
    //     piles: {
    //         [key: string]: {
    //             remaining: number;
               
    //         };
    //     };
    // };


    export type { DeckShuffleResponse, DeckDrawResponse, Card };
