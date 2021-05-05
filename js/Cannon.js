class Cannon {
  constructor(x, y, width, height, angle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
    this.image2 = loadImage("./assets/cannon_base.png");
    this.image1 = loadImage("./assets/cannon.png");
  }
  display() {
    if (keyIsDown(RIGHT_ARROW) && this.angle < 0.1) {
      this.angle += 0.01;
    }

    if (keyIsDown(LEFT_ARROW) && this.angle > -1.45) {
      this.angle -= 0.01;
    }

    fill("#676e6a");
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.image1, -10, -25, this.width, this.height + 20);
    pop();
    image(this.image2, this.x - 180, this.y - 120, 300, 230);
  }
}
