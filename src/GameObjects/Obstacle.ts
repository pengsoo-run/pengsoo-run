import Phaser from 'phaser';
import Setting from '~/config/setting';

export default class Obstacle extends Phaser.GameObjects.Container {
  private comming: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.comming = this.scene.add.sprite(0, 0, 'pola-bear');

    this.add(this.comming);
    this.scene.physics.add.existing(this.comming);

    this.setScale(0.15);
  }

  create() {}

  preUpdate() {
    // const body = this.comming.body as Phaser.Physics.Arcade.Body;
    // body.setVelocityY(100);

    this.setX(this.x + (this.x - 400) / 80);
    this.setY(this.y + (1.2 * (this.y + 150)) / 100);
    this.setScale((0.15 * (1.2 * (this.y + 150))) / 100);

    if (this.y >= Setting.HEIGHT) {
      // console.log('파괴');
      this.comming.destroy();
    }
  }
}
