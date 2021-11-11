import React, { useEffect, useRef } from 'react';
import { GameStates } from '../GamePage';
import WithRefForwardTimer from './Timer';
import { ITimer } from './Timer/Timer';
import GameController from './GameController';

interface IGameScreenProps {
  setGameState: (state: GameStates) => void;
}
/**
 * Отображает игровой экран.
 */
const GameScreen = ({ setGameState }: IGameScreenProps) => {
  const timerEl = useRef();
  useEffect(() => {
    if (timerEl.current) {
      (timerEl.current as ITimer).startTimer();
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
