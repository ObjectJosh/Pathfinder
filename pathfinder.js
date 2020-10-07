let walls = [];
let ray;
let particle;
let myX = 50;//200;
let myY = 25;//200;
let angle1 = 0.0;
let flipped = false;

function setup() {
  createCanvas(400, 400);
  racetrack2();
  //randomBorders();
  
  walls.push(new Boundary(-1, -1, width, -1));
  walls.push(new Boundary(width, -1, width, height));
  walls.push(new Boundary(width, height, -1, height));
  walls.push(new Boundary(-1, height, -1, -1));
  particle = new Particle();
  particle.update(myX, myY);
}

function draw() {
  background(0);
  if(keyIsDown(LEFT_ARROW)){
    particle.rotate(-0.05);
  }else if(keyIsDown(RIGHT_ARROW)){
    particle.rotate(0.05)
  }
  for (let wall of walls) {
    wall.show();
  }
  particle.show();
  var values = particle.look(walls);
  particle.look(walls);
  var dx = values[0] - myX;
  var dy = values[1] - myY;
  var closestVec = values[2];
  var btwn = dist(myX, myY, closestVec.x, closestVec.y);
  if(btwn < 5){
    dx = dx - dx*0.1;
    dy = dy - dy*0.1;
  }
  particle.rotate(angle1);
  angle1 = atan2(dy, dx);
  turnAround(dy, dx);
  //myX = myX + (cos(angle1));
  //myY = myY + (sin(angle1));
  particle.update(myX, myY);
}


function turnAround(dy, dx){
  //console.log(Math.sqrt(dx*dx+dy*dy));
  if(Math.sqrt(dx*dx+dy*dy) > 3){
    myX = myX + (cos(angle1)*2);
    myY = myY + (sin(angle1)*2);
  }else{
    //console.log("flipped");
    particle.rotate(particle.heading + Math.PI);
  }
}

function randomBorders(){
  for (let i = 0; i < 8; i++) {
    let x1 = random(width);
    let x2 = random(width);
    let y1 = random(height);
    let y2 = random(height);
    walls[i] = new Boundary(x1, y1, x2, y2);
  }
}

function racetrack1(){
  walls.push(new Boundary(0, 50, width-50, 50));
  walls.push(new Boundary(50, width-50, width-50, width-50));
  walls.push(new Boundary(width-50, 50, width-50, height-50));
  walls.push(new Boundary(50, 50, 50, height-50));
}

function racetrack2(){ // spiral
  walls.push(new Boundary(0, 50, width-50, 50)); // 1
  walls.push(new Boundary(50, width-50, width-50, width-50)); // 2
  walls.push(new Boundary(width-50, 50, width-50, height-50)); // 3
  walls.push(new Boundary(50, 100, 50, height-50));// 4
  walls.push(new Boundary(50, 100, width-100, 100));
  walls.push(new Boundary(width-100, 100, width-100, height-100));
  walls.push(new Boundary(100, height-100, width-100, height-100));
  
}


