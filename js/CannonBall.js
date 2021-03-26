class CannonBall extends BaseClass {
  constructor(x, y) {
    super(x, y, 40, 40);
    this.image = loadImage("./assets/cannonball.png");
  }

  shoot() {
    var force = p5.Vector.fromAngle(cannon.angle);
    force.mult(20);
    Matter.Body.set(this.body, "isStatic", false);
    Matter.Body.setVelocity(this.body, { x: force.x, y: force.y });
  }

  display() {
    super.display();
  }
}
