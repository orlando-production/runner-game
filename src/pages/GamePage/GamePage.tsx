import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
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
import HelpPopup from './HelpPopup/HelpPopup';

// eslint-disable-next-line no-shadow
export enum GameStates {
  NotStarted = 0,
  Proccessed = 1,
  Finished = 2,
}

const GamePage = () => {
  if (process.env.RENDER_TYPE === 'server') {
    // eslint-disable-next-line no-console
    console.log('server mode');
    return null;
  }

  const [gameState, setGameState] = useState<GameStates>(GameStates.NotStarted);
  const [isFooterVisible, setFooterVisible] = useState<boolean>(true);
  const [points, setPoints] = useState(0);
  const [openenedHelpPopup, setOpenedHelpPopup] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpenedHelpPopup(true);
  };

  const handleClose = () => {
    setOpenedHelpPopup(false);
  };

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
    <div className={classNames(commonStyles.page, classes['game-page'])}>
      <div
        className={classNames(
          commonStyles.container,
          classes['game-page__background']
        )}
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
            <button onClick={handleClickOpen} type="button">
              <img
                alt="sign"
                src={sign}
                className={classes['game-page__sign-image']}
              />
            </button>
          </div>
          <HelpPopup open={openenedHelpPopup} onClose={handleClose} />
          <Footer />
        </>
      )}
    </div>
  );
};
export default GamePage;
