export default class Enemy {
  constructor(x, y, imageNumber, pointsOnKill) {
    this.x = x;
    this.y = y;
    this.width = 44;
    this.height = 44; // Peut etre a changer
    if (pointsOnKill > 20) {
      this.pointsOnKill = pointsOnKill;
    } else if (imageNumber === 1) {
      this.pointsOnKill = 5;
    } else if (imageNumber === 2) {
      this.pointsOnKill = 20;
    } else if (imageNumber === 3) {
      this.pointsOnKill = 20;
    } else if (imageNumber === 4) {
      this.pointsOnKill = 20;
    }

    this.image = new Image();
    this.image.src = `/assets/images/enemy${imageNumber}.png`;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  move(xVelocity, yVelocity) {
    this.x += xVelocity;
    this.y += yVelocity;
  }

  collideWith(sprite) {
    if (
      this.x + this.width > sprite.x &&
      this.x < sprite.x + sprite.width &&
      this.y + this.height > sprite.y &&
      this.y < sprite.y + sprite.height
    ) {
      return true;
    } else {
      return false;
    }
  }
}
