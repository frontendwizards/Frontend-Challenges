import React, { useEffect, useState } from "react";

function Light({ backgroundColor }) {
  return <div className="traffic-light" style={{ backgroundColor }}></div>;
}

export default function TrafficLight({ config, layout = "vertical" }) {
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
      aria-live="polite"
      aria-label={`Current light: ${currentLight}`}
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
