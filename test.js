let p = p5.prototype;
//overall scale
let resizeScale;


function setup() {
    
  // Size width 2016 height 1152 for true ratio
  //createCanvas(2016, 1152);
  createCanvas(windowWidth, windowHeight);
  windowResized();

//!! DIASBLED FOR TESTING PURPOSE !!
  //setPlayer();
  setEnemy();
  //set radar and pod
  //setRadar();
  //setPod();
}

function draw() {
  //scale to make size correct
  scale(resizeScale);
  background(0);

  //players
  drawPlayer();
  drawEnemy();
  //drawradar and pod
  //!! DIASBLED FOR TESTING PURPOSE !!
  //drawRadar();
  //drawPod();

}

function windowResized() {
    resizeScale = windowWidth / 2016 ;
    //0.57142 to get aspect ratio right
    resizeCanvas(windowWidth, windowWidth * 0.57142);
  }