const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg, waterSound, backgroundMusic, cannonExplosion;
var canvas, angle, cannonBall, tower, ground, cannon, boat;
var balls = [];
var boats = [];
var posX;

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  backgroundMusic = loadSound("./assets/background_music.wav");
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
  posX = width - 200;
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  if (!backgroundMusic.isPlaying()) {
    backgroundMusic.play();
    // backgroundMusic.loop();
  }

  Engine.update(engine);
  ground.display();

  drawCannonBalls();
  drawBoats();
  cannon.display();
  tower.display();

  for (var i = 0; i < balls.length; i++) {
    for (var j = 0; j < boats.length; j++) {
      if (balls[i] !== undefined && boats[j] !== undefined) {
        var collision = Matter.SAT.collides(balls[i].body, boats[j].body);
        if (collision.collided) {
          Matter.World.remove(world, balls[i].body);
          balls.splice(i, 1);
          i--;

          Matter.World.remove(world, boats[j].body);
          boats.splice(j, 1);
          j--;
        }
      }
    }
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    cannonBall = new CannonBall(cannon.x, cannon.y);
    Matter.Body.setStatic(cannonBall.body, true);
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function drawCannonBalls() {
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
}

function drawBoats() {
  if (boats.length < 2) {
    var boat = new Boat(posX, height - 100, 200, 200);
    boats.push(boat);
    posX += 150;
  }

  for (var i = 0; i < boats.length; i++) {
    Matter.Body.setVelocity(boats[i].body, { x: -0.9, y: 0 });
    boats[i].display();
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    cannonExplosion.play();
    cannonBall.shoot();
  }
}
