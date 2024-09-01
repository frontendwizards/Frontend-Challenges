import { useEffect, useState } from "react";
import { Config } from "./types";

function Light({ backgroundColor }: { backgroundColor: string }) {
  return <div className="traffic-light" style={{ backgroundColor }}></div>;
}

export default function TrafficLight({
  config,
  layout = "vertical",
}: {
  config: Config;
  layout?: string;
}) {
  const [currentLight, setCurrentLight] = useState("green");

  useEffect(() => {
    const { next, duration } = config[currentLight];
    const interval = setTimeout(() => {
      setCurrentLight(next);
    }, duration);

    return () => {
      clearInterval(interval);
    };
  }, [currentLight]);

  return (
    <div
      className={[
        "traffic-light-container",
        layout === "vertical" && "traffic-light-container--vertical",
      ]
        .filter((cls) => !!cls)
        .join(" ")}
    >
      {Object.keys(config).map((color) => (
        <Light
          key={color}
          backgroundColor={
            color === currentLight ? config[color].backgroundColor : "grey"
          }
        />
      ))}
    </div>
  );
}
