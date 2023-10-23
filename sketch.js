const flock = [];
const attractors = [];
let cubeDims, cubeLoc;
// let attraction;
let xoff = 0.0;
let cursorVisibility = true;
let goSim = false;
let flocking = false;
let naturalForces = false;
let attractorsOn = false;
let img, imgLogo;
let xCount = 30;
let yCount = 10;
let alignSlider, separationSlider, cohesionSlider;
let playCheck, flockingCheck, gravityCheck, windCheck, patternCheck;
let radius = 10;

function preload() {
  img = loadImage('assets/03_number.png');
  imgLogo = loadImage('assets/vaisala_logo.png');
  DMSans = loadFont('assets/DMSans-Medium.ttf');
  suisseMono = loadFont('assets/SuisseIntlMono-Regular.otf');
}

function setup() {
  createCanvas(1920 / 2, 1080 / 2, WEBGL);
  pixelDensity(1);

  // alignSlider = createSlider(0.1, 3, 0.5, 0.1);
  // cohesionSlider = createSlider(0.1, 3, 0.5, 0.1);
  // separationSlider = createSlider(1, 3, 0.5, 0.1);

  // playCheck = createCheckbox('Play', false);
  // flockingCheck = createCheckbox('Flocking', false);
  // gravityCheck = createCheckbox('Gravity', false);
  // windCheck = createCheckbox('Wind', false);
  // patternCheck = createCheckbox('Go to Pattern', false);


  cubeDims = createVector(1000, 200, 200);
  cubeLoc = createVector(0, 0, 0);

  // legacy set up for particles and attractors using let
  for (let i = 0; i < yCount; i++) {
    for (let j = 0; j < xCount; j++) {
      // flock.push(new Particle(random(-cubeDims.x/2, cubeDims.x/2), random(-cubeDims.y-2, cubeDims.y/2), random(-cubeDims.z/2, cubeDims.z/2), random(0.01, 20), random(0.5, 10)));
      flock[(i * xCount) + j] = new Particle(map(j, 0, xCount, -cubeDims.x / 2 + (radius / 2), cubeDims.x / 2 - (radius / 2)), map(i, 0, yCount, -cubeDims.y / 2, cubeDims.y / 2), 0, random(1, 100), random(1, 100), random(1, 100), random(radius * 0.5, radius * 2));
    }
  }
  // for (let i = 0; i < 3; i++) {
  //   attractors.push(new Attractor(random(-cubeDims.x / 2, cubeDims.x / 2), random(-cubeDims.y/2, cubeDims.y / 2), 0,10));
  // }
  camera(0, 0, 600);
  drawUI();
}

function draw() {
  lights();
  // ortho();
  orbitControl();
  background(0);
  boundingBox();

  for (let particles of flock) {
    if (playCheck.checked()) {
      particles.update();
    }
    if (flockingCheck.checked()) {
      particles.flock(flock);
    }
    if (gravityCheck.checked()) {
      particles.applyGravity(flock);
    }

    if (windCheck.checked()) {
      particles.applyWind(flock);
    }
    if (patternCheck.checked()) {
      particles.applyAttractors(flock);
    }
    particles.show();
    particles.checkCollision();
  }
}

function boundingBox() {
  push();
  stroke(219, 249, 58,100);
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

// function keyPressed() {
//   if (keyCode == 80 && !goSim) {
//     goSim = true;
//   } else if (keyCode == 80 && goSim) {
//     goSim = false;
//   }
//   if (keyCode == 70 && !flocking) {
//     flocking = true;
//   } else if (keyCode == 70 && flocking) {
//     flocking = false;
//   }
//   if (keyCode == 65 && !attractorsOn) {
//     attractorsOn = true;
//   } else if (keyCode == 65 && attractorsOn) {
//     attractorsOn = false;
//   }
//   if (keyCode == 78 && !naturalForces) {
//     naturalForces = true;
//   } else if (keyCode == 78 && naturalForces) {
//     naturalForces = false;
//   }
// }


// function mousePressed() {
//   attractors.push(new Attractor(mouseX - width / 2, mouseY - height / 2, 0, 10));
// }


