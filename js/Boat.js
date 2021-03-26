class Boat extends BaseClass {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.image = loadImage("assets/boat.png");
    Matter.Body.setVelocity(this.body, { x: -18, y: 0 });
  }
  display() {
    super.display();
  }
}
