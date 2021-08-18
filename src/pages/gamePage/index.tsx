import * as React from 'react';
import { useEffect } from 'react';
import { BootScene } from './scenes/bootScene';
import Phaser from 'phaser';

var config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: window.innerWidth,
  height: window.innerHeight,
  pixelArt: true,
  scene: [BootScene]
};

var game: any;

const GamePage = () => {
  useEffect( function () {
    if(game) return;
    game = new Phaser.Game(config);
  }, [])

  return (
    <div>
      <div id="game">
        <></>
      </div>
    </div>
  );
}

export default GamePage;
