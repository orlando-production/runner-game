import React, { useState } from "react";
import FinishScreen from "./FinishScreen";
import GameScreen from "./GameScreen";
import StartScreen from "./StartScreen";

export enum GameStates {
  Started = 0,
  Proccessed = 1,
  Finished = 2,
}

const GamePage = () => {
  const [gameState, setGameState] = useState<GameStates>(1);
  switch (gameState) {
    case 0:
      return <StartScreen setGameState={setGameState} />;

    case 1:
      return <GameScreen setGameState={setGameState} />;

    case 2:
      return <FinishScreen />;
    default:
      return <StartScreen setGameState={setGameState} />;
  }
};
export default GamePage;
