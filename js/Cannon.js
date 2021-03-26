class Cannon {
  constructor(x, y, width, height, angle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
  }
  display() {
    if (keyIsDown(RIGHT_ARROW)) {
      this.angle += 0.05;
    }

    if (keyIsDown(LEFT_ARROW)) {
      this.angle -= 0.02;
    }

    fill("#676e6a");
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    rectMode(CENTER);
    rect(0, 0, this.width, this.height);
    pop();
    arc(this.x - 90, this.y + 80, 180, 200, PI, TWO_PI);
    noFill();
  }
}
