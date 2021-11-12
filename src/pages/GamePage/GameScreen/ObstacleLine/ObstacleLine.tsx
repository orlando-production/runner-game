type ObstacleLineOptions = {
  ctx: CanvasRenderingContext2D;
  speed: number;
}

type Obstacle = {
  width: number;
  height: number;
  x: number;
  y: number;
}

/**
 * Класс для отображения препятствий.
 */
class ObstacleLine {
  // Канвас, на котором отрисовывается игра.
  _ctx: CanvasRenderingContext2D;

  // Массив с параметрами препятствия.
  _obstacleArray: Obstacle[];

  // Скорость движения препятствий.
  _speed: number;

  // Случайный интервал, на котором создаются препятствия.
  _interval: ReturnType<typeof setInterval>;

  constructor({ ctx, speed }: ObstacleLineOptions) {
    this._ctx = ctx;
    this._obstacleArray = [];
    this._speed = speed;
    this._interval = setInterval(this.generateObstacle.bind(this), 3000);
  }

  // Добавление случайного препятствия.
  generateObstacle() {
    const height = 30;
    this._obstacleArray.push({
      x: this._ctx.canvas.width,
      y: this._ctx.canvas.height - height,
      width: Math.floor(Math.random() * 100),
      height
    });
  }

  // Удаление первого препятствия.
  obstacleShift() {
    this._obstacleArray.shift();
  }

  // Перерасчет координат препятствий.
  update() {
    if (this._obstacleArray.length) {
      this._ctx.clearRect(
        0,
        0,
        this._ctx.canvas.width,
        this._ctx.canvas.height
      );
      if (this._obstacleArray[0].x + this._obstacleArray[0].width < 0) {
        this.obstacleShift();
      }
      for (let i = 0; i < this._obstacleArray.length; i += 1) {
        this._obstacleArray[i].x -= this._speed;
      }
    }
  }

  // Очищение.
  clear() {
    clearInterval(this._interval);
  }

  // Рендер препятствий.
  render() {
    if (this._obstacleArray.length) {
      this._ctx.beginPath();
      for (let i = 0; i < this._obstacleArray.length; i += 1) {
        this._ctx.rect(
          this._obstacleArray[i].x,
          this._obstacleArray[i].y,
          this._obstacleArray[i].width,
          this._obstacleArray[i].height
        );
      }
      this._ctx.fill();
      this._ctx.closePath();
    }
  }

  public set speed(value: number) {
    this._speed = value;
  }

  public get obstacles(): Obstacle[] {
    return this._obstacleArray;
  }
}

export default ObstacleLine;
