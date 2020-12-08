import Phaser from 'phaser';
import Setting from '~/config/setting';

export default class Obstacle extends Phaser.GameObjects.Image {
  private speed: number = 1;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    frame: number,
    speed: number,
  ) {
    super(scene, x, y, key, frame);

    this.speed = speed;
    this.setScale(0);

    if (this.x - 400 > 0) {
      this.setFlipX(true);
      this.setOrigin(0, 0);
    } else {
      this.setOrigin(1, 0);
    }

    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
  }

  create() {}

  preUpdate() {
    const rateX = this.x - 400;
    const rateY = (this.y - 130) / 600;

    const velocityX = ((this.x - 400) / 300) * this.speed;
    const velocityY = ((1.2 * (this.y + 150)) / 300) * this.speed;

    this.setY(this.y + velocityY);
    this.setX(this.x + velocityX);

    this.setScale(1 * rateY);

    if (this.y > Setting.HEIGHT + 120) {
      console.log('북극곰 파괴');
      this.destroy();
    }
  }
}
