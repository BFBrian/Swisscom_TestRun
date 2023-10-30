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

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        player.style.transform = 'translate(-50%, -50%) scaleX(1)';  // Normal orientation
        player.style.left = `${player.offsetLeft + speed}px`;
        animatePlayer();
    } else if (event.key === 'ArrowLeft') {
        player.style.transform = 'translate(-50%, -50%) scaleX(-1)'; // Mirrored orientation
        player.style.left = `${player.offsetLeft - speed}px`;
        animatePlayer();
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
    const playerX = player.offsetLeft;
    const npcX = npc.offsetLeft;

    if (playerX > npcX) {
        npc.style.transform = 'translate(-50%, -50%) scaleX(1)';  // Normal orientation
        npc.style.left = `${npcX + (speed / 1.15)}px`;  // NPC moves at half speed
        animateNPC();
    } else if (playerX < npcX) {
        npc.style.transform = 'translate(-50%, -50%) scaleX(-1)'; // Mirrored orientation
        npc.style.left = `${npcX - (speed / 1.15)}px`;  // NPC moves at half speed
        animateNPC();
    }
}

setInterval(followPlayer, 100);  // Adjust interval as needed