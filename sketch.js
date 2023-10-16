const flock = [];
const attractors = [];
let cubeDims, cubeLoc;
let attraction;

function setup() {
  createCanvas(1920 / 2, 1080 / 2, WEBGL);
  cubeDims = createVector(1920 / 3, 1080 / 3, 1080 / 3);
  cubeLoc = createVector(0, 0, 0);

  for (let i = 0; i < 100; i++) {
    flock.push(new Particle(random(-cubeDims.x/2, cubeDims.x/2), random(-cubeDims.y-2, cubeDims.y/2), random(-cubeDims.z/2, cubeDims.z/2), random(0.01, 20), random(0.5, 10)));
  // print(cubeDims.x);
  }
  for (let i = 0; i < 1; i++) {
    attractors.push(new Attractor(random(-100, 100), random(-100, 100), random(-100, 100)));
  }
}

function draw() {
  orbitControl();
  // lights();
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
  box(cubeDims.x, cubeDims.y, cubeDims.z);
  pop();
}

