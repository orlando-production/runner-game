import { Button } from '@mui/material';
import React from 'react';
import { GameStates } from '../GamePage';

interface IStartScreenProps {
  setGameState: (state: GameStates) => void;
}

/**
 * Экран начала игры.
 */
const StartScreen = ({ setGameState }: IStartScreenProps) => (
  <Button
    onClick={() => {
      setGameState(GameStates.Proccessed);
    }}
    variant="contained"
    color="success"
  >
    Старт!
  </Button>
);

export default StartScreen;
