import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }

  preload() {}

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.physics.add.sprite(width * 0.5, height, 'running-pengsoo');
  }

  update() {}
}
