game = new Phaser.Game(1080, 1920, Phaser.AUTO, 'gameDiv')
  
game.state.add('bootState', RunRockPaperScissors.bootState);
game.state.add('mainMenuState', RunRockPaperScissors.mainMenuState);
game.state.add('gameModeState', RunRockPaperScissors.gameModeState);
game.state.add('creditsState', RunRockPaperScissors.creditsState);
game.state.add('waitingState', RunRockPaperScissors.waitingState);
game.state.add('gameState', RunRockPaperScissors.gameState);
game.state.add('versusState', RunRockPaperScissors.versusState);
game.state.add('scoreState', RunRockPaperScissors.scoreState);
game.state.add('winnerState', RunRockPaperScissors.winnerState);

  
game.state.start('versusState');
