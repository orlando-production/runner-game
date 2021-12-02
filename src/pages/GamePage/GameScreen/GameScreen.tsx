import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react';
import { GameStates } from '../GamePage';
import WithRefForwardTimer from './Timer';
import { TimerType } from './Timer/Timer';
import GameController from './GameController';
import classes from './GameScreen.module.css';
import presentImg from '../../../assets/bluePresent.png';
import pauseImg from '../../../assets/pause.png';
import playImg from '../../../assets/play.png';

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
  const [isPause, setPause] = useState<boolean>(false);
  const firstUpdate = useRef(true);

  const addPoints = (pointsNumber: number) => {
    setPoints((prev: number) => prev + pointsNumber);
  };
  const pageVisibilityChangeHandler = () => {
    if (document.hidden) {
      setPause(true);
    } else {
      setPause(false);
    }
  };

  useEffect(() => {
    if (timerEl.current) {
      (timerEl.current as TimerType).startTimer();
    }
    document.addEventListener('visibilitychange', pageVisibilityChangeHandler);
    return () => {
      document.removeEventListener(
        'visibilitychange',
        pageVisibilityChangeHandler
      );
    };
  }, []);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (isPause) {
      (timerEl.current as TimerType).stopTimer();
    } else {
      (timerEl.current as TimerType).startTimer();
    }
  }, [isPause]);

  return (
    <div className={classes['game-screen']}>
      <div className={classes['game-screen__header']}>
        <WithRefForwardTimer ref={timerEl} />
        <div className={classes['game-screen__points']} aria-label="подарки">
          {points}
          <img
            alt="present"
            src={presentImg}
            className={classes['game-screen__present-img']}
          />
        </div>
      </div>
      {isPause ? (
        <button
          className={classes['game-screen__change-pause-button']}
          type="button"
          onClick={() => {
            setPause(false);
          }}
        >
          <img
            src={playImg}
            alt="play"
            className={classes['game-screen__change-pause-img']}
          />
        </button>
      ) : (
        <button
          className={classes['game-screen__change-pause-button']}
          type="button"
          onClick={() => {
            setPause(true);
          }}
        >
          <img
            src={pauseImg}
            alt="pause"
            className={classes['game-screen__change-pause-img']}
          />
        </button>
      )}
      <GameController
        isPause={isPause}
        setGameState={setGameState}
        onPointsChange={addPoints}
        points={points}
        setFooterVisible={setFooterVisible}
      />
    </div>
  );
};

export default GameScreen;
