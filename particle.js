class Particle {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.rays = [];
    this.heading = 0;
    for (let a = -90; a < 90; a += 2) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }

  update(x, y) {
    this.pos.set(x, y);
  }
  rotate(angle){
    this.heading = angle;
    let i = 0;
    let realAngle = this.heading / Math.PI * 180;
    for(let a = realAngle-90; a < realAngle+90 && i < this.rays.length; a += 2){
      this.rays[i].setAngle(radians(a));
      i++;
    }
  }

  look(walls) {
    let furthest = null;
    let closest = null;
    let closestDist = Infinity;
    var closeList = [];
    let closestVec = null;
    const away = createVector();
    const close = createVector();
    for(let i = 0; i < this.rays.length; i++){
      const ray = this.rays[i];
      let record = Infinity;
      let farPoint = null;
      for (let wall of walls) {
        const pt = ray.cast(wall);
        if(pt) {
          const d = p5.Vector.dist(this.pos, pt);
          if (d < record) {
            record = d;
            closest = pt;
            farPoint = pt;
          }
        }
      }
      closeList.push(farPoint);
      if(closest){
        push();
        stroke(255, 40);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
        
        //fill(255, 50);
        fill(0, 255, 0); //
        noStroke(); //
        ellipse(closest.x, closest.y, 2, 2); //
        pop();
      }

    }
    for(let i = 0; i < closeList.length; i++){
      let far = p5.Vector.dist(closeList[i], this.pos)
      if(far > furthest){
        furthest = far;
        away.x = closeList[i].x;
        away.y = closeList[i].y;
      }
      if(far < closestDist){
        closestDist = far;
        closestVec = closeList[i];
      }
    }
    if(closestDist){
      stroke(255, 0, 0);
      line(this.pos.x, this.pos.y, closestVec.x, closestVec.y);
    }
    if(furthest){
      stroke(0, 255, 0);
      line(this.pos.x, this.pos.y, away.x, away.y);
      return [away.x, away.y, closestVec];
    }
  }

  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 4);
    for (let ray of this.rays) {
      ray.show();
    }
  }
}