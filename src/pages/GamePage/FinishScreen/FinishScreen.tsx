import { Button } from '@mui/material';
import React from 'react';
import { GameStates } from '../GamePage';

type FinishScreenProps = {
  setGameState: (state: GameStates) => void;
}

/**
 * Экран окончания игры.
 */
const FinishScreen = ({ setGameState }: FinishScreenProps) => (
  <Button
    onClick={() => {
      setGameState(GameStates.Proccessed);
    }}
    variant="contained"
    color="success"
  >
    Играть еще раз!
  </Button>
);
export default FinishScreen;
