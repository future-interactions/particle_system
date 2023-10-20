const flock = [];
const attractors = [];
let cubeDims, cubeLoc;
// let attraction;
let xoff = 0.0;
let cursorVisibility = true;
let goSim = false;
let img, imgLogo;
let xCount = 50;
let yCount = 20;
let alignSlider, separationSlider, cohesionSlider;
let radius =100;

function preload() {
  img = loadImage('assets/03_number.png');
  imgLogo = loadImage('assets/vaisala_logo.png');
}

function setup() {
  createCanvas(1920 / 2, 1080 / 2, WEBGL);
  pixelDensity(1);

  alignSlider = createSlider(0.1, 3, 0.5, 0.1);
  cohesionSlider = createSlider(0.1, 3, 0.5, 0.1);
  separationSlider = createSlider(1, 3, 0.5, 0.1);

  cubeDims = createVector(1000, 400, 200);
  cubeLoc = createVector(0, 0, 0);

  // legacy set up for particles and attractors using let
  for (let i = 0; i < yCount; i++) {
    for (let j = 0; j < xCount; j++) {
      // flock.push(new Particle(random(-cubeDims.x/2, cubeDims.x/2), random(-cubeDims.y-2, cubeDims.y/2), random(-cubeDims.z/2, cubeDims.z/2), random(0.01, 20), random(0.5, 10)));
      flock[(i * xCount) + j] = new Particle(map(j, 0, xCount, -cubeDims.x / 2+(radius/2), cubeDims.x / 2-(radius/2)), map(i, 0, yCount, -cubeDims.y / 2+(radius/2), cubeDims.y / 2-(radius/2)), 0, random(1, 100), random(1, 100), random(1, 100), radius);
    }
  }
  // for (let i = 0; i < 3; i++) {
  //   attractors.push(new Attractor(random(-cubeDims.x / 2, cubeDims.x / 2), random(-cubeDims.y/2, cubeDims.y / 2), 0,10));
  // }


  camera(0, 0, 600);

}

function draw() {
  lights();
  // ortho();
  orbitControl();
  background(0);
  // background(30,53,67); //blue
  //image(img, 0, 0);

  //getForces();
  boundingBox();

  for (let particles of flock) {
    if (goSim) {
      particles.flock(flock);
      particles.update();
    }
    particles.show();
    particles.checkCollision();
    //getForces();

  }
}

function boundingBox() {
  push();
  stroke(219,249,58);
          //fill(219,249,58);//lime

  strokeWeight(1)
  noFill();
  translate(cubeLoc.x, cubeLoc.y, cubeLoc.z);
  box(cubeDims.x, cubeDims.y, cubeDims.z);
  // image(imgLogo, 0-(imgLogo.width*0.1)/2,0, imgLogo.width * 0.1, imgLogo.height * 0.1);
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

function keyPressed() {
  if (keyCode == 71 && !goSim) {
    goSim = true;
  }
}

// function mousePressed() {
//   attractors.push(new Attractor(mouseX - width / 2, mouseY - height / 2, 0, 10));
// }