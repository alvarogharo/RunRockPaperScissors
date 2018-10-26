game = new Phaser.Game(1080, 1920, Phaser.AUTO, 'gameDiv')
  
game.state.add('bootState', CatCatcher.bootState)
game.state.add('preloadState', CatCatcher.preloadState)
game.state.add('menuState', CatCatcher.menuState)
game.state.add('levelState', CatCatcher.levelState)
game.state.add('endingState', CatCatcher.endingState)
  
game.state.start('bootState')
