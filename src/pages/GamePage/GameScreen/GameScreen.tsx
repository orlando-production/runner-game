import React, {
  useEffect,
  useRef
} from 'react';
import { GameStates } from '../GamePage';
import Timer from './Timer';
import GameController from './GameController';

interface IGameScreenProps {
  setGameState: (state: GameStates) => void;
}

const GameScreen = ({ setGameState }: IGameScreenProps) => {
  const timerEl = useRef();
  useEffect(() => {
    if (timerEl.current) {
      (timerEl.current as typeof Timer).startTimer();
    }
  }, []);

  return (
    <div>
      <Timer ref={timerEl} />
      <GameController />
    </div>
  );
};

export default GameScreen;
