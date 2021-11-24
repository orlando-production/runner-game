import React, { useEffect, useState } from 'react';
import Footer from '../../components/footer';
import FinishScreen from './FinishScreen';
import GameScreen from './GameScreen';
import StartScreen from './StartScreen';
import background from '../../assets/background.jpg';
import classes from './GamePage.module.css';
import snowDrift from '../../assets/snowdrift.png';
import commonStyles from '../../components/common.module.css';
import snowMan from '../../assets/SnowMan.png';
import sign from '../../assets/Sign.png';

// eslint-disable-next-line no-shadow
export enum GameStates {
  NotStarted = 0,
  Proccessed = 1,
  Finished = 2,
}

const GamePage = () => {
  const [gameState, setGameState] = useState<GameStates>(GameStates.NotStarted);
  const [isFooterVisible, setFooterVisible] = useState<boolean>(true);
  const [points, setPoints] = useState(0);
  useEffect(() => {
    if (gameState === 1) {
      setPoints(0);
    }
  }, [gameState]);
  const renderMainContent = (state: GameStates): React.ReactElement => {
    switch (state) {
      case 0:
        return <StartScreen setGameState={setGameState} />;

      case 1:
        return (
          <GameScreen
            setGameState={setGameState}
            points={points}
            setPoints={setPoints}
            setFooterVisible={setFooterVisible}
          />
        );

      case 2:
        return <FinishScreen points={points} setGameState={setGameState} />;

      default:
        return <StartScreen setGameState={setGameState} />;
    }
  };

  return (
    <div className={commonStyles.page}>
      <div
        className={commonStyles.container}
        style={{ backgroundImage: `url(${background})` }}
      >
        <>{renderMainContent(gameState)}</>
      </div>
      {isFooterVisible && (
        <>
          <div>
            <img
              src={snowDrift}
              alt="snowDrift"
              className={classes['game-page__snow-drift-image']}
            />
            <img
              src={snowMan}
              alt="snowMan"
              className={classes['game-page__snow-man-image']}
            />
            <img
              alt="sign"
              src={sign}
              className={classes['game-page__sign-image']}
            />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};
export default GamePage;
