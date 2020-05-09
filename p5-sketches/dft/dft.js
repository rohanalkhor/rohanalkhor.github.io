let circles=[];
function setup() {
  createCanvas(1200, 600);
  background('white');
  line(300,0,300,600);
  line(0,300,600,300);
  stroke('black');
  line(700,0,700,600);
  line(700,150,1000,150);
  line(700,450,1000,450);
    
}
let x=[];
let y=[];
let time=0;
let dt=1;
let ox=300;
let oy=300;
let scale=3;
let N=time+1;
let fourierX;
let fourierY;
let Time=0;


function mousePressed() {
  stroke('#ff8000');
  circle(mouseX,mouseY,3);
  append(x,mouseX-300);
  append(y,300-mouseY);
  stroke('red');
  circle(700+time*scale,150-x[time]/2,3);
  stroke('yellow');
  circle(700+time*scale,450-y[time]/2,3);
  time+=dt;
    
}

function draw() {
  
  if(time>15)
  { 
    background(255);
    fourierX = dft(x);
    fourierY = dft(y);
    let px=0;
    let py=0;
    let ex=0;
    let ey=0;
    for (let k = 0; k < fourierX.length; k++) {
      stroke('black');
      circle(300+x[k],300-y[k],5);
    }
    //fourierX.sort((a, b) => b.amp - a.amp);
    //fourierY.sort((a, b) => b.amp - a.amp);
    for (let i = 0; i < fourierX.length; i++) {
      
    
    px += fourierX[i].a *cos(fourierX[i].f * Time + fourierX[i].phase );
    py += fourierX[i].a * sin(fourierX[i].f * Time + fourierX[i].phase );
    ex += fourierY[i].a *cos(fourierY[i].f * Time + fourierY[i].phase );
    ey += fourierY[i].a * sin(fourierY[i].f * Time + fourierY[i].phase );
      
    }//for
    stroke('red');
    circle(300+px,300,10);
    stroke('blue');
    circle(300,300-ex,10);
    stroke('green');
    circle(300+px,300-ex,3);
    Time+=0.01;
    if(Time == 2*PI)
    {    Time=0;
          background(255);
    }
  }
  
  
}


















function dft(vals)
{
  let X=[];
  let N=time;

  for(let k=0;k<time;k++)
  {
    let re=0;
    let im=0;
    
    for(let n=0;n<time;n++)
    {
       re+=vals[n]*cos(2*PI*k*n/N);
       im-=vals[n]*sin(2*PI*k*n/N);
    
    }
    re=re/N;
    im=im/N;
    let f=k;
    let a=sqrt(re*re+im*im);
    let phase=atan2(im,re);
    X[k]={re,im, f , a , phase};
  }
  return X;

}
