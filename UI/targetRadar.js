// set radar target
let tRadar = {
    rx: w/4,
    ry: h/2,
    radius: 150,
    angle: 150,
    frequency: 3,
    ab: 0, ac: 0, bc: 0,
    vx: [], vy: [],
    detect: false,
    trans: 200
}

function setRadar(){
    //place target radar in array
    tRadar.vx = new Array(1);
    tRadar.vy = new Array(1);
}

function drawRadar(){
    targetRadar();
    hitRadar();
    if (tRadar.detect === true) {
        //draw ellipse on location of detection
        noStroke();
        fill(144, 238, 117, 200);
        ellipse(tRadar.vx[0], tRadar.vy[0], 10, 10);
    } else {
            fill(0);
    }
}

function targetRadar(){
    //draw radar
    noFill();
    stroke(144, 238, 117);
    strokeWeight(2);
    ellipse(tRadar.rx,tRadar.ry,300,300);
    strokeWeight(1);
    ellipse(tRadar.rx,tRadar.ry,200,200);
    ellipse(tRadar.rx,tRadar.ry,100,100);
    line(tRadar.rx,tRadar.ry+tRadar.radius,tRadar.rx,tRadar.ry-tRadar.radius);
    line(tRadar.rx+tRadar.radius,tRadar.ry,tRadar.rx-tRadar.radius,tRadar.ry);
    //trail
    //40 is the length of the trail
    for (let i = 0; i<40; i++){
        tRadar.px = tRadar.rx + cos(radians(tRadar.angle+i))*(tRadar.radius);
        tRadar.py = tRadar.ry + sin(radians(tRadar.angle+i))*(tRadar.radius);
        strokeWeight(1);
        //make translusent
        let trans = map(i,0,20,0,150);
        stroke(144, 238, 117,trans);
        line(tRadar.rx,tRadar.ry,tRadar.px,tRadar.py);
    }
    //main line
    strokeWeight(2);
    stroke(144, 238, 117,255);
    line(tRadar.rx,tRadar.ry,tRadar.px,tRadar.py);
    tRadar.angle += tRadar.frequency;
}

function hitRadar() {
    //calculate distance between last points of line and compared it to the mouse
    tRadar.ab = dist(tRadar.rx,tRadar.ry,p.mouseX,p.mouseY);
    tRadar.ac = dist(tRadar.px,tRadar.py,p.mouseX,p.mouseY);
    tRadar.bc = dist(tRadar.rx,tRadar.ry,tRadar.px,tRadar.py);

    //hit ab + ac
    let hit = tRadar.ab + tRadar.ac;
    //println(hit);
    if(hit > tRadar.bc-0.2 && hit < tRadar.bc+0.2){
        tRadar.vx[0] = p.mouseX;
        tRadar.vy[0] = p.mouseY;
        console.log("HIT on: x:" + p.mouseX + " y" + p.mouseY);
        tRadar.detect = true;
    } else if (tRadar.ab > 150.0){
        tRadar.detect = false;
    }

}
