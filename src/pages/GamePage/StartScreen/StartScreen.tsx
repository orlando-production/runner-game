import { Button } from '@mui/material';
import React from 'react';
import { GameStates } from '../GamePage';

type StartScreenProps = {
  setGameState: (state: GameStates) => void;
}

/**
 * Экран начала игры.
 */
const StartScreen = ({ setGameState }: StartScreenProps) => (
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
