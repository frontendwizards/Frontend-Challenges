import { useRef, useState } from "react";
import saveLikeValue from "./services/saveLikeValue";
import "./styles.css";
import debounce from "./utils/debounce";

function LikeButtonSVG({
  width,
  height,
  isLiked,
}: {
  width: number;
  height: number;
  isLiked: boolean;
}) {
  return (
    <div className="heart w-10 h-10">
      
    </div>
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

  const toggleLike = async () => {
    clearDebounce();

    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);

    // if the like is the same, don't save
    if (initialIsLiked.current === newIsLiked) return;

    debouncedLikeSave(newIsLiked);
  };

  return (
    <button
      onClick={toggleLike}
      aria-pressed={isLiked}
      aria-label={isLiked ? "Unlike" : "Like"}
    >
      <LikeButtonSVG width={40} height={40} isLiked={isLiked} />
    </button>
  );
}

export default function App() {
  const [isLiked, setIsLiked] = useState(
    localStorage.getItem("liked") === "true"
  );
  const postLikes = 32;

  const totalPostLikes = postLikes + (isLiked ? 1 : 0);

  return (
    <main className="bg-gray-400 h-screen flex items-center justify-center">
     <div className="flex justify-center items-center gap-3">
     <span className="text-4xl">{totalPostLikes}</span>
      <LikeButton isLiked={isLiked} setIsLiked={setIsLiked} />
     </div>
    </main>
  );
}
