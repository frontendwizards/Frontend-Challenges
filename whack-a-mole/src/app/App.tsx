import classNames from "classnames";
import { FC, Ref, useEffect, useRef, useState } from "react";

const GAME_DURATION = 20;

const getRandomNumber = (
  min: number,
  max: number,
  exclude: number[],
): number => {
  const random = Math.floor(Math.random() * (max - min) + min);
  if (exclude.includes(random)) {
    return getRandomNumber(min, max, exclude);
  }
  return random;
};

const DefaultGrid = Array.from({ length: 9 }).fill(0);

const App: FC = () => {
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const timeout: Ref<Number | null> = useRef(null);
  const [isGameOver, setIsGameOver] = useState(true);
  const isFirstRound = timer === 0;
  const [gameGrid, setGameGrid] = useState([...DefaultGrid]);

  const startGame = () => {
    setScore(0);
    setTimer(0);
    setIsGameOver(false);
  };

  const catchHole = (index: number) => {
    setScore((prevScore) => prevScore + 1);

    gameGrid[index] = 0;

    setGameGrid([...gameGrid]);
  };

  const respawnNewMoles = () => {
    const currentMolePositions = gameGrid.reduce(
      (savedMolePositions: number[], currentSpot, currentIndex) => {
        if (currentSpot === 1) {
          savedMolePositions.push(currentIndex);
        }
        return savedMolePositions;
      },
      [],
    );

    const firstMolePosition = getRandomNumber(0, 9, currentMolePositions);
    const secondMolePosition = getRandomNumber(0, 9, [
      firstMolePosition,
      ...currentMolePositions,
    ]);

    const newGameGrid = [...DefaultGrid];
    newGameGrid[firstMolePosition] = 1;
    newGameGrid[secondMolePosition] = 1;

    setGameGrid(newGameGrid);
  };

  const reset = () => {
    setIsGameOver(true);
    clearTimeout(timeout.current);
    setGameGrid([...DefaultGrid]);
  };

  useEffect(() => {
    if (isGameOver) return;

    if (timer === GAME_DURATION) {
      reset();
      return;
    }

    if (timer % 1 === 0) {
      respawnNewMoles();
    }

    timeout.current = setTimeout(() => {
      setTimer((prevTimer) => prevTimer + 0.5);
    }, 500);

    return () => {
      clearTimeout(timeout.current);
    };
  }, [timer, isGameOver]);

  return (
    <div className="flex h-full min-h-[100vh] flex-col items-center !bg-[#FA8072] p-2 pt-10 text-white">
      <div className="w-[60rem]  uppercase">
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
            Time left : {GAME_DURATION - Math.ceil(timer)}
          </span>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10">
          {gameGrid.map((spot, index) => (
            <div
              key={index}
              className="relative h-[12rem] flex-[0_1_25%] overflow-hidden"
            >
              <button
                onClick={() => catchHole(index)}
                className={classNames([
                  "w-40 translate-x-[15%] translate-y-[100%] select-none select-none duration-100 ease-in",
                  {
                    "translate-y-[20%]": spot === 1,
                  },
                ])}
              >
                <img
                  alt="mole head"
                  src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-head.png"
                />
              </button>
              <img
                alt="mole hill"
                className="z-10 translate-x-[-10px] translate-y-[-30%]"
                src="https://www.greatfrontend.com/img/questions/whack-a-mole/mole-hill.png"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
