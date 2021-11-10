interface IObstacleLineOptions {
  ctx: CanvasRenderingContext2D;
}

interface IObstacle {
  width: number;
  height: number;
  x: number;
  y: number;
}
class ObstacleLine {
  ctx: CanvasRenderingContext2D;

  obstacleArray: IObstacle[];

  speed: number;

  constructor({ ctx }: IObstacleLineOptions) {
    this.ctx = ctx;
    this.obstacleArray = [];
    this.speed = 1;
    setInterval(this.generateObstacle.bind(this), 3000);
  }

  public get obstacles(): object[] {
    return this.obstacleArray;
  }

  generateObstacle() {
    this.obstacleArray.push({
      x: 400,
      y: 200,
      width: Math.floor(Math.random() * 100),
      height: 50
    });
  }

  obstacleShift() {
    this.obstacleArray.shift();
  }

  update() {
    if (this.obstacleArray.length) {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      if (this.obstacleArray[0].x + this.obstacleArray[0].width < 0) {
        this.obstacleShift();
      }
      for (let i = 0; i < this.obstacleArray.length; i += 1) {
        this.obstacleArray[i].x -= this.speed;
      }
    }
  }

  render() {
    if (this.obstacleArray.length) {
      this.ctx.beginPath();
      for (let i = 0; i < this.obstacleArray.length; i += 1) {
        this.ctx.rect(
          this.obstacleArray[i].x,
          this.obstacleArray[i].y,
          this.obstacleArray[i].width,
          this.obstacleArray[i].height
        );
      }
      this.ctx.fill();
      this.ctx.closePath();
    }
  }
}

export default ObstacleLine;
