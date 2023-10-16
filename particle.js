class Particle {
    constructor(x, y, z, v, d) {
        // this.name = name;
        this.location = createVector(x, y, z);
        this.velocity = p5.Vector.random3D();
        //this.velocity.mult(random(3));
        // this.acceleration = p5.Vector.random3D();
        this.acceleration = createVector(0, 0, 0);
        this.dims = createVector(d, d, d);
        //   this.dims.mult(5);
        this.r = sqrt(d)*10;
        this.mass = d;
        //
    }

    
    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }

    update() {
       this.acceleration.setMag(0.3);//sets the strength of the acceleration
        this.velocity.add(this.acceleration);
        this.velocity.limit(10);//limits the strength of the velocity
        this.location.add(this.velocity);
        this.acceleration.set(0, 0, 0);
    }

    show() {
        push();
        noStroke();
        fill(255);
        translate(this.location.x, this.location.y, this.location.z);
        sphere(this.dims.x / 2);
        // ellipse(0, 0, this.r / 2);
        pop();

    }

    checkCollision() {
        if (this.location.x >= cubeDims.x / 2 - (this.dims.x / 4)) {
            this.location.x = cubeDims.x / 2 - (this.dims.x / 4);
            this.velocity.x = this.velocity.x * -1;
        } else if (this.location.x <= -cubeDims.x / 2 + (this.dims.x / 4)) {
            this.location.x = -cubeDims.x / 2 + (this.dims.x / 4);
            this.velocity.x = this.velocity.x * -1;
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
