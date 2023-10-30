let hitCount = 0;
let playerHitCount = 5;
let isPlayerHit = false;

const hitIndicator = document.createElement('div');
hitIndicator.innerText = `Hits 100/ ${hitCount}`;
hitIndicator.style.position = 'absolute';
hitIndicator.style.top = '10px'; // Adjust as needed
hitIndicator.style.left = '10px'; // Adjust as needed
hitIndicator.style.fontSize = '50px'; // Adjust as needed
hitIndicator.style.zIndex = '1000'; // Ensure it's on top of other elements
hitIndicator.style.backgroundColor = 'red'; // Optional: for better visibility
hitIndicator.style.padding = '50px'; // Optional: for better appearance
document.body.appendChild(hitIndicator);

const playerHitIndicator = document.createElement('div');
playerHitIndicator.innerText = `Lives: ${playerHitCount}`;
playerHitIndicator.style.position = 'absolute';
playerHitIndicator.style.top = '50px';
playerHitIndicator.style.right = '300px';
playerHitIndicator.style.fontSize = '50px';
playerHitIndicator.style.zIndex = '1000';
playerHitIndicator.style.backgroundColor = 'green';
playerHitIndicator.style.padding = '5px';
document.body.appendChild(playerHitIndicator);


const player = document.getElementById('player');
const npc = document.getElementById('npc');
let playerFrameIndex = 0;
let npcFrameIndex = 0;
const playerNumberOfFrames = 9;  // Adjust based on your player sprite sheet
const npcNumberOfFrames = 7;     // Adjust based on your NPC sprite sheet
const playerFrameWidth = 79;     // Width of a single frame for the player
const playerFrameHeight = 140;    // Height of a single frame for the player
const npcFrameWidth = 210;        // Width of a single frame for the NPC
const npcFrameHeight = 376;       // Height of a single frame for the NPC
const speed = 10;          // Walking speed in pixels

const projectile = document.getElementById('projectile');
let isShooting = false;


document.addEventListener('keydown', (event) => {
    const gameContainer = document.querySelector('.game-container');
    const maxLeft = gameContainer.offsetWidth - player.offsetWidth;
    const maxTop = gameContainer.offsetHeight - player.offsetHeight;

    if (event.key === 'ArrowRight' && player.offsetLeft < maxLeft) {
        player.style.transform = 'translate(-50%, -50%) scaleX(1)';  // Normal orientation
        player.style.left = `${player.offsetLeft + speed}px`;
        animatePlayer();
    } else if (event.key === 'ArrowLeft' && player.offsetLeft > 0) {
        player.style.transform = 'translate(-50%, -50%) scaleX(-1)'; // Mirrored orientation
        player.style.left = `${player.offsetLeft - speed}px`;
        animatePlayer();
    }

    if (event.key === ' ' && !isShooting) { // Space bar
        shootProjectile();
    }
});

function animatePlayer() {
    playerFrameIndex = (playerFrameIndex + 1) % playerNumberOfFrames;
    const xOffset = playerFrameIndex * playerFrameWidth;
    const yOffset = 0;  // Adjust if your player sprite sheet has frames in multiple rows
    player.style.backgroundPosition = `-${xOffset}px -${yOffset}px`;
}

function animateNPC() {
    npcFrameIndex = (npcFrameIndex + 1) % npcNumberOfFrames;
    const xOffset = npcFrameIndex * npcFrameWidth;
    const yOffset = 0;  // Adjust if your NPC sprite sheet has frames in multiple rows
    npc.style.backgroundPosition = `-${xOffset}px -${yOffset}px`;
    npc.style.width = `${npcFrameWidth}px`;
    npc.style.height = `${npcFrameHeight}px`;
}

