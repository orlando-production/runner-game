import fireBall from '../../../../assets/fireball.png';

const fireBallImg = new Image();
const NUMBER_FIREBALL_COLUMN_FRAMES = 10;
const NUMBER_FIREBALL_ROW_FRAMES = 4;
fireBallImg.src = fireBall;
type PlayerOptions = {
  ticksPerFrame: number;
  numberOfFrames: number;
  width: number;
  height: number;
  image: HTMLImageElement;
  ctx: CanvasRenderingContext2D;
  startPositionX: number;
  startPositionY: number;
};

type Position = {
  x: number;
  y: number;
  width: number;
  height: number;
};

// Коэффициент свободного падения.
const g = 9.8;

/**
 * Класс игрового персонажа.
 */
class Player {
  // Канвас, на котором все рисуется.
  _ctx: CanvasRenderingContext2D;

  // Спрайт персонажа.
  _image: HTMLImageElement;

  // Текущий отображаемый кадр из спрайта.
  _frameIndex: number;

  // Текущая итерация для кадра.
  _tickCount: number;

  // Количество итераций для кадра(чем больше число, тем медленнее перерисовывается спрайт).
  _ticksPerFrame: number;

  // Количество кадров для анимации.
  _numberOfFrames: number;

  // Общая длина спрайта.
  _width: number;

  // Высота спрайта.
  _height: number;

  // Стартовая позиция игрока по оси X.
  _startPositionX: number;

  // Стартовая позиция игрока по оси Y.
  _startPositionY: number;

  // Длина поражающего элемента игрока.
  _shotLength: number;

  // Текущая позиция игрока по X.
  _curPositionX: number;

  // Текущая позиция игрока по Y.
  _curPositionY: number;

  // Прыгает ли в данный момент игрок.
  _isJumped: boolean;

  // Время, отсчитываемое во время прыжка. Нужно для отрисовки прыжка.
  _jumpTime: number;

  // Наносит ли в текущий момент игрок удар. Нужно для отрисовки удара.
  _isShot: boolean;

  // Сила прыжка.
  _jumpSpeed: number;

  _fireballIndexRow: number;

  _fireballIndexColumn: number;

  _shotHeight: number;

  _shotPositionX: number;

  _shotPositionY: number;

  constructor({
    ticksPerFrame,
    numberOfFrames,
    width,
    height,
    image,
    ctx,
    startPositionX,
    startPositionY
  }: PlayerOptions) {
    this._ctx = ctx;
    this._image = image;
    this._frameIndex = 0;
    this._tickCount = 0;
    this._startPositionX = startPositionX || 0;
    this._startPositionY = startPositionY || 0;
    this._curPositionX = this._startPositionX;
    this._curPositionY = this._startPositionY;
    this._ticksPerFrame = ticksPerFrame || 0;
    this._numberOfFrames = numberOfFrames || 1;
    this._jumpTime = 0;
    this._shotLength = 80;
    this._shotHeight = 65;
    this._jumpSpeed = 50;
    this._width = width;
    this._height = height;
    this._fireballIndexRow = 0;
    this._fireballIndexColumn = 0;

    window.addEventListener('keypress', (e) => {
      if (e.code === 'Space') {
        this._isJumped = true;
      }
      if (e.code === 'KeyK') {
        this.shoot();
      }
    });
  }

  // Пересчет координат для отрисовки.
  update() {
    if (!this._isJumped) {
      this._curPositionY = this._ctx.canvas.height - this._startPositionY - this._height;
      this._tickCount += 1;
      if (this._tickCount > this._ticksPerFrame) {
        this._tickCount = 0;
        if (this._frameIndex < this._numberOfFrames - 1) {
          this._frameIndex += 1;
        } else {
          this._frameIndex = 0;
        }
      }
    } else {
      const curY = this._jumpSpeed * this._jumpTime - (g * this._jumpTime ** 2) / 2;
      if (curY < 0) {
        this._isJumped = false;
        this._jumpTime = 0;
        this._curPositionY = this._ctx.canvas.height - this._startPositionY - this._height;
        return;
      }
      this._curPositionY = this._ctx.canvas.height - this._startPositionY - curY - this._height;
      this._jumpTime += 0.1;
    }
    if (this._isShot) {
      if (
        this._fireballIndexRow + 1 === NUMBER_FIREBALL_ROW_FRAMES
        && this._fireballIndexColumn + 1 === NUMBER_FIREBALL_COLUMN_FRAMES
      ) {
        this._isShot = false;
        this._fireballIndexRow = 0;
        this._fireballIndexColumn = 0;
      }
      if (this._fireballIndexColumn + 1 === NUMBER_FIREBALL_COLUMN_FRAMES) {
        this._fireballIndexColumn = 0;
      } else {
        this._fireballIndexColumn += 1;
      }
      if (this._fireballIndexRow + 1 === NUMBER_FIREBALL_ROW_FRAMES) {
        this._fireballIndexRow = 0;
      } else {
        this._fireballIndexRow += 1;
      }
    }
  }

  public get isShot(): boolean {
    return this._isShot;
  }

  public set ticksPerFrame(value: number) {
    this._ticksPerFrame = value;
  }

  // Функция отрисовки.
  render() {
    this._ctx.drawImage(
      this._image,
      (this._frameIndex * this._width) / this._numberOfFrames,
      0,
      this._width / this._numberOfFrames,
      this._height,
      this._curPositionX,
      this._curPositionY,
      this._width / this._numberOfFrames,
      this._height
    );
    if (this._isShot) {
      this._shotPositionX = this._curPositionX + this._width / this._numberOfFrames / 2;
      this._shotPositionY = this._curPositionY - 5;
      this._ctx.drawImage(
        fireBallImg,
        (this._fireballIndexRow * 2048) / NUMBER_FIREBALL_ROW_FRAMES,
        this._fireballIndexColumn * 384,
        2048 / NUMBER_FIREBALL_ROW_FRAMES,
        3840 / NUMBER_FIREBALL_COLUMN_FRAMES,
        this._shotPositionX,
        this._shotPositionY,
        this._shotLength,
        this._shotHeight
      );
    }
  }

  public get position(): Position {
    return {
      x: this._curPositionX,
      y: this._curPositionY,
      width: this._width,
      height: this._height
    };
  }

  public get shotLength(): number {
    return this._shotLength;
  }

  public get shotHeight(): number {
    return this._shotHeight;
  }

  public get ticksPerFrame(): number {
    return this._ticksPerFrame;
  }

  public get shotPositionX(): number {
    return this._shotPositionX;
  }

  public get shotPositionY(): number {
    return this._shotPositionY;
  }

  // Добавляет состояние удара.
  shoot() {
    this._isShot = true;
  }
}

export default Player;
