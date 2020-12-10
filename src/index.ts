import Phaser from 'phaser';

import config from './GameConfig';

import './styles/main.scss';

window.onload = function () {
  new Phaser.Game(config);
};
