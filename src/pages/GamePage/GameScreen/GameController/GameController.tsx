import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { getUserData } from 'selectors/profile';
import { UserResult } from 'services/Profile';
import { addLeaderboardResult } from '../../../../services/Leaderboard';
import ObstacleLine from '../ObstacleLine';
import Player from '../Player';
import image from '../../../../assets/santa.png';
import bg from '../../../../assets/forest.png';
import { GameStates } from '../../GamePage';
import classes from './GameController.module.css';
import { ObstacleTypes } from '../ObstacleLine/ObstacleLine';
import Background from '../Background';

type GameControllerOptions = {
  setGameState: (state: GameStates) => void;
  onPointsChange: (pointsNumber: number) => void;
  setFooterVisible: (visible: boolean) => void;
  isPause: boolean;
};
const PLAYER_SPRITE_WIDTH = 963;
const PLAYER_SPRITE_HEIGHT = 60;
const NUMBER_OF_FRAMES = 11;
const TICKS_PER_FRAME = 10;
const START_SPEED = 1;
const SPEED_UP_COEF = 1;
const TICK_PER_FRAME_COEF = 1;
const MAX_SPEED = 5;
const SPEED_CHANGE_TIME = 2000;

/**
 * Игровой контроллер.
 * Помогает взаимодействовать сущностям на игровой сцене(игрок, препятствия и т.д.)
 */
const GameController = ({
  setGameState,
  onPointsChange,
  setFooterVisible,
  isPause
}: GameControllerOptions) => {
  const playerImage = new Image();
  playerImage.src = image;
  const backgroundImage = new Image();
  backgroundImage.src = bg;

  const canvas = useRef();
  const user = useSelector(getUserData) as UserResult;
  const speedRef = useRef(null);
  const firstUpdate = useRef(true);
  const obstacleLineInstRef = useRef(null);
  const animationIdRef = useRef<number>(null);
  const playerInstRef = useRef(null);
  const backgroundInstRef = useRef(null);
  const [speed, setSpeed] = useState(START_SPEED);
  let speedTimeout: ReturnType<typeof setTimeout> = null;

  const toggleFullScreen = () => {
    const currentCanvas = canvas.current as HTMLCanvasElement;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      currentCanvas.width = window.innerWidth - 50;
      currentCanvas.height = window.innerHeight - 50;
      setFooterVisible(false);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      currentCanvas.width = 800;
      currentCanvas.height = 300;
      setFooterVisible(true);
    }
  };

  const keyDownHandler = (e) => {
    if (e.key === 'Enter') {
      toggleFullScreen();
    }
  };

  const loop = () => {
    if (canvas.current) {
      const currentCanvas = canvas.current as HTMLCanvasElement;
      const canvas2d = currentCanvas.getContext('2d');
      canvas2d.clearRect(0, 0, currentCanvas.width, currentCanvas.height);
      canvas2d.drawImage(
        backgroundImage,
        0,
        0,
        currentCanvas.width,
        currentCanvas.height
      );
      backgroundInstRef.current.update();
      backgroundInstRef.current.render();
      obstacleLineInstRef.current.update();
      obstacleLineInstRef.current.render();
      playerInstRef.current.update();
      playerInstRef.current.render();
      const [firstObstacle] = obstacleLineInstRef.current.obstacles;
      if (
        playerInstRef.current.isShot
        && firstObstacle
        && firstObstacle.canvX >= playerInstRef.current.shotPositionX
        && firstObstacle.canvX
          <= playerInstRef.current.shotPositionX
            + playerInstRef.current.shotLength
        && firstObstacle.canvY + firstObstacle.height
          > playerInstRef.current.shotPositionY
        && firstObstacle.canvY
          < playerInstRef.current.shotPositionY + playerInstRef.current.shotHeight
      ) {
        obstacleLineInstRef.current.obstacleShift();
      }
      if (
        firstObstacle
        && firstObstacle.canvX
          <= playerInstRef.current.position.x
            + playerInstRef.current.position.width / NUMBER_OF_FRAMES
            - 40
        && firstObstacle.canvX >= playerInstRef.current.position.x
        && playerInstRef.current.position.y
          + playerInstRef.current.position.height
          > firstObstacle.canvY
        && playerInstRef.current.position.y
          < firstObstacle.canvY + firstObstacle.height
      ) {
        if (firstObstacle.type === ObstacleTypes.ENEMY) {
          setGameState(GameStates.Finished);
          obstacleLineInstRef.current.clear();
          addLeaderboardResult({
            data: {
              presents: 10,
              name: user.first_name,
              avatar: user.avatar,
              id: user.id
            },
            teamName: 'orlando_production',
            ratingFieldName: 'presents'
          });
        } else if (firstObstacle.type === ObstacleTypes.FRIEND) {
          onPointsChange(firstObstacle.point);
          obstacleLineInstRef.current.obstacleShift();
        }
      }

      animationIdRef.current = window.requestAnimationFrame(loop);
    }
  };
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (isPause) {
      obstacleLineInstRef.current.isPause = true;
      window.cancelAnimationFrame(animationIdRef.current);
    } else {
      animationIdRef.current = window.requestAnimationFrame(loop);
      obstacleLineInstRef.current.isPause = false;
    }
  }, [isPause]);

  useEffect(() => {
    if (canvas && canvas.current) {
      const currentCanvas = canvas.current as HTMLCanvasElement;
      const canvas2d = currentCanvas.getContext('2d');
      currentCanvas.width = 800;
      currentCanvas.height = 300;
      document.addEventListener('keydown', keyDownHandler, false);
      const player = new Player({
        ctx: canvas2d,
        image: playerImage,
        width: PLAYER_SPRITE_WIDTH,
        height: PLAYER_SPRITE_HEIGHT,
        numberOfFrames: NUMBER_OF_FRAMES,
        ticksPerFrame: TICKS_PER_FRAME,
        startPositionX: 0,
        startPositionY: 10
      });
      playerInstRef.current = player;

      const obstacleLine = new ObstacleLine({
        ctx: canvas2d,
        speed
      });

      // eslint-disable-next-line no-new
      const background = new Background({
        ctx: canvas2d
      });
      backgroundInstRef.current = background;
      obstacleLineInstRef.current = obstacleLine;
      animationIdRef.current = window.requestAnimationFrame(loop);
    }
    speedTimeout = setTimeout(function increaseSpeed() {
      if (obstacleLineInstRef.current && speedRef.current < MAX_SPEED) {
        setSpeed((prevSpeed: number) => {
          const newSpeed = prevSpeed + SPEED_UP_COEF;
          return newSpeed;
        });
        obstacleLineInstRef.current.speed = speed;
        // eslint-disable-next-line operator-assignment
        playerInstRef.current.ticksPerFrame = playerInstRef.current.ticksPerFrame - TICK_PER_FRAME_COEF;
        speedTimeout = setTimeout(increaseSpeed, 5000);
      }
    }, SPEED_CHANGE_TIME);
    return () => {
      window.cancelAnimationFrame(animationIdRef.current);
      clearTimeout(speedTimeout);
      document.removeEventListener('keyDown', keyDownHandler);
    };
  }, []);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  return (
    <>
      {isPause && (
        <span className={classes['game-controller__pause-caption']}>ПАУЗА</span>
      )}
      <canvas
        className={classNames(
          classes['game-controller__canvas'],
          isPause ? classes['game-controller__canvas_pause'] : ''
        )}
        ref={canvas}
        data-testid="canvas"
      />
    </>
  );
};

export default GameController;
