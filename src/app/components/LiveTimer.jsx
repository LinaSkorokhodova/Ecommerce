import { useState, useEffect } from "react";
import "./LiveTimer.css";

const LiveTimer = ({ onClose }) => {
  const INITIAL_TIME = 10;//59 * 60 + 59; // 59*60=3540 секунд + 59 секунд=3599

  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
 
  
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
        setTimeLeft(prev => {
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
      setIsRunning(prev => !prev);
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
        <button onClick={handleRestart} className="restart-btn"> Рестарт</button>
        <button onClick={handleClose} className="close-btn">×</button>
      </div>
    );
  }

   // Основной вид таймера
  return (
    <div className="live-timer">
      <div className="timer-display">{formatTime(timeLeft)}</div>
      <div className="timer-controls">
        <button onClick={handleToggle} disabled={isFinished}>
          {isRunning ? ' Стоп' : 'Возобновить'}
        </button>
        <button onClick={handleRestart} className="restart-btn"> Рестарт</button>
        <button onClick={handleClose} className="close-btn">×</button>
      </div>
    </div>
  ); 
}
  
  
export default LiveTimer;
