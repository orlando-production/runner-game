import crystalImage from '../../../../assets/Crystal.png';
import crateImage from '../../../../assets/Crate.png';
import iceBoxImage from '../../../../assets/IceBox.png';
import redPresentImage from '../../../../assets/redPresent.png';
import bluePresentImage from '../../../../assets/bluePresent.png';

type ObstacleLineOptions = {
  ctx: CanvasRenderingContext2D;
  speed: number;
};

// eslint-disable-next-line no-shadow
export enum ObstacleTypes {
  'FRIEND' = 1,
  'ENEMY' = 2,
}

type Obstacle = {
  width: number;
  height: number;
  x: number;
  y: number;
  canvX: number;
  canvY: number;
  image: HTMLImageElement;
  type: ObstacleTypes;
  point?: number;
};

const crystalImg = new Image();
crystalImg.src = crystalImage;
const crateImg = new Image();
crateImg.src = crateImage;
const iceBoxImg = new Image();
iceBoxImg.src = iceBoxImage;
const redPresentImg = new Image();
redPresentImg.src = redPresentImage;
const bluePresentImg = new Image();
bluePresentImg.src = bluePresentImage;

const obstacles: Obstacle[] = [
  {
    width: 30,
    height: 30,
    x: null,
    y: null,
    canvX: null,
    canvY: null,
    image: crystalImg,
    type: ObstacleTypes.ENEMY
  },
  {
    width: 40,
    height: 40,
    x: null,
    y: null,
    canvX: null,
    canvY: null,
    image: iceBoxImg,
    type: ObstacleTypes.ENEMY
  },
  {
    width: 50,
    height: 50,
    x: null,
    y: null,
    canvX: null,
    canvY: null,
    image: crateImg,
    type: ObstacleTypes.ENEMY
  },
  {
    width: 30,
    height: 30,
    x: null,
    y: null,
    canvX: null,
    canvY: null,
    image: redPresentImg,
    type: ObstacleTypes.FRIEND,
    point: 1
  },
  {
    width: 30,
    height: 30,
    x: null,
    y: null,
    canvX: null,
    canvY: null,
    image: bluePresentImg,
    type: ObstacleTypes.FRIEND,
    point: 2
  }
];

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
  _timeout: ReturnType<typeof setTimeout>;

  constructor({ ctx, speed }: ObstacleLineOptions) {
    this._ctx = ctx;
    this._obstacleArray = [];
    this._speed = speed;
    this._timeout = setTimeout(this.generateObstacle.bind(this), 3000);
  }

  // Добавление случайного препятствия.
  generateObstacle() {
    const rand = Math.round(0 - 0.5 + Math.random() * obstacles.length);
    this._obstacleArray.push({ ...obstacles[rand] });
    if (
      this._obstacleArray[this._obstacleArray.length - 1].type
      === ObstacleTypes.FRIEND
    ) {
      const randomHeight = Math.round(0 - 0.5 + Math.random() * (9 - 0 + 1));
      this._obstacleArray[this._obstacleArray.length - 1].y = randomHeight * 10;
    } else if (
      this._obstacleArray[this._obstacleArray.length - 1].type
      === ObstacleTypes.ENEMY
    ) {
      this._obstacleArray[this._obstacleArray.length - 1].y = 0;
    }
    this._obstacleArray[this._obstacleArray.length - 1].x = this._ctx.canvas.width;
    this._obstacleArray[this._obstacleArray.length - 1].canvX = this._obstacleArray[this._obstacleArray.length - 1].x;
    const randTimeout = Math.round(
      1000 - 0.5 + Math.random() * (3000 - 1000 + 1)
    );
    this._timeout = setTimeout(this.generateObstacle.bind(this), randTimeout);
  }

  // Удаление первого препятствия.
  obstacleShift() {
    this._obstacleArray.shift();
  }

  // Перерасчет координат препятствий.
  update() {
    if (this._obstacleArray.length) {
      if (this._obstacleArray[0].canvX + this._obstacleArray[0].width < 0) {
        this.obstacleShift();
      }
      for (let i = 0; i < this._obstacleArray.length; i += 1) {
        this._obstacleArray[i].canvX -= this._speed;
        this._obstacleArray[i].canvY = this._ctx.canvas.height
          - this._obstacleArray[i].y
          - 18
          - this._obstacleArray[i].height;
      }
    }
  }

  // Очищение.
  clear() {
    clearTimeout(this._timeout);
  }

  // Рендер препятствий.
  render() {
    if (this._obstacleArray.length) {
      for (let i = 0; i < this._obstacleArray.length; i += 1) {
        this._ctx.drawImage(
          this._obstacleArray[i].image,
          this._obstacleArray[i].canvX,
          this._obstacleArray[i].canvY,
          this._obstacleArray[i].width,
          this._obstacleArray[i].height
        );
      }
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
