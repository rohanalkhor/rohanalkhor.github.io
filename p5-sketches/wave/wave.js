function setup() {
	var cnv = createCanvas(windowWidth, windowHeight/2);
  	cnv.style('display', 'block');
    cnv.parent('wavesketch');
    background('#ff8000');
    noStroke();

    
}
let t=0;
let k=0.01;
let a=150;
let w=6.28/10;
let dt=0.01;
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background('white');
  fill(120+0.5+mouseX*255/width,120+0.5*mouseY*255/width,120+0.5*(mouseX+mouseY)*255/(2*width));
    
  for(let i=0;i<width;i+=15){
     circle(i,windowHeight/4-a*sin(k*i-w*t),10);
  }
  
  t+=dt;
  

}
