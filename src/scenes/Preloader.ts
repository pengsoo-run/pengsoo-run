import Phaser from 'phaser';

export class Preloader extends Phaser.Scene {
  private loadingBar!: Phaser.GameObjects.Graphics;
  private progressBar!: Phaser.GameObjects.Graphics;

  constructor() {
    super('preloader');
  }

  preload(): void {
    this.cameras.main.setBackgroundColor(0x98d687);
    this.createLoadingbar();

    this.load.on(
      'progress',
      (value: number) => {
        this.progressBar.clear();
        this.progressBar.fillStyle(0xfff6d3, 1);
        this.progressBar.fillRect(
          this.cameras.main.width / 4,
          this.cameras.main.height / 2 - 16,
          (this.cameras.main.width / 2) * value,
          16,
        );
      },
      this,
    );

    this.load.on(
      'complete',
      () => {
        this.progressBar.destroy();
        this.loadingBar.destroy();
      },
      this,
    );

    this.load.atlas(
      'pengsoo',
      'character/pengsoo_run.png',
      'character/pengsoo_run.json',
    );

    this.load.image('pola-bear', 'obstacle/polar_bear.png');
    this.load.image('bg_guideline', 'background/bg_guideline.png');
    this.load.image('sky', 'background/sky.png');

    this.load.bitmapFont('font', 'font/font.png', 'font/font.fnt');

    for (var i = 0; i < 200; i++) {
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
  }

  update(): void {
    this.scene.start('game');
  }

  private createLoadingbar(): void {
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(0x5dae47, 1);
    this.loadingBar.fillRect(
      this.cameras.main.width / 4 - 2,
      this.cameras.main.height / 2 - 18,
      this.cameras.main.width / 2 + 4,
      20,
    );
    this.progressBar = this.add.graphics();
  }
}
