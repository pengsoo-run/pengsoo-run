import Phaser from 'phaser';

import Setting from './consts/Setting';

import { PreloadScene } from './scenes/preloadScene';
import { MainScene } from './scenes/mainScene';

export const config: Phaser.Types.Core.GameConfig = {
  title: 'Pengsoo Run',
  type: Phaser.AUTO,
  width: Setting.WIDTH,
  height: Setting.HEIGHT,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: { debug: true },
  },
  scene: [PreloadScene, MainScene],
};
