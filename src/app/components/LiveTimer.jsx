import { useState, useEffect } from "react";
import "./LiveTimer.css";

const LiveTimer = ({ onClose }) => {
  // Сохраняем в памяти браузера
  const TIMER_STORAGE_KEY = "live_timer_state_v1";

  const INITIAL_TIME = 59 * 60 + 59; // 59*60=3540 секунд + 59 секунд=3599

  // Читаем сохраненное состояние при инициализации
  const getInitialState = () => {
    try {
      const saved = localStorage.getItem(TIMER_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Ошибка чтения таймера", e);
    }
    // Если ничего нет, возвращаем дефолт
    return {
      timeLeft: INITIAL_TIME,
      isRunning: true,
      isFinished: false,
    };
  };

  const initialState = getInitialState();

  const [timeLeft, setTimeLeft] = useState(initialState.timeLeft);
  const [isRunning, setIsRunning] = useState(initialState.isRunning);
  const [isFinished, setIsFinished] = useState(initialState.isFinished);

  // Сохраняем состояние в память при любом изменении
  useEffect(() => {
    const stateToSave = { timeLeft, isRunning, isFinished };
    localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(stateToSave));
  }, [timeLeft, isRunning, isFinished]);

  // Слушаем изменения из других вкладок
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === TIMER_STORAGE_KEY && e.newValue) {
        const newState = JSON.parse(e.newValue);
        setTimeLeft(newState.timeLeft);
        setIsRunning(newState.isRunning);
        setIsFinished(newState.isFinished);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Форматирование времени в H:MM:SS
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Эффект для обратного отсчёта
  useEffect(() => {
    let intervalId;

    if (isRunning && !isFinished) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            setIsFinished(true);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Очистка интервала при размонтировании или изменении состояния
    return () => clearInterval(intervalId);
  }, [isRunning, isFinished]);

  // Закрыть таймер
  const handleClose = () => {
    if (onClose) onClose();
  };

  // Стоп / Возобновить
  const handleToggle = () => {
    if (!isFinished) {
      setIsRunning((prev) => !prev);
    }
  };

  // Рестарт
  const handleRestart = () => {
    setTimeLeft(INITIAL_TIME);
    setIsFinished(false);

    if (isFinished) {
      setIsRunning(true);
    } else {
      setIsRunning(isRunning);
    }
  };

  // Если таймер завершён — показывает сообщение
  if (isFinished) {
    return (
      <div className="timer-finished">
        <span>Таймер истёк</span>
        <button onClick={handleRestart} className="restart-btn">
          {" "}
          Рестарт
        </button>
        <button onClick={handleClose} className="close-btn">
          ×
        </button>
      </div>
    );
  }

  // Основной вид таймера
  return (
    <div className="live-timer">
      <div className="timer-display">{formatTime(timeLeft)}</div>
      <div className="timer-controls">
        <button onClick={handleToggle} disabled={isFinished}>
          {isRunning ? " Стоп" : "Возобновить"}
        </button>
        <button onClick={handleRestart} className="restart-btn">
          {" "}
          Рестарт
        </button>
        <button onClick={handleClose} className="close-btn">
          ×
        </button>
      </div>
    </div>
  );
};

export default LiveTimer;
