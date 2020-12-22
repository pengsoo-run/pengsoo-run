import Phaser from 'phaser';

import { ANIMAITON, SETTING, TEXTURE } from '~/constants/GameSetting';

export class PreloadScene extends Phaser.Scene {
  private loadingBar!: Phaser.GameObjects.Graphics;
  private progressBar!: Phaser.GameObjects.Graphics;

  constructor() {
    super('preloader');
  }

  preload(): void {
    this.cameras.main.setBackgroundColor(0x80c2f3);
    this.createLoadingbar();

    this.load.on(
      'progress',
      (value: number) => {
        this.progressBar.clear();
        this.progressBar.fillStyle(0xe6f4ff, 1);
        this.progressBar.fillRect(
          SETTING.WIDTH / 4,
          SETTING.HEIGHT / 2 - 16,
          (SETTING.WIDTH / 2) * value,
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
      TEXTURE.PENGSOO_RUN,
      'character/pengsoo_run.png',
      'character/pengsoo_run.json',
    );

    this.load.atlas(
      TEXTURE.PENGSOO_JUMP,
      'character/pengsoo_jump.png',
      'character/pengsoo_jump.json',
    );

    this.load.image(TEXTURE.BG, 'background/bg.png');
    this.load.image(TEXTURE.SKY, 'background/sky.png');
    this.load.image(TEXTURE.CLOUDS_1, 'background/clouds.png');
    this.load.image(TEXTURE.CLOUDS_2, 'background/clouds2.png');

    this.load.bitmapFont(TEXTURE.FONT, 'font/font.png', 'font/font.fnt');

    this.load.image(TEXTURE.HOLE_1, 'obstacle/hole01.png');
    this.load.image(TEXTURE.HOLE_2, 'obstacle/hole02.png');
    this.load.image(TEXTURE.HOLE_3, 'obstacle/hole03.png');
    this.load.image(TEXTURE.POLAR_BEAR, 'obstacle/polar_bear.png');
  }

  create() {
    this.anims.create({
      key: ANIMAITON.PENGSOO_RUNNING,
      frames: this.anims.generateFrameNames(TEXTURE.PENGSOO_RUN, {
        start: 1,
        end: 4,
        prefix: TEXTURE.PENGSOO_RUN,
        zeroPad: 2,
        suffix: '.png',
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: ANIMAITON.PENGSOO_JUMPING,
      frames: this.anims.generateFrameNames(TEXTURE.PENGSOO_JUMP, {
        start: 1,
        end: 6,
        prefix: TEXTURE.PENGSOO_JUMP,
        zeroPad: 2,
        suffix: '.png',
      }),
      frameRate: 8,
      repeat: 1,
    });
  }

  update(): void {
    this.scene.start('main');
  }

  private createLoadingbar(): void {
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(0x18649a, 1);
    this.loadingBar.fillRect(
      SETTING.WIDTH / 4 - 2,
      SETTING.HEIGHT / 2 - 18,
      SETTING.WIDTH / 2 + 4,
      20,
    );
    this.progressBar = this.add.graphics();
  }
}
