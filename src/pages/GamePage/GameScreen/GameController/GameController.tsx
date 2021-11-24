import React, { useEffect, useRef, useState } from 'react';
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
  setFooterVisible
}: GameControllerOptions) => {
  const canvas = useRef();
  const speedRef = useRef(null);
  const obstacleLineInstRef = useRef(null);
  const playerInstRef = useRef(null);
  const [speed, setSpeed] = useState(START_SPEED);
  const [obstacleLineInst, setObstacleLineInst] = useState(null);
  const [playerInst, setPlayerInst] = useState(null);
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

  useEffect(() => {
    let animationId: number;
    if (canvas && canvas.current) {
      const currentCanvas = canvas.current as HTMLCanvasElement;
      const canvas2d = currentCanvas.getContext('2d');
      currentCanvas.width = 800;
      currentCanvas.height = 300;
      const playerImage = new Image();
      playerImage.src = image;
      const backgroundImage = new Image();
      backgroundImage.src = bg;
      document.addEventListener(
        'keydown',
        (e) => {
          if (e.key === 'Enter') {
            toggleFullScreen();
          }
        },
        false
      );
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
      setPlayerInst(player);

      const obstacleLine = new ObstacleLine({
        ctx: canvas2d,
        speed
      });

      // eslint-disable-next-line no-new
      const background = new Background({
        ctx: canvas2d
      });
      setObstacleLineInst(obstacleLine);
      const start = () => {
        const loop = () => {
          canvas2d.clearRect(0, 0, currentCanvas.width, currentCanvas.height);
          canvas2d.drawImage(
            backgroundImage,
            0,
            0,
            currentCanvas.width,
            currentCanvas.height
          );
          background.update();
          background.render();
          obstacleLine.update();
          obstacleLine.render();
          player.update();
          player.render();
          const [firstObstacle] = obstacleLine.obstacles;
          if (
            player.isShot
            && firstObstacle
            && firstObstacle.canvX >= player.shotPositionX
            && firstObstacle.canvX <= player.shotPositionX + player.shotLength
            && firstObstacle.canvY + firstObstacle.height > player.shotPositionY
            && firstObstacle.canvY < player.shotPositionY + player.shotHeight
          ) {
            obstacleLine.obstacleShift();
          }
          if (
            firstObstacle
            && firstObstacle.canvX
              <= player.position.x
                + player.position.width / NUMBER_OF_FRAMES
                - 40
            && firstObstacle.canvX >= player.position.x
            && player.position.y + player.position.height > firstObstacle.canvY
            && player.position.y < firstObstacle.canvY + firstObstacle.height
          ) {
            if (firstObstacle.type === ObstacleTypes.ENEMY) {
              setGameState(GameStates.Finished);
              obstacleLine.clear();
            } else if (firstObstacle.type === ObstacleTypes.FRIEND) {
              onPointsChange(firstObstacle.point);
              obstacleLine.obstacleShift();
            }
          }

          animationId = window.requestAnimationFrame(loop);
        };
        animationId = window.requestAnimationFrame(loop);
      };
      start();
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
      window.cancelAnimationFrame(animationId);
      clearTimeout(speedTimeout);
    };
  }, []);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    obstacleLineInstRef.current = obstacleLineInst;
  }, [obstacleLineInst]);

  useEffect(() => {
    playerInstRef.current = playerInst;
  }, [playerInst]);

  return (
    <canvas
      className={classes['game-controller__canvas']}
      ref={canvas}
      id="canvas"
    />
  );
};

export default GameController;
