let player = {
    v1: p.createVector(0,0),            //vector 1
    d: 180,                             //diraction
    angle: p.createVector(0,0),         //angle
    v2: p.createVector(0,0),            //vector 2
    l: false, r: false,                 //left & right
    acc: p.createVector(0,0),           //Accelerate
    vel: p.createVector(0,0),           //velocity
    lRad: 0, rRad: 0,                   //radar
    lBack: 0, rBack: 0                  //back detection
}

function setPlayer(){
//not used?
}


function drawPlayer(){
    player.angle = p5.Vector.fromAngle(radians(player.d), 25);
    player.v2 = p5.Vector.sub(player.v1,player.angle)
    //console.log(player.v1.fromAngle(radians(player.d), 15));
    //make corners
    player.lRad = player.d -200;
    player.rRad = player.d -160;
    player.lBack = player.d -50;
    player.rBack = player.d +50;

    //draw player
    push();
    //translate(w/2,h/2)
    fill(255);
    ellipse(player.v1.x,player.v1.y,10,10);
    stroke(144, 238, 117);
    //draw radar arc
    noFill();
    arc(player.v1.x, player.v1.y, 180, 180, radians(player.lRad), radians(player.rRad), PIE );
    //draw back arc
    stroke(255, 100, 10);
    arc(player.v1.x, player.v1.y, 120, 120, radians(player.lBack), radians(player.rBack), PIE );
    //target
    stroke(255,0,0);
    line(player.v1.x,player.v1.y,player.v2.x,player.v2.y,);
    //radar
    stroke(255,255,255,20)
    ellipse(player.v1.x, player.v1.y,300,300);
    pop();
    //turn player
    turnPlayer();
    movePlayer();

}


function movePlayer(){
     //let mouse = p.createVector(mouseX,mouseY);
     player.acc = p5.Vector.sub(player.v2,player.v1);
     //accelerate, default: 1  
     player.acc.setMag(1);

     player.vel.add(player.acc);
     //velocity, default: 2 , min: 2, max: 5 
     player.vel.limit(2);
     player.v1.add(player.vel);

}

function keyPressed(){
    if (keyCode === 65) {
        player.l = true;
    }
    if (keyCode === 68) {
        player.r = true;
    }
    return false;
}

function keyReleased(){
    player.r = false;
    player.l = false;
}

//function could be removed in touchscreen
//1 is standert can increase to more!
function turnPlayer(){
    if (player.l === true){
        player.d = player.d -1;
    } else if (player.r === true){
        player.d = player.d +1;
    }
}
