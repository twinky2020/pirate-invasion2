class CannonBall {
  constructor(x, y, r) {
    var options = {
      restitution: 0.8,
      friction: 1.0,
      density: 1.0
    };
    this.body = Bodies.circle(x, y, r, options);

    this.r = r;
    // this.trajectory = [];
    // this.Visiblity = 255;
    this.image = loadImage("./assets/cannonball.png");
    World.add(world, this.body);
  }

  shoot() {
    var velocity = p5.Vector.fromAngle(cannon.angle);
    velocity.mult(20);
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, { x: velocity.x, y: velocity.y });
  }

  display() {
    // if (this.body.velocity.x > 10 && this.body.position.x > 200) {
    //   var position = [this.body.position.x, this.body.position.y];
    //   this.trajectory.push(position);
    // }
    //
    // for (var i = 0; i < this.trajectory.length; i++) {
    //   push();
    //   this.Visiblity = this.Visiblity - 0.5;
    //   tint(255, this.Visiblity);
    //   image(this.image, this.trajectory[i][0], this.trajectory[i][1], 10, 10);
    //   pop();
    // }

    var angle = this.body.angle;
    var pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.r, this.r);
    pop();
  }
}
