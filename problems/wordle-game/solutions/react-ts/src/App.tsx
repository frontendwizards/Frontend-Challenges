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
const tries = 6;

const DEFAULT_CELL_COLOR = "light-gray";
const ABSENT_CELL_COLOR = "dark-gray";
const CORRECT_CELL_COLOR = "green";
const PRESENT_CELL_COLOR = "yellow";

interface CellData {
  value: string | null;
  bgClass: string;
}

type Grid = CellData[][];

const generateInitialGridState = (): Grid =>
  Array.from({ length: tries }, () =>
    Array.from({ length: wordLength }, () => ({
      value: null,
      bgClass: DEFAULT_CELL_COLOR,
    }))
  );

interface CellProps {
  value: string | null;
  backgroundClass: string;
}

const Cell: React.FC<CellProps> = ({ value, backgroundClass }) => {
  return (
    <div
      className={[
        "cell",
        backgroundClass,
        backgroundClass !== DEFAULT_CELL_COLOR && "cell-filled",
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
  WON = "Won",
  LOST = "Lost",
  PLAYING = "Playing",
}

export default function App() {
  const [currentRow, setCurrentRow] = useState(0);
  const [data, setData] = useState<Grid>(generateInitialGridState());
  const [gameStatus, setGameStatus] = useState<GAME_STATUS>(
    GAME_STATUS.PLAYING
  );

  const [isColoring, setIsColoring] = useState(false);
  const targetWord = WORDS[0];

  const updateData = (newData: Grid = data) => {
    setData(copy(newData));
  };

  const colorCurrentRow = (
    currentRowData: CellData[],
    bgColorsList: string[]
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
    let bgColorsList: string[] = [];
    let isMatching = true;

    if (currentWord === targetWord) {
      bgColorsList = Array(targetWord.length).fill(CORRECT_CELL_COLOR);
    } else {
      bgColorsList = currentWord.split("").map((character, index) => {
        if (targetWord[index] === character) {
          return CORRECT_CELL_COLOR;
        }
        isMatching = false;
        if (targetWord.includes(character)) {
          return PRESENT_CELL_COLOR;
        }
        return ABSENT_CELL_COLOR;
      });
    }

    await colorCurrentRow(data[currentRow], bgColorsList);

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

    const newData = copy(data);
    newData[currentRow][currentWord.length - 1].value = null;
    setData(newData);
  };

  const reset = () => {
    setCurrentRow(0);
    setData(generateInitialGridState());
    setGameStatus(GAME_STATUS.PLAYING);
    setIsColoring(false);
  };

  const isGameOver = gameStatus !== GAME_STATUS.PLAYING;

  useEffect(() => {
    const handleKeyPress = async (e: KeyboardEvent) => {
      if (isGameOver || isColoring) {
        return;
      }

      const typedKey = e.key;
      let currentWord = getCurrentWord(data[currentRow]);

      if (typedKey === "Backspace") {
        return removeLastCharacter(currentWord);
      }
      if (currentWord.length === wordLength) {
        if (typedKey === "Enter") {
          const isMatching = await submitCurrentWord(currentWord);
          if (isMatching) return endGame();
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

      const newData = copy(data);
      newData[currentRow][currentWord.length].value = typedKey.toUpperCase();
      setData(newData);
    };

    window.addEventListener("keydown", handleKeyPress, false);
    return () => window.removeEventListener("keydown", handleKeyPress, false);
  }, [currentRow, data, gameStatus, isColoring]);

  return (
    <div className="container">
      <h1 className="text-7xl mb-20">WORDLE</h1>
      {!isGameOver && (
        <div className="flex justify-between items-center w-[14rem] mb-4 h-[3rem]"> 
        {/* TODO: remove height? */}
          <span className="mr-4">{gameStatus}</span>

          <button
            onClick={reset}
            className="bg-white rounded-md text-black p-2"
          >
            Reset
          </button>
        </div>
      )}

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
