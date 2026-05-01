import { useState } from "react";
import "./WeatherWidget.css";

const WeatherWidget = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="weather-widget">
      <button className="close-btn" onClick={() => setIsVisible(false)}>
        ×
      </button>

      {/* Лоадер */}
      {isLoading ? (
        <div className="weather-loader">Загрузка...</div>
      ) : (
        <p>Здесь будет виджет погоды</p>
      )}
    </div>
  );
};

export default WeatherWidget;
