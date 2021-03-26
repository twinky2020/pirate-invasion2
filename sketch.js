const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg, waterSound, cannonExplosion;
var canvas, angle, cannonBall, tower, ground, cannon, boat;
var balls = [];

function preload() {
  backgroundImg = loadImage("./assets/backgroundpng-new-03-03.png");
  waterSound = loadSound("./assets/cannon_water.wav");
  cannonExplosion = loadSound("./assets/cannon_explosion.wav");
}

function setup() {
  canvas = createCanvas(windowWidth - 200, windowHeight - 150);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(width / 2 - 650, height - 290, 250, 580);
  cannon = new Cannon(width / 2 - 600, height / 2 - 220, 120, 40, angle);
  boat = new Boat(width - 200, height - 10, 200, 200);
}

function draw() {
  background(backgroundImg);
  Engine.update(engine);
  ground.display();

  for (var i = 0; i < balls.length; i++) {
    balls[i].display();

    if (
      balls[i].body.position.x >= width ||
      balls[i].body.position.y >= height - 50
    ) {
      waterSound.play();
      Matter.World.remove(world, balls[i].body);
      balls.splice(i, 1);
      i--;
    }
  }

  cannon.display();
  tower.display();
  boat.display();
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    cannonBall = new CannonBall(cannon.x, cannon.y);
    Matter.Body.setStatic(cannonBall.body, true);
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    cannonExplosion.play();
    cannonBall.shoot();
  }
}
