// kai-luen liang 04/2022
// same as other example, just with bezierVertex

// here we have our colors...
let colorArray = [
  "#08348C",
  "#0A2D73",
  "#F2E394",
  "#F2EBDF",
  "#A61B0F",
  "#736366",
];

let w = [];

let numObjects;

function setup() {
  createCanvas(1280, 720);
  // background("#F2E394");
  background(220);

  numObjects = random(6, 60);

  for (let i = 0; i < numObjects; i++) {
    let x = map(i, 0, numObjects, 50, width - 50);
    w[i] = new Walker(x, 0);
  }
}

function draw() {
  for (let i = 0; i < numObjects; i++) {
    w[i].show();
  }
  
  blendMode(HARD_LIGHT);
}

class Walker {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.color = color(random(colorArray));
    this.strokeCol = color(random(colorArray));

    if (this.strokeCol == this.col) {
      this.strokeCol = color(random(colorArray));
    }

    this.size = floor(random(1, 20));

    this.xMove = 0;
    this.yMove = 0;

    this.yOff = random(200);
    this.amplitude = random(100, 300);
    this.counter = 0;
    this.speed = random(0.5, 2);
    this.direction = 0; //floor(random(0,4));

    noiseSeed(random(100));

    this.alpha = random(100, 200);
  }

  show() {
    
    noFill();
    this.size = noise(this.yOff) * this.amplitude * 2;

    this.rotate = map(sin(this.yOff), 0, 1, 0, 360);

    stroke(this.strokeCol);

    this.alpha = map(noise(this.yOff), 0, 1, 10, 200);
    this.strokeCol.setAlpha(this.alpha);
    // fill(this.color);

    push();
    translate(this.x + this.xMove, this.y + this.yMove);
    rotate(radians(this.rotate));

    beginShape();
    vertex(30, 20);
    bezierVertex(80, 0, cos(this.yOff) * this.amplitude, sin(this.yOff) * this.amplitude, 30 -sin(this.yOff) * this.amplitude, 75);
    endShape();


    this.xMove = noise(this.yOff) * this.amplitude;
    this.yMove += this.speed;
    this.yOff += 0.005;

    pop();
  }
}
