type PlayerOptions = {
  ticksPerFrame: number;
  numberOfFrames: number;
  width: number;
  height: number;
  image: HTMLImageElement;
  ctx: CanvasRenderingContext2D;
}

type Position = {
  x: number;
  y: number;
  width: number;
  height: number;
}

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

  constructor({
    ticksPerFrame,
    numberOfFrames,
    width,
    height,
    image,
    ctx
  }: PlayerOptions) {
    this._ctx = ctx;
    this._image = image;
    this._frameIndex = 0;
    this._tickCount = 0;
    this._startPositionX = 0;
    this._startPositionY = this._ctx.canvas.height - height;
    this._curPositionX = this._startPositionX;
    this._curPositionY = this._startPositionY;
    this._ticksPerFrame = ticksPerFrame || 0;
    this._numberOfFrames = numberOfFrames || 1;
    this._jumpTime = 0;
    this._shotLength = 30;
    this._jumpSpeed = 50;
    this._width = width;
    this._height = height;

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
        this._curPositionY = this._startPositionY;
        return;
      }
      this._curPositionY = this._startPositionY - curY;
      this._jumpTime += 0.1;
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
    this._ctx.clearRect(
      this._curPositionX,
      this._curPositionY,
      this._width / this._numberOfFrames,
      this._height
    );
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
      this._ctx.beginPath();
      this._ctx.fillStyle = 'red';
      this._ctx.fillRect(
        this._curPositionX + this._width / this._numberOfFrames,
        this._curPositionY + this._height / 2,
        this._shotLength,
        20
      );
      this._ctx.fillStyle = 'black';
      this._ctx.closePath();
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

  public get ticksPerFrame(): number {
    return this._ticksPerFrame;
  }

  // Добавляет состояние удара.
  shoot() {
    this._isShot = true;
    setTimeout(() => {
      this._isShot = false;
    }, 500);
  }
}

export default Player;
