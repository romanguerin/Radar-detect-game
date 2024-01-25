let enemy = {
    position: p.createVector(500, 500), // Initial enemy position
    velocity: p.createVector(0, 0), // Initial velocity of the enemy
    angle: p.createVector(0, 0), // Initial angle of the enemy
    prevPlayerPosition: p.createVector(0, 0), // Store the previous player position
    turnSpeed: 0.5, // Adjust the multiplier for turning
    followDistance: 100, // Adjust the distance at which the enemy follows the player
    accelerationRate: 0.002, // Adjust the acceleration rate
    decelerationRate: 0.0002, // Adjust the deceleration rate
    maxSpeed: 4, // Adjust the maximum speed
    minSpeed: 2, // Adjust the minimum speed
    maxTurnAngle: 2, // Adjust the maximum turning angle
};

function drawEnemy() {
    // Draw the enemy
    fill(255, 0, 0); // Red color for the enemy
    ellipse(enemy.position.x, enemy.position.y, 10, 10);

    // Update the enemy position to follow the player
    followPlayer();
}

function followPlayer() {
    // If there are previous player positions, use the previous one to guide the enemy
    let targetPosition = enemy.prevPlayerPosition;
    let direction = p5.Vector.sub(targetPosition, enemy.position);

    // Initialize the velocity vector if it's not defined
    if (!enemy.velocity) {
        enemy.velocity = p.createVector(0, 0);
    }

    // Adjust the follow distance
    if (direction.mag() > enemy.followDistance) {
        // Gradually change the velocity based on the direction vector and acceleration
        enemy.velocity.lerp(direction, enemy.accelerationRate);
        // Limit the velocity to the maximum speed
        enemy.velocity.limit(enemy.maxSpeed);
        // Update the enemy's position based on the velocity
        enemy.position.add(enemy.velocity);
    } else {
        // Decelerate if the enemy is within the followDistance
        enemy.velocity.mult(1 - enemy.decelerationRate);
        // Update the enemy's position based on the velocity, ensuring a minimum speed
        enemy.velocity.limit(Math.max(enemy.velocity.mag(), enemy.minSpeed));
        enemy.position.add(enemy.velocity);
    }

    // Store the current player position for the next frame
    enemy.prevPlayerPosition.set(player.v1);
}

function turnEnemy() {
    // Determine the angle difference between enemy and player
    let angleDiff = p.degrees(p.atan2(player.v1.y - enemy.position.y, player.v1.x - enemy.position.x)) - enemy.angle.heading();

    // Adjust the angle difference to be within the range of -180 to 180 degrees
    if (angleDiff > 180) {
        angleDiff -= 360;
    } else if (angleDiff < -180) {
        angleDiff += 360;
    }

    // Limit the turning angle to the maximum turning angle
    angleDiff = p.constrain(angleDiff, -enemy.maxTurnAngle, enemy.maxTurnAngle);

    // Adjust the enemy's angle based on the angle difference with turning
    enemy.angle.rotate(radians(angleDiff * enemy.turnSpeed)); // Adjust the multiplier for turning
}
