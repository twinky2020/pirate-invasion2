class CannonBall {
  constructor(x, y) {
    var options = {
      density: 0.3,
      restitution: 0.8
    };
    this.r = 40;
    this.body = Bodies.circle(x, y, this.r, options);

    World.add(world, this.body);
  }

  shoot() {
    var force = p5.Vector.fromAngle(cannon.angle);
    force.mult(20);
    Matter.Body.set(this.body, "isStatic", false);
    Matter.Body.setVelocity(this.body, { x: force.x, y: force.y });
  }

  display() {
    var pos = this.body.position;
    var angle = this.body.angle;
    var cannonHeight = cannon.height;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill("yellow");
    ellipse(0, cannonHeight / 2, this.r, this.r);
    pop();
  }
}
