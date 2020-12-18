import Phaser from 'phaser';

import Setting from '../consts/Setting';

import { Background } from '../gameObjects/Background';
import { Pengsoo, PengsooState } from '../gameObjects/Pengsoo';
import { Obstacle } from '../gameObjects/Obstacle';

export class MainScene extends Phaser.Scene {
  private background!: Background;
  private pengsoo!: Pengsoo;
  private obstacles!: Phaser.GameObjects.Group;
  private scoreText!: Phaser.GameObjects.BitmapText;
  private lifeText!: Phaser.GameObjects.BitmapText;
  private obstacleTimer!: Phaser.Time.TimerEvent;
  private stopTimer!: Phaser.Time.TimerEvent;
  private currentLevel: number = 1;

  constructor() {
    super('game');
  }

  public init(): void {
    this.registry.set('score', -1);
    this.registry.set('life', 2);
  }

  public create(): void {
    this.background = new Background(this);

    this.scoreText = this.add
      .bitmapText(30, 30, 'font', `SCORE ${this.registry.values.score}`)
      .setDepth(5);

    this.lifeText = this.add
      .bitmapText(615, 30, 'font', `LIFE ${this.registry.values.life}`)
      .setDepth(5);

    this.pengsoo = new Pengsoo(this, Setting.WIDTH * 0.3, Setting.HEIGHT * 0.9);
    this.add.existing(this.pengsoo);
    this.pengsoo.setDepth(3);

    this.obstacles = this.add.group({});

    this.addObstacle();

    this.obstacleTimer = this.time.addEvent({
      delay: 2000 / this.currentLevel,
      callback: this.addObstacle,
      callbackScope: this,
      loop: true,
    });

    this.pengsoo.on('collision', () => {
      console.log('d');

      if (this.registry.values.life > 0) {
        this.registry.values.life -= 1;
        this.lifeText.setText(`LIFE ${this.registry.values.life}`);
      }
    });

    this.physics.add.overlap(this.pengsoo, this.obstacles);
  }

  private addObstacle(): void {
    if (this.registry.values.score === 10) {
      this.currentLevel = 2;
      this.obstacleTimer.destroy();
      this.obstacleTimer = this.time.addEvent({
        delay: 2000 / this.currentLevel,
        callback: this.addObstacle,
        callbackScope: this,
        loop: true,
      });
    } else if (this.registry.values.score === 20) {
      this.currentLevel = 3;
      this.obstacleTimer.destroy();
      this.obstacleTimer = this.time.addEvent({
        delay: 2000 / this.currentLevel,
        callback: this.addObstacle,
        callbackScope: this,
        loop: true,
      });
    } else if (this.registry.values.score === 30) {
      this.currentLevel = 4;
      this.obstacleTimer.destroy();
      this.obstacleTimer = this.time.addEvent({
        delay: 2000 / this.currentLevel,
        callback: this.addObstacle,
        callbackScope: this,
        loop: true,
      });
    }

    const obstacles = ['hole01', 'hole02', 'hole03', 'polar_bear'];
    this.registry.values.score += 1;
    this.scoreText.setText(`SCORE ${this.registry.values.score}`);
    this.obstacles.add(
      new Obstacle(
        this,
        Phaser.Math.Between(360, Setting.WIDTH - 360),
        150,
        obstacles[Phaser.Math.Between(0, 3)],
        this.currentLevel,
      ),
    );
    this.physics.world.enable(this.obstacles);
  }

  public update(time: number, delta: number): void {
    this.background.update();

    const body = this.pengsoo.body as Phaser.Physics.Arcade.Body;

    if (body.embedded) body.touching.none = false;

    const touching = !body.touching.none;
    const wasTouching = !body.wasTouching.none;

    if (touching && !wasTouching) {
      console.log('충돌');
      this.pengsoo.gotHurt();
    }

    if (this.registry.values.life === 0) {
      this.time.addEvent({
        delay: 1500,
        callback: () => {
          this.scene.pause();
          //게임오버로직..
        },
        callbackScope: this,
      });
    }
  }
}
