import Phaser from 'phaser';

import config from './config/game';

import './styles/main.scss';

window.onload = function () {
  new Phaser.Game(config);
};
