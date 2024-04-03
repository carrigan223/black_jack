export interface Deck {
    deck_id: string | null;
    remaining: number | null;
    success: boolean | null;
    discarded: string[];
    }