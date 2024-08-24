import { useEffect, useState } from "react";
import "./index.css";

// TODO check same row?? duplicate
// TODO remove updateData and only

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

const generateInitialGridSate = () =>
  Array.from({ length: tries }, () =>
    Array.from({ length: wordLength }, () => ({
      value: null,
      bgClass: DEFAULT_CELL_COLOR,
    }))
  );

const Cell = ({ value, backgroundClass }) => {
  return (
    <div
      className={[
        "cell",
        backgroundClass,
        backgroundClass !== DEFAULT_CELL_COLOR && " cell-filled",
      ].join(" ")}
    >
      {value}{" "}
    </div>
  );
};

const getCurrentWord = (currentRow) => {
  let result = "";

  for (let i = 0; i < currentRow.length; i++) {
    if (currentRow[i].value === null) {
      break;
    }
    result += currentRow[i].value;
  }

  return result;
};

const copy = (prevData) => {
  const updatedData = prevData.map((row) => row.slice());
  return updatedData;
};

const GAME_STATUS = Object.freeze({
  WON: "Won",
  LOST: "Lost",
  PLAYING: "Playing",
});

export default function App() {
  let [currentRow, setCurrentRow] = useState(0);
  let [data, setData] = useState(generateInitialGridSate());
  let [gameStatus, setGameStatus] = useState(GAME_STATUS.PLAYING);
  let [isColoring, setIsColoring] = useState(false);
  const targetWord = WORDS[0];

  const updateData = (newData = data) => {
    console.log(newData[currentRow]);
    setData(copy(newData));
  };

  const colorCurrentRow = (currentRowData, bgColorsList) => {
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

  const submitCurrentWord = async (currentWord) => {
    setIsColoring(true);
    let bgColorsList = [];
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

  const endGame = (isWon = true) => {
    const newGameStatus = isWon ? GAME_STATUS.WON : GAME_STATUS.LOST;
    setGameStatus(newGameStatus);
  };

  const removeLastCharacter = (currentWord) => {
    if (currentWord.length === 0) {
      return;
    }

    const newData = copy(data);
    newData[currentRow][currentWord.length - 1].value = null;
    setData(newData);
  };

  const handleKeyPress = async (e) => {
    if (gameStatus !== GAME_STATUS.PLAYING || isColoring) {
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

  const reset = () => {
    setCurrentRow(0);
    setData(generateInitialGridSate());
    setGameStatus(GAME_STATUS.PLAYING);
    setIsColoring(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress, false);
    return () => window.removeEventListener("keydown", handleKeyPress, false);
  }, [currentRow, data, gameStatus, isColoring]);

  return (
    <div className="container">
      <h2>{gameStatus}</h2>

      <div className="grid">
        {data.map((row, rowIndex) =>
          row.map(({ value, bgClass }, index) => (
            <Cell
              key={rowIndex + "-" + index}
              value={value}
              backgroundClass={bgClass}
            />
          ))
        )}
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