function followPlayer() {
    const gameContainer = document.querySelector('.game-container');
    const maxLeft = gameContainer.offsetWidth - npc.offsetWidth;
    const playerX = player.offsetLeft + player.offsetWidth / 2;
    const npcX = npc.offsetLeft + npc.offsetWidth / 2;

    const deltaX = playerX - npcX;

    const npcSpeed = speed / .75;  // NPC moves slightly slower than the player
    const moveX = (deltaX > 0 ? 1 : -1) * npcSpeed;

    const playerRect = player.getBoundingClientRect();
    const npcRect = npc.getBoundingClientRect();

    if (checkCollision(playerRect, npcRect) && !isPlayerHit) {
        playerHitCount -= 1;
        playerHitIndicator.innerText = `Lives: ${playerHitCount}`;
        isPlayerHit = true;

        setTimeout(() => {
            isPlayerHit = false;
        }, 2000); // 2 seconds delay

        if (playerHitCount <= 0) {
            alert('Game Over! The player has no live left.');
            // Add any additional game over logic here
        }
    }
    // Update NPC position
    npc.style.left = `${Math.min(maxLeft, Math.max(0, npc.offsetLeft + moveX))}px`;

  // Update NPC animation
  if (moveX > 0) {
    npc.style.transform = 'translate(-50%, -50%) scaleX(1)';  // Normal orientation
} else if (moveX < 0) {
    npc.style.transform = 'translate(-50%, -50%) scaleX(-1)'; // Mirrored orientation
}
animateNPC();
}


function checkCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}

function shootProjectile() {
    const playerRect = player.getBoundingClientRect();
    const npcRect = npc.getBoundingClientRect();
    const gameContainerRect = document.querySelector('.game-container').getBoundingClientRect();

    const directionX = npcRect.left + npcRect.width / 2 - (playerRect.right - gameContainerRect.left);
    const directionY = npcRect.top + npcRect.height / 2 - (playerRect.top - gameContainerRect.top + playerRect.height / 2);
    const magnitude = Math.sqrt(directionX * directionX + directionY * directionY);
    const normalizedDirectionX = directionX / magnitude;
    const normalizedDirectionY = directionY / magnitude;

        // Adjust these values to change the starting location of the projectile
        const offsetX = -100; // Horizontal offset from the player's right edge
        const offsetY = -80;  // Vertical offset from the player's center

        projectile.style.left = `${playerRect.right - gameContainerRect.left + offsetX}px`;
        projectile.style.top = `${playerRect.top - gameContainerRect.top + playerRect.height / 2 + offsetY}px`;
        projectile.style.display = 'block';
        isShooting = true;

        // Mirror the projectile image if moving from right to left
        if (normalizedDirectionX < 0) {
            projectile.style.transform = 'scaleX(-1)';
        } else {
            projectile.style.transform = 'scaleX(1)';
        }
    

        const projectileSpeed = 20; // Adjust speed as needed
        const projectileInterval = setInterval(() => {
            const newLeft = projectile.offsetLeft + normalizedDirectionX * projectileSpeed;
            const newTop = projectile.offsetTop + normalizedDirectionY * projectileSpeed;
    
            if (newLeft > gameContainerRect.width || newLeft < 0 || newTop > gameContainerRect.height || newTop < 0) {
                clearInterval(projectileInterval);
                projectile.style.display = 'none';
                isShooting = false;
            } else {
                projectile.style.left = `${newLeft}px`;
                projectile.style.top = `${newTop}px`;
            }
    
            const projectileRect = projectile.getBoundingClientRect();
            const npcRect = npc.getBoundingClientRect();
    
            if (checkCollision(projectileRect, npcRect)) {
                hitCount += 1;
                hitIndicator.innerText = `Hits 100/ ${hitCount}`;
                projectile.style.display = 'none';
                clearInterval(projectileInterval);
                isShooting = false;
    
                if (hitCount >= 100) {
                    alert('!!!YOU WIN!!! The Monster has been hit 100 times.');
                    // Add any additional game over logic here
                }
            }
        }, 25); // Adjust interval as needed for smooth animation
    } // This closes the shootProjectile function

setInterval(followPlayer, 100);  // Adjust interval as needed