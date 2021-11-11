import React, { useEffect, useRef, useState } from 'react';
import ObstacleLine from '../ObstacleLine';
import Player from '../Player';
import image from '../../../../assets/player.png';
import { GameStates } from '../../GamePage';

interface IGameControllerOptions {
  setGameState: (state: GameStates) => void;
}
const PLAYER_SPRITE_WIDTH = 120;
const PLAYER_SPRITE_HEIGHT = 60;
const NUMBER_OF_FRAMES = 3;
const TICKS_PER_FRAME = 30;
const START_SPEED = 1;
const SPEED_UP_COEF = 1;
const TICK_PER_FRAME_COEF = 5;
const MAX_SPEED = 5;
const SPEED_CHANGE_TIME = 2000;

/**
 * Игровой контроллер.
 * Помогает взаимодействовать сущностям на игровой сцене(игрок, препятствия и т.д.)
 */
const GameController = ({ setGameState }: IGameControllerOptions) => {
  const canvas = useRef();
  const speedRef = useRef(null);
  const obstacleLineInstRef = useRef(null);
  const playerInstRef = useRef(null);
  const [speed, setSpeed] = useState(START_SPEED);
  const [obstacleLineInst, setObstacleLineInst] = useState(null);
  const [playerInst, setPlayerInst] = useState(null);
  let speedTimeout: ReturnType<typeof setTimeout> = null;

  useEffect(() => {
    let animationId: number;
    if (canvas && canvas.current) {
      (canvas.current as HTMLCanvasElement).width = 800;
      (canvas.current as HTMLCanvasElement).height = 300;
      const playerImage = new Image();
      playerImage.src = image;

      const player = new Player({
        ctx: (canvas.current as HTMLCanvasElement).getContext('2d'),
        image: playerImage,
        width: PLAYER_SPRITE_WIDTH,
        height: PLAYER_SPRITE_HEIGHT,
        numberOfFrames: NUMBER_OF_FRAMES,
        ticksPerFrame: TICKS_PER_FRAME,
      });
      setPlayerInst(player);

      const obstacleLine = new ObstacleLine({
        ctx: (canvas.current as HTMLCanvasElement).getContext('2d'),
        speed,
      });
      setObstacleLineInst(obstacleLine);
      const start = () => {
        const loop = () => {
          obstacleLine.update();
          obstacleLine.render();
          player.update();
          player.render();
          if (
            player.isShot &&
            obstacleLine.obstacles[0] &&
            obstacleLine.obstacles[0].x <=
              player.position.x +
                player.position.width / NUMBER_OF_FRAMES +
                player.shotLength
          ) {
            obstacleLine.obstacleShift();
          }
          if (
            obstacleLine.obstacles[0] &&
            obstacleLine.obstacles[0].x <=
              player.position.x + player.position.width / NUMBER_OF_FRAMES &&
            obstacleLine.obstacles[0].y - obstacleLine.obstacles[0].height <=
              player.position.y
          ) {
            setGameState(GameStates.Finished);
            obstacleLine.clear();
          }

          animationId = window.requestAnimationFrame(loop);
        };
        animationId = window.requestAnimationFrame(loop);
      };
      start();
    }
    speedTimeout = setTimeout(function increaseSpeed() {
      if (obstacleLineInstRef.current && speedRef.current < MAX_SPEED) {
        setSpeed((prevSpeed: number) => (prevSpeed += SPEED_UP_COEF));
        obstacleLineInstRef.current.speed = speed;
        playerInstRef.current.ticksPerFrame =
          playerInstRef.current.ticksPerFrame - TICK_PER_FRAME_COEF;
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

  return <canvas ref={canvas} id="canvas" />;
};

export default GameController;
