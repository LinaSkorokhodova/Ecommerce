import { useState, useEffect, useRef } from "react";
import "./WeatherWidget.css";

const WeatherWidget = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Данные о погоде и ошибках
  const [geoError, setGeoError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherError, setWeatherError] = useState(null);

  // Инпут и состояние поиска
  const [cityInput, setCityInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Реф для хранения текущего AbortController
  const abortControllerRef = useRef(null);

  // Запрос координат Тюмени
  const fetchWeatherByCity = async (cityName, signal) => {
    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

      // Запрашиваем координаты Тюмени
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
      const geoResponse = await fetch(geoUrl, { signal });

      if (!geoResponse.ok) throw new Error("Geo API error");

      const geoData = await geoResponse.json();

      if (geoData.length === 0) {
        return {
          error: `Не удалось получить данные для города ${cityName}`,
          type: `geo`,
        };
      }

      // Достаем имя из geoData
      const { lat, lon, name } = geoData[0];

      // Запрашиваем погоду по координатам
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ru`;
      const weatherResponse = await fetch(weatherUrl, { signal });

      if (!weatherResponse.ok) throw new Error("Weather API error");

      const weatherResult = await weatherResponse.json();

      // Возвращаем успех
      return { data: weatherResult, cityName: name };
    } catch (error) {
      // Игнорируем ошибку отмены запроса
      if (error.name === "AbortError") {
        return null;
      }

      console.error("Ошибка:", error);

      if (error.message === "Geo API error") {
        return {
          error: `Не удалось получить данные для города ${cityName}`,
          type: `geo`,
        };
      } else {
        return {
          error: "Не удалось получить данные",
          type: "weather",
        };
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    // Вызываем функцию и обрабатываем результат
    const loadInitial = async () => {
      const result = await fetchWeatherByCity("Тюмень", controller.signal);

      // Если запрос был отменен, ничего не делаем
      if (!result) return;

      if (result.error) {
        if (result.type === `geo`) setGeoError(result.error);
        else setWeatherError(result.error);
      } else {
        setWeatherData(result.data);
        setCityInput(result.cityName);
      }
      setIsLoading(false);
    };
    loadInitial();

    // При размонтировании отменяем запрос
    return () => {
      controller.abort();
    };
  }, []);

  // Обработчик кнопки (получить погоду)
  const handleSearch = async () => {
    if (!cityInput.trim()) return;

    // Отменяем предыдущий запрос, если он есть
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Создаем новый контроллер для этого поиска
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsSearching(true);
    setGeoError(null);
    setWeatherError(null);

    // Передаем signal в функцию
    const result = await fetchWeatherByCity(cityInput, controller.signal);

    // Если запрос был отменен, выходим
    if (!result) {
      setIsSearching(false);
      abortControllerRef.current = null;
      return;
    }

    if (result.error) {
      if (result.type === "geo") {
        setGeoError(result.error);
        setCityInput("");
      } else {
        setWeatherError(result.error);
      }
    } else {
      setWeatherData(result.data);
      setCityInput(result.cityName);
    }

    setIsSearching(false);
    abortControllerRef.current = null;
  };

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
          <div className="weather-icon-container">
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
          </div>
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
      {/* Блок поиска */}
      {!isLoading && !geoError && (
        <div className="search-box">
          <input
            type="text"
            value={cityInput}
            onChange={(e) => {
              setCityInput(e.target.value);
              setGeoError(null);
            }}
            placeholder="Введите город"
            disabled={isSearching}
          />
          <button onClick={handleSearch} disabled={isSearching}>
            {isSearching ? "Поиск..." : "Получить погоду"}
          </button>
        </div>
      )}

      {/* Ошибка геокодинга под инпутом */}
      {geoError && <div className="error-message geo-error">{geoError}</div>}
    </div>
  );
};

export default WeatherWidget;
