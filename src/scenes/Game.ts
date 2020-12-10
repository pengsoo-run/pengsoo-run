import Phaser from 'phaser';

import Setting from '~/consts/Setting';

import { Pengsoo } from '~/GameObjects/Pengsoo';
import { Obstacle } from '~/GameObjects/Obstacle';
import { Background } from '~/GameObjects/Background';

export class Game extends Phaser.Scene {
  private background!: Background;
  private pengsoo!: Pengsoo;
  private obstacles!: Phaser.GameObjects.Group;
  private scoreText!: Phaser.GameObjects.BitmapText;
  private timer!: Phaser.Time.TimerEvent;
  private currentLevel: number = 1;

  constructor() {
    super('game');
  }

  public init(): void {
    this.registry.set('score', -1);
  }

  public create(): void {
    this.background = new Background(this);

    this.scoreText = this.add
      .bitmapText(30, 30, 'font', `SCORE ${this.registry.values.score}`)
      .setDepth(5);

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
    this.scoreText.setText(`SCORE ${this.registry.values.score}`);
    this.obstacles.add(
      new Obstacle(
        this,
        Phaser.Math.Between(350, Setting.WIDTH - 350),
        150,
        'hole01',
        this.currentLevel,
      ),
    );
  }

  public update(time: number, delta: number): void {
    this.background.update();

    this.physics.overlap(this.pengsoo, this.obstacles, () => {
      this.pengsoo.gotHurt();
    });
  }
}
