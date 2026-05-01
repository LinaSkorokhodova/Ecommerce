import { useState } from "react";
import "./WeatherWidget.css";

const WeatherWidget = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="weather-widget">
      <button className="close-btn" onClick={() => setIsVisible(false)}>
        ×
      </button>
      <p>Здесь будет виджет погоды</p>
    </div>
  );
};

export default WeatherWidget;
