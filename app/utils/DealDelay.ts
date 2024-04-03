import { Game } from "../types/state/Game";

const dealDelay = (dealer: boolean, winner: Game['winner'], index: number) => {
    let time;
          if (dealer && !winner) {
            if (index === 1) {
              time = 4;
            } else {
              time = index + 2;
            }
          } else {
            if (index === 1) {
              time = 3;
            } else if (index > 1) {
              time = 1;
            } else {
              time = index + 1;
            }
          }
            return time;
    };

export default dealDelay;