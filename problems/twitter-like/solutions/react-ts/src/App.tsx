import { useEffect, useRef, useState } from "react";
import saveLikeValue from "./services/saveLikeValue";
import "./styles.css";
import debounce from "./utils/debounce";

function LikeButtonSVG({
  width,
  height,
  onClick,
  isLiked,
}: {
  width: number;
  height: number;
  isLiked: boolean;
  onClick: () => void;
}) {
  return (
    <svg
      className="cursor-pointer"
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={isLiked ? "red" : "none"}
      stroke={!isLiked ? "white" : "none"}
      strokeWidth={1}
      width={width}
      height={height}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function LikeButton({
  isLiked,
  setIsLiked,
}: {
  isLiked: boolean;
  setIsLiked: (isLiked: boolean) => void;
}) {
  const initialIsLiked = useRef(isLiked);
  const debouncedLike = useRef(debounce(saveLike));

  async function saveLike(newIsLiked: boolean) {
    try {
      await saveLikeValue(newIsLiked);
      initialIsLiked.current = newIsLiked;
    } catch (e) {
      console.warn("Failed to save like value", e);
      setIsLiked(initialIsLiked.current);
    }
  }

  const [debouncedLikeSave, clearDebounce] = debouncedLike.current;

  const toggleLike = () => {
    clearDebounce();

    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);

    // if the like is the same, don't save
    if (initialIsLiked.current === newIsLiked) return;

    debouncedLikeSave(newIsLiked);
  };

  // cleaning up on unmount
  useEffect(() => {
    const handleBeforeUnload = () => saveLikeValue(isLiked);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearDebounce();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <LikeButtonSVG
      width={64}
      height={64}
      onClick={toggleLike}
      isLiked={isLiked}
    />
  );
}

export default function App() {
  const [isLiked, setIsLiked] = useState(
    localStorage.getItem("liked") === "true"
  );

  return (
    <main className="bg-gray-400 h-screen flex items-center justify-center">
      <LikeButton isLiked={isLiked} setIsLiked={setIsLiked} />
    </main>
  );
}
