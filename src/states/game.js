RunRockPaperScissors.gameState = function(game) {

}

var timer;

RunRockPaperScissors.gameState.prototype = {

    preload: function() {

    },

    create: function() {
        timer = 0;
    },

    update: function() {
        game.debug.text('Elapsed seconds: ' + timer, 32, 32);
        timer += game.time.physicsElapsed;

        if (timer >= 5){
            game.state.start('versusState');
        }
    }
}