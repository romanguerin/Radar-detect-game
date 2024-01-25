// Player object with relevant properties
let player = {
    vec1: p.createVector(0, 0),    // Position vector
    direction: 180,                // Direction angle
    angle: p.createVector(0, 0),   // Angle vector
    vec2: p.createVector(0, 0),    // Second position vector
    speed: 2,                      // Default speed
    acc: p.createVector(0, 0),     // Acceleration vector
    vel: p.createVector(0, 0),     // Velocity vector
    left: 0, right: 0,             // left, right to change direction
    lRad: 0, rRad: 0,              // Radar angles
    lBack: 0, rBack: 0             // Back detection angles
};

// Initialize player (not used currently)
function setPlayer() {
    // Implementation not provided
}

// Draw the player on the canvas
function drawPlayer() {
    // Calculate angle vector and second position vector
    player.angle = p5.Vector.fromAngle(radians(player.direction), 25);
    player.vec2 = p5.Vector.sub(player.vec1, player.angle);

    // Draw angle values for radar and back detection arcs
    player.lRad = player.direction - 200;
    player.rRad = player.direction - 160;
    player.lBack = player.direction - 50;
    player.rBack = player.direction + 50;

    // Draw player physicaly for test purpose
    drawPlayerTest();

    // Update player orientation and position
    movePlayer();
    turnPlayer();
    playerSpeed();

}

// Draw player elements for testing
function drawPlayerTest(){
  push();
  fill(255);
  ellipse(player.vec1.x, player.vec1.y, 10, 10); // Player position
  stroke(144, 238, 117);
  noFill();
  arc(player.vec1.x, player.vec1.y, 600, 600, radians(player.lRad), radians(player.rRad), PIE); // Radar arc
  stroke(255, 100, 10);
  arc(player.vec1.x, player.vec1.y, 300, 300, radians(player.lBack), radians(player.rBack), PIE); // Back detection arc DEF:120
  stroke(255, 0, 0);
  line(player.vec1.x, player.vec1.y, player.vec2.x, player.vec2.y); // Target line
  stroke(255, 255, 255, 75);
  ellipse(player.vec1.x, player.vec1.y, 750, 750); // Radar circle
  pop();
}

// Move the player based on user input
function movePlayer() {
    player.acc = p5.Vector.sub(player.vec2, player.vec1);
    player.acc.setMag(1); // Acceleration, default: 1

    player.vel.add(player.acc);
    player.vel.limit(player.speed);   // Velocity, default: 2, min: 2, max: 5
    player.vec1.add(player.vel);
}

// Speed player based on user input
function playerSpeed() {
    const speedPlayer = 0.01; // Adjust the turn speed as needed
    const minSpeedValue = 2;  // Min forward speed
    const maxSpeedValue = 7;  // Max forward speed

    if (keyIsDown(87)) { // 'W' key for faster
        player.speed = lerp(player.speed, maxSpeedValue, speedPlayer);
    } 
    if (keyIsDown(83)) { // 'S' key for slower
        player.speed = lerp(player.speed, minSpeedValue, speedPlayer);
    }    
    afterburn();
}

function afterburn() {
let originalSpeed = 2;  // Set the original speed value here
let afterburnDuration = 2000;  // Afterburn duration in milliseconds (2 seconds)
let afterburnCooldown = 12000;  // Cooldown duration for afterburn in milliseconds (12 seconds)
let afterburnActive = false;  // Variable to track whether afterburn is currently active
let afterburnCoolActive = true;  // Variable to track whether afterburn is currently in cooldown

    // Check if the 'SHIFT' key is pressed and afterburn is not on cooldown
    if (keyCode === 16 && !afterburnActive && afterburnCoolActive) { // 'SHIFT' key for afterburn
        // Activate afterburn
        player.speed = player.speed = lerp(player.speed, 10, 0.2);

        // Set afterburn to be active
        afterburnActive = true;
        afterburnCoolActive = false;    
        // Schedule the end of the afterburn duration
        setTimeout(() => {
            // Reset player speed to the original value
            player.speed = originalSpeed;
            console.log("1");
            // End the afterburn duration
            afterburnActive = false;
            
        }, afterburnDuration);  // Afterburn duration + Cooldown duration
    }
        // Schedule the end of the afterburn cooldown
        setTimeout(() => {
            console.log("2");
            // End the afterburn duration
            afterburnCoolActive = true;
        }, afterburnCooldown);  // Afterburn duration + Cooldown duration
    }
 


// Rotate the player based on user input
function turnPlayer() {
    const turnSpeed = 0.02; // Adjust the turn speed as needed
    const minTurnValue = 0.8; // min turn speed
    const maxTurnValue = 1.3; // max turn speed

    if (keyIsDown(65)) { // 'A' key for left -
         player.left = lerp(player.left, maxTurnValue, turnSpeed);
         player.direction -= player.left;
    } else { // get back to 
        player.left = minTurnValue;
    }

    if (keyIsDown(68)) { // 'D' key for right +
        player.right = lerp(player.right, maxTurnValue, turnSpeed);
        player.direction += player.right
    } else {
        player.right = minTurnValue;
    }
}
