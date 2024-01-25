//overall scale
let resizeScale;

//test for rotation turn mechanism
let rotater = 5;


function setup() {
  // Size width 2016 height 1152 for true ratio
  //createCanvas(2016, 1152);
  createCanvas(windowWidth, windowHeight);
  windowResized();

}

function draw() {
  //scale to make size correct
  scale(resizeScale);
  background(20);
  //remove bug for now 
  system(-10,-10,false);
  
  //glow green
  drawingContext.shadowBlur = 128;
  drawingContext.shadowColor = color('rgba(0,255,0,0.25)');
  
  //left
  system(2, 4);
  //Middle
  system(8, 6);
  //right
  system(14, 4);
  //display
  mission(8, 2);
  //warning
  button(3, 2.5, 40,'AFTERBURN');
  button(15, 2.5, 48, 'MISSILES');
  //control indicator
  control(2, 9.5, 'power', [1,2,3,4,5], 0);
  control(14, 9.5, 'steering', [4,2,0,2,4], 172);
  //warding systems
  warning(7.5, 4.5, 36,'RWR');
  warning(12.5, 4.5, 36, 'MTR');
  //flare button
  flare(9, 4.5, 48, 'FLARE');
  //Turn mechanism
  turn(8,6);
  //Attitude Indicator 
  atIn(8,6);
  
  //Temp Grid for drawing
  if (false){
  for (var x = 0; x < windowWidth; x += windowWidth / 21) {
		for (var y = 0; y < windowHeight; y += windowHeight / 12) {
			stroke(150);
			strokeWeight(0.05);
			line(x, 0, x, windowHeight);
			line(0, y, windowWidth, y);
		}
     }
  }  
// End of draw  
}

function windowResized() {
  resizeScale = windowWidth / 2016 ;
  //0.57142 to get aspect ratio right
  resizeCanvas(windowWidth, windowWidth * 0.57142);
}

function system(x,y,point){
  x = (x * 96)
  y = (y * 96)
  
  // get 0 point
  if (point == true) {
    circle(x, y, 10);
  }
    //Draw SYSTEM
  stroke('rgba(0,255,0,0.25)');
  strokeWeight(4);
  //left
  line( x + 0, y + 96, x + 0, y + 480);
  //right
  line( x + 480, y + 96, x + 480, y + 480);
  //down
  line( x + 0, y + 480, x + 480, y + 480);
  //Up
  line( x + 96, y + 0, x + 384, y + 0 );
  //Up Left
  line( x + 0, y + 96, x + 96, y + 0 );
  //Up Right
  line( x + 384, y + 0, x + 480, y + 96 );
  
  // center circle
  circle(x + 240, y + 240 ,420);
  noFill();
  
}

function mission(x,y){
  x = (x * 96);
  y = (y * 96);
  rect(x + 0, y + 0, 480, 192, 10);
  fill('rgba(0,255,0,0.25)');
  rect(x + 40, y + 24, 168, 144, 20);
  rect(x + 272, y + 24, 168, 144, 20);
  
}

function control(x,y,name,arr,s){
  //control for speed and steering
  x = (x * 96);
  y = (y * 96);
  s = s + 40
  stroke('rgba(0,255,0,0.25)');
  noFill();
  rect(x + 0, y + 0, 480, 192, 10);
  rect(x + 40, y + 82, 388, 24, 0);
  //textSize(32);
  //strokeWeight(2);
  strokeCap(PROJECT);
   for (let i = 0; i < 5; i++) {
     l = x + 40 + ((388/4) * i);
     //above
     line(l, y + 56, l , y + 78);
     //under
     line(l, y + 110, l , y + 140);
     //small above and under
     if (i < 4){
     line(l + 54, y + 70, l + 54, y + 78);
     line(l + 54, y + 110, l+ 54 , y + 118);
     }
     //add text
     push();
     stroke('rgba(75,255,0,0.4)');
     textSize(32);
     strokeWeight(3);
     text(arr[i], l, y + 42);
     pop();
  }
  //red
  push();
  fill('#F44336');
  rect(x + s, y + 86, 40, 20, 5);
  pop();
  
}


function flare(x,y,ts,name){
  x = (x * 96);
  y = (y * 96);
  stroke('rgba(243,0,18,0.4)');
  fill('rgba(243,0,18,0.9)');
  rect(x + 0, y + 0, 288, 96, 10);
  textSize(ts);
  fill('rgba(243,243,243,1)');
  noStroke();
  strokeWeight(4);
  textAlign(CENTER);
  text(name, x + 144, y + 64);
  
}

function warning(x,y,ts,name){
  x = (x * 96);
  y = (y * 96);
  stroke('rgba(243,156,18,0.4)');
  fill('rgba(243,156,18,0.25)');
  rect(x + 0, y + 0, 96, 96, 30);
  textSize(ts);
  fill('rgba(243,156,18,1)');
  noStroke();
  strokeWeight(4);
  textAlign(CENTER);
  text(name, x + 48, y + 60);
}

function button(x,y,ts,name){
  x = (x * 96);
  y = (y * 96);
  stroke('rgba(18,83,243,0.4)');
  fill('rgba(18,64,243,0.9)');
  rect(x + 0, y + 0, 288, 96, 10);
  textSize(ts);
  fill('rgb(255,255,255)');
  noStroke();
  strokeWeight(4);
  textAlign(CENTER);
  text(name, x + 144, y + 64);
}

function turn(x,y){
  x = (x * 96);
  y = (y * 96);
  //turn
  push();
  angleMode(DEGREES);
  // move the origin to the pivot point
	translate(x + 240, y + 240);
  rotate(45);
  rect(0, 0, 55, 55); // Draw rect at new 0,0
  fill('#2196F3');
  circle( 0, 0 , 420);
  //fill('#795548');
  ////circle(x + 240, y + 240 ,420);
  push();
  angleMode(RADIANS);
  fill('#795548');
  arc(0, 0 , 420, 420, 0, PI, OPEN);
  pop();
  pop();
  //angleMode(RADIANS);
}

function atIn(x,y){
  x = (x * 96);
  y = (y * 96);
  //AttitudeIndicator
  
  push();
  //check if this has to go out here?
  //fill('#2196F3');
  //circle(x + 240, y + 240 ,420);
  //fill('#795548');
  ///circle(x + 240, y + 240 ,420);
  //arc(x + 240, y + 240,420, 420, 0, PI, OPEN);
  
  //indicators
  fill('#F44336');
  circle(x + 240, y + 240 ,15);
  strokeWeight(8);
  stroke('#F44336');
  //Left Right
  line(x + 80, y + 240, x + 180, y + 240);
  line(x + 300, y + 240, x + 400, y + 240);
  //Up Down
  line(x + 180, y + 240, x + 180, y + 270);
  line(x + 300, y + 240, x + 300, y + 270);
  //altiude lines
  stroke('#FFFFFF');
  strokeWeight(6);
  line(x + 220, y + 210, x + 260, y + 210);
  line(x + 220, y + 270, x + 260, y + 270);
  line(x + 180, y + 180, x + 300, y + 180);
  line(x + 180, y + 300, x + 300, y + 300);
  line(x + 220, y + 150, x + 260, y + 150);
  line(x + 220, y + 330, x + 260, y + 330);
  line(x + 180, y + 120, x + 300, y + 120);
  line(x + 180, y + 360, x + 300, y + 360);
  //direction lines
  //triangle
  push();
  noStroke();
  translate(182, 10);
  triangle(x+30,y+75, x+58, y+20, x+86, y+75);
  pop();
  //noFill();
  pop();
}