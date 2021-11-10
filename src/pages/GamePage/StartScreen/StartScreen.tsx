import { Button } from '@mui/material';
import React from 'react';
import { GameStates } from '../GamePage';

interface IStartScreenProps {
  setGameState: (state: GameStates) => void;
}
const StartScreen = ({ setGameState }: IStartScreenProps) => (
  <Button
    onClick={() => {
      setGameState(1);
    }}
    variant="contained"
    color="success"
  >
    Старт!
  </Button>
);

export default StartScreen;
