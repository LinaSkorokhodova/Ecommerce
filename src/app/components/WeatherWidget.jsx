import { useState, useEffect } from "react";
import "./WeatherWidget.css";

const WeatherWidget = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [geoError, setGeoError] = useState(null);

  // Запрос координат Тюмени
  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=Тюмень&limit=1&appid=${apiKey}`;

        const response = await fetch(geoUrl);

        if (!response.ok) {
          throw new Error("Geo API error");
        }

        const data = await response.json();

        if (data.length === 0) {
          setGeoError("Не удалось получить данные для города Тюмень");
        } else {
          console.log("Координаты Тюмени:", data[0]); // пока что просто лог
        }
      } catch (error) {
        console.error("Ошибка гео:", error);
        setGeoError("Не удалось получить данные для города Тюмень");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoordinates();
  }, []);

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
      ) : geoError ? (
        <div className="error-message geo-error">{geoError}</div>
      ) : (
        <p>Здесь будет виджет погоды</p>
      )}
    </div>
  );
};

export default WeatherWidget;
