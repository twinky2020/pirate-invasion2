class CannonBall extends BaseClass {
  constructor(x, y) {
    super(x, y, 40, 40);
    this.image = loadImage("./assets/cannonball.png");
    this.Visiblity = 255;
    this.trajectory = [];
  }

  shoot() {
    var force = p5.Vector.fromAngle(cannon.angle);
    force.mult(20);
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, { x: force.x, y: force.y });
  }

  display() {
    super.display();
    //
    // if (this.body.velocity.x > 10 && this.body.position.x > 300) {
    //   var position = [this.body.position.x, this.body.position.y];
    //   this.trajectory.push(position);
    // }
    // // console.log(this.trajectory.length);
    // for (var i = 0; i < this.trajectory.length; i++) {
    //   push();
    //   this.Visiblity = this.Visiblity - 0.5;
    //   tint(255, this.Visiblity);
    //   image(this.image, this.trajectory[i][0], this.trajectory[i][1], 10, 10);
    //   pop();
    // }
  }
}
