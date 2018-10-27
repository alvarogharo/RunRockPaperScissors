RunRockPaperScissors.waitingState = function(game) {

}

var timer;

RunRockPaperScissors.waitingState.prototype = {
    
    init: function(t) {
        timer = t;
    },

    preload: function() {
        game.load.image('backButton', 'assets/sprites/buttons/backButton.png');
        game.load.image('creditsBanner', 'assets/sprites/credits/creditsBanner.png');
        
    },

    create: function() {
        var text = game.add.bitmapText(130, 440, 'myFont', 'WAITING', 120);
        text = game.add.bitmapText(130, 600, 'myFont', 'For', 120);
        text = game.add.bitmapText(130, 760, 'myFont', 'Other', 120);
        text = game.add.bitmapText(130, 920, 'myFont', 'Player...', 120);
        text.smoothed = false;
        text.color = 'white';

        
    },

    update: function() {
        game.debug.text('Elapsed seconds: ' + timer, 32, 32);
        timer += game.time.physicsElapsed;

        if (timer >= 5){
            game.state.start('gameState');
        }
    }
}