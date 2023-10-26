const character = document.querySelector('.character');
let frameIndex = 0;
const numberOfFrames = 9;  // Adjust based on your sprite sheet
const frameWidth = 79;     // Width of a single frame
const frameHeight = 140;     // Height of a single frame

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        character.style.left = `${character.offsetLeft + 5}px`;
        animateCharacter();
    } else if (event.key === 'ArrowLeft') {
        character.style.left = `${character.offsetLeft - 5}px`;
        animateCharacter();
    }
});

function animateCharacter() {
    frameIndex = (frameIndex + 1) % numberOfFrames;
    const xOffset = frameIndex * frameWidth;
    character.style.backgroundPosition = `-${xOffset}px 0px`;
}
