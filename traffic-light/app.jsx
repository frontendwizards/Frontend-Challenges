import TrafficLight from "./TrafficLight";

import "./styles.css";

const config = {
  red: {
    backgroundColor: "red",
    duration: 4000,
    next: "green",
  },
  yellow: {
    backgroundColor: "yellow",
    duration: 500,
    next: "red",
  },
  green: {
    backgroundColor: "green",
    duration: 3000,
    next: "yellow",
  },
};

export default function App() {
  return (
    <div className="container">
      <TrafficLight
        layout="traffic-light-container--vertical"
        config={config}
      />
      <TrafficLight config={config} />
    </div>
  );
}
