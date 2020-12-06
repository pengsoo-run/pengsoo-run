import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x8d8d8d, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: '로딩 중..',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });

    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });

    percentText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value: number) => {
      percentText.setText(Math.floor(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
    });

    this.load.atlas(
      'pengsoo',
      'character/pengsoo_run.png',
      'character/pengsoo_run.json',
    );
    this.load.image('pola-bear', 'obstacle/polar_bear.png');
    this.load.image('bg_guideline', 'background/bg_guideline2.png');
    this.load.image('sky', 'background/sky.png');

    for (var i = 0; i < 100; i++) {
      this.load.image('logo' + i, 'obstacle/polar_bear.png');
    }
  }

  create() {
    this.anims.create({
      key: 'pengsoo-run',
      frames: this.anims.generateFrameNames('pengsoo', {
        start: 0,
        end: 3,
        prefix: 'pengsoo_run',
        zeroPad: 2,
        suffix: '.png',
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: 'pengsoo-fly',
      frames: this.anims.generateFrameNames('pengsoo', {
        start: 1,
        end: 2,
        prefix: 'flame',
        suffix: '.png',
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.scene.start('game');
  }
}
