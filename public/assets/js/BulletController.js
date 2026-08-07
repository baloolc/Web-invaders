import Bullet from "/assets/js/Bullet.js";

export default class BulletController {
  bullets = [];
  timeTilNextBullet = 0;

  constructor(canvas, maxBulletsAtTime, bulletColor) {
    this.canvas = canvas;
    this.maxBulletsAtTime = maxBulletsAtTime;
    this.bulletColor = bulletColor;
  }

  collideWith(sprite) {
    const bulletThatHitSpriteIndex = this.bullets.findIndex((bullet) =>
      bullet.collideWith(sprite)
    );

    if (bulletThatHitSpriteIndex >= 0) {
        this.bullets.splice(bulletThatHitSpriteIndex, 1);
        return true;
    }

    return false;
  }

  shoot(x, y, velocity, timeTilNextBullet = 0) {
    if (
      this.timeTilNextBullet <= 0 &&
      this.bullets.length < this.maxBulletsAtTime
    ) {
      const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
      this.bullets.push(bullet);
      this.timeTilNextBullet = timeTilNextBullet;
    }
  }
  draw(ctx) {
    this.bullets = this.bullets.filter(
      (bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height
    );
    this.bullets.forEach((bullet) => bullet.draw(ctx));
    if (this.timeTilNextBullet > 0) {
      this.timeTilNextBullet--;
    }
  }
}
