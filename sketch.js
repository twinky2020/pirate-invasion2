const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, cannonBall, tower, ground, cannon;
var angle;
var balls = [];

function preload() {
  backgroundImg = loadImage("./assets/backgroundpng-new-03-03.png");
}

function setup() {
  canvas = createCanvas(windowWidth - 200, windowHeight - 150);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(width / 2 - 650, height - 280, 250, 560);
  cannon = new Cannon(width / 2 - 600, height / 2 - 220, 120, 40, angle);
}

function draw() {
  background(backgroundImg);
  Engine.update(engine);
  ground.display();

  for (var ball of balls) {
    ball.display();
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
      Matter.World.remove(world, ball.body);
      balls.shift();
    }
  }
  cannon.display();
  tower.display();
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    cannonBall = new CannonBall(cannon.x, cannon.y);
    Matter.Body.set(cannonBall.body, "isStatic", true);
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    cannonBall.shoot();
  }
}
