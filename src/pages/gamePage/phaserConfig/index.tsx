import Phaser from 'phaser';
import { BootScene } from '../scenes/bootScene';

export const phaserConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: [ BootScene ]
}