import Phaser from 'phaser';

import Setting from './setting';

import Preloader from '../scenes/Preloader';
import Game from '../scenes/Game';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: Setting.WIDTH,
  height: Setting.HEIGHT,
  parent: 'container',
  physics: {
    default: 'arcade',
    arcade: { debug: true },
  },
  scene: [Preloader, Game],
};

export default config;
