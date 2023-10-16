

class Attractor {
    constructor(x, y, z) {
        this.attractorLoc = createVector(x, y, z);
        //  this.attractorLoc.mult(100);
        this.attractorDims = createVector(10, 10, 0);
        this.attraction = createVector(0, 0, 0);
    }
    update() {
        this.attractorLoc = createVector(mouseX - width / 2, mouseY - height / 2);
        // attraction = p5.Vector.sub(this.attractorLoc, this.location);
        //diff.div(10);
    }

    show() {
        push();
        noStroke();
        fill(255, 0, 0);
        translate(this.attractorLoc.x, this.attractorLoc.y, this.attractorLoc.z);
        sphere(this.attractorDims.x / 2);
        pop();
    }

}
function getForces() {
    for (let i = 0; i < flock.length; i++) {
        let gravity = createVector(0, 2, 0);
        let weight = p5.Vector.mult(gravity, flock[i].mass);
        flock[i].applyForce(weight);
        if (mouseIsPressed) {
            let wind = createVector(0.5, 0, 0);
            flock[i].applyForce(wind);
        }
        flock[i].friction();
        flock[i].checkCollision();
        flock[i].update();
        flock[i].show();
    }

    for (let i = 0; i < attractors.length; i++) {
        attractors[i].update();
        attractors[i].show();
    }
}



