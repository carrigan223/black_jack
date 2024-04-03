import { Game } from "@/app/types/state/Game";
import determineWinner from "./DetermineWinner";

const stay = (game: Game, setGame: (game: Game) => void) => {
        if (game) {
            let winner = determineWinner(game, true);
            setGame({ ...game, winner: winner });
        }
    };

export default stay;
