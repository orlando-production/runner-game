import React, { useEffect, useRef } from 'react';
import { GameStates } from '../GamePage';
import WithRefForwardTimer from './Timer';
import { Timer } from './Timer/Timer';
import GameController from './GameController';

type GameScreenProps = {
  setGameState: (state: GameStates) => void;
}
/**
 * Отображает игровой экран.
 */
const GameScreen = ({ setGameState }: GameScreenProps) => {
  const timerEl = useRef();
  useEffect(() => {
    if (timerEl.current) {
      (timerEl.current as Timer).startTimer();
    }
  }, []);

  return (
    <div>
      <WithRefForwardTimer ref={timerEl} />
      <GameController setGameState={setGameState} />
    </div>
  );
};

export default GameScreen;
