import Phaser from 'phaser';
import Setting from '~/config/setting';

enum PengsooState {
  Running,
  Jumping,
  Dead,
}

export class Pengsoo extends Phaser.GameObjects.Container {
  private running: Phaser.GameObjects.Sprite;
  private jumpTimer: number = 0;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  private currentState = PengsooState.Running;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.running = this.scene.add
      .sprite(0, 0, 'pengsoo_run')
      .setOrigin(0.5, 1)
      .play('pengsoo-run');

    this.add(this.running);

    scene.physics.add.existing(this);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.running.width * 0.5, this.running.height * 0.2);
    body.setOffset(this.running.width * -0.28, -this.running.height * 0.15);
    body.setCollideWorldBounds(true);
    scene.physics.world.setBounds(0, 180, Setting.WIDTH, Setting.HEIGHT - 200);

    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  preUpdate() {
    const body = this.body as Phaser.Physics.Arcade.Body;

    if (this.currentState === PengsooState.Running) {
      if (this.cursors.up?.isDown || this.cursors.space?.isDown) {
        this.currentState = PengsooState.Jumping;
        this.jumpTimer = 45;
        this.running.play('pengsoo-jump');
        console.log('쩜프');
      }
    }

    if (this.currentState === PengsooState.Jumping) {
      this.jumpTimer -= 1;

      if (this.jumpTimer < 0) {
        this.currentState = PengsooState.Running;
        this.running.play('pengsoo-run');
      }
    }

    // TODO: keyboard input -> socket event
    if (this.cursors.left?.isDown) {
      body.setVelocityX(-300);
    } else if (this.cursors.right?.isDown) {
      body.setVelocityX(300);
    } else if (this.cursors.left?.isUp || this.cursors.right?.isUp) {
      body.setVelocityX(0);
    }
  }
}
