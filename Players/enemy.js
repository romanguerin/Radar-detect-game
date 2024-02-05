// Enemy object with relevant properties
let enemy = {
    vec1: p.createVector(500, 500),    // Position vector
    direction: 180,                // Direction angle
    angle: p.createVector(0, 0),   // Angle vector
    vec2: p.createVector(0, 0),    // Second position vector
    speed: 2,                       // Default speed
    left: 0, right: 0,              // Left, Right        
    acc: p.createVector(0, 0),     // Acceleration vector
    vel: p.createVector(0, 0),     // Velocity vector
    difficulty: 1,                  // difficulty 1 to 5 
    turn: 1,                        // turn speed?   
};

// Initialize enemy (not used currently)
function setEnemy() {
    // set enemy difficulty
    enemyDifficulty()
}

// Draw the enemy on the canvas
function drawEnemy() {
    // Calculate angle vector and second position vector
    enemy.angle = p5.Vector.fromAngle(radians(enemy.direction), 25);
    enemy.vec2 = p5.Vector.sub(enemy.vec1, enemy.angle);

    // Draw enemy physically for test purpose
    drawEnemyTest();

    // show direction
    Direction()

    // Update enemy orientation and position
    moveEnemy();
    
    // Update enemy speed
    speedEnemy()

    //enemy difficulty
    drawEnemyDifficulty();
}

// Draw enemy elements for testing
function drawEnemyTest(){
  push();
  fill(255, 0, 0); // Red color for the enemy
  ellipse(enemy.vec1.x, enemy.vec1.y, 10, 10); // Enemy position
  stroke(255, 0, 0);
  line(enemy.vec1.x, enemy.vec1.y, enemy.vec2.x, enemy.vec2.y); // Target line
  pop();
}


// Move the enemy based on predefined logic
function moveEnemy() {
    enemy.acc = p5.Vector.sub(enemy.vec2, enemy.vec1);
    enemy.acc.setMag(1); // Acceleration, default: 1

    enemy.vel.add(enemy.acc);
    enemy.vel.limit(enemy.speed);   // Velocity, default: 2, min: 2, max: 5
    enemy.vec1.add(enemy.vel);
}


// Speed adjustment function for enemy with lerping
function speedEnemy() {
    // Calculate the distance between the enemy and the player
    let distance = enemy.vec1.dist(player.vec1);

    const minSpeedValue = 2;  // Min forward speed
    const maxSpeedValue = 7;    // Max forward speed DEF: 7

    // Calculate the desired speed based on the distance
    let desiredSpeed = map(distance, 100, 500, minSpeedValue, maxSpeedValue);

    // Adjust to player speed for better follow
    //let adjustToPlayer = player.speed / 100;
    let adjustToPlayer = map((player.speed / 100), 0.025, 0.065, 0, 0.1);    

    // Use lerp to smoothly transition the current speed towards the desired speed
    const lerpFactor = 0.01;  // Adjust the lerp factor for the desired smoothing effect DEF: 0.01
    enemy.speed = lerp(enemy.speed, desiredSpeed, lerpFactor) + adjustToPlayer;

    // Constrain the speed to ensure it stays within the specified range
    enemy.speed = constrain(enemy.speed, minSpeedValue, maxSpeedValue);

}



// Rotate the enemy based on predefined logic
function turnEnemy(goLeft, goRight) {
    const turnSpeed = 0.01; // Adjust the turn speed as needed DEF: 0.02
    const minTurnValue = enemy.turn; // min turn speed
    const maxTurnValue = enemy.turn + 0.5; // max turn speed

    if (goLeft) { // if player is to the left
         enemy.left = lerp(enemy.left, maxTurnValue, turnSpeed);
         enemy.direction -= enemy.left;
    } else { // get baack to min turn value
        enemy.left = minTurnValue;
    }

    if (goRight) { // if player is to the right
        enemy.right = lerp(enemy.right, maxTurnValue, turnSpeed);
        enemy.direction += enemy.right
    } else {  // get back to min turn
        enemy.right = minTurnValue;
    }
}


// Function to show a constant-length line from the enemy to the player
function Direction() {
    const playerPosition = p.createVector(player.vec1.x, player.vec1.y);
    const directionLineLength = 30;

    const playerDirectionVector = p5.Vector.sub(playerPosition, enemy.vec1);
    playerDirectionVector.setMag(directionLineLength);

    const lineEnd = p5.Vector.add(enemy.vec1, playerDirectionVector);

    push();
    stroke(128, 0, 128); // Purple color for the line
    line(enemy.vec1.x, enemy.vec1.y, lineEnd.x, lineEnd.y);
    pop();

    // Check whether the player is to the left or right of the enemy's direction
    const playerRelativePosition = p5.Vector.sub(playerPosition, enemy.vec1);
    
     // Check whether the player is to the left or right of the enemy's direction using cross product
     const crossProduct = playerRelativePosition.cross(enemy.angle);
    
     if (crossProduct.z < 0) {
        // Player is to the left of enemy direction
        turnEnemy(true,false);  // Left Right
     } else if (crossProduct.z > 0) {
        // Player is to the right of enemy direction
        turnEnemy(false,true);  // Left Right
     } else {
        // Player is neither left nor right of enemy direction

     }
}

// Enemy difficulty should be called last.
function enemyDifficulty() {
    // change difficulty from 1 and 5 to wathever
    const difficulty = map(enemy.difficulty, 1, 5, 0.6, 1);

     // TURN low: easy, high: hard
     enemy.turn = enemy.turn * difficulty;
     
}

function drawEnemyDifficulty() {
        push();
        fill(0,0,0)
        circle(20, 20, 15);
        text('Difficulty: ', 35, 25);
        text(($player.enemy), 40, 25);
        pop();
}
