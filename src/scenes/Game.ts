import Phaser from 'phaser';

import Setting from '../config/setting';

import { Pengsoo } from '../GameObjects/Pengsoo';
import { Obstacle } from '../GameObjects/Obstacle';

export class Game extends Phaser.Scene {
  private pengsoo!: Pengsoo;
  private obstacles!: Phaser.GameObjects.Group;
  private scoreText!: Phaser.GameObjects.BitmapText;
  private timer!: Phaser.Time.TimerEvent;
  private currentLevel: number = 1;

  constructor() {
    super('game');
  }

  init(): void {
    this.registry.set('score', -1);
  }

  create(): void {
    this.add
      .tileSprite(0, 0, Setting.WIDTH, Setting.HEIGHT, 'bg_guideline')
      .setOrigin(0)
      .setDepth(0);

    this.add.image(0, 0, 'sky').setOrigin(0).setDepth(1);

    this.scoreText = this.add
      .bitmapText(30, 30, 'font', this.registry.values.score)
      .setDepth(2);

    this.pengsoo = new Pengsoo(this, Setting.WIDTH * 0.5, Setting.HEIGHT * 0.9);
    this.add.existing(this.pengsoo);
    this.pengsoo.setDepth(3);

    this.obstacles = this.add.group({});

    this.addObstacle();

    this.timer = this.time.addEvent({
      delay: 2000 / this.currentLevel,
      callback: this.addObstacle,
      callbackScope: this,
      loop: true,
    });
  }

  private addObstacle(): void {
    this.registry.values.score += 1;
    this.scoreText.setText(this.registry.values.score);
    this.obstacles.add(
      new Obstacle(
        this,
        Phaser.Math.Between(350, Setting.WIDTH - 350),
        150,
        'pola-bear',
        0,
        1,
      ),
    );
  }

  update(t: number, dt: number): void {
    // console.log(this.obstacles);
  }
}
