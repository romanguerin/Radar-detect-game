let p = p5.prototype;
let w = 820;
let h = 600;

function setup() {
  createCanvas(w,h);

  setPlayer();
  //set radar and pod
  //!! DIASBLED FOR TESTING PURPOSE !!
  //setRadar();
  //setPod();


}

function draw() {
  background(0);
  drawPlayer();
  drawEnemy();
  //drawradar and pod
  //!! DIASBLED FOR TESTING PURPOSE !!
  //drawRadar();
  //drawPod();

}
