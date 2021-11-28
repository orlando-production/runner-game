import { Button } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { GameStates } from '../GamePage';
import classes from './FinishScreen.module.css';

type FinishScreenProps = {
  setGameState: (state: GameStates) => void;
  points: number;
};

/**
 * Экран окончания игры.
 */
const FinishScreen = ({ setGameState, points }: FinishScreenProps) => {
  const history = useHistory();
  return (
    <div className={classes['finish-screen']}>
      <div className={classes['finish-screen__results']}>
        {`Молодец! Ты помог дедушке собрать ${points}
        подарков!`}
      </div>
      <Button
        onClick={() => {
          setGameState(GameStates.Proccessed);
        }}
        variant="contained"
        size="large"
      >
        Играть еще раз!
      </Button>
      <div className={classes['finish-screen__rating-button']}>
        <Button
          onClick={() => {
            history.push('/leaderboard');
          }}
          variant="contained"
          size="large"
          color="secondary"
        >
          Рейтинг
        </Button>
      </div>
    </div>
  );
};
export default FinishScreen;
