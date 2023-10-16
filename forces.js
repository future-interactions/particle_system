

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
        //gravity
        let gravity = createVector(0, 2, 0);
        let weight = p5.Vector.mult(gravity, flock[i].mass);
        // flock[i].applyForce(weight);

        //wind
        if (keyIsPressed === true && keyCode == 87) {
               // let wind = createVector(noise(xoff), 0, 0);
               let wind = createVector(noise(xoff)*10,0,0);
              // print(xoff);
            flock[i].applyForce(wind);
             xoff += 0.1;
        }
        //friction
        // let diff = cubeDims.y / 2 - (flock[i].location.y + flock[i].r);
        // if (diff < 1) {
        //     let friction = flock[i].velocity.copy();
        //     friction.normalize();
        //     friction.mult(-1);
        //     let mu = 0.1;
        //     let normal = flock[i].mass;
        //     friction.setMag(mu * normal);
        //     flock[i].applyForce(friction);

        // }
        //attraction
        let attraction = p5.Vector.sub(attractors[0].attractorLoc,flock[i].location);
        let attractPower = 2;
        if (keyIsPressed === true && keyCode == 65) {

        if (attraction.mag() < (200* attractPower)) {
            attraction.normalize();
            let normal = flock[i].mass;
            attraction.setMag(attractPower * normal);
            flock[i].applyForce(attraction);
        }
    }

        //repulsion
        
        let repulsion = p5.Vector.sub(attractors[0].attractorLoc, flock[i].location);
        let repulsionForce = 1.5;
        if (keyIsPressed === true && keyCode == 82) {
        if (repulsion.mag() < (200 * repulsionForce)) {
            repulsion.normalize();
            repulsion.mult(-1);

            let normal = flock[i].mass;
            repulsion.setMag(repulsionForce * normal);
           flock[i].applyForce(repulsion);
        }
    }


        // flock[i].friction();
        flock[i].checkCollision();
        flock[i].update();
        flock[i].show();
    }

    for (let i = 0; i < attractors.length; i++) {
        attractors[i].update();
       // attractors[i].show();
    }


}




