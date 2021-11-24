type Particle = {
  x: number;
  y: number;
  r: number;
  d: number;
};

type BackgroundOptions = {
  ctx: CanvasRenderingContext2D;
};

const MAX_PARTICLES = 15;

const MAX_SPEED = 5;

class Background {
  _particles: Particle[];

  _ctx: CanvasRenderingContext2D;

  _angle: number;

  _speed: number;

  constructor({ ctx }: BackgroundOptions) {
    this._particles = [];
    this._ctx = ctx;
    this._speed = 0;
    this._angle = 0;
    for (let i = 0; i < MAX_PARTICLES; i += 1) {
      this._particles.push({
        x: Math.random() * this._ctx.canvas.width,
        y: Math.random() * this._ctx.canvas.height,
        r: Math.random() * 4 + 1,
        d: Math.random() * MAX_PARTICLES
      });
    }
  }

  render() {
    this._ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    this._ctx.beginPath();
    for (let i = 0; i < MAX_PARTICLES; i += 1) {
      const p = this._particles[i];
      this._ctx.moveTo(p.x, p.y);
      this._ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    }
    this._ctx.fill();
    this.update();
  }

  update() {
    if (this._speed === MAX_SPEED) {
      this._speed = 0;
    }
    if (!this._speed) {
      this._angle += 0.01;
      for (let i = 0; i < MAX_PARTICLES; i += 1) {
        const p = this._particles[i];
        p.y += Math.cos(this._angle + p.d) + 1 + p.r / 2;
        p.x += Math.sin(this._angle) * 2;
        if (
          p.x > this._ctx.canvas.width + 5
          || p.x < -5
          || p.y > this._ctx.canvas.height
        ) {
          if (i % 3 > 0) {
            this._particles[i] = {
              x: Math.random() * this._ctx.canvas.width,
              y: -10,
              r: p.r,
              d: p.d
            };
          } else if (Math.sin(this._angle) > 0) {
            this._particles[i] = {
              x: -5,
              y: Math.random() * this._ctx.canvas.height,
              r: p.r,
              d: p.d
            };
          } else {
            this._particles[i] = {
              x: this._ctx.canvas.width + 5,
              y: Math.random() * this._ctx.canvas.height,
              r: p.r,
              d: p.d
            };
          }
        }
      }
      this._speed += 1;
    } else {
      this._speed += 1;
    }
  }
}

export default Background;
