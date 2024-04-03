import confetti from "canvas-confetti";

interface ConfettiOptions {
  spread?: number;
  startVelocity?: number;
  decay?: number;
  scalar?: number;
  drift?: number;
  origin?: { x: number; y: number };
}

const Confetti = () => {
  const count = 200;


  function fire(particleRatio: number, opts: ConfettiOptions) {
    confetti({
      ...opts,
      angle: 270,
      particleCount: Math.floor(count * particleRatio),
      zIndex: 10000,
      ticks: 400,

      //hex code for red black and white
      colors: ["#000000", "#ff0000", "#ffffff"],
      shapes: ["star"],

    });
  }

  setTimeout(() => {
    fire(0.25, {
      spread: 260,
      scalar: 1,
      origin: { y: 0, x: 0.7},

      decay: 0.9,
      drift: 1,
    });
  }, 750);

  setTimeout(() => {
    fire(0.2, {
      spread: 60,
      scalar: .5,
      origin: { y: 0, x: 0.5},
        startVelocity: 55,
      decay: 0.9,
      drift: 4,
    });
  }, 675);

  setTimeout(() => {
    fire(0.35, {
      spread: 100,
      scalar: 1.5,
      origin: { y: 0, x: 0.1},

      decay: 0.9,
      drift: -1,
    });
  }, 550);

  setTimeout(() => {
    fire(0.1, {
      spread: 120,
      startVelocity: 55,
      scalar: 1,
      origin: { y: 0, x: 0.3},

      decay: 0.9,
    });
  }, 630);

  setTimeout(() => {
    fire(0.1, {
      spread: 120,
      startVelocity: 115,
      origin: { y: 0, x: 0.9},

      scalar: 2,
      decay: 0.9,
    });
  }, 700);
};

export default Confetti;
