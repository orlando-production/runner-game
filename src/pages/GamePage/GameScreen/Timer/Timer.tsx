import React, {
  Ref, useEffect, useImperativeHandle, useState
} from 'react';

export type TimerType = {
  startTimer: () => void;
}

/**
 * Компонент таймера. Отображает прошедшее время.
 */

const second = 1000;
const Timer = (_: { children?: React.ReactNode }, ref: Ref<TimerType>) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [currentInterval, setCurrentInterval] = useState(null);
  const start = () => {
    const interval = setInterval(() => {
      setCurrentTime((curTime) => curTime + 1);
    }, second);
    setCurrentInterval(interval);
  };
  useImperativeHandle(ref, () => ({
    startTimer() {
      start();
    }
  }));
  const formatTime = (seconds: number): string => {
    const secs = Math.floor(seconds % 60);
    const minutes = Math.floor(seconds / 60);
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      secs < 10 ? `0${secs}` : secs
    }`;
  };
  useEffect(
    () => function clear() {
      clearTimeout(currentInterval);
    },
    []
  );

  return <div>{formatTime(currentTime)}</div>;
};
export default Timer;
