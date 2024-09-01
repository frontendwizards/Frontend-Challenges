import { useEffect, useState } from "react";
import "./styles.css";

const WORDS = Object.freeze([
  "APPLE",
  "BEAST",
  "FAINT",
  "FEAST",
  "FRUIT",
  "GAMES",
  "PAINT",
  "PASTE",
  "TOWER",
  "REACT",
]);

const wordLength = 5;
const tries = 1;

enum CELL_COLOR {
  DEFAULT = "light-gray",
  ABSENT = "dark-gray",
  CORRECT = "green",
  PRESENT = "yellow",
}

interface CellData {
  value: string | null;
  bgClass: CELL_COLOR;
}

type Grid = CellData[][];

const generateInitialGridState = (): Grid =>
  Array.from({ length: tries }, () =>
    Array.from({ length: wordLength }, () => ({
      value: null,
      bgClass: CELL_COLOR.DEFAULT,
    }))
  );

interface CellProps {
  value: string | null;
  backgroundClass: CELL_COLOR;
}

const Cell: React.FC<CellProps> = ({ value, backgroundClass }) => {
  return (
    <div
      className={[
        "cell",
        backgroundClass,
        backgroundClass !== CELL_COLOR.DEFAULT && "cell-filled",
        value !== null && "cell-filled2",
      ].join(" ")}
    >
      {value}
    </div>
  );
};

const getCurrentWord = (currentRow: CellData[]): string => {
  let result = "";

  for (let i = 0; i < currentRow.length; i++) {
    if (currentRow[i].value === null) {
      break;
    }
    result += currentRow[i].value;
  }

  return result;
};

const copy = (prevData: Grid): Grid => {
  const updatedData = prevData.map((row) => row.slice());
  return updatedData;
};

enum GAME_STATUS {
  WON = "WON",
  LOST = "LOST",
  PLAYING = "PLAYING",
}

const getRandomWordIndex = () => Math.floor(Math.random() * WORDS.length);

const showGameStatusMessage = (
  currentGameStatus: GAME_STATUS,
  currentWord: string
) => {
  const gameStatusMessage: Record<GAME_STATUS, string> = {
    [GAME_STATUS.LOST]: "Congratulations! You won 🎉",
    [GAME_STATUS.WON]: `The word was ${currentWord}.`,
    [GAME_STATUS.PLAYING]: "",
  };

  return gameStatusMessage[currentGameStatus];
};

export default function App() {
  const [currentRow, setCurrentRow] = useState(0);
  const [data, setData] = useState<Grid>(generateInitialGridState());
  const [gameStatus, setGameStatus] = useState<GAME_STATUS>(
    GAME_STATUS.PLAYING
  );

  const [isColoring, setIsColoring] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(
    getRandomWordIndex()
  );
  const isGameOver = gameStatus !== GAME_STATUS.PLAYING;
  const wordToGuess = WORDS[currentWordIndex];

  const updateData = (newData: Grid = data) => {
    setData(copy(newData));
  };

  const updateRowColors = (
    currentRowData: CellData[],
    bgColorsList: CELL_COLOR[]
  ): Promise<void> => {
    return new Promise((resolve) => {
      let index = 0;
      const interval = setInterval(() => {
        currentRowData[index].bgClass = bgColorsList[index];
        index++;
        updateData();

        if (index === wordLength) {
          clearInterval(interval);
          resolve();
        }
      }, 300);
    });
  };

  const submitCurrentWord = async (currentWord: string): Promise<boolean> => {
    setIsColoring(true);
    let bgColorsList: CELL_COLOR[] = [];
    let isMatching = true;

    if (currentWord === wordToGuess) {
      bgColorsList = Array(wordToGuess.length).fill(CELL_COLOR.CORRECT);
    } else {
      bgColorsList = currentWord.split("").map((character, index) => {
        if (wordToGuess[index] === character) {
          return CELL_COLOR.CORRECT;
        }
        isMatching = false;
        if (wordToGuess.includes(character)) {
          return CELL_COLOR.PRESENT;
        }
        return CELL_COLOR.ABSENT;
      });
    }

    await updateRowColors(data[currentRow], bgColorsList);

    setIsColoring(false);

    return isMatching;
  };

  const endGame = (isWon: boolean = true) => {
    const newGameStatus = isWon ? GAME_STATUS.WON : GAME_STATUS.LOST;
    setGameStatus(newGameStatus);
  };

  const removeLastCharacter = (currentWord: string) => {
    if (currentWord.length === 0) {
      return;
    }

    const newData = data.slice();
    newData[currentRow][currentWord.length - 1].value = null;
    setData(newData);
  };

  const reset = () => {
    setCurrentRow(0);
    setData(generateInitialGridState());
    setGameStatus(GAME_STATUS.PLAYING);
    setIsColoring(false);
    setCurrentWordIndex(getRandomWordIndex());
  };

  useEffect(() => {
    const handleKeyPress = async (event: KeyboardEvent) => {
      if (isGameOver || isColoring) {
        return;
      }

      const typedKey = event.key;
      let currentWord = getCurrentWord(data[currentRow]);

      if (typedKey === "Backspace") {
        return removeLastCharacter(currentWord);
      }
      if (currentWord.length === wordLength) {
        if (typedKey === "Enter") {
          const isMatching = await submitCurrentWord(currentWord);
          if (isMatching) return endGame();
          // used all tries
          if (currentRow === tries - 1) {
            return endGame(false);
          }
          // go to next row
          setCurrentRow(currentRow + 1);
        }
        return;
      }

      if (typedKey.length !== 1 || !/[a-zA-Z]/.test(typedKey)) {
        return;
      }

      const newData = data.slice();
      newData[currentRow][currentWord.length].value = typedKey.toUpperCase();
      setData(newData);
    };

    window.addEventListener("keydown", handleKeyPress, false);
    return () => window.removeEventListener("keydown", handleKeyPress, false);
  }, [currentRow, data, gameStatus, isColoring]);

  return (
    <div className="container">
      <h1 className="text-7xl mb-20">WORDLE</h1>
      <div className="flex justify-between items-center w-[24rem] mb-8 h-[3rem]">
        {isGameOver && (
          <>
            <span className="mr-4">
              {showGameStatusMessage(gameStatus, wordToGuess)}
            </span>
            <button
              onClick={reset}
              className="bg-white rounded-md text-black p-2"
            >
              Reset
            </button>
          </>
        )}
      </div>

      <div className="grid">
        {data.map((row, rowIndex) =>
          row.map(({ value, bgClass }, index) => (
            <Cell
              key={`${rowIndex}-${index}`}
              value={value}
              backgroundClass={bgClass}
            />
          ))
        )}
      </div>
    </div>
  );
}
