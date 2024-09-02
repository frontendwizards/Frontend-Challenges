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

const WORD_LENGTH = 5;
const TRIES = 6;

enum CELL_COLOR {
  DEFAULT = "light-gray",
  ABSENT = "dark-gray",
  CORRECT = "green",
  PRESENT = "yellow",
}

enum GAME_STATUS {
  WON = "WON",
  LOST = "LOST",
  PLAYING = "PLAYING",
}

type CellData = {
  value: string | null;
  bgClass: CELL_COLOR;
};

type Grid = CellData[][];

const generateInitialGridState = (): Grid =>
  Array.from({ length: TRIES }, () =>
    Array.from({ length: WORD_LENGTH }, () => ({
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
        backgroundClass !== CELL_COLOR.DEFAULT && "cell-animating",
        value !== null && "cell-filled",
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

const getRandomWordIndex = () => Math.floor(Math.random() * WORDS.length);

const showGameStatusMessage = (
  currentGameStatus: GAME_STATUS,
  currentWord: string
) => {
  const gameStatusMessage: Record<GAME_STATUS, string> = {
    [GAME_STATUS.WON]: "Congratulations! You won 🎉",
    [GAME_STATUS.LOST]: `The word was ${currentWord}.`,
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

  const updateRowColors = (bgColorsList: CELL_COLOR[]): Promise<void> => {
    return new Promise((resolve) => {
      let index = 0;
      const interval = setInterval(() => {
        const newData = data.slice();
        newData[currentRow][index].bgClass = bgColorsList[index];
        setData(newData);

        index++;

        if (index === WORD_LENGTH) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  };

  const submitCurrentWord = async (currentWord: string): Promise<boolean> => {
    setIsColoring(true);
    let bgColorsList: CELL_COLOR[] = [];
    let isMatching = currentWord === wordToGuess;

    if (isMatching) {
      bgColorsList = Array(wordToGuess.length).fill(CELL_COLOR.CORRECT);
    } else {
      bgColorsList = currentWord.split("").map((character, index) => {
        if (wordToGuess[index] === character) return CELL_COLOR.CORRECT;
        if (wordToGuess.includes(character)) return CELL_COLOR.PRESENT;
        return CELL_COLOR.ABSENT;
      });
    }

    await updateRowColors(bgColorsList);
    setIsColoring(false);
    return isMatching;
  };

  const endGame = (isWon = true) => {
    setGameStatus(isWon ? GAME_STATUS.WON : GAME_STATUS.LOST);
  };

  const removeLastCharacter = () => {
    const newData = data.slice();
    const currentWord = getCurrentWord(newData[currentRow]);
    if (currentWord.length > 0) {
      newData[currentRow][currentWord.length - 1].value = null;
    }
    setData(newData);
  };

  const addCharacter = (char: string) => {
    const newData = data.slice();
    const currentWord = getCurrentWord(newData[currentRow]);

    if (currentWord.length < WORD_LENGTH) {
      newData[currentRow][currentWord.length].value = char.toUpperCase();
    }

    setData(newData);
  };

  const handleEnterKey = async () => {
    const currentWord = getCurrentWord(data[currentRow]);
    if (currentWord.length !== WORD_LENGTH) {
      return;
    }

    const isMatching = await submitCurrentWord(currentWord);

    if (isMatching) {
      endGame(true);
    } else if (currentRow === TRIES - 1) {
      endGame(false);
    } else {
      setCurrentRow((prevRow) => prevRow + 1);
    }
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
      if (isGameOver || isColoring) return;

      const typedKey = event.key;

      if (typedKey === "Backspace") {
        removeLastCharacter();
      } else if (typedKey === "Enter") {
        await handleEnterKey();
      } else if (typedKey.length === 1 && /[a-zA-Z]/.test(typedKey)) {
        addCharacter(typedKey);
      }
    };

    window.addEventListener("keydown", handleKeyPress, false);
    return () => window.removeEventListener("keydown", handleKeyPress, false);
  }, [currentRow, data, gameStatus, isColoring]);

  return (
    <div className="container" role="grid" aria-label="Wordle game grid">
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
