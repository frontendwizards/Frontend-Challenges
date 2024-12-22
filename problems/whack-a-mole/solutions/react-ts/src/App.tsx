import { FC, useEffect, useRef, useState } from "react";
import "./styles.css";
import { cn } from "./utils/cn";

const GAME_DURATION = 20;
const GRID_SIZE = 9;

const DefaultGrid = Array.from({ length: GRID_SIZE }).fill(0);

const App: FC = () => {
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const [isGameOver, setIsGameOver] = useState(true);
  const isFirstRound = timer === 0;
  const [gameGrid, setGameGrid] = useState([...DefaultGrid]);

  const startGame = () => {
    setScore(0);
    setTimer(0);
    setIsGameOver(false);
  };

  const catchHole = (index: number) => {
    if (isGameOver) return;

    setScore((prevScore) => prevScore + 1);

    gameGrid[index] = 0;

    setGameGrid([...gameGrid]);
  };

  const respawnNewMoles = () => {
    const availablePositions = gameGrid.reduce<number[]>((acc, spot, index) => {
      if (spot === 0) acc.push(index);
      return acc;
    }, []);

    const [firstMolePosition, secondMolePosition] = availablePositions
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    const newGameGrid = [...DefaultGrid];
    newGameGrid[firstMolePosition] = 1;
    newGameGrid[secondMolePosition] = 1;

    setGameGrid(newGameGrid);
  };

  const reset = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setIsGameOver(true);
    setGameGrid([...DefaultGrid]);
  };

  useEffect(() => {
    if (isGameOver) return;

    if (timer === GAME_DURATION) {
      reset();
      return;
    }

    // respawn Moles each 2 seconds (ex: 0, 2, 4...)
    if (timer % 1 === 0) {
      respawnNewMoles();
    }

    // increase the timer by +0.5/s
    timeout.current = setTimeout(() => {
      setTimer((prevTimer) => prevTimer + 0.5);
    }, 500);

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [timer, isGameOver]);

  const timeLeft = GAME_DURATION - Math.ceil(timer);

  return (
    <main className="flex h-full min-h-[100vh] flex-col items-center p-2 pt-10 text-white w-[60rem] uppercase">
      <div className="flex h-10 w-full items-center justify-around">
        <span className="text-2xl font-bold">Score : {score}</span>
        <div className="w-[10rem] text-center">
          {isGameOver && (
            <button
              onClick={startGame}
              className="w-[10rem] rounded-lg bg-white p-3 text-xl font-bold uppercase text-black shadow-md"
            >
              {isFirstRound ? "Start" : "Play Again"}
            </button>
          )}
        </div>
        <span className="text-left text-2xl font-bold">
          Time left : {timeLeft}
        </span>
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 pb-20">
        {gameGrid.map((spot, index) => (
          <div
            key={index}
            className="relative h-[12rem] flex-[0_1_25%] overflow-hidden"
          >
            <button
              tabIndex={-1}
              aria-label={`Mole ${index + 1}`}
              onClick={() => catchHole(index)}
              className={cn([
                "h-40 w-40 translate-x-[15%] translate-y-[100%] select-none duration-100 ease-in",
                {
                  "translate-y-[20%]": spot === 1,
                },
              ])}
            >
              <img
                alt="mole head"
                src="https://pub-473edaec9c9b416fb6c35c8854296a05.r2.dev/mole-head.png"
              />
            </button>
            <img
              alt="mole hill"
              className="absolute bottom-[-1.69rem]"
              src="https://pub-473edaec9c9b416fb6c35c8854296a05.r2.dev/mole-hill.png"
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default App;
