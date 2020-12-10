import Phaser from 'phaser';

import Setting from './consts/Setting';

import { Preloader } from './scenes/Preloader';
import { Game } from './scenes/Game';

const config: Phaser.Types.Core.GameConfig = {
  title: 'Pengsoo Run',
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
