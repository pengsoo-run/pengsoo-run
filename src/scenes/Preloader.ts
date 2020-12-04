import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
    console.log('preloader scene');
  }

  preload() {
    this.load.image('background', 'background/bg_repeat_line.png');

    this.load.image('pola-bear', 'obstacle/polar_bear.png');

    this.load.atlas('pengsoo', 'character/pengsoo.png', 'character/pengsoo.json');
  }

  create() {
    this.anims.create({
      key: 'pengsoo-run',
      frames: this.anims.generateFrameNames('pengsoo', {
        start: 1,
        end: 2,
        prefix: 'pengsoo_run',
        zeroPad: 2,
        suffix: '.png',
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.scene.start('game');
  }
}
