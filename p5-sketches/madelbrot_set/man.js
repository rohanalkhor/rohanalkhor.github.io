class complex
{
  constructor(re, im)
  {
    this.re = re;
    this.im = im;
      
  }
  magn()
  {
    return ((this.re*this.re + this.im+ this.im));
  }
 
}
let n = 20000 , sc= 2.0;

let dx;
let i=-1*sc ;
let c = new complex(0,0);

function setup() {
  createCanvas(displayWidth -200,displayHeight-200);
  
  background(255);
  
  dx=2*sc/width;
  rect(0,50,width,20);
  fill('red');
  
}
function draw()
{ 
  
  
  if(  i< sc)
  {
    for( let j=-1*sc;j<sc ; j+=dx)
    {
      c.re = i;
      c.im = j;
      let z = new complex(0,0);
      z.re=0;z.im=0;
      for( let k=0;k<n;k++)
      {   let re= (c.re + z.re*z.re - z.im * z.im );
          z.im = (c.im + 2 * z.re * z.im  );
          z.re = re;
      }
      let mag=z.magn();
      if(mag< 1){
        stroke('red');
        point(width/2+i /dx, height/2+j/dx);
        
      }
      else if(mag< 100){
        stroke('#ff1000');
        point(width/2+i /dx, height/2+j/dx);
        
      }
      else if(mag< 1000){
        stroke('#ff8000');
        point(width/2+i /dx, height/2+j/dx);
        
      }
      else if(mag< 10000){
        stroke('#00ff00');
        point(width/2+i /dx, height/2+j/dx);
        
      }
      else if(mag< 100000){
        stroke('#0000ff');
        point(width/2+i /dx, height/2+j/dx);
        
      }
      
     
      
      
      
      
      
    }
    i+=dx;
    let l=(sc+i)*100/(2*sc);
    console.log(l+"%");
    rect(0,50,l*width/100,20);
  }
  
  
  
  
  
}
