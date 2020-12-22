import Phaser from 'phaser';

import { SETTING, TEXTURE } from '~/constants/GameSetting';
import { EVENT } from '~/constants/Event';
import { serviceInstance } from '~/store/middleware';

import { Background } from '../gameObjects/Background';
import { Pengsoo } from '../gameObjects/Pengsoo';
import { Obstacle } from '../gameObjects/Obstacle';

export class MainScene extends Phaser.Scene {
  private background!: Background;
  private pengsoo!: Pengsoo;
  private obstacles!: Phaser.GameObjects.Group;
  private scoreText!: Phaser.GameObjects.BitmapText;
  private lifeText!: Phaser.GameObjects.BitmapText;
  private obstacleTimer!: Phaser.Time.TimerEvent;
  private currentLevel: number = 1;
  private brackTime: number = 1;

  constructor() {
    super('main');
  }

  public init(): void {
    this.registry.set('score', 0);
    this.registry.set('life', 5);
  }

  public create(): void {
    this.background = new Background(this);

    this.lifeText = this.add
      .bitmapText(30, 30, TEXTURE.FONT, `LIFE ${this.registry.values.life}`)
      .setDepth(5);

    this.scoreText = this.add
      .bitmapText(580, 30, TEXTURE.FONT, `SCORE ${this.registry.values.score}`)
      .setDepth(5);

    this.pengsoo = new Pengsoo(this, SETTING.WIDTH * 0.3, SETTING.HEIGHT * 0.9);
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
      if (this.registry.values.life > 0) {
        this.registry.values.life -= 1;
        this.lifeText.setText(`LIFE ${this.registry.values.life}`);
      }
    });
  }

  private addObstacle(): void {
    if (this.brackTime > 0) {
      this.brackTime -= 1;
      return;
    }

    if (
      this.registry.values.score === 10 ||
      this.registry.values.score === 20 ||
      this.registry.values.score === 40
    ) {
      this.currentLevel += 1;
      this.obstacleTimer.destroy();
      this.brackTime = 3;
      this.obstacleTimer = this.time.addEvent(this.setObstacleConfig(this.currentLevel));
      this.registry.values.score += 1;
      return;
    }

    const obstacles = [
      TEXTURE.HOLE_1,
      TEXTURE.HOLE_2,
      TEXTURE.HOLE_3,
      TEXTURE.POLAR_BEAR,
    ];
    this.registry.values.score += 1;
    this.scoreText.setText(`SCORE ${this.registry.values.score}`);
    this.obstacles.add(
      new Obstacle(
        this,
        Phaser.Math.Between(360, SETTING.WIDTH - 360),
        150,
        obstacles[Phaser.Math.Between(0, 3)],
        this.currentLevel,
      ),
    );

    this.physics.world.enable(this.obstacles);
  }

  private setObstacleConfig(level: number): Phaser.Types.Time.TimerEventConfig {
    return {
      delay: 2000 / level,
      callback: this.addObstacle,
      callbackScope: this,
      loop: true,
    };
  }

  public update(time: number, delta: number): void {
    this.background.update();

    this.physics.overlap(this.pengsoo, this.obstacles, () => {
      this.pengsoo.gotHurt();
    });

    if (this.registry.values.life === 0) {
      this.time.addEvent({
        delay: 600,
        callback: () => {
          this.scene.pause();
          serviceInstance.socket.emit(EVENT.GAMEOVER);
        },
        callbackScope: this,
      });
    }
  }
}
