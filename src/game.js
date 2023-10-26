import Phaser from 'phaser';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
      // Load the background image
      this.load.image('background', 'assets/background.png');
          // Load the character spritesheet
    this.load.spritesheet('character', 'assets/character_spritesheet.png', {
        frameWidth: 32,
        frameHeight: 32
    });
}

function create() {
     // Add the background image
     this.add.image(400, 300, 'background');
        // Add the character sprite
    this.character = this.add.sprite(400, 300, 'character', 0);
        // Create an animation from the spritesheet
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('character', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        // Play the animation
        this.character.play('walk');

    this.add.text(400, 300, 'Hello Phaser!', { fontSize: '32px', fill: '#fff' });
}

function update() {
    // Update logic here, e.g., moving the character
}

