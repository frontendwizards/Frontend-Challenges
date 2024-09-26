import { useRef, useState } from "react";
import saveLikeValue from "./services/saveLikeValue";
import "./styles.css";
import { cn } from "./utils/cn";
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
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="overflow-hidden rounded-full p-2">
      <div
        onClick={() => setIsClicked(true)}
        className={cn([
          "heart w-10 h-10 border-2",
          isClicked && isLiked && "is_animating",
          isLiked && "heart-filled",
        ])}
      />
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

const postLikes = 32;

export default function App() {
  const [isLiked, setIsLiked] = useState(
    localStorage.getItem("liked") === "true"
  );

  const totalPostLikes = postLikes + Number(isLiked);

  return (
    <main className=" h-screen flex items-center justify-center bg-[#9DA3AF]">
      <div className="flex justify-center items-center">
        <span className="text-2xl">{totalPostLikes}</span>
        <LikeButton isLiked={isLiked} setIsLiked={setIsLiked} />
      </div>
    </main>
  );
}
