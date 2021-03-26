class CannonBall {
  constructor(x, y) {
    var options = {
      density: 1.0,
      restitution: 0.8,
      friction: 1.0
    };
    this.r = 40;
    this.body = Bodies.rectangle(x, y, this.r, this.r, options);
    this.image = loadImage("./assets/cannonball.png");
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
    imageMode(CENTER);
    image(this.image, 0, 0, this.r, this.r);
    pop();
  }
}
