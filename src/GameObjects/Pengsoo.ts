import Phaser from 'phaser';
import Setting from '~/config/setting';

enum PengsooState {
  Running,
  Jumping,
  Dead,
}

export default class Pengsoo extends Phaser.GameObjects.Container {
  private running: Phaser.GameObjects.Sprite;
  private jumping: Phaser.GameObjects.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  private currentState = PengsooState.Running;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.running = this.scene.add
      .sprite(0, 0, 'pengsoo')
      .setOrigin(0.5, 1)
      .play('pengsoo-run');

    this.jumping = scene.add.sprite(-60, -15, 'pengsoo').play('pengsoo-fly');
    this.jumping.setVisible(false);

    this.add(this.running);
    this.add(this.jumping);

    scene.physics.add.existing(this);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.running.width * 0.5, this.running.height * 0.2);
    body.setOffset(this.running.width * -0.28, -this.running.height * 0.15);
    body.setCollideWorldBounds(true);
    scene.physics.world.setBounds(0, 180, Setting.WIDTH, Setting.HEIGHT - 180);

    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  preUpdate() {
    const body = this.body as Phaser.Physics.Arcade.Body;

    if (this.currentState !== PengsooState.Running) return;

    // TODO: keyboard input -> socket event

    // if (body.position.y >= 459) {
    //   body.setGravityY(0);
    //   body.setVelocityY(0);
    // }

    // if (this.cursors.up?.isDown) {
    //   console.log('up');
    //   body.setVelocityY(-200);
    //   this.jumping.setVisible(true);
    // } else if (this.cursors.up?.isUp) {

    // }

    // if (this.cursors.down?.isDown) {
    //   console.log('down');
    //   body.setVelocityY(300);
    //   this.jumping.setVisible(true);
    // }

    if (this.cursors.left?.isDown) {
      body.setVelocityX(-300);
    } else if (this.cursors.right?.isDown) {
      body.setVelocityX(300);
    } else if (this.cursors.left?.isUp || this.cursors.right?.isUp) {
      body.setVelocityX(0);
    }

    if (this.cursors.up?.isDown) {
      body.setVelocityY(-200);
    } else if (this.cursors.down?.isDown) {
      body.setVelocityY(500);
    } else if (this.cursors.up?.isUp || this.cursors.down?.isUp) {
      body.setVelocityY(300);
    }
  }
}
