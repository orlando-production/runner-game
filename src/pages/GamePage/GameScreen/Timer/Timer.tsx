import React, {
  Ref, useEffect, useImperativeHandle, useState
} from 'react';
import garland from '../../../../assets/garland.png';
import classes from './Timer.module.css';

export type TimerType = {
  startTimer: () => void;
  stopTimer: () => void;
};

/**
 * Компонент таймера. Отображает прошедшее время.
 */

const second = 1000;
let currentInterval: ReturnType<typeof setInterval>;
const Timer = (_: { children?: React.ReactNode }, ref: Ref<TimerType>) => {
  const [currentTime, setCurrentTime] = useState(0);

  const start = () => {
    currentInterval = setInterval(() => {
      setCurrentTime((curTime) => curTime + 1);
    }, second);
  };
  useImperativeHandle(ref, () => ({
    startTimer() {
      start();
    },
    stopTimer() {
      clearInterval(currentInterval);
    }
  }));
  const formatTime = (seconds: number): string => {
    const secs = Math.floor(seconds % 60);
    const minutes = Math.floor(seconds / 60);
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      secs < 10 ? `0${secs}` : secs
    }`;
  };

  useEffect(() => () => clearInterval(currentInterval), []);

  return (
    <div className={classes.timer} aria-label="таймер">
      <img
        src={garland}
        alt="coldWater"
        className={classes['timer__cold-water-img']}
      />
      <span className={classes['timer__time-text']}>
        {formatTime(currentTime)}
      </span>
    </div>
  );
};
export default Timer;
