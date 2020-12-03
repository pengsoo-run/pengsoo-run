import Phaser from 'phaser';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.CANVAS,
  width: 600,
  height: 400,
  parent: 'container',
  physics: {
    default: 'arcade',
    arcade: { debug: true },
  },
  scene: [],
};

export default config;
