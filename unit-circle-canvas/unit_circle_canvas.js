let slider;
function setup() {
  createCanvas(1000, 1000);
  background(153);
  slider = createSlider(0,2*PI,0.0,0.00001);
  slider.position(400, 10);
  slider.style('width', '200px');
  
  
}
let x,y,theta;
function draw(){
  clear();
  x=200+100*cos(slider.value());
  y=200-100*sin(slider.value());
  angleMode(RADIANS);
  print(sin(HALF_PI));
  noFill();
  circle(200,200,200);

  fill(255, 204, 0);
  
  line(200,0,200,400);
  line(0,200,400,200);
  line(x,y,200,200);
  stroke(100,20,50);
  strokeWeight(4);
  line(x,y,x,200);
  stroke(10,200,50);
  line(x,y,200,y);
  stroke('black');
  strokeWeight(1);
  circle(x,y,10);
  textSize(20);
  theta=degrees(slider.value());
  text("Angle (Deg) = " +nfc(theta,2),620,40);
  fill(100,20,50);
  text("sin( "+nfc(theta,2)+") = "+nfc(sin(slider.value()),5), 620,60,400,50);
  fill(10,200,50);
  text("cos( "+nfc(theta,2)+") = "+nfc(cos(slider.value()),5), 620,100,400,50);
  fill(10,20,255);
  text("tan( "+nfc(theta,2)+") = "+nfc(tan(slider.value()),5), 620,140,400,50);

  
  
  
}