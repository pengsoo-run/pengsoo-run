import Phaser from 'phaser';

import { SETTING, TEXTURE } from '~/constants/GameSetting';

export class Background {
  private scene: Phaser.Scene;
  private clouds1: Phaser.GameObjects.TileSprite;
  private clouds2: Phaser.GameObjects.TileSprite;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.scene.add
      .tileSprite(-20, -20, SETTING.WIDTH + 40, SETTING.HEIGHT + 40, TEXTURE.BG)
      .setOrigin(0)
      .setDepth(0);

    this.scene.add.image(-20, -20, TEXTURE.SKY).setOrigin(0).setDepth(1);

    this.clouds1 = this.scene.add
      .tileSprite(0, 0, SETTING.WIDTH, 64, TEXTURE.CLOUDS_1)
      .setOrigin(0)
      .setDepth(2)
      .setScale(2)
      .setAlpha(0.5);

    this.clouds2 = this.scene.add
      .tileSprite(0, 50, SETTING.WIDTH, 32, TEXTURE.CLOUDS_2)
      .setOrigin(0)
      .setDepth(3)
      .setScale(1.5)
      .setAlpha(0.8);
  }

  public update(): void {
    this.clouds1.tilePositionX += 0.1;
    this.clouds2.tilePositionX += 0.4;
  }
}
