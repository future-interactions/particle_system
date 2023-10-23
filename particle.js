class Particle {
    constructor(x, y, z, vx, vy, vz, d) {
        this.location = createVector(x, y, z);
        this.startLoc = p5.Vector.copy(this.location);
        this.velocity = p5.Vector.random3D();
        this.acceleration = createVector(0, 0, 0);
        this.dims = createVector(d, d, d);
        // print(d);
        this.r = sqrt(d);
        this.mass = createVector(d, d, d);;
        this.maxSpeed = 5;
        this.maxForce = 1;
        this.color = p5.Vector.random3D();
        //
    }
    applyForce(force) {
        // print(force);
        // let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(force);
    }

    align(particles) {
     
            let steering = createVector();
            let perceptionRadius = 350;
            let total = 0;
            for (let other of particles) {
                let d = dist(this.location.x, this.location.y, this.location.x, other.location.x, other.location.y, other.location.z);
                if (other != this && d < perceptionRadius) {
                    steering.add(other.velocity);
                    total++;
                }
            }
            if (total > 0) {
                steering.div(total);
                steering.setMag(this.maxSpeed);
                steering.sub(this.velocity);
                steering.limit(this.maxForce);
                steering.mult(alignSlider.value());
                return (steering);
            }
        
    }

    cohesion(particles) {
       
            let steering = createVector();
            let perceptionRadius = 100;
            let total = 0;
            for (let other of particles) {
                let d = dist(this.location.x, this.location.y, this.location.x, other.location.x, other.location.y, other.location.z);
                if (other != this && d < perceptionRadius) {
                    steering.add(other.location);
                    total++;
                }
            }
            if (total > 0) {
                steering.div(total);
                steering.sub(this.location);
                steering.setMag(this.maxSpeed);
                steering.sub(this.velocity);
                steering.limit(this.maxForce);
                steering.mult(cohesionSlider.value());
                return (steering);
            }
        
    }

    separation(particles) {
       
            let steering = createVector();
            let perceptionRadius = 100;
            let total = 0;
            for (let other of particles) {
                let d = dist(this.location.x, this.location.y, this.location.x, other.location.x, other.location.y, other.location.z);
                if (other != this && d < perceptionRadius) {
                    let diff = p5.Vector.sub(this.location, other.location);
                    diff.div(d);
                    steering.add(diff);
                    total++;
                }
            }
            if (total > 0) {
                steering.div(total);
                steering.setMag(this.maxSpeed);
                steering.sub(this.velocity);
                steering.limit(this.maxForce);
                steering.mult(separationSlider.value());
                return (steering);
            }
        
    }

    returnToStart(particles) {
            //   let startPositions = this.startLoc;
           let steering = p5.Vector.sub(this.startLoc, this.location);
            let slowRadius = 30;
            let distance = steering.mag();
            if (distance<slowRadius){
                let speed = map(distance,0,slowRadius,0,this.maxSpeed);
                steering.setMag(speed);            
            }else{
                steering.setMag(this.maxSpeed);
            }      
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
            return (steering);
    }
    
    flock(particles) {

        let sep = this.separation(particles);   // Separation
        let ali = this.align(particles);      // Alignment
        let coh = this.cohesion(particles);   // Cohesion
  
        this.applyForce(sep);
        this.applyForce(ali);
        this.applyForce(coh);
       
    }

    applyGravity(particles){
        let gr = this.gravity(particles);
        this.applyForce(gr);
    }

   applyWind(particles){
        let wi = this.wind(particles);       
        this.applyForce(wi);
    }


    applyAttractors(particles){
        let ret = this.returnToStart(particles);
        this.applyForce(ret);
    }
    wind(particles) {
        if (windCheck.checked()) {
            let wind = createVector(0.1, 0, 0);
          return(wind);
        }
    }

    gravity(particles) {

        if (gravityCheck.checked()) {

            let gravity = createVector(0, 0.01, 0);
            let weight = p5.Vector.mult(gravity, this.mass);
            return(weight);
        }
    }


    update() {

        this.location.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);//limits the strength of the velocity
        this.acceleration.mult(0);

    }

    show() {
        push();
        noStroke();
        fill(255);
        // fill(this.color.x * 255, this.color.y * 255, this.color.z * 255);
        //fill(219,249,58);//lime
        // fill(239, 183, 255);//pink

        translate(this.location.x, this.location.y, this.location.z);
        sphere(this.r / 2);
        // point(0, 0);
        // ellipse(0, 0, this.r / 2);
        pop();

    }



    checkCollision() {
        //bounce
        //     if (this.location.x >= cubeDims.x / 2 - (this.dims.x / 4)) {
        //         this.location.x = cubeDims.x / 2 - (this.dims.x / 4);
        //         this.velocity.x = this.velocity.x * -1;
        //     } else if (this.location.x <= -cubeDims.x / 2 + (this.dims.x / 4)) {
        //         this.location.x = -cubeDims.x / 2 + (this.dims.x / 4);
        //         this.velocity.x = this.velocity.x * -1;
        //     }
        //     if (this.location.y >= cubeDims.y / 2 - (this.dims.y / 4)) {
        //         this.location.y = cubeDims.y / 2 - (this.dims.y / 4);
        //         this.velocity.y = this.velocity.y * -1;
        //     } else if (this.location.y <= -cubeDims.y / 2 + (this.dims.y / 4)) {
        //         this.location.y = -cubeDims.y / 2 + (this.dims.y / 4);
        //         this.velocity.y = this.velocity.y * -1;
        //     }
        //     if (this.location.z >= cubeDims.z / 2 - (this.dims.z / 4)) {
        //         this.location.z = cubeDims.z / 2 - (this.dims.z / 4);
        //         this.velocity.z = this.velocity.z * -1;
        //     } else if (this.location.z <= -cubeDims.z / 2 + (this.dims.z / 4)) {
        //         this.location.z = -cubeDims.z / 2 + (this.dims.z / 4);
        //         this.velocity.z = this.velocity.z * -1;
        //     }
        // }
        //tunnel

        if (this.location.x >= cubeDims.x / 2 - (this.dims.x / 4)) {
            this.location.x = -cubeDims.x / 2 + (this.dims.x / 4);
        } else if (this.location.x <= -cubeDims.x / 2 + (this.dims.x / 4)) {
            this.location.x = cubeDims.x / 2 - (this.dims.x / 4);
        }
        if (this.location.y >= cubeDims.y / 2 - (this.dims.y / 4)) {
            this.location.y = cubeDims.y / 2 - (this.dims.y / 4);
            this.velocity.y = this.velocity.y * -1;
        } else if (this.location.y <= -cubeDims.y / 2 + (this.dims.y / 4)) {
            this.location.y = -cubeDims.y / 2 + (this.dims.y / 4);
            this.velocity.y = this.velocity.y * -1;
        }
        if (this.location.z >= cubeDims.z / 2 - (this.dims.z / 4)) {
            this.location.z = cubeDims.z / 2 - (this.dims.z / 4);
            this.velocity.z = this.velocity.z * -1;
        } else if (this.location.z <= -cubeDims.z / 2 + (this.dims.z / 4)) {
            this.location.z = -cubeDims.z / 2 + (this.dims.z / 4);
            this.velocity.z = this.velocity.z * -1;
        }
    }
}


//------------------------
//settings tests
//------------------------
//faster
//4000 particles
//globe:  this.acceleration.setMag(0.01);
//globe:  this.velocity.limit(3);//limits the strength of the velocity
//------------------------

//slower
//8000 particles
//globe:  this.acceleration.setMag(0.005);//sets the strength of the acceleration
//globe:  this.velocity.limit(1);//limits the strength of the velocity
