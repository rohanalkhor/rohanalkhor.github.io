let Smaxv;
let Smaxa;
let Scohesion_power;
let Sseparation_power;
let Salignment_power;
let SviewRadius;
function sliderSetup()
{
  Smaxv = createSlider(0, 10, 4, 0.01);
  Smaxv.position(20, windowHeight-90);
  Smaxv.style('width', '100px');
  

  Scohesion_power = createSlider(0, 1, 0.369, 0.001);
  Scohesion_power.position(160, windowHeight-90);
  Scohesion_power.style('width', '100px');

  Sseparation_power = createSlider(0, 1, 0.321, 0.001);
  Sseparation_power.position(290, windowHeight-90);
  Sseparation_power.style('width', '100px');

  Salignment_power = createSlider(0, 1, 0.226, 0.001);
  Salignment_power.position(420, windowHeight-90);
  Salignment_power.style('width', '100px');

  SviewRadius = createSlider(0, 500, 125, 1);
  SviewRadius.position(550, windowHeight-90);
  SviewRadius.style('width', '100px');
  
  Smaxa = createSlider(0, 10, 1.55, 0.01);
  Smaxa.position(730 , windowHeight-90);
  Smaxa.style('width', '100px');
}
function sliderLables()
{
  textSize(20);
  text("maxVelocity", 20, windowHeight-150);
  text(maxv, 20, windowHeight-110);
  
  text("Cohesion", 160, windowHeight-150);
  text(Scohesion_power.value(), 160, windowHeight-110);
  
  text("Separation", 290, windowHeight-150);
  text(Sseparation_power.value(), 290, windowHeight-110);
  
  text("Alignment", 420, windowHeight-150);
  text(Salignment_power.value(), 420, windowHeight-110);
  
  text("PerceptionRadius", 550, windowHeight-150);
  text(SviewRadius.value(), 550, windowHeight-110);
  
  text("maxAcceleration", 730, windowHeight-150);
  text(Smaxa.value(), 730, windowHeight-110);

  text("Tap to add Boid. Observe Flocking . Vary slider values. Happy Birthday Ranjan!",width-900,height*0.3)
}




class boid {
  constructor(p, v, a) {
    this.position = p;
    this.velocity = v;
    this.acceleration = a;
  }
  show() {
    stroke(0);
    fill('#ff8000');
    circle(this.position.x, this.position.y, size);
    line(this.position.x, this.position.y, this.position.x+this.velocity.x*2.5, this.position.y+this.velocity.y*2.5);
    noFill();
    
  }
  edges() {

    if (this.position.x>width ) {
      this.position.x=0;
    }else if (this.position.x<0 ) {
      this.position.x=width;
    }
    if (this.position.y>height ) {
      this.position.y=0;
    }else if (this.position.y<0 ) {
      this.position.y=height;
    }
  }
  update() {
    this.velocity.limit(maxv);
    this.acceleration.limit(maxa);
    
    this.velocity .add( this.acceleration);
    this.position .add( this.velocity);
    
    this.acceleration.x=0;
    this.acceleration.y=0;
   
  }
  separation(boids) {
    let avgPos = createVector(0, 0);
    let total=0;
    for (let other of boids)
    {   
      let d = dist(this.position.x, this.position.y, other.position.x, other. position.y);
      if (this != other && d < viewRadius ) {
        avgPos.add( p5.Vector.sub(this.position, other.position));
        total++;
      }
    }
    if (total>0) {
      avgPos.setMag(maxa*Sseparation_power.value());
      this.acceleration.add(avgPos);
    }
  }
  alignment(boids) {
    let total=0;
    let avgVel = createVector(0, 0);

    for (let other of boids)
    {   
      let d = dist(this.position.x, this.position.y, other.position.x, other. position.y);

      if (this != other && d < viewRadius ) {
        avgVel.add(other.velocity);
        total++;
      }
    }
    
    if (total>0) {
      avgVel.div(total);
      avgVel.sub(this.velocity);
      avgVel.setMag(maxa*Salignment_power.value());
      this.acceleration.add(avgVel);
    }
  }
  cohesion(boids) {
    let avgPos = createVector(0, 0);
    let total=0;
    for (let other of boids)
    {   
      let d = dist(this.position.x, this.position.y, other.position.x, other. position.y);

      if (this != other && d < viewRadius ) {
        avgPos.add(other.position);
        total++;
      }
    }
    if (total>0) {
      avgPos.div(total);
      avgPos.sub(this.position);
      //avgPos.setMag(maxv);
      //avgPos.sub(this.velocity);
      avgPos.setMag(maxa*(Scohesion_power.value()));
      this.acceleration.add(avgPos);
    }
  }
}


let boids=[];
let N = 0;
let size = 10;

let maxv;
let maxa;

let viewRadius = 80;

function mouseClicked(){
  if(mouseX<windowWidth && mouseX>0 && mouseY<windowHeight-100 && mouseY>0)
  {
    let p = new p5.Vector(mouseX, mouseY);
    let v = new p5.Vector(random(-1*maxv, maxv), random(-1*maxv, maxv));
    let a = createVector(0, 0);
    boids[N]= new boid(p, v, a);
    N++;
  }
}
function setup() {
  var cnv = createCanvas(windowWidth, windowHeight-100);
  cnv.style('display', 'block');
  cnv.parent('boid');
      
  background(220);
  for (let i=0; i<N; i++)
  {  
    let p = new p5.Vector(random(width), random(height));
    let v = new p5.Vector(random(-1*maxv, maxv), random(-1*maxv, maxv));
    let a = createVector(0, 0);
    boids[i]= new boid(p, v, a);
  }
  
  sliderSetup();
  

}
function draw() {
  background(220);
  
  sliderLables();
  
  maxv=Smaxv.value();
  maxa=Smaxa.value();
  viewRadius=SviewRadius.value();
  
  for (let i=0; i<N; i++)
  {    
    boids[i].separation(boids);
    boids[i].alignment(boids);
    boids[i].cohesion(boids);
    boids[i].update();
    boids[i].edges();
    boids[i].show();
  }
}
