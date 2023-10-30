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

    const npcSpeed = speed / 1.15;  // NPC moves slightly slower than the player
    const moveX = (deltaX > 0 ? 1 : -1) * npcSpeed;


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



function shootProjectile() {
    const playerRect = player.getBoundingClientRect();
    const gameContainerRect = document.querySelector('.game-container').getBoundingClientRect();

    projectile.style.left = `${playerRect.right - gameContainerRect.left}px`;
    projectile.style.top = `${playerRect.top - gameContainerRect.top + playerRect.height / 2}px`;
    projectile.style.display = 'block';
    isShooting = true;

    const projectileInterval = setInterval(() => {
        const newLeft = projectile.offsetLeft + 25; // Adjust speed as needed
        if (newLeft > gameContainerRect.width) {
            clearInterval(projectileInterval);
            projectile.style.display = 'none';
            isShooting = false;
        } else {
            projectile.style.left = `${newLeft}px`;
        }
    }, 25); // Adjust interval as needed for smooth animation
}

;

setInterval(followPlayer, 100);  // Adjust interval as needed