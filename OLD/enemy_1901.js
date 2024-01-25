let enemy = {
    v1: p.createVector(-200,-40),
    acc: p.createVector(0,0),
    vel: p.createVector(0,0),
    d: 0,
    angle: p.createVector(0,0),
    v2: p.createVector(0,0),
    normal: p.createVector(0,0),

}


function drawEnemy(){
    //test
    enemy.angle = p5.Vector.fromAngle(radians(enemy.d), 25);
    enemy.v2 = p5.Vector.sub(enemy.v1,enemy.angle);
    //v0 is enemy normal
    let v0 = p.createVector(enemy.v1.x,enemy.v1.y);
    //let v1 = p.createVector(-25, 0);
    //player normal
    let v2 = p.createVector(player.v1.x - enemy.v1.x, player.v1.y - enemy.v1.y);
    let v4 = enemy.v2;
    let v5 = p.createVector((player.v1.x - enemy.v2.x), (player.v1.y - enemy.v2.y));
    let v6 = enemy.normal;

    //console.log(normal())




    let dis1 = p5.Vector.dist(v0, v2);
    let dis2 = p5.Vector.dist(v4, v5);
    //console.log(dis1);
    //console.log(dis2);

    //draw enemy
    push();
    //translate(w/2,h/2)
    fill(255);
    ellipse(enemy.v1.x,enemy.v1.y,10,10);
    stroke(255,0,0);
    line(enemy.v1.x,enemy.v1.y,enemy.v2.x,enemy.v2.y);
    //line to enemy
    drawArrow(v0, v2,'blue');
    //line between
    drawArrow(v4, v5,'yellow');
    //test(enemy.v2,v1)
    //line direction
    drawArrow(v4, v6,'purple');
    pop();

    //move
    moveEnemy();
    turnEnemy(dis1, dis2);
    //normal(v4,v0,v2);

}

function moveEnemy(av1, av2) {
    enemy.acc = p5.Vector.sub(enemy.v2,enemy.v1);
    // acc is def 3
    enemy.acc.setMag(3);

    enemy.vel.add(enemy.acc);
    // vel is def 2
    enemy.vel.limit(2);
    enemy.v1.add(enemy.vel);
}


// draw an arrow for a vector at a given base position
function drawArrow(base, vec, color) {
    push();
    stroke(color);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    //rotate(PI/angle);
    pop();
}


function turnEnemy(norm,dist){
    enemy.d--;
    let d = norm - dist;
    d = d.toFixed(1);
    //console.log(d);
    //console.log(norm-dist);
    /*
    if (angleBetween > 0.01) {
        //go right
        enemy.d--;
    } else if (angleBetween < -0.01){
        enemy.d++;
    }
    */
    //console.log(angleBetween.toFixed(2));
}

/*
function normal(p,a,b){
    let ap = p5.Vector.sub(p,a);
    let ab = p5.Vector.sub(b,a);
    ab.normalize();
    ab.mult(ap.dot(ab));
    enemy.normal = p5.Vector.add(a,ab);

}
*/
