interface IPlayerOptions {
  ticksPerFrame: number;
  numberOfFrames: number;
  width: number;
  height: number;
  image: HTMLImageElement;
  ctx: CanvasRenderingContext2D;
}

const g = 10;

class Player {
  ctx: CanvasRenderingContext2D;

  image: HTMLImageElement;

  frameIndex: number;

  tickCount: number;

  ticksPerFrame: any;

  numberOfFrames: any;

  width: any;

  height: any;

  animationId: any;

  startPositionX: number;

  startPositionY: number;

  _shotLength: number;

  curPositionX: number;

  curPositionY: number;

  isJumped: boolean;

  jumpTime: number;

  _isShot: boolean;

  speed: number;

  constructor({
    ticksPerFrame,
    numberOfFrames,
    width,
    height,
    image,
    ctx
  }: IPlayerOptions) {
    this.ctx = ctx;
    this.image = image;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.startPositionX = 0;
    this.startPositionY = 200;
    this.curPositionX = this.startPositionX;
    this.curPositionY = this.startPositionY;
    this.ticksPerFrame = ticksPerFrame || 0;
    this.numberOfFrames = numberOfFrames || 1;
    this.jumpTime = 0;
    this._shotLength = 30;
    this.speed = 40;
    this.width = width;
    this.height = height;
    this.animationId = null;
    window.addEventListener('keypress', (e) => {
      if (e.code === 'Space') {
        this.isJumped = true;
      }
      if (e.code === 'KeyK') {
        this.shoot();
      }
    });
  }

  update() {
    if (!this.isJumped) {
      this.tickCount += 1;
      if (this.tickCount > this.ticksPerFrame) {
        this.tickCount = 0;
        if (this.frameIndex < this.numberOfFrames - 1) {
          this.frameIndex += 1;
        } else {
          this.frameIndex = 0;
        }
      }
    } else {
      const curY = this.speed * this.jumpTime - (g * this.jumpTime ** 2) / 2;
      if (curY < 0) {
        this.isJumped = false;
        this.jumpTime = 0;
        window.cancelAnimationFrame(this.animationId);
        this.curPositionY = this.startPositionY;
        return;
      }
      this.curPositionY = this.startPositionY - curY;
      this.jumpTime += 0.1;
    }
  }

  public get isShot(): boolean {
    return this._isShot;
  }

  render() {
    this.ctx.clearRect(
      this.curPositionX,
      this.curPositionY,
      this.width / this.numberOfFrames,
      this.height
    );
    this.ctx.drawImage(
      this.image,
      (this.frameIndex * this.width) / this.numberOfFrames,
      0,
      this.width / this.numberOfFrames,
      this.height,
      this.curPositionX,
      this.curPositionY,
      this.width / this.numberOfFrames,
      this.height
    );
    if (this._isShot) {
      this.ctx.beginPath();
      this.ctx.fillStyle = 'red';
      this.ctx.rect(
        this.curPositionX + this.width / this.numberOfFrames,
        this.curPositionY + this.height / 2,
        this._shotLength,
        20
      );
      this.ctx.fill();
      this.ctx.closePath();
    }
  }

  public get position(): {
    x: number;
    y: number;
    width: number;
    height: number;
  } {
    return {
      x: this.curPositionX,
      y: this.curPositionY,
      width: this.width,
      height: this.height
    };
  }

  public get shotLength(): number {
    return this._shotLength;
  }

  shoot() {
    this._isShot = true;
    setTimeout(() => {
      this._isShot = false;
    }, 500);
  }
}

export default Player;
