const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg, waterSound, backgroundMusic, cannonExplosion;
var canvas, angle, tower, ground, cannon, boat;
var balls = [];
var boats = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  backgroundMusic = loadSound("./assets/background_music.wav");
  waterSound = loadSound("./assets/cannon_water.wav");
  cannonExplosion = loadSound("./assets/cannon_explosion.wav");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(windowWidth - 200, windowHeight - 150);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(width / 2 - 650, height - 290, 250, 580);
  cannon = new Cannon(width / 2 - 600, height / 2 - 220, 120, 40, angle);
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  if (!backgroundMusic.isPlaying()) {
    backgroundMusic.play();
    backgroundMusic.setVolume(0.1);
  }

  Engine.update(engine);
  ground.display();

  showBoats();

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
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

  cannon.display();
  tower.display();
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    Matter.Body.setStatic(cannonBall.body, true);
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
    // waterSound.play();
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}

function showBoats() {
  if (boats.length > 0) {
    if (
      boats.length < 4 &&
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-130, -100, -120, -80];
      var position = random(positions);
      var boat = new Boat(width, height - 100, 200, 200, position);
      boats.push(boat);
    }

    for (var i = 0; i < boats.length; i++) {
      Matter.Body.setVelocity(boats[i].body, {
        x: -0.5,
        y: 0
      });

      boats[i].display();
    }
  } else {
    var boat = new Boat(width, height - 100, 200, 200, -100);
    boats.push(boat);
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    cannonExplosion.play();
    balls[balls.length - 1].shoot();
  }
}
