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
    drawAfterBurn();

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

    if (shiftPressed) { // 'SHIFT' for afterburn
        updateSpeed();
      }    
}

// set custom time out for afterburn
let isTimeoutActive = false;

function setCustomTimeout() {
    let cooldown = 24000;
  if (!isTimeoutActive) {
    isTimeoutActive = true;

    // Set a timeout for 12 seconds
    setTimeout(function () {
      // After 12 seconds, set global boolean to true
      isTimeoutActive = false;
    }, cooldown);
  } 
}

function drawAfterBurn() {
    push();
    // draw afterburn circle
    if (shiftPressed){  // Orange is start of afterburn
        fill(255, 204, 0); 
    } 
        else if (isTimeoutActive){ // Red is afterburn in cooldown
        fill(255, 0, 0); 
        }
            else { // Green is ready for afterburn
                fill(0,255,0); 
            }
    circle(20, 20, 15);
    text('AFTERBURN', 35, 25);
    pop();
}

// variables that go with the afterburn
let originalSpeed;
let shiftPressed = false;
let startTime;

 function keyPressed() {
    // Check if the shift key is pressed and the transition is not already in progress
     if (keyCode === 16 && !shiftPressed && !isTimeoutActive){
        //wait 12 seconds
        setCustomTimeout();
        // start smooth speed change
       startSmoothSpeedChange();
     }
   }
  
  function startSmoothSpeedChange() {
    // Save the original speed and start the transition
    originalSpeed = player.speed;
    shiftPressed = true;
    startTime = millis();
  }
  
  function updateSpeed() {
    const currentTime = millis();
    const elapsedTime = (currentTime - startTime) / 1000; // convert to seconds
  
    if (elapsedTime < 4) {
        // Perform smooth speed transition
      const smoothStepValue = smoothstep(0, 0.5, elapsedTime / 4);
      console.log()
      player.speed = lerp(originalSpeed, 12, smoothStepValue);
    } else {
        // Use lerp to smoothly go back to the original speed
      player.speed = lerp(player.speed, originalSpeed, 0.02);
        
      // Check if the transition is complete
      if (abs(player.speed - originalSpeed) < 0.1) {
        player.speed = originalSpeed;
        shiftPressed = false; // Reset the shiftPressed flag
        console.log("Speed transition complete");
      }
    }
  }
  
  function smoothstep(edge0, edge1, x) {
    // Smoothstep function for smooth interpolation
    const t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
  }
  
  function clamp(value, min, max) {
    // Clamp function to restrict a value within a range
    return Math.max(min, Math.min(max, value));
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
