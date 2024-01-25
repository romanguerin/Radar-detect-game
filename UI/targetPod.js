let tPod = {
    rx: w/2,
    ry: h/2,
    radius: 250,
    px: 0, py: 0,
    lRad: 245, rRad: 295,
    angle: 0,
    s_radar: true,
    frequency: 3,
    ab: 0, ac: 0, bc: 0,
    vx: [], vy: [],
    detect: false,
    trans: 190.0
}

function setPod() {
    //place target radar in array
    tPod.angle = tPod.lRad;
    tPod.vx = new Array(1);
    tPod.vy = new Array(1);
}

function drawPod() {
    targetPod();
    hitPod();
    if (tPod.detect === true) {
        //draw ellipse on location
        noStroke();
        fill(144, 238, 117,200);
        ellipse(tPod.vx[0],tPod.vy[0],10,10);
    } else {
        fill(0);
    }
}

function targetPod(){
    noFill();
    //green color
    stroke(144, 238, 117);
    strokeWeight(2);
    //draw radar arc
    arc(tPod.rx, tPod.ry, 500, 500, radians(tPod.lRad), radians(tPod.rRad), PIE );
    strokeWeight(1);
    arc(tPod.rx, tPod.ry, 400, 400, radians(tPod.lRad), radians(tPod.rRad));
    arc(tPod.rx, tPod.ry, 150, 150, radians(tPod.lRad), radians(tPod.rRad));

    for (let i = 0; i<3; i++){
        tPod.px = tPod.rx + cos(radians(tPod.angle+i))*(tPod.radius);
        tPod.py = tPod.ry + sin(radians(tPod.angle+i))*(tPod.radius);
        //draw radar line
        strokeWeight(1);
        //float trans = map(0,i,20,150,0);
        stroke(144, 238, 117,tPod.trans);
        line(tPod.rx,tPod.ry,tPod.px,tPod.py);
    }

    //determine switch
    if(tPod.angle <= tPod.lRad){
        tPod.s_radar = true;
    } else if (tPod.angle >= tPod.rRad-3) {
        tPod.s_radar = false;
    }


    if(tPod.s_radar === true){
        tPod.angle += tPod.frequency;
    } else {
        tPod.angle -= tPod.frequency;}

}

function hitPod(){
    //calculate distance between last points of line and compared it to the mouse
    tPod.ab = dist(tPod.rx,tPod.ry,mouseX,mouseY);
    tPod.ac = dist(tPod.px,tPod.py,mouseX,mouseY);
    tPod.bc = dist(tPod.rx,tPod.ry,tPod.px,tPod.py);
    //
    let hit = tPod.ab + tPod.ac;
    //println(hit);
    if(hit > tPod.bc-0.2 && hit < tPod.bc+0.2){
        tPod.vx[0] = mouseX;
        tPod.vy[0] = mouseY;
        tPod.detect = true;
    }

    //detect if in the radar or not
    let nearCenter = sqrt(sq(mouseX - tPod.rx) + sq(mouseY - tPod.ry)) <= 250;
    let a = atan2(mouseY - tPod.ry, mouseX - tPod.rx);
    let deg = degrees(a);
    //simplified:
    tPod.detect = nearCenter && deg >= -113.0 && deg <= -67.0;
}
