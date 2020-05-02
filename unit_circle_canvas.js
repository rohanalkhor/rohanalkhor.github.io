function setup() {
  createCanvas(400, 400);
  background(153);
  circle(200,200,200);
  
}
let angle=0.0;
function draw(){
  
  line(200,200,200+100*cos(angle),200+100*sin(angle));
  angle-=0.3;
  
  
  
}
