import Phaser from 'phaser';

import Setting from '../config/setting';

import Pengsoo from '../GameObjects/Pengsoo';

export default class Game extends Phaser.Scene {
  private background!: Phaser.GameObjects.TileSprite;
  private polaBear!: Phaser.GameObjects.Image;

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
    this.background = this.add
      .tileSprite(0, 0, Setting.WIDTH, Setting.HEIGHT, 'bg_guideline')
      .setOrigin(0);

    this.polaBear = this.add.image(
      Phaser.Math.Between(200, 400),
      200,
      'pola-bear',
    );

    this.pengsoo = new Pengsoo(this, Setting.WIDTH * 0.5, Setting.HEIGHT * 0.9);
    this.add.existing(this.pengsoo);
  }

  update(t: number, dt: number) {
    this.background.setTilePosition(this.cameras.main.scrollX);
    console.log(this.pengsoo.x, this.pengsoo.y, this.pengsoo.z);
  }
}
