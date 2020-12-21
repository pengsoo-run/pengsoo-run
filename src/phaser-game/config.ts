import Phaser from 'phaser';

import { SETTING } from '~/constants/GameSetting';

import { PreloadScene } from './scenes/PreloadScene';
import { MainScene } from './scenes/MainScene';

export const config: Phaser.Types.Core.GameConfig = {
  title: 'Pengsoo Run',
  type: Phaser.AUTO,
  width: SETTING.WIDTH,
  height: SETTING.HEIGHT,
  parent: 'game-container',
  physics: { default: 'arcade' },
  scene: [PreloadScene, MainScene],
};
