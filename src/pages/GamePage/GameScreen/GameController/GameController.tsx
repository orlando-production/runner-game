import React, { useEffect, useRef } from 'react';
import ObstacleLine from '../ObstacleLine';
import Player from '../Player';
import image from '../../../../assets/player.png';

const GameController = () => {
  const canvas = useRef();

  useEffect(() => {
    if (canvas && canvas.current) {
      (canvas.current as HTMLCanvasElement).width = 300;
      (canvas.current as HTMLCanvasElement).height = 300;
      const coinImage = new Image();
      coinImage.src = image;

      const sprite = new Player({
        ctx: (canvas.current as HTMLCanvasElement).getContext('2d'),
        image: coinImage,
        width: 120,
        height: 60,
        numberOfFrames: 3,
        ticksPerFrame: 15,
      });

      const obstacleLine = new ObstacleLine({
        ctx: (canvas.current as HTMLCanvasElement).getContext('2d'),
      });
      const start = () => {
        const loop = () => {
          obstacleLine.update();
          obstacleLine.render();
          sprite.update();
          sprite.render();
          if (
            sprite.isShot &&
            obstacleLine.obstacles[0] &&
            obstacleLine.obstacles[0].x <=
              sprite.position.x + sprite.position.width / 3 + sprite.shotLength
          ) {
            obstacleLine.obstacleShift();
          }
          if (
            obstacleLine.obstacles[0] &&
            obstacleLine.obstacles[0].x <=
              sprite.position.x + sprite.position.width / 3 &&
            obstacleLine.obstacles[0].y - obstacleLine.obstacles[0].height <=
              sprite.position.y
          ) {
            console.log('lose');
          }

          window.requestAnimationFrame(loop);
        };

        window.requestAnimationFrame(loop);
      };
      start();
    }
  }, []);
  return <canvas ref={canvas} id="canvas" />;
};

export default GameController;
