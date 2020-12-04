import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
  private background!: Phaser.GameObjects.TileSprite;

  constructor() {
    super('game');
    console.log('game scene');
  }

  preload() {}

  create() {
    this.add.image(0, 0, 'background').setOrigin(0, 1);

    const width = this.scale.width;
    const height = this.scale.height;

    this.background = this.add
      .tileSprite(0, 0, width, height, 'background')
      .setOrigin(0, 0)
      .setScrollFactor(0, 0);

    this.add.image(100, Phaser.Math.Between(0, -1000), 'pola-bear');

    const pengsoo = this.physics.add
      .sprite(width * 0.5, height, 'pengsoo', 'pengsoo_run01.png')
      .play('pengsoo-run');

    const body = pengsoo.body as Phaser.Physics.Arcade.Body;
    body.setVelocityY(-100);

    this.cameras.main.startFollow(pengsoo);
    this.cameras.main.setOrigin(0.5, 0.8);
  }

  update(t: number, dt: number) {
    this.background.setTilePosition(0, this.cameras.main.scrollY);
  }
}
