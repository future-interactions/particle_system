const flock = [];
const attractors = [];
let cubeDims, cubeLoc;
// let attraction;
let xoff = 0.0;
let cursorVisibility = true;

function setup() {
  createCanvas(1920, 1080 / 2, WEBGL);
  pixelDensity(4);
  camera(0, 0, 300);
  cubeDims = createVector(1920 * 0.9, 1080 / 5, 300);
  cubeLoc = createVector(0, 0, 0);

  for (let i = 0; i < 4000; i++) {
    // flock.push(new Particle(random(-cubeDims.x/2, cubeDims.x/2), random(-cubeDims.y-2, cubeDims.y/2), random(-cubeDims.z/2, cubeDims.z/2), random(0.01, 20), random(0.5, 10)));
    flock[i] = new Particle(random(-cubeDims.x / 2, cubeDims.x / 2), random(-cubeDims.y - 2, cubeDims.y / 2), random(-cubeDims.z / 2, cubeDims.z / 2), random(0.01, 20), random(1, 5));
  }
  for (let i = 0; i < 1; i++) {
    attractors.push(new Attractor(random(-100, 100), random(-100, 100), random(-100, 100),5));
  }
}

function draw() {
  orbitControl();
  lights();
  //ortho();
  background(0);
  getForces();
  boundingBox();
}

function boundingBox() {
  push();
  stroke(255, 200);
  strokeWeight(1)
  noFill();
  translate(cubeLoc.x, cubeLoc.y, cubeLoc.z);
 // box(cubeDims.x, cubeDims.y, cubeDims.z);
  pop();
}


function keyPressed() {
  if (keyCode == 67 && cursorVisibility) {
    noCursor();
    cursorVisibility = false;
  } else if (keyCode == 67 && !cursorVisibility) {
    cursor();
    cursorVisibility = true;
  }

}