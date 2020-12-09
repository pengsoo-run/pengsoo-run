import Phaser from 'phaser';
import Setting from '~/config/setting';

export class Background {
  private scene: Phaser.Scene;
  private clouds1: Phaser.GameObjects.TileSprite;
  private clouds2: Phaser.GameObjects.TileSprite;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.scene.add
      .tileSprite(0, 0, Setting.WIDTH, Setting.HEIGHT, 'bg')
      .setOrigin(0)
      .setDepth(0);

    this.scene.add.image(0, 0, 'sky').setOrigin(0).setDepth(1);

    this.clouds1 = this.scene.add
      .tileSprite(0, 0, Setting.WIDTH, 64, 'clouds1')
      .setOrigin(0)
      .setDepth(2)
      .setScale(2)
      .setAlpha(0.5);

    this.clouds2 = this.scene.add
      .tileSprite(0, 50, Setting.WIDTH, 32, 'clouds2')
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
