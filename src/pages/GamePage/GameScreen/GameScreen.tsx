import React, {
  Dispatch, SetStateAction, useEffect, useRef
} from 'react';
import { GameStates } from '../GamePage';
import WithRefForwardTimer from './Timer';
import { TimerType } from './Timer/Timer';
import GameController from './GameController';
import classes from './GameScreen.module.css';
import presentImg from '../../../assets/bluePresent.png';

type GameScreenProps = {
  setGameState: Dispatch<SetStateAction<GameStates>>;
  setFooterVisible: Dispatch<SetStateAction<boolean>>;
  points: number;
  setPoints: Dispatch<SetStateAction<number>>;
};
/**
 * Отображает игровой экран.
 */
const GameScreen = ({
  setGameState,
  setFooterVisible,
  points,
  setPoints
}: GameScreenProps) => {
  const timerEl = useRef();
  const addPoints = (pointsNumber: number) => {
    setPoints((prev: number) => prev + pointsNumber);
  };
  useEffect(() => {
    if (timerEl.current) {
      (timerEl.current as TimerType).startTimer();
    }
  }, []);

  return (
    <div>
      <div className={classes['game-screen__header']}>
        <WithRefForwardTimer ref={timerEl} />
        <div className={classes['game-screen__points']}>
          {points}
          <img
            alt="present"
            src={presentImg}
            className={classes['game-screen__present-img']}
          />
        </div>
      </div>
      <GameController
        setGameState={setGameState}
        onPointsChange={addPoints}
        setFooterVisible={setFooterVisible}
      />
    </div>
  );
};

export default GameScreen;
