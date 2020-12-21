import Phaser from 'phaser';

import { serviceInstance } from '~/store/middleware';
import { ANIMAITON, SETTING, TEXTURE } from '~/constants/GameSetting';
import { EVENT } from '~/constants/Event';

export const enum PengsooState {
  RUNNING = 'Running',
  JUMPING = 'Jumping',
  HURT = 'hurt',
}

type Button = 'left' | 'right' | 'jump';

interface isPressed {
  left: boolean;
  right: boolean;
  jump: boolean;
}

export class Pengsoo extends Phaser.GameObjects.Container {
  private running: Phaser.GameObjects.Sprite;
  private shadow: Phaser.GameObjects.Ellipse;
  private jumpTimer: number = 0;
  private hurtTimer: number = 0;
  private text!: Phaser.GameObjects.BitmapText;
  private isPressed: isPressed;
  public currentState = PengsooState.RUNNING;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.shadow = scene.add.ellipse(0, 10, 80, 25, 0x00000, 0.2).setOrigin(0.5, 1);

    this.running = scene.add
      .sprite(0, 0, TEXTURE.PENGSOO_RUN)
      .setOrigin(0.5, 1)
      .play(ANIMAITON.PENGSOO_RUNNING);

    this.add(this.shadow);
    this.add(this.running);

    this.text = this.scene.add.bitmapText(0, 0, TEXTURE.FONT, '-1');

    this.text.setVisible(false);
    this.add(this.text);

    scene.physics.add.existing(this);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.running.width * 0.5, this.running.height * 0.2);
    body.setOffset(this.running.width * -0.28, -this.running.height * 0.15);
    body.setCollideWorldBounds(true);
    scene.physics.world.setBounds(0, 180, SETTING.WIDTH, SETTING.HEIGHT - 200);

    this.isPressed = {
      left: false,
      right: false,
      jump: false,
    };

    serviceInstance.socket.on(EVENT.BUTTON_DOWN, (button: Button) => {
      this.isPressed[button] = true;
    });

    serviceInstance.socket.on(EVENT.BUTTON_UP, (button: Button) => {
      this.isPressed[button] = false;
    });
  }

  private preUpdate(): void {
    const body = this.body as Phaser.Physics.Arcade.Body;

    if (this.currentState === PengsooState.RUNNING) {
      if (this.isPressed.jump) {
        this.currentState = PengsooState.JUMPING;
        this.jumpTimer = 50;
        this.running.play(ANIMAITON.PENGSOO_JUMPING);
      }
    }

    if (this.currentState === PengsooState.JUMPING) {
      this.jumpTimer -= 1;
      const jumpRate = this.jumpTimer / 50;

      if (jumpRate < 0.5) {
        this.shadow.setScale(1 - jumpRate);
      } else {
        this.shadow.setScale(jumpRate);
      }

      if (this.jumpTimer < 0) {
        this.currentState = PengsooState.RUNNING;
        this.running.play(ANIMAITON.PENGSOO_RUNNING);
      }
    }

    if (this.currentState === PengsooState.HURT) {
      this.hurtTimer -= 1;
      const hurtRate = this.hurtTimer / 30;

      this.text.setY(-50 - 50 * hurtRate);

      if (this.hurtTimer < 0) {
        this.text.setVisible(false);
        this.currentState = PengsooState.RUNNING;
      }
    }

    if (this.isPressed.left) {
      body.setVelocityX(-300);
    } else if (this.isPressed.right) {
      body.setVelocityX(300);
    } else if (!this.isPressed.left || !this.isPressed.right) {
      body.setVelocityX(0);
    }
  }

  public gotHurt() {
    if (this.currentState !== PengsooState.JUMPING) {
      this.scene.cameras.main.shake(600, 0.03, true);
      this.hurtTimer = 30;
      this.currentState = PengsooState.HURT;
      this.emit('collision');

      this.text.setY(-50);
      this.text.setVisible(true);
    }
  }
}
