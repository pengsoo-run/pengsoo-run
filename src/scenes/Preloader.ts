import Phaser from 'phaser';

import Setting from '~/consts/Setting';

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
          Setting.WIDTH / 4,
          Setting.HEIGHT / 2 - 16,
          (Setting.WIDTH / 2) * value,
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
      'pengsoo_run',
      'character/pengsoo_run.png',
      'character/pengsoo_run.json',
    );

    this.load.atlas(
      'pengsoo_jump',
      'character/pengsoo_jump.png',
      'character/pengsoo_jump.json',
    );

    this.load.image('bg', 'background/bg.png');
    this.load.image('sky', 'background/sky.png');
    this.load.image('clouds1', 'background/clouds.png');
    this.load.image('clouds2', 'background/clouds2.png');

    this.load.bitmapFont('font', 'font/font.png', 'font/font.fnt');

    this.load.image('hole01', 'obstacle/hole01.png');
    this.load.image('hole02', 'obstacle/hole02.png');

    for (var i = 0; i < 200; i++) {
      this.load.image('logo' + i, 'obstacle/polar_bear.png');
    }
  }

  create() {
    this.anims.create({
      key: 'pengsoo-run',
      frames: this.anims.generateFrameNames('pengsoo_run', {
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
      key: 'pengsoo-jump',
      frames: this.anims.generateFrameNames('pengsoo_jump', {
        start: 0,
        end: 5,
        prefix: 'pengsoo_jump',
        zeroPad: 2,
        suffix: '.png',
      }),
      frameRate: 8,
      repeat: 1,
    });
  }

  update(): void {
    this.scene.start('game');
  }

  private createLoadingbar(): void {
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(0x5dae47, 1);
    this.loadingBar.fillRect(
      Setting.WIDTH / 4 - 2,
      Setting.HEIGHT / 2 - 18,
      Setting.WIDTH / 2 + 4,
      20,
    );
    this.progressBar = this.add.graphics();
  }
}
