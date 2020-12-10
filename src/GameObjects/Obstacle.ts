import Phaser from 'phaser';
import Setting from '~/consts/Setting';

type Side = 'left' | 'right';

export class Obstacle extends Phaser.GameObjects.Container {
  private image: Phaser.GameObjects.Image;
  private speed: number = 1;
  private side: Side;
  private distanceFromCenter: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    speed: number,
  ) {
    super(scene, x, y);

    this.image = this.scene.add.image(0, 0, key).setDepth(-1);
    this.add(this.image);

    scene.physics.add.existing(this);

    this.speed = speed;
    this.distanceFromCenter = this.x - 400;
    this.side = this.distanceFromCenter < 0 ? 'left' : 'right';

    this.setScale(0);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.image.width * 0.8, this.image.height * 0.4);

    if (this.side === 'right') {
      this.image.setFlipX(true);
      this.image.setOrigin(0, 0.5);
      body.setOffset(40, -10);
    } else {
      this.image.setOrigin(1, 0.5);
      body.setOffset(-this.image.width + 30, -10);
    }

    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
  }

  preUpdate(): void {
    const velocityX = (this.distanceFromCenter / 200) * this.speed;
    const velocityY = (this.y / 200) * this.speed;
    const rateY = (this.y - 130) / 600;

    this.setY(this.y + velocityY);
    this.setX(this.x + velocityX);

    this.setScale(1 * rateY);

    if (this.y > Setting.HEIGHT + 120) {
      this.destroy();
    }
  }
}
