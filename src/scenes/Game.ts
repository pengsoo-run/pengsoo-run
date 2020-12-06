import Phaser from 'phaser';
import Obstacle from '~/GameObjects/Obstacle';

import Setting from '../config/setting';

import Pengsoo from '../GameObjects/Pengsoo';

export default class Game extends Phaser.Scene {
  private background!: Phaser.GameObjects.TileSprite;
  // private bookcases: Phaser.GameObjects.Image[] = [];
  // private windows: Phaser.GameObjects.Image[] = [];

  private pengsoo!: Pengsoo;

  constructor() {
    super('game');
  }

  init() {
    // this.score = 0;
  }

  create() {
    // this.add
    //   .tileSprite(0, 0, Setting.WIDTH, 180, 'sky')
    //   .setDepth(999)
    //   .setOrigin(0);

    this.background = this.add
      .tileSprite(0, 0, Setting.WIDTH, Setting.HEIGHT, 'bg_guideline')
      .setOrigin(0);

    this.pengsoo = new Pengsoo(this, Setting.WIDTH * 0.5, Setting.HEIGHT * 0.9);
    this.add.existing(this.pengsoo);

    this.pengsoo.setDepth(99);

    this.time.addEvent({
      delay: 2000,
      callback: this.createBear,
      callbackScope: this,
      repeat: -1,
    });
  }

  createBear() {
    const bear = new Obstacle(
      this,
      Phaser.Math.Between(300, Setting.WIDTH - 300),
      130,
    );
    this.add.existing(bear);

    // this.time.addEvent({
    //   delay: 2000,
    //   callback: () => bear.destroy(),
    //   callbackScope: this,
    //   repeat: 1,
    // });
  }

  update(t: number, dt: number) {
    this.background.setTilePosition(this.cameras.main.scrollX);
  }
}
