import { useState, useEffect } from "react";
import "./WeatherWidget.css";

const WeatherWidget = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [geoError, setGeoError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherError, setWeatherError] = useState(null);

  // Запрос координат Тюмени
  useEffect(() => {
    const fetchTyumenWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

        // Запрашиваем координаты Тюмени
        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=Тюмень&limit=1&appid=${apiKey}`;
        const geoResponse = await fetch(geoUrl);

        if (!geoResponse.ok) {
          throw new Error("Geo API error");
        }

        const geoData = await geoResponse.json();

        if (geoData.length === 0) {
          setGeoError("Не удалось получить данные для города Тюмень");
          setIsLoading(false);
          return; // прерываем выполнение, если координат нет
        }

        const { lat, lon } = geoData[0];

        // Запрашиваем погоду по координатам
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ru`;
        const weatherResponse = await fetch(weatherUrl);

        if (!weatherResponse.ok) {
          throw new Error("Weather API error");
        }

        const weatherResult = await weatherResponse.json();

        // Сохраняем данные погоды
        setWeatherData(weatherResult);
      } catch (error) {
        console.error("Ошибка:", error);
        if (error.message === "Geo API error") {
          setGeoError("Не удалось получить данные для города Тюмень");
        } else {
          setWeatherError("Не удалось получить данные");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTyumenWeather();
  }, []);

  if (!isVisible) {
    return null;
  }

  // Функция для рендеринга разного контента
  const renderContent = () => {
    if (isLoading) {
      return <div className="weather-loader">Загрузка...</div>;
    }

    if (geoError) {
      return <div className="error-message geo-error">{geoError}</div>;
    }

    if (weatherError) {
      return <div className="error-message weather-error">{weatherError}</div>;
    }

    if (weatherData) {
      return (
        <div className="weather-info">
          <h3>{weatherData.name}</h3>
          <p>Температура: {Math.round(weatherData.main.temp)}°C</p>
          <p>Описание: {weatherData.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="weather-widget">
      <button className="close-btn" onClick={() => setIsVisible(false)}>
        ×
      </button>

      {renderContent()}
    </div>
  );
};

export default WeatherWidget;
